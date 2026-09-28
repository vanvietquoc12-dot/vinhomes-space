// Nhà Đầu Tư Tí Hon — game engine v3 (pure logic, dùng chung cho trình duyệt và mô phỏng Node)
// v3: chọn độ dài ván (8–20 quý), vay thế chấp ngân hàng theo từng căn (rules.mortgage), lãi cơ sở thả nổi,
//     tin "giữa ván" (phase:"mid"), tin đổi lãi cơ sở (baseRateChangePct), phát mãi khi thiếu tiền góp.
// v3.5: tiền mặt được hưởng lãi tiết kiệm rules.deposit12mPctYear (lãi kép theo quý, lãi quý = (1+năm)^(1/4)-1 => đứng ngoài cả ván quy đổi đúng bằng lãi năm).
//       Thứ tự chốt quý: (0) người chơi mua/bán/tình huống trong quý → (1) lãi tiền gửi trên tiền mặt lúc bắt đầu chốt quý (không âm) → (2) tiền thuê
//       → (3) trả góp gốc + lãi → (4) giá chạy → (5) lãi cơ sở / LTV → (6) thiếu tiền (tiền mặt < 0, đã gồm lãi tiền gửi và tiền thuê) thì phát mãi.
// v3.4: E.marketWide (tin ảnh hưởng toàn thị trường), E.lesson (1 câu bài học cuối ván từ số liệu ván), res.acts/res.held để biết mua/bán theo tin nào.
// v3.2: kết quả quý có res.breakdown = lời/lỗ quý tách theo thành phần (giá, thuê, lãi, phát mãi, phạt, phí, ưu đãi, tình huống), đã làm tròn khớp tổng.
(function (root) {
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e9) / 1e9; }; }
  function shuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const hits = (ev, z) => ev.zones.some(k => k === '*' || k === z.id || (k[0] === '*' && k.slice(1) === z.project));
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const r2 = x => Math.round(x * 100) / 100;

  // ---- cấu hình vay (mặc định dùng khi dữ liệu thiếu rules.mortgage) ----
  const MORT_DEFAULT = {
    maxLtvPct: 70, defaultLtvPct: 70, termYearsOptions: [10, 15, 20, 25], defaultTermYears: 20,
    packages: [{ id: 'pkg-default', name: 'Ưu đãi 24 tháng', bank: 'Ngân hàng', promoRatePctYear: 7, promoMonths: 24, floatMarginPct: 3.5 }],
    baseRatePctYear: 6, baseRateMinPct: 5, baseRateMaxPct: 9, baseRateDriftPctPerQuarter: 0,
    prepayPenaltyPctByYear: [3, 2, 1, 0], graceMonths: 0, repayment: 'declining', fireSaleDiscountPct: 12
  };
  function mortRules(D) {
    const m = Object.assign({}, MORT_DEFAULT, (D.rules && D.rules.mortgage) || {});
    if (!Array.isArray(m.packages) || !m.packages.length) m.packages = MORT_DEFAULT.packages;
    if (!Array.isArray(m.termYearsOptions) || !m.termYearsOptions.length) m.termYearsOptions = MORT_DEFAULT.termYearsOptions;
    if (!Array.isArray(m.prepayPenaltyPctByYear) || !m.prepayPenaltyPctByYear.length) m.prepayPenaltyPctByYear = [0];
    m.defaultLtvPct = clamp(m.defaultLtvPct, 0, m.maxLtvPct);
    const lo = Array.isArray(m.ltvOptionsPct) && m.ltvOptionsPct.length ? m.ltvOptionsPct : [0, 30, 50, m.maxLtvPct];
    m.ltvOptionsPct = [...new Set(lo.concat([m.defaultLtvPct]).filter(x => x >= 0 && x <= m.maxLtvPct))].sort((a, b) => a - b);
    return m;
  }
  // lãi tiền gửi mỗi quý (tỷ lệ), 0 nếu dữ liệu không có rules.deposit12mPctYear
  function depositRateQ(D) { const d = D.rules && D.rules.deposit12mPctYear; return d == null || !(d > -100) ? 0 : Math.pow(1 + d / 100, 1 / 4) - 1; }
  function quarterOptions(D) { const R = D.rules || {}, mn = Math.max(8, R.minQuarters || 8); const o = (R.quarterOptions || [8, 12, 16, 20]).filter(q => q >= mn); return o.length ? o : [mn]; }
  const annualize = (pct, Q) => pct <= -100 ? -100 : (Math.pow(1 + pct / 100, 4 / Q) - 1) * 100;

  // ---- lịch tin: tin "mid" nằm ở 1/3 giữa ván; hết tin thì dùng lại nhưng tránh lặp trong ~6 quý ----
  function schedule(evs, Q, r) {
    const mids = shuffle(evs.filter(e => e.phase === 'mid'), r);
    let normal = shuffle(evs.filter(e => e.phase !== 'mid'), r); if (!normal.length) normal = mids.slice();
    const out = new Array(Q).fill(null);
    const nMid = Math.min(mids.length, Q >= 16 ? 2 : 1);
    const lo = Math.floor(Q / 3), hi = Math.ceil(2 * Q / 3) - 1;
    let placed = 0; // mỗi tin mid vào 1 ô trống trong 1/3 giữa, không sớm hơn minQuarter
    for (const e of mids) { if (placed >= nMid) break;
      const slots = shuffle([...Array(Math.max(0, hi - lo + 1)).keys()].map(i => i + lo).filter(s => !out[s] && s >= (e.minQuarter || 1) - 1), r);
      if (slots.length) { out[slots[0]] = e; placed++; } }
    const gap = Math.min(6, Math.max(0, normal.length - 1));
    let pool = normal.slice();
    for (let i = 0; i < Q; i++) {
      if (out[i]) continue;
      if (!pool.length) pool = shuffle(normal, r);
      const recent = new Set(out.slice(Math.max(0, i - gap), i).filter(Boolean).map(e => e.id));
      let k = pool.findIndex(e => !recent.has(e.id)); if (k < 0) k = 0;
      out[i] = pool.splice(k, 1)[0];
    }
    return out;
  }

  function newGame(D, projectId, seed, opts) {
    opts = opts || {};
    const r = rng(seed || Date.now()), R = D.rules || {}, p = D.projects.find(x => x.id === projectId);
    const Q = Math.max(8, opts.quarters || R.quarters || 8);
    const M = mortRules(D);
    const events = D.events.filter(e => e.project === '*' || e.project === projectId);
    const sched = schedule(events, Q, r);
    const dPool = (D.dilemmas || []).concat(R.loanModel === 'legacy' ? [] : (D.mortgageDilemmas || [])); // v3 đọc cả mortgageDilemmas
    const nD = Math.min(dPool.length, R.maxDilemmasPerGame != null ? R.maxDilemmasPerGame : 99, Q <= 8 ? 3 : Math.round(Q / 3));
    const dQuarters = new Set();
    for (let i = 0; i < nD; i++) { const a = 2 + Math.floor(i * (Q - 1) / nD), b = 1 + Math.floor((i + 1) * (Q - 1) / nD); dQuarters.add(a + Math.floor(r() * (b - a + 1))); }
    const G = {
      D, R, r, p, M, Q, totalQ: Q, round: 1, cash: p.startCapital,
      depQ: depositRateQ(D), baseRate: M.baseRatePctYear, fee: (R.sellFeePct || 2) / 100, quietMax: R.quietMaxChangePct != null ? R.quietMaxChangePct : 3, compactMinQ: R.compactMinQuarters != null ? R.compactMinQuarters : 12, ltvCap: null,
      zones: D.zones.filter(z => z.project === projectId).map(z => ({ ...z, cur: z.price, last: 0, hist: [z.price] })),
      units: [], uid: 0, sched, uniqueEvents: events.length, dilemmas: shuffle(dPool, r), dQuarters,
      ev: null, evTruth: null, revealed: false, dilemma: null, perks: {},
      stats: { trades: 0, usedLoan: false, rent: 0, calls: 0, callRight: 0, boughtThisQ: false, log: [], interest: 0, principal: 0, penalties: 0, fireSales: 0, deposit: 0 },
      history: []
    };
    startQuarter(G); return G;
  }
  function zone(G, id) { return G.zones.find(z => z.id === id); }
  function unit(G, uid) { return G.units.find(u => u.uid === uid); }
  function propValue(G) { return G.units.reduce((a, u) => a + zone(G, u.zone).cur, 0); }
  function debt(G) { return G.units.reduce((a, u) => a + (u.loan ? u.loan.bal : 0), 0); }
  function worth(G) { return G.cash + G.units.reduce((a, u) => a + zone(G, u.zone).cur * (1 - G.fee), 0) - debt(G); }
  const locked = (G, u) => u.lockUntil && u.lockUntil > G.round;
  const free = G => G.units.filter(u => !locked(G, u));
  const maxLtv = G => (G.ltvCap && G.ltvCap.until >= G.round ? Math.min(G.M.maxLtvPct, G.ltvCap.pct) : G.M.maxLtvPct);
  function headroom(G, u) { return Math.max(0, Math.floor(zone(G, u.zone).cur * maxLtv(G) / 100 - (u.loan ? u.loan.bal : 0))); }

  const REQ = { freeUnit: G => free(G).length > 0, activeMortgage: G => G.units.some(u => u.loan), mortgageEnabled: () => true };
  const EFFECTS = ['buyDiscountPct', 'lockQuarters', 'sellPremiumPct', 'rentBonusPct', 'loanAdd', 'topUpLoan', 'interestPctPerQuarter', 'marginCutPct', 'cost', 'revealNextEvent', 'revealMode', 'extendPromo', 'graceMonths', 'setTermYears', 'developerSupport'];
  function eligible(G, d) {
    const req = d.requires == null ? [] : [].concat(d.requires);
    if (req.some(k => !REQ[k] || !REQ[k](G))) return false; // yêu cầu lạ => không xếp
    const effs = d.options.map(o => o.effect || {});
    if (effs.some(e => Object.keys(e).some(k => k[0] !== '_' && !EFFECTS.includes(k)))) return false; // effect engine chưa hỗ trợ
    if (effs.some(e => e.extendPromo || e.graceMonths || e.setTermYears) && !G.units.some(u => u.loan)) return false;
    if (effs.some(e => e.rentBonusPct || e.sellPremiumPct) && !free(G).length) return false;
    const top = Math.max(0, ...effs.map(e => e.topUpLoan || e.loanAdd || 0));
    if (top > 0 && !G.units.some(u => headroom(G, u) >= top)) return false;
    return true;
  }
  function startQuarter(G) {
    G.ev = G.sched[G.round - 1];
    G.evTruth = G.r() < G.ev.reliability; G.revealed = false; G.perks = {}; G.stats.boughtThisQ = false;
    G.dilemma = null; G.w0 = worth(G); // tài sản ròng đầu quý (để tính lời/lỗ quý)
    G.qb = { fee: 0, perk: 0, penalty: 0, dilemma: 0 }; G.qa = { buy: [], sell: [] }; // qa: phân khu đã mua/bán trong quý // lời/lỗ phát sinh trong quý do thao tác (xem breakdown)
    if (G.dQuarters.has(G.round)) { const i = G.dilemmas.findIndex(d => eligible(G, d)); if (i >= 0) G.dilemma = G.dilemmas.splice(i, 1)[0]; }
  }

  // ---- khoản vay ----
  function pkgOf(G, id) { return G.M.packages.find(p => p.id === id) || G.M.packages[0]; }
  function newLoan(G, amount, termYears, pkgId, noPromo) {
    const k = pkgOf(G, pkgId);
    return { principal0: amount, bal: amount, termMonths: termYears * 12, termYears, m: 0, pkg: k.id, pkgName: k.name, bank: k.bank || '',
      promoRate: k.promoRatePctYear, promoMonths: noPromo ? 0 : (k.promoMonths || 0), margin: k.floatMarginPct, grace: G.M.graceMonths || 0, style: G.M.repayment === 'annuity' ? 'annuity' : 'declining' };
  }
  const fixedUntil = L => (L.lock ? Math.max(L.promoMonths, L.lock.to) : L.promoMonths);
  const rateAt = (G, L, m) => (m < L.promoMonths ? L.promoRate : (L.lock && m >= L.lock.from && m < L.lock.to ? L.lock.rate : G.baseRate + L.margin)); // %/năm
  function monthStep(G, L, m, bal) {
    const i = rateAt(G, L, m) / 1200, interest = bal * i; let principal = 0;
    if (m >= L.grace) { const n = Math.max(1, L.termMonths - m); principal = L.style === 'annuity' ? (i > 0 ? bal * i / (1 - Math.pow(1 + i, -n)) - interest : bal / n) : bal / n; }
    return { i: interest, p: Math.min(bal, Math.max(0, principal)) };
  }
  // trả góp 1 quý nếu đã thả nổi (lãi cơ sở hiện tại + biên độ, gốc chia đều, bỏ qua ân hạn) — dùng để giữ tiền dự phòng khi mua
  function stressQuarter(G, L) { let bal = L.bal, t = 0; const i = (G.baseRate + L.margin) / 1200;
    for (let k = 0; k < 3 && bal > 1e-9; k++) { const n = Math.max(1, L.termMonths - L.m - k), p = Math.min(bal, bal / n); t += bal * i + p; bal -= p; } return t; }
  const stressAll = G => G.units.reduce((a, u) => a + (u.loan ? stressQuarter(G, u.loan) : 0), 0);
  function preview(G, L, months) { let bal = L.bal, P = 0, I = 0; for (let k = 0; k < months && bal > 1e-9; k++) { const s = monthStep(G, L, L.m + k, bal); P += s.p; I += s.i; bal -= s.p; } return { p: P, i: I, total: P + I }; }
  function quarterPreview(G, u) { return u.loan ? preview(G, u.loan, 3) : { p: 0, i: 0, total: 0 }; }
  function loanRateNow(G, u) { return u.loan ? rateAt(G, u.loan, u.loan.m) : 0; }
  function promoLeftMonths(u) { return u.loan ? Math.max(0, fixedUntil(u.loan) - u.loan.m) : 0; }
  function penaltyPct(G, u) { if (!u.loan) return 0; const a = G.M.prepayPenaltyPctByYear; return a[Math.min(a.length - 1, Math.floor(u.loan.m / 12))] || 0; }
  function payQuarter(G, u) {
    const L = u.loan, fu = fixedUntil(L), wasPromo = L.m < fu; let P = 0, I = 0, from = rateAt(G, L, L.m);
    for (let k = 0; k < 3 && L.bal > 1e-9; k++) { from = rateAt(G, L, L.m); const s = monthStep(G, L, L.m, L.bal); P += s.p; I += s.i; L.bal -= s.p; L.m++; }
    const ended = wasPromo && L.m >= fu && L.bal > 0.5;
    if (L.bal <= 0.5 || L.m >= L.termMonths) { P += Math.max(0, L.bal); L.bal = 0; u.loan = null; }
    return { p: P, i: I, promoEnded: ended, from };
  }

  // ---- mua / bán / cho thuê / trả nợ ----
  function buyPrice(G, z) { return G.perks.discount ? z.cur * (1 - G.perks.discount.pct / 100) : z.cur; }
  const DEV_ID = 'dev-support';
  // khoản vay mới theo lựa chọn; gói DEV_ID = hỗ trợ lãi suất của chủ đầu tư (tình huống developerSupport): lãi KH trả customerRate trong N tháng, có thể ân hạn gốc
  function makeLoan(G, amount, termYears, pkgId) {
    const ds = G.perks.devSupport;
    if (pkgId === DEV_ID && ds) { const L = newLoan(G, amount, termYears, null); Object.assign(L, { pkg: DEV_ID, pkgName: 'Hỗ trợ lãi suất CĐT', bank: 'Chủ đầu tư', promoRate: ds.customerRatePctYear || 0, promoMonths: ds.months || 0 });
      if (ds.grace) L.grace = Math.max(L.grace, ds.months || 0); return L; }
    return newLoan(G, amount, termYears, pkgId);
  }
  function buyQuote(G, id, o) {
    o = o || {}; const z = zone(G, id), M = G.M, ds = G.perks.devSupport;
    const cap = maxLtv(G), ltv = clamp(o.ltvPct != null ? o.ltvPct : M.defaultLtvPct, 0, cap), termYears = o.termYears || M.defaultTermYears;
    const pkgId = o.pkgId != null ? o.pkgId : (ds ? DEV_ID : null), dev = pkgId === DEV_ID && !!ds && ltv > 0, k = dev ? { id: DEV_ID, name: 'Hỗ trợ lãi suất CĐT', bank: 'Chủ đầu tư', promoRatePctYear: ds.customerRatePctYear || 0, promoMonths: ds.months || 0, floatMarginPct: pkgOf(G).floatMarginPct } : pkgOf(G, pkgId);
    const price = buyPrice(G, z) * (dev ? 1 + (ds.priceMarkupPct || 0) / 100 : 1);
    const loan = Math.round(price * ltv / 100), down = price - loan;
    const L = loan > 0 ? makeLoan(G, loan, termYears, k.id) : null, first = L ? preview(G, L, 1) : { p: 0, i: 0, total: 0 }, q1 = L ? preview(G, L, 3) : first;
    // dự phòng: sau khi trả trước phải còn đủ tiền góp 1 quý (mọi khoản vay, tính theo lãi thả nổi sau ưu đãi)
    const rq = M.buyReserveQuarters != null ? M.buyReserveQuarters : 1, reserve = rq * (stressAll(G) + (L ? stressQuarter(G, L) : 0));
    const okDown = G.cash >= down - 1e-9, okRes = G.cash - down >= reserve - 1e-9;
    return { zone: id, price, ltvPct: ltv, maxLtvPct: cap, capped: cap < M.maxLtvPct, termYears, pkg: k, dev, loan, down, reserve, reserveQuarters: rq,
      ok: okDown && okRes, why: !okDown ? 'down' : !okRes ? 'reserve' : '', short: Math.max(0, down + reserve - G.cash),
      firstMonth: first, firstQuarter: q1, promoRate: k.promoRatePctYear, promoMonths: k.promoMonths || 0, margin: k.floatMarginPct, base: G.baseRate, floatRate: G.baseRate + k.floatMarginPct,
      postPromo: postPromo(G, L), cashAfter: G.cash - down, cover: okDown ? coverQuarters(G, L, G.cash - down) : null };
  }
  // v3.6: tiền góp tháng đầu tiên SAU ưu đãi nếu lãi cơ sở giữ nguyên như hiện tại (đúng monthStep mà payQuarter sẽ tính ở tháng fixedUntil)
  function postPromo(G, L) {
    if (!L) return null; const fu = fixedUntil(L); let bal = L.bal, last = null;
    for (let m = L.m; m < fu && bal > 1e-9; m++) { const s = monthStep(G, L, m, bal); last = s; bal -= s.p; }
    if (fu >= L.termMonths || bal <= 0.5) return null;
    const s = monthStep(G, L, Math.max(L.m, fu), bal);
    return { monthly: s.p + s.i, p: s.p, i: s.i, rate: rateAt(G, L, Math.max(L.m, fu)), afterMonths: Math.max(0, fu - L.m), bal, lastPromoMonthly: last ? last.p + last.i : null };
  }
  // v3.6: sau khi trả trước, tiền mặt còn lại đủ góp bao nhiêu quý (mọi khoản vay, theo lịch thật: ưu đãi rồi thả nổi với lãi cơ sở hiện tại;
  // chưa tính tiền thuê/lãi tiền gửi => ước tính thận trọng); tối đa = số quý còn lại của ván (kể cả quý này, vì cuối quý này đã trừ góp)
  function coverQuarters(G, extra, cash) {
    const left = Math.max(0, G.Q - G.round + 1), ls = G.units.filter(u => u.loan).map(u => u.loan).concat(extra ? [extra] : []).map(L => ({ L, m: L.m, bal: L.bal }));
    if (!ls.length) return { n: left, left, loans: 0 };
    let n = 0;
    for (; n < left; n++) { let t = 0;
      for (const x of ls) { if (x.bal <= 0) continue; for (let k = 0; k < 3 && x.bal > 1e-9; k++) { const s = monthStep(G, x.L, x.m, x.bal); t += s.p + s.i; x.bal -= s.p; x.m++; }
        if (x.bal <= 0.5 || x.m >= x.L.termMonths) { t += Math.max(0, x.bal); x.bal = 0; } }
      if (cash < t - 1e-9) break; cash -= t; }
    return { n, left, loans: ls.length };
  }
  // v3.6: các mức LTV được chọn (giống nút trong bảng vay: mốc ≤ trần + đúng trần)
  function ltvOptions(G) { const m = maxLtv(G); return [...new Set(G.M.ltvOptionsPct.filter(x => x <= m).concat([m]))].sort((a, b) => a - b); }
  // v3.6: khi không mua được (thiếu tiền trả trước / dự phòng 1 quý), tìm thiết lập GẦN NHẤT làm buyQuote.ok = true.
  // Ưu tiên: đổi 1 thứ (thời hạn hoặc tỷ lệ vay, ít nấc nhất; hòa thì đổi thời hạn) > đổi cả hai > có đổi gói. Không có => null.
  function buyFix(G, id, o) {
    o = o || {}; const q0 = buyQuote(G, id, o); if (q0.ok) return null;
    const L = ltvOptions(G), T = G.M.termYearsOptions.slice(), P = (G.perks.devSupport ? [DEV_ID] : []).concat(G.M.packages.map(k => k.id));
    const l0 = q0.ltvPct, t0 = q0.termYears, p0 = q0.pkg.id, idx = (a, v) => { const i = a.indexOf(v); return i >= 0 ? i : a.reduce((b, x, j) => (Math.abs(x - v) < Math.abs(a[b] - v) ? j : b), 0); };
    const li = idx(L, l0), ti = idx(T, t0), cands = [];
    for (const l of L) for (const t of T) for (const p of P) {
      const cl = l !== l0, ct = t !== t0, cp = p !== p0; if (!cl && !ct && !cp) continue;
      if (l === 0 && (ct || cp)) continue; // không vay thì thời hạn/gói vô nghĩa
      const d = Math.abs(L.indexOf(l) - li) + Math.abs(T.indexOf(t) - ti);
      cands.push({ ltvPct: l, termYears: t, pkgId: p, changed: { ltv: cl, term: ct, pkg: cp }, cost: (cp ? 100 : 0) + (cl && ct ? 10 : 0) + d + (cl && !ct ? 0.1 : 0) });
    }
    cands.sort((a, b) => a.cost - b.cost);
    for (const c of cands) { const q = buyQuote(G, id, { ltvPct: c.ltvPct, termYears: c.termYears, pkgId: c.pkgId }); if (q.ok) { c.q = q; return c; } }
    return null;
  }
  function buy(G, id, o) {
    const q = buyQuote(G, id, o); if (!q.ok) return false;
    const z = zone(G, id), adj = z.cur - q.price; // mua: tài sản ròng tính căn theo giá trừ phí bán => mất ngay phí; giảm giá (+) / giá cộng thêm của CĐT (−)
    G.qb.fee -= z.cur * G.fee; if (adj >= 0) G.qb.perk += adj; else G.qb.fee += adj;
    G.cash -= q.down; const u = { uid: ++G.uid, zone: id, cost: q.price, boughtRound: G.round, loan: q.loan > 0 ? makeLoan(G, q.loan, q.termYears, q.pkg.id) : null };
    if (q.dev) G.perks.devSupport = null; // hỗ trợ CĐT dùng cho 1 lần mua
    if (G.perks.discount) { if (G.perks.discount.lock) u.lockUntil = G.round + G.perks.discount.lock; G.perks.discount = null; }
    if (u.loan) G.stats.usedLoan = true;
    G.units.push(u); G.stats.trades++; G.stats.boughtThisQ = true; if (G.qa) G.qa.buy.push(id); return u;
  }
  function sellValue(G, z) { return z.cur * (1 + (G.perks.premium || 0) / 100) * (1 - G.fee); }
  function sellQuote(G, u) {
    const z = zone(G, u.zone), gross = sellValue(G, z), bal = u.loan ? u.loan.bal : 0, pen = bal * penaltyPct(G, u) / 100, net = gross - bal - pen;
    return { uid: u.uid, gross, fee: z.cur * (1 + (G.perks.premium || 0) / 100) * G.fee, debt: bal, penalty: pen, penaltyPct: penaltyPct(G, u), net, ok: G.cash + net >= -1e-9 };
  }
  function sellTarget(G, id) { return G.units.filter(u => u.zone === id && !locked(G, u)).sort((a, b) => sellQuote(G, b).net - sellQuote(G, a).net)[0] || null; }
  function sell(G, id) {
    const u = sellTarget(G, id); if (!u) return false; const q = sellQuote(G, u); if (!q.ok) return false;
    G.qb.perk += q.gross - zone(G, id).cur * (1 - G.fee); G.qb.penalty -= q.penalty; // người mua trả thêm (+), phạt tất toán (−)
    G.cash += q.net; G.stats.penalties += q.penalty; G.perks.premium = 0; G.units.splice(G.units.indexOf(u), 1); G.stats.trades++; if (G.qa) G.qa.sell.push(id); return q;
  }
  function prepayQuote(G, uid, amt) {
    const u = unit(G, uid); if (!u || !u.loan) return null; const a = amt >= u.loan.bal - 0.5 ? u.loan.bal : amt, pct /* còn lẻ <= 0,5 tr thì tất toán luôn (trước đây phần lẻ được xóa không trả) */ = penaltyPct(G, u), pen = a * pct / 100;
    return { uid, amount: a, penalty: pen, penaltyPct: pct, total: a + pen, ok: G.cash >= a + pen - 1e-9, full: a >= u.loan.bal - 0.5 };
  }
  function prepay(G, uid, amt) {
    const q = prepayQuote(G, uid, amt); if (!q || !q.ok || q.amount <= 0) return false; const u = unit(G, uid);
    G.cash -= q.total; G.stats.penalties += q.penalty; G.qb.penalty -= q.penalty; u.loan.bal -= q.amount; if (u.loan.bal <= 0.5) u.loan = null; return q;
  }
  const LEASE_Q = 2;
  function rent(G, id) { // cho thuê 2 quý (quý này + quý sau): có tiền thuê mỗi quý nhưng không bán được trong thời gian đó
    const u = G.units.find(x => x.zone === id && !locked(G, x) && !x.leaseUntil); if (!u) return false;
    u.lockUntil = G.round + LEASE_Q; u.leaseUntil = G.round + LEASE_Q; return true;
  }
  function unitRentQ(G, u) { const z = zone(G, u.zone); return z.cur * (z.rentPctPerQuarter || 0) / 100 * (1 + (u.rentBonus || 0) / 100); }
  const leased = (G, u) => u.leaseUntil && u.leaseUntil > G.round;

  function choose(G, optIdx) {
    const d = G.dilemma; if (!d) return; const e = d.options[optIdx].effect || {}; G.dilemma = null;
    G.stats.log.push(d.id + ':' + optIdx);
    if (e.buyDiscountPct) G.perks.discount = { pct: e.buyDiscountPct, lock: e.lockQuarters || 0 };
    if (e.sellPremiumPct) G.perks.premium = e.sellPremiumPct;
    if (e.rentBonusPct) { // khóa căn giá trị nhất đang tự do
      const u = free(G).sort((a, b) => zone(G, b.zone).cur - zone(G, a.zone).cur)[0];
      if (u) { u.rentBonus = e.rentBonusPct; u.lockUntil = G.round + (e.lockQuarters || 0); u.leaseUntil = u.lockUntil; }
    }
    const top = e.topUpLoan || e.loanAdd || 0; // vay thêm thế chấp căn còn hạn mức (dữ liệu cũ: loanAdd)
    if (top > 0) {
      const u = G.units.slice().sort((a, b) => headroom(G, b) - headroom(G, a))[0], amt = u ? Math.min(top, headroom(G, u)) : 0;
      if (amt > 0) { if (u.loan) { u.loan.bal += amt; u.loan.principal0 += amt; } else u.loan = newLoan(G, amt, G.M.defaultTermYears, null, true); G.cash += amt; G.stats.usedLoan = true; e._topUp = { zone: u.zone, amount: amt }; }
    }
    const cut = e.marginCutPct != null ? e.marginCutPct : (e.interestPctPerQuarter != null ? (G.M.legacyRefiMarginCutPct != null ? G.M.legacyRefiMarginCutPct : 1) : 0);
    if (cut) G.units.forEach(u => { if (u.loan) u.loan.margin = Math.max(0, u.loan.margin - cut); });
    if (e.extendPromo) { const x = e.extendPromo; let fee = 0; // khóa lãi cố định thêm N tháng sau kỳ cố định hiện tại
      G.units.forEach(u => { const L = u.loan; if (!L) return; const from = Math.max(L.m, fixedUntil(L)); L.lock = { from, to: from + (x.months || 12), rate: x.promoRatePctYear != null ? x.promoRatePctYear : G.baseRate + L.margin };
        fee += L.bal * (x.feePctOfBalance || 0) / 100; });
      G.cash -= fee; G.stats.penalties += fee; G.qb.dilemma -= fee; e._fee = fee; }
    if (e.developerSupport) G.perks.devSupport = Object.assign({}, e.developerSupport); // áp cho lần mua có vay kế tiếp trong quý
    if (e.graceMonths) G.units.forEach(u => { if (u.loan) u.loan.grace = Math.max(u.loan.grace, u.loan.m + e.graceMonths); }); // ân hạn gốc thêm N tháng từ bây giờ
    if (e.setTermYears) G.units.forEach(u => { const L = u.loan; if (L) { L.termMonths = Math.max(L.m + 12, e.setTermYears * 12); L.termYears = L.termMonths / 12; } }); // tổng thời hạn mới
    if (e.cost) { G.cash -= e.cost; G.qb.dilemma -= e.cost; }
    if (e.revealNextEvent) G.revealed = e.revealMode || 'truth';
  }

  // ---- lời/lỗ quý theo thành phần: làm tròn từng phần (triệu) sao cho tổng đúng bằng số lời/lỗ đã làm tròn ----
  const BD_KEYS = ['gia', 'thue', 'tiengui', 'lai', 'phatmai', 'phat', 'phi', 'uudai', 'tinhhuong', 'khac'];
  const BD_LABEL = { gia: 'giá', thue: 'thuê', tiengui: 'tiền gửi', lai: 'lãi', phatmai: 'phát mãi', phat: 'phạt', phi: 'phí', uudai: 'ưu đãi', tinhhuong: 'tình huống', khac: 'khác' };
  const BD_LOSS_PCT = 5; // hiện dòng tách khi lỗ >= 5% tài sản ròng đầu quý, hoặc có phát mãi / phạt
  function roundParts(vals, total) { // làm tròn theo phần dư lớn nhất: tổng các phần = total
    const r = vals.map(Math.round); let d = total - r.reduce((a, b) => a + b, 0);
    while (d !== 0) { const s = Math.sign(d); let k = -1, best = -Infinity;
      vals.forEach((v, i) => { const x = s * (v - r[i]); if (x > best) { best = x; k = i; } }); r[k] += s; d -= s; }
    return r;
  }
  function breakdown(G, res, raw) {
    raw.khac = res.pnl - Object.values(raw).reduce((a, b) => a + b, 0); // sai số dấu phẩy động (~0)
    const vals = BD_KEYS.map(k => raw[k] || 0), total = Math.round(res.pnl), rr = roundParts(vals, total);
    const parts = BD_KEYS.map((k, i) => ({ key: k, label: BD_LABEL[k], value: vals[i], rounded: rr[i] })).filter(p => p.rounded !== 0);
    const base = G.w0 > 0 ? G.w0 : G.p.startCapital, lossPct = -res.pnl / base * 100;
    const why = res.fireSales.length ? 'fireSale' : parts.some(p => p.key === 'phat') ? 'penalty' : lossPct >= BD_LOSS_PCT ? 'loss' : '';
    return { total, parts, raw, lossPct, why, show: !!why && parts.length >= 2 };
  }
  function endQuarter(G) {
    const ev = G.ev, truth = G.evTruth, delta = truth ? ev.change : ev.falseChange;
    const cur0 = {}; G.zones.forEach(z => { cur0[z.id] = z.cur; }); const held = G.units.map(u => u.zone); // để tách lời/lỗ do giá
    const affected = G.zones.filter(z => hits(ev, z));
    const exposure = G.units.some(u => affected.some(z => z.id === u.zone));
    if (delta !== 0) { G.stats.calls++; if ((delta > 0 && exposure) || (delta < 0 && !exposure)) G.stats.callRight++; }
    // (1) lãi tiền gửi: tiền mặt lúc bắt đầu chốt quý (sau thao tác của người chơi), không tính khi âm
    const depI = Math.max(0, G.cash) * (G.depQ || 0); G.cash += depI; G.stats.deposit += depI;
    // (2) tiền thuê cho căn đang cho thuê
    let rentQ = 0; G.units.forEach(u => { if (u.leaseUntil && u.leaseUntil > G.round) rentQ += unitRentQ(G, u); });
    G.cash += rentQ; G.stats.rent += rentQ;
    // trả góp ngân hàng: 3 tháng gốc + lãi cho mỗi khoản vay
    let P = 0, I = 0; const promoEnds = [];
    G.units.forEach(u => { if (!u.loan) return; const L = u.loan, s = payQuarter(G, u); P += s.p; I += s.i; if (s.promoEnded) promoEnds.push({ uid: u.uid, zone: u.zone, from: s.from, loan: L }); });
    G.cash -= P + I; G.stats.interest += I; G.stats.principal += P;
    // giá chạy
    G.zones.forEach(z => {
      let c = (z.growth || 0) / 4 * 100 + (G.r() - 0.5) * (z.risk || 0) * 10;
      if (hits(ev, z)) c += delta;
      const before = z.cur; z.cur = Math.max(z.price * 0.3, z.cur * (1 + c / 100)); z.last = (z.cur / before - 1) * 100; z.hist.push(z.cur);
    });
    // lãi cơ sở: dao động ngẫu nhiên có biên + tin tức (áp dụng từ quý sau)
    const M = G.M, baseFrom = G.baseRate;
    if (M.baseRateDriftPctPerQuarter > 0) G.baseRate += (G.r() - 0.5) * 2 * M.baseRateDriftPctPerQuarter;
    const baseEvent = truth ? (ev.baseRateChangePct || 0) : (ev.falseBaseRateChangePct || 0);
    G.baseRate = Math.round(clamp(G.baseRate + baseEvent, M.baseRateMinPct, M.baseRateMaxPct) * 10) / 10; // làm tròn 0,1 điểm % cho dễ đọc
    promoEnds.forEach(x => { x.to = rateAt(G, x.loan, x.loan.m); delete x.loan; });
    let ltvCap = null; // trần LTV cho khoản vay mới trong N quý (tin thật)
    if (truth && ev.ltvCapPct != null) { G.ltvCap = { pct: ev.ltvCapPct, until: G.round + (ev.effectQuarters || 1) }; ltvCap = G.ltvCap; }
    // hết hợp đồng thuê
    G.units.forEach(u => { if (u.leaseUntil && u.leaseUntil <= G.round + 1) { u.leaseUntil = 0; u.rentBonus = 0; } });
    // thiếu tiền góp: ngân hàng phát mãi căn (giá thị trường trừ chiết khấu), trả hết nợ căn đó
    const fireSales = [];
    while (G.cash < -1e-9 && G.units.length) {
      // ưu tiên căn rẻ nhất đang tự do đủ bù thiếu hụt; không có thì căn rẻ nhất (kể cả đang cho thuê) đủ bù; không nữa thì căn thu về nhiều nhất
      const opts = G.units.map(u => { const z = zone(G, u.zone), price = z.cur * (1 - (M.fireSaleDiscountPct || 0) / 100), bal = u.loan ? u.loan.bal : 0, pen = bal * penaltyPct(G, u) / 100;
        return { u, z, price, bal, pen, net: price * (1 - G.fee) - bal - pen, busy: locked(G, u) ? 1 : 0 }; }).sort((a, b) => a.busy - b.busy || a.price - b.price);
      const need = -G.cash, pick = opts.find(o => o.net >= need) || opts.slice().sort((a, b) => b.net - a.net)[0];
      if (!pick || pick.net <= 0) break;
      G.cash += pick.net; G.stats.penalties += pick.pen; G.units.splice(G.units.indexOf(pick.u), 1); G.stats.fireSales++;
      fireSales.push({ zone: pick.z.id, name: pick.z.name, market: pick.z.cur, price: pick.price, debt: pick.bal, penalty: pick.pen, net: pick.net });
    }
    // tin có thể đổi lãi cơ sở / hạ LTV (kể cả khi tin giả nên không đổi) luôn hiện popup đầy đủ
    const rateEv = !!(ev.baseRateChangePct || ev.falseBaseRateChangePct) || ev.ltvCapPct != null;
    // popup gọn chỉ ở ván dài (>= compactMinQuarters, mặc định 12), kể cả tin gắn quiet:true; quiet:false thì luôn đầy đủ
    const quietEv = !rateEv && G.Q >= G.compactMinQ && (ev.quiet === true || (ev.quiet !== false && ev.phase !== 'mid' && Math.max(Math.abs(ev.change || 0), Math.abs(ev.falseChange || 0)) <= G.quietMax));
    const res = { ev, truth, delta, rent: rentQ, depositInterest: depI, pay: { p: P, i: I, total: P + I }, promoEnds, baseFrom, baseTo: G.baseRate, baseEvent, ltvCap, fireSales, forced: fireSales.length,
      worth: worth(G), pnl: worth(G) - G.w0, debt: debt(G), round: G.round, marketWide: marketWide(G, ev),
      acts: G.qa ? { buy: G.qa.buy.slice(), sell: G.qa.sell.slice() } : { buy: [], sell: [] }, held: [...new Set(held)] };
    res.quiet = quietEv && !promoEnds.length && !fireSales.length && !ltvCap && Math.abs(res.baseTo - res.baseFrom) < 0.25 && !baseEvent;
    const f = G.fee, qb = G.qb || { fee: 0, perk: 0, penalty: 0, dilemma: 0 };
    res.breakdown = breakdown(G, res, {
      gia: held.reduce((a, id) => a + (zone(G, id).cur - cur0[id]) * (1 - f), 0), // biến động giá căn đang giữ (theo giá trừ phí bán)
      thue: rentQ, tiengui: depI, lai: -I,
      phatmai: -fireSales.reduce((a, x) => a + (x.market - x.price) * (1 - f), 0), // chiết khấu phát mãi
      phat: qb.penalty - fireSales.reduce((a, x) => a + x.penalty, 0), // phạt trả nợ trước hạn (bán, trả bớt, phát mãi)
      phi: qb.fee, uudai: qb.perk, tinhhuong: qb.dilemma });
    G.history.push(res); G.round++;
    if (G.round <= G.Q) startQuarter(G); else G.done = true;
    return res;
  }
  // tin ảnh hưởng toàn thị trường: chạm mọi phân khu của dự án, không nhắm phân khu nào, hoặc tin lãi cơ sở / hạn mức vay (LTV)
  function marketWide(G, ev) {
    ev = ev || G.ev; if (!ev) return false;
    if (ev.baseRateChangePct || ev.falseBaseRateChangePct || ev.ltvCapPct != null) return true;
    if (!ev.zones || !ev.zones.length) return true;
    return G.zones.every(z => hits(ev, z));
  }
  // ---- 1 câu bài học cuối ván, lấy từ số liệu của chính ván đó; ưu tiên:
  // phát mãi > lãi vay ăn >= 30% phần lời trước lãi (hoặc biến lời thành lỗ) > mắc/né tin giả > đứng ngoài (<= 1 giao dịch)
  // (1 giao dịch mà hơn gửi tiết kiệm >= 1,5 điểm/năm thì bỏ qua) > phí mua bán (>= 8 giao dịch) > phạt trả nợ sớm > tiền thuê > lãi tiền gửi (>= 50% phần lời) > giá nhà (mặc định)
  const LESSON = { fewBeatPts: 1.5, depositShare: 0.5, interestShare: 0.3, minInterestPct: 2, fakeMin: 2, activeTrades: 4, fewTrades: 1, feeTrades: 8, minFeePct: 3, minPenPct: 1, rentShare: 0.2, minRentPct: 1 };
  function lesson(G) {
    const L = LESSON, cap = G.p.startCapital, s = G.stats, H = G.history, profit = worth(G) - cap;
    const tr = n => Math.round(Math.abs(n)).toLocaleString('vi-VN') + ' tr', pc = x => Math.round(x * 100) + '%';
    const sum = k => H.reduce((a, h) => a + (h.breakdown ? h.breakdown.raw[k] || 0 : 0), 0);
    const fireN = H.reduce((a, h) => a + h.fireSales.length, 0), fireLoss = -sum('phatmai'), firePen = H.reduce((a, h) => a + h.fireSales.reduce((b, x) => b + (x.penalty || 0), 0), 0);
    const dep = s.deposit, dRate = G.D.rules && G.D.rules.deposit12mPctYear, ann = annualize((worth(G) / cap - 1) * 100, G.Q), pr1 = x => (Math.round(x * 10) / 10).toLocaleString('vi-VN') + '%';
    const dCost = -H.reduce((a, h) => a + (h.breakdown ? h.breakdown.raw.tinhhuong || 0 : 0), 0); // chi phí tình huống cả ván
    const vsDep = dRate == null ? '' : Math.abs(ann - dRate) < 0.05 ? `, chỉ ngang gửi tiết kiệm ${pr1(dRate)}/năm` : ann < dRate ? `, lãi ≈ ${pr1(ann)}/năm, còn kém gửi tiết kiệm ${pr1(dRate)}/năm${dCost >= 0.5 ? ` (tình huống đã tốn ${tr(dCost)})` : ''}` : '';
    const I = s.interest, gross = profit + I, fees = -sum('phi'), pen = -sum('phat') - firePen, rent = s.rent, price = sum('gia');
    // tin giả: mua phân khu được tin tốt nhắc tới / bán phân khu bị tin xấu nhắc tới, rồi tin hóa ra sai => mắc bẫy.
    // né: người chơi chủ động (>= 4 giao dịch) không mua theo tin tốt giả, hoặc đang giữ căn bị tin xấu giả nhắc tới mà không bán
    let fb = 0, fs = 0, db = 0, ds = 0; const active = s.trades >= L.activeTrades;
    H.forEach(h => { if (h.truth || !h.ev.change) return; const A = G.zones.filter(z => hits(h.ev, z)).map(z => z.id), a = h.acts || { buy: [], sell: [] }, held = h.held || [];
      if (h.ev.change > 0) { if (a.buy.some(id => A.includes(id))) fb++; else if (active) db++; }
      else { if (a.sell.some(id => A.includes(id))) fs++; else if (active && held.some(id => A.includes(id))) ds++; } });
    const dodged = db + ds;
    const fell = fb + fs, out = (key, text, v) => ({ key, text, v: v || {} });
    if (fireN) return out('fireSale', `Bị ngân hàng phát mãi ${fireN} căn: mất ${tr(fireLoss)} vì bán tháo dưới giá thị trường${firePen >= 0.5 ? `, thêm ${tr(firePen)} phạt trả nợ sớm` : ''}.`, { n: fireN, loss: fireLoss, penalty: firePen });
    if (I >= cap * L.minInterestPct / 100 && (gross <= 0 || I / gross >= L.interestShare)) {
      if (profit > 0) return out('interest', `Tiền lãi vay đã ăn mất ${tr(I)}, bằng ${pc(I / gross)} phần lời trước lãi.`, { interest: I, gross, share: I / gross });
      if (gross > 0) return out('interest', `Trước lãi vay bạn lời ${tr(gross)}, nhưng ${tr(I)} tiền lãi đã biến ván thành lỗ.`, { interest: I, gross });
      return out('interest', `Chưa tính lãi vay ván đã lỗ, trả thêm ${tr(I)} tiền lãi khiến lỗ nặng hơn.`, { interest: I, gross });
    }
    if (fell >= L.fakeMin) return out('fakeFell', `Bạn mắc bẫy ${fell} tin giả (${[fb ? `mua theo ${fb} tin tốt` : '', fs ? `bán theo ${fs} tin xấu` : ''].filter(Boolean).join(', ')}): hãy xem kỹ nguồn tin trước khi xuống tiền.`, { fell, buy: fb, sell: fs });
    if (dodged >= L.fakeMin && dodged > fell) return out('fakeDodged', `Bạn né được ${dodged} tin giả (${[db ? `không mua theo ${db} tin tốt` : '', ds ? `không bán tháo theo ${ds} tin xấu` : ''].filter(Boolean).join(', ')}).`, { dodged, buy: db, sell: ds, fell });
    // 1 giao dịch mà vẫn hơn gửi tiết kiệm >= 1,5 điểm/năm thì không chê 'đứng ngoài', chuyển sang các câu sau (thuê, tiền gửi, giá)
    if (s.trades === 0 || (s.trades <= L.fewTrades && (dRate == null || ann < dRate + L.fewBeatPts))) return out('fewTrades', s.trades ? `Bạn đứng ngoài quá nhiều: chỉ 1 giao dịch trong ${G.Q} quý${vsDep}.` : (dRate == null ? `Bạn đứng ngoài cả ván: không giao dịch nào, tiền mặt nằm im không sinh lời.` : `Bạn đứng ngoài cả ván: không giao dịch nào${vsDep || ` (≈ ${pr1(ann)}/năm)`}.`), { trades: s.trades, ann, deposit: dep });
    if (s.trades >= L.feeTrades && fees >= cap * L.minFeePct / 100) return out('fees', `${s.trades} giao dịch mua bán đã tốn ${tr(fees)} tiền phí.`, { trades: s.trades, fees });
    if (pen >= cap * L.minPenPct / 100) return out('penalty', `Phạt trả nợ trước hạn đã tốn ${tr(pen)}.`, { penalty: pen });
    if (rent > 0 && (profit > 0 ? rent / profit >= L.rentShare : rent >= cap * L.minRentPct / 100))
      return out('rent', profit > 0 ? `Tiền thuê góp ${tr(rent)}, bằng ${pc(rent / profit)} phần lời của bạn.` : `Tiền thuê ${tr(rent)} đã giúp bù bớt lỗ.`, { rent, profit });
    if (dep > 0 && profit > 0 && dep / profit >= L.depositShare) return out('deposit', `Lãi tiền gửi góp ${tr(dep)}, bằng ${pc(dep / profit)} phần lời: tiền mặt nằm chờ nhiều hơn tiền làm việc.`, { deposit: dep, profit });
    if (Math.round(price) > 0) return out('price', `Giá các căn bạn giữ tăng, mang về ${tr(price)}.`, { price });
    if (Math.round(price) < 0) return out('price', `Giá các căn bạn giữ giảm, làm mất ${tr(price)}.`, { price });
    return out('flat', `Tài sản ròng ${tr(cap)} → ${tr(worth(G))} sau ${G.Q} quý.`, {});
  }
  function result(G) {
    const pct = (worth(G) / G.p.startCapital - 1) * 100, s = G.stats, ann = annualize(pct, G.Q);
    const m = { profitPct: pct, annualPct: ann, overDepositPts: ann - ((G.D.rules || {}).deposit12mPctYear || 0), quarters: G.Q, trades: s.trades, usedLoan: s.usedLoan, rentPct: s.rent / G.p.startCapital * 100, rumorCallPct: s.calls ? s.callRight / s.calls * 100 : 0, project: G.p.id };
    const ok = w => (w.maxTrades == null || m.trades <= w.maxTrades) && (w.minTrades == null || m.trades >= w.minTrades) &&
      (w.minProfitPct == null || m.profitPct >= w.minProfitPct) && (w.minAnnualProfitPct == null || m.annualPct >= w.minAnnualProfitPct) &&
      (w.minOverDepositPts == null || m.overDepositPts >= w.minOverDepositPts) && // điểm %/năm vượt lãi tiết kiệm (cùng đơn vị %/năm)
      (w.usedLoan == null || m.usedLoan === w.usedLoan) &&
      (w.minRentPct == null || m.rentPct >= w.minRentPct) && (w.minRumorCallPct == null || m.rumorCallPct >= w.minRumorCallPct) &&
      (w.project == null || m.project === w.project);
    const title = G.D.titles.find(t => ok(t.when || {})) || G.D.titles[G.D.titles.length - 1];
    return { ...m, worth: worth(G), debt: debt(G), interestPaid: s.interest, depositInterest: s.deposit, penalties: s.penalties, fireSales: s.fireSales, title };
  }
  function revealText(G) { if (!G.revealed) return ''; const d = G.evTruth ? G.ev.change : G.ev.falseChange;
    return G.revealed === 'direction' ? 'quý này giá sẽ ' + (d >= 0 ? 'TĂNG' : 'GIẢM') + ' theo tin' : 'tin này ' + (G.evTruth ? 'là THẬT' : 'là GIẢ'); }
  // tiền thuê dự kiến cho cả thời gian khóa (theo giá hiện tại), có tính thưởng thuê của tình huống
  function rentQuote(G, z, quarters, bonusPct) { return z.cur * (z.rentPctPerQuarter || 0) / 100 * (1 + (bonusPct || 0) / 100) * (quarters == null ? LEASE_Q : quarters); }
  const API = { LEASE_Q, rentQuote, revealText, newGame, zone, unit, worth, debt, propValue, headroom, buy, buyQuote, buyFix, ltvOptions, buyPrice, sell, sellTarget, sellQuote, sellValue,
    prepay, prepayQuote, rent, unitRentQ, leased, choose, endQuarter, result, locked, hits, quarterPreview, loanRateNow, promoLeftMonths, penaltyPct,
    mortRules, quarterOptions, depositRateQ, annualize, schedule, maxLtv, eligible, stressQuarter, DEV_ID, roundParts, BD_LOSS_PCT, marketWide, lesson, LESSON };
  if (typeof module !== 'undefined') module.exports = API; else root.Engine = API;
})(this);
