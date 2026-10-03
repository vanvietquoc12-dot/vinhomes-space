// Phòng đấu trên Durable Object. Một object cho mỗi mã 4 số.
// Giữ seed, đồng hồ, và việc đã chốt. Không mô phỏng sổ của ai.
const PROJECTS = new Set(['sgp', 'gp']);
const QUARTERS = new Set([8, 12, 16, 20]);
const INCOMES = new Set(['inc-80', 'inc-150', 'inc-400']);
const CLOCK_DEFAULT = 60;
const LOBBY_IDLE_MS = 2 * 60 * 60 * 1000;

const cors = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'access-control-allow-methods': 'GET,POST,OPTIONS',
  'cache-control': 'no-store',
};
const send = (status, obj) => new Response(JSON.stringify(obj), { status, headers: cors });

function randCode() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return String(1000 + (a[0] % 9000));
}
function token() {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  return [...b].map(x => x.toString(16).padStart(2, '0')).join('');
}
function clockOf(raw) {
  const n = +raw;
  if (Number.isFinite(n) && n >= 1 && n <= CLOCK_DEFAULT) return Math.round(n);
  return CLOCK_DEFAULT;
}
function pidOf(room, tok) {
  if (room.p1 && room.p1.token === tok) return 'p1';
  if (room.p2 && room.p2.token === tok) return 'p2';
  return null;
}
function replaceable(room, now) {
  if (!room) return true;
  if (room.phase === 'done') return true;
  if (room.phase === 'lobby' && now - (room.touched || 0) >= LOBBY_IDLE_MS) return true;
  return false;
}
function maybeTimeout(room, now) {
  if (room.phase === 'play' && room.deadline && now >= room.deadline) advance(room, now);
}
function advance(room, now) {
  room.history.push({
    quarter: room.quarter,
    actions: { p1: room.actions.p1.slice(), p2: room.actions.p2.slice() },
    ready: { p1: !!room.ready.p1, p2: !!room.ready.p2 },
    cause: (room.ready.p1 && room.ready.p2) ? 'both' : 'timeout',
  });
  room.actions = { p1: [], p2: [] };
  room.ready = { p1: false, p2: false };
  room.quarter += 1;
  if (room.quarter > room.quarters) {
    room.phase = 'scoring';
    room.deadline = 0;
  } else {
    room.deadline = now + room.max * 1000;
  }
}
function winnerOf(room) {
  const a = room.worth.p1, b = room.worth.p2;
  if (a == null || b == null) return null;
  if (a > b + 1e-6) return 'p1';
  if (b > a + 1e-6) return 'p2';
  return 'tie';
}
function view(room, pid, now) {
  maybeTimeout(room, now);
  const opp = pid === 'p1' ? 'p2' : 'p1';
  const secs = room.phase === 'play' && room.deadline ? Math.max(0, Math.ceil((room.deadline - now) / 1000)) : room.max;
  return {
    code: room.code,
    phase: room.phase,
    project: room.project,
    quarters: room.quarters,
    income: room.income,
    seed: room.phase === 'lobby' ? null : room.seed,
    players: room.p2 ? 2 : 1,
    you: pid,
    quarter: room.quarter,
    secs,
    max: room.max,
    deadline: room.phase === 'play' ? room.deadline : 0,
    youReady: !!room.ready[pid],
    oppReady: !!(room.p2 && room.ready[opp]),
    worth: { p1: room.worth.p1, p2: room.worth.p2 },
    books: { p1: room.books.p1, p2: room.books.p2 },
    winner: room.winner,
    startCapital: room.startCapital,
  };
}
function makeRoom(code, body, now) {
  const project = PROJECTS.has(body.project) ? body.project : [...PROJECTS][0];
  const quarters = QUARTERS.has(+body.quarters) ? +body.quarters : 8;
  const income = INCOMES.has(body.income) ? body.income : [...INCOMES].slice(-1)[0];
  return {
    code, project, quarters, income, max: clockOf(body.clockSeconds),
    phase: 'lobby', seed: null, quarter: 1, deadline: 0, touched: now,
    p1: { token: token() }, p2: null,
    ready: { p1: false, p2: false },
    actions: { p1: [], p2: [] },
    history: [],
    worth: { p1: null, p2: null },
    books: { p1: null, p2: null },
    winner: null, startCapital: null,
  };
}
async function readJson(request) {
  const text = await request.text();
  if (!text) return {};
  return JSON.parse(text.slice(0, 100000));
}

export class Room {
  constructor(ctx) {
    this.ctx = ctx;
  }
  fetch(request) {
    return this.ctx.blockConcurrencyWhile(() => this.#handle(request));
  }
  async #handle(request) {
    if (request.method === 'OPTIONS') return send(204, {});
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const code = parts[2];
    if (parts[0] !== 'room-api' || parts[1] !== 'rooms' || !code) return send(404, { error: 'no-room' });
    const now = Date.now();
    let room = await this.ctx.storage.get('room');
    if (request.method === 'POST' && parts.length === 3 && request.headers.get('x-room-claim') === '1') {
      if (!replaceable(room, now)) return send(409, { error: 'occupied' });
      let body = {};
      try { body = await readJson(request); } catch { return send(400, { error: 'json' }); }
      room = makeRoom(code, body, now);
      await this.ctx.storage.put('room', room);
      return send(200, Object.assign({ token: room.p1.token }, view(room, 'p1', now)));
    }
    if (!room || room.code !== code) return send(404, { error: 'no-room' });
    try {
      if (request.method === 'POST' && parts.length === 4 && parts[3] === 'join') {
        if (room.phase !== 'lobby') return send(409, { error: 'started' });
        if (room.p2) return send(409, { error: 'full' });
        room.p2 = { token: token() };
        room.touched = now;
        await this.ctx.storage.put('room', room);
        return send(200, Object.assign({ token: room.p2.token }, view(room, 'p2', now)));
      }
      const body = request.method === 'POST' ? await readJson(request) : {};
      const tok = body.token || url.searchParams.get('token');
      const pid = pidOf(room, tok);
      if (!pid) return send(403, { error: 'token' });
      const action = parts[3] || '';
      const finish = async (status, obj) => {
        room.touched = now;
        await this.ctx.storage.put('room', room);
        return send(status, obj);
      };
      if (request.method === 'GET' && !action) return finish(200, view(room, pid, now));
      if (request.method === 'GET' && action === 'history') {
        maybeTimeout(room, now);
        return finish(200, { history: room.history, worth: room.worth, winner: room.winner, seed: room.seed });
      }
      if (request.method === 'POST' && action === 'settings') {
        if (pid !== 'p1' || room.phase !== 'lobby' || room.p2) return finish(403, { error: 'locked' });
        if (PROJECTS.has(body.project)) room.project = body.project;
        if (QUARTERS.has(+body.quarters)) room.quarters = +body.quarters;
        if (INCOMES.has(body.income)) room.income = body.income;
        return finish(200, view(room, pid, now));
      }
      if (request.method === 'POST' && action === 'start') {
        if (pid !== 'p1' || room.phase !== 'lobby' || !room.p2) return finish(409, { error: 'not-ready' });
        room.seed = Number.isFinite(+body.seed) ? ((+body.seed >>> 0) || 1) : ((now >>> 0) || 1);
        room.phase = 'play';
        room.quarter = 1;
        room.deadline = now + room.max * 1000;
        return finish(200, view(room, pid, now));
      }
      if (request.method === 'POST' && action === 'act') {
        maybeTimeout(room, now);
        if (room.phase !== 'play' || room.ready[pid] || +body.quarter !== room.quarter) return finish(409, view(room, pid, now));
        const kind = String(body.kind || '');
        if (!['buy', 'sell', 'rent', 'prepay', 'choose'].includes(kind)) return finish(400, { error: 'kind' });
        room.actions[pid].push({ kind, a: body.a, b: body.b, t: now });
        return finish(200, view(room, pid, now));
      }
      if (request.method === 'POST' && action === 'chot') {
        maybeTimeout(room, now);
        const ok = room.phase === 'play' && +body.quarter === room.quarter;
        if (ok) room.ready[pid] = true;
        if (room.phase === 'play' && room.ready.p1 && room.ready.p2) advance(room, Date.now());
        return finish(200, view(room, pid, now));
      }
      if (request.method === 'POST' && action === 'worth') {
        if (typeof body.worth === 'number' && Number.isFinite(body.worth)) room.worth[pid] = body.worth;
        if (typeof body.start === 'number') room.startCapital = body.start;
        const cash = +body.cash, units = +body.units, debt = +body.debt;
        const holds = Array.isArray(body.holds) ? body.holds.slice(0, 24).map(h => {
          const price = +h.price, name = String(h && h.name || '').replace(/[\x00-\x1f]/g, '').slice(0, 80);
          return name && Number.isFinite(price) ? { name, price } : null;
        }).filter(Boolean) : [];
        const fee = +body.fee;
        if ([cash, units, debt].every(Number.isFinite) && units >= 0 && units <= 99) {
          room.books[pid] = { cash, units: Math.round(units), debt, holds, fee: Number.isFinite(fee) && fee > 0 ? fee : 0 };
        }
        room.winner = winnerOf(room);
        if (room.winner && room.phase === 'scoring') room.phase = 'done';
        return finish(200, view(room, pid, now));
      }
      return send(404, { error: 'no' });
    } catch (e) {
      return send(500, { error: String(e && e.message || e) });
    }
  }
}

export async function handleRoom(request, env) {
  const url = new URL(request.url);
  if (request.method === 'OPTIONS') return send(204, {});
  if (!env.ROOMS) return send(503, { error: 'no-binding' });
  const parts = url.pathname.split('/').filter(Boolean);
  if (request.method === 'POST' && parts.length === 2 && parts[1] === 'rooms') {
    let raw = '';
    try { raw = (await request.text()).slice(0, 100000); } catch { return send(400, { error: 'json' }); }
    for (let i = 0; i < 50; i++) {
      const code = randCode();
      const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
      const res = await stub.fetch('https://room.internal/room-api/rooms/' + code, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-room-claim': '1' },
        body: raw,
      });
      if (res.status === 409) continue;
      return res;
    }
    return send(503, { error: 'busy' });
  }
  const code = parts[2];
  if (parts[1] !== 'rooms' || !/^[0-9]{4}$/.test(code || '')) return send(404, { error: 'no-room' });
  const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
  const headers = new Headers(request.headers);
  headers.delete('x-room-claim');
  const inner = new URL(request.url);
  inner.hostname = 'room.internal';
  inner.protocol = 'https:';
  return stub.fetch(new Request(inner, { method: request.method, headers, body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body }));
}
