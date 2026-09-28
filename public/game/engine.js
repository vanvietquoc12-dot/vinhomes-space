// Nhà Đầu Tư Tí Hon — game engine v2 (pure logic, dùng chung cho trình duyệt và mô phỏng Node)
(function (root) {
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e9) / 1e9; }; }
  function shuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const hits = (ev, z) => ev.zones.some(k => k === '*' || k === z.id || (k[0] === '*' && k.slice(1) === z.project));

  function newGame(D, projectId, seed) {
    const r = rng(seed || Date.now()), R = D.rules || {}, p = D.projects.find(x => x.id === projectId);
    const Q = R.quarters || 8;
    const events = shuffle(D.events.filter(e => e.project === '*' || e.project === projectId), r);
    const dQuarters = new Set(shuffle([...Array(Q - 1).keys()].map(i => i + 2), r).slice(0, Math.min(3, Q - 1)));
    const G = {
      D, R, r, p, Q, round: 1, cash: p.startCapital, loan: 0,
      rate: (R.loan && R.loan.interestPctPerQuarter) || 2.5, maxLtv: ((R.loan && R.loan.maxLtvPct) || 50) / 100,
      fee: (R.sellFeePct || 2) / 100,
      zones: D.zones.filter(z => z.project === projectId).map(z => ({ ...z, cur: z.price, last: 0, hist: [z.price] })),
      units: [], events, dilemmas: shuffle(D.dilemmas || [], r), dQuarters,
      ev: null, evTruth: null, revealed: false, dilemma: null, perks: {},
      stats: { trades: 0, usedLoan: false, rent: 0, calls: 0, callRight: 0, boughtThisQ: false, log: [] },
      history: []
    };
    startQuarter(G); return G;
  }
  function zone(G, id) { return G.zones.find(z => z.id === id); }
  function propValue(G) { return G.units.reduce((a, u) => a + zone(G, u.zone).cur, 0); }
  function worth(G) { return G.cash + G.units.reduce((a, u) => a + zone(G, u.zone).cur * (1 - G.fee), 0) - G.loan; }
  function maxBorrow(G) { return Math.max(0, Math.floor((propValue(G) * G.maxLtv - G.loan) / 100) * 100); }

  function startQuarter(G) {
    G.ev = G.events[(G.round - 1) % G.events.length];
    G.evTruth = G.r() < G.ev.reliability; G.revealed = false; G.perks = {}; G.stats.boughtThisQ = false;
    G.dilemma = null; G.w0 = worth(G); // tài sản ròng đầu quý (để tính lời/lỗ quý)
    if (G.dQuarters.has(G.round)) {
      const ok = d => !(['d-quick', 'd-tenant'].includes(d.id) && !G.units.some(u => !locked(G, u)));
      const i = G.dilemmas.findIndex(ok); if (i >= 0) G.dilemma = G.dilemmas.splice(i, 1)[0];
    }
  }
  const locked = (G, u) => u.lockUntil && u.lockUntil > G.round;

  function choose(G, optIdx) {
    const d = G.dilemma; if (!d) return; const e = d.options[optIdx].effect || {}; G.dilemma = null;
    G.stats.log.push(d.id + ':' + optIdx);
    if (e.buyDiscountPct) G.perks.discount = { pct: e.buyDiscountPct, lock: e.lockQuarters || 0 };
    if (e.sellPremiumPct) G.perks.premium = e.sellPremiumPct;
    if (e.rentBonusPct) { // khóa căn giá trị nhất đang tự do
      const u = G.units.filter(x => !locked(G, x)).sort((a, b) => zone(G, b.zone).cur - zone(G, a.zone).cur)[0];
      if (u) { u.rentBonus = e.rentBonusPct; u.lockUntil = G.round + (e.lockQuarters || 0); u.leaseUntil = u.lockUntil; }
    }
    if (e.loanAdd) { G.loan += e.loanAdd; G.cash += e.loanAdd; G.stats.usedLoan = true; }
    if (e.interestPctPerQuarter) G.rate = e.interestPctPerQuarter;
    if (e.cost) G.cash -= e.cost;
    if (e.revealNextEvent) G.revealed = e.revealMode || 'truth';
  }
  function buyPrice(G, z) { return G.perks.discount ? z.cur * (1 - G.perks.discount.pct / 100) : z.cur; }
  function buy(G, id) {
    const z = zone(G, id), price = buyPrice(G, z); if (G.cash < price) return false;
    G.cash -= price; const u = { zone: id, cost: price };
    if (G.perks.discount) { if (G.perks.discount.lock) u.lockUntil = G.round + G.perks.discount.lock; G.perks.discount = null; }
    G.units.push(u); G.stats.trades++; G.stats.boughtThisQ = true; return true;
  }
  function sellValue(G, z) { return z.cur * (1 + (G.perks.premium || 0) / 100) * (1 - G.fee); }
  function sell(G, id) {
    const i = G.units.findIndex(u => u.zone === id && !locked(G, u)); if (i < 0) return false;
    const z = zone(G, id); G.cash += sellValue(G, z); G.perks.premium = 0; G.units.splice(i, 1); G.stats.trades++; return true;
  }
  const LEASE_Q = 2;
  function rent(G, id) { // cho thuê 2 quý (quý này + quý sau): có tiền thuê mỗi quý nhưng không bán được trong thời gian đó
    const u = G.units.find(x => x.zone === id && !locked(G, x) && !x.leaseUntil); if (!u) return false;
    u.lockUntil = G.round + LEASE_Q; u.leaseUntil = G.round + LEASE_Q; return true;
  }
  function borrow(G, amt) { amt = Math.min(amt, maxBorrow(G)); if (amt <= 0) return false; G.loan += amt; G.cash += amt; G.stats.usedLoan = true; return true; }
  function repay(G, amt) { amt = Math.min(amt, G.loan, G.cash); if (amt <= 0) return false; G.loan -= amt; G.cash -= amt; return true; }

  function endQuarter(G) {
    const ev = G.ev, truth = G.evTruth, delta = truth ? ev.change : ev.falseChange;
    // quyết định có đúng hướng không (tính trước khi giá chạy)
    const affected = G.zones.filter(z => hits(ev, z));
    const exposure = G.units.some(u => affected.some(z => z.id === u.zone));
    if (delta !== 0) { G.stats.calls++; if ((delta > 0 && exposure) || (delta < 0 && !exposure)) G.stats.callRight++; }
    // tiền thuê cho căn đang cho thuê
    let rentQ = 0;
    G.units.forEach(u => { if (u.leaseUntil && u.leaseUntil > G.round) { const z = zone(G, u.zone); rentQ += z.cur * (z.rentPctPerQuarter || 0) / 100 * (1 + (u.rentBonus || 0) / 100); } });
    G.cash += rentQ; G.stats.rent += rentQ;
    const interest = G.loan * G.rate / 100; G.cash -= interest;
    // giá chạy
    G.zones.forEach(z => {
      let c = (z.growth || 0) / 4 * 100 + (G.r() - 0.5) * (z.risk || 0) * 10;
      if (hits(ev, z)) c += delta;
      const before = z.cur; z.cur = Math.max(z.price * 0.3, z.cur * (1 + c / 100)); z.last = (z.cur / before - 1) * 100; z.hist.push(z.cur);
    });
    // hết hợp đồng thuê
    G.units.forEach(u => { if (u.leaseUntil && u.leaseUntil <= G.round + 1) { u.leaseUntil = 0; u.rentBonus = 0; } });
    // âm tiền: tự bán căn rẻ nhất đang tự do
    let forced = 0;
    while (G.cash < 0) { const u = G.units.slice().sort((a, b) => zone(G, a.zone).cur - zone(G, b.zone).cur)[0]; if (!u) break; G.cash += zone(G, u.zone).cur * (1 - G.fee); G.units.splice(G.units.indexOf(u), 1); forced++; }
    const res = { ev, truth, delta, rent: rentQ, interest, forced, worth: worth(G), pnl: worth(G) - G.w0 };
    G.history.push(res); G.round++;
    if (G.round <= G.Q) startQuarter(G); else G.done = true;
    return res;
  }
  function result(G) {
    const pct = (worth(G) / G.p.startCapital - 1) * 100, s = G.stats;
    const m = { profitPct: pct, trades: s.trades, usedLoan: s.usedLoan, rentPct: s.rent / G.p.startCapital * 100, rumorCallPct: s.calls ? s.callRight / s.calls * 100 : 0, project: G.p.id };
    const ok = w => (w.maxTrades == null || m.trades <= w.maxTrades) && (w.minTrades == null || m.trades >= w.minTrades) &&
      (w.minProfitPct == null || m.profitPct >= w.minProfitPct) && (w.usedLoan == null || m.usedLoan === w.usedLoan) &&
      (w.minRentPct == null || m.rentPct >= w.minRentPct) && (w.minRumorCallPct == null || m.rumorCallPct >= w.minRumorCallPct) &&
      (w.project == null || m.project === w.project);
    const title = G.D.titles.find(t => ok(t.when || {})) || G.D.titles[G.D.titles.length - 1];
    return { ...m, worth: worth(G), title };
  }
  function revealText(G) { if (!G.revealed) return ''; const d = G.evTruth ? G.ev.change : G.ev.falseChange;
    return G.revealed === 'direction' ? 'quý này giá sẽ ' + (d >= 0 ? 'TĂNG' : 'GIẢM') + ' theo tin' : 'tin này ' + (G.evTruth ? 'là THẬT' : 'là GIẢ'); }
  // tiền thuê dự kiến cho cả thời gian khóa (theo giá hiện tại), có tính thưởng thuê của tình huống
  function rentQuote(G, z, quarters, bonusPct) { return z.cur * (z.rentPctPerQuarter || 0) / 100 * (1 + (bonusPct || 0) / 100) * (quarters == null ? LEASE_Q : quarters); }
  const API = { LEASE_Q, rentQuote, revealText, newGame, zone, worth, propValue, maxBorrow, buy, sell, rent, borrow, repay, choose, endQuarter, result, buyPrice, sellValue, locked, hits };
  if (typeof module !== 'undefined') module.exports = API; else root.Engine = API;
})(this);
