// vinhomes.space Worker: tài sản tĩnh như cũ + bộ đếm sự kiện game ẩn danh (D1).
//   POST /api/ev?e=start|finish|zalo|replay[&p=sgp|gp][&q=8|12|16|20]  (hoặc body JSON / form cùng khóa) -> 204
//        start kèm q hợp lệ: đếm thêm 1 dòng e='q<q>' (số ván theo độ dài)
//   GET  /api/stats?days=7                               -> JSON số đếm theo ngày (chỉ tổng hợp)
// Không lưu cookie, IP, user-agent hay ID người chơi. Sự kiện/dự án lạ bị bỏ qua.
import { Room, handleRoom } from './room.js';
export { Room };

const EVENTS = ['start', 'finish', 'zalo', 'replay'];
const PROJECTS = ['sgp', 'gp'];
const LENGTHS = ['8', '12', '16', '20'];
const TZ_OFFSET_MS = 7 * 3600e3; // Asia/Ho_Chi_Minh, không có giờ mùa hè
const ALLOWED_ORIGINS = ['https://vinhomes.space', 'https://www.vinhomes.space'];
const vnDay = (t = Date.now()) => new Date(t + TZ_OFFSET_MS).toISOString().slice(0, 10);

const json = (obj, status = 200) => new Response(JSON.stringify(obj, null, 1), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});
const noContent = () => new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });

async function readParams(request, url) {
  let e = url.searchParams.get('e'), p = url.searchParams.get('p'), q = url.searchParams.get('q');
  if (!e) {
    try {
      const text = (await request.text()).slice(0, 512);
      if (text) {
        let o;
        try { o = JSON.parse(text); } catch { o = Object.fromEntries(new URLSearchParams(text)); }
        if (o && typeof o === 'object') { e = o.e; p = p || o.p; q = q || o.q; }
      }
    } catch { /* bỏ qua body hỏng */ }
  }
  return { e: String(e || ''), p: String(p || ''), q: String(q || '') };
}

async function handleEvent(request, env, url) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return noContent(); // chỉ đếm từ site chính (curl không gửi Origin)
  const { e, p, q } = await readParams(request, url);
  if (!EVENTS.includes(e)) return noContent(); // sự kiện lạ: bỏ qua
  const proj = PROJECTS.includes(p) ? p : '';
  try {
    const up = env.DB.prepare('INSERT INTO ev_daily (day, e, p, n) VALUES (?1, ?2, ?3, 1) ON CONFLICT (day, e, p) DO UPDATE SET n = n + 1'), day = vnDay();
    const st = [up.bind(day, e, proj)];
    if (e === 'start' && LENGTHS.includes(q)) st.push(up.bind(day, 'q' + q, proj));
    await env.DB.batch(st);
  } catch (err) { console.error('ev insert failed', err && err.message); }
  return noContent();
}

async function handleStats(env, url) {
  const days = Math.min(90, Math.max(1, parseInt(url.searchParams.get('days') || '7', 10) || 7));
  const now = Date.now(), list = [];
  for (let i = days - 1; i >= 0; i--) list.push(vnDay(now - i * 86400e3));
  const { results } = await env.DB.prepare('SELECT day, e, p, n FROM ev_daily WHERE day >= ?1 ORDER BY day').bind(list[0]).all();
  const blank = () => Object.fromEntries(EVENTS.map(k => [k, 0]));
  const byDay = Object.fromEntries(list.map(d => [d, { day: d, ...blank(), byProject: Object.fromEntries(PROJECTS.map(k => [k, blank()])) }]));
  const totals = { ...blank(), byProject: Object.fromEntries(PROJECTS.map(k => [k, blank()])) };
  const startByLength = Object.fromEntries(LENGTHS.map(k => [k, 0]));
  for (const r of results || []) {
    const d = byDay[r.day]; if (!d) continue;
    if (/^q\d+$/.test(r.e) && LENGTHS.includes(r.e.slice(1))) { startByLength[r.e.slice(1)] += r.n; d.startByLength = d.startByLength || {}; d.startByLength[r.e.slice(1)] = (d.startByLength[r.e.slice(1)] || 0) + r.n; continue; }
    if (!EVENTS.includes(r.e)) continue;
    d[r.e] += r.n; totals[r.e] += r.n;
    if (PROJECTS.includes(r.p)) { d.byProject[r.p][r.e] += r.n; totals.byProject[r.p][r.e] += r.n; }
  }
  return json({ tz: 'Asia/Ho_Chi_Minh', days, from: list[0], to: list[list.length - 1], totals, startByLength, daily: list.map(d => byDay[d]) });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/ev') return handleEvent(request, env, url);
    if (url.pathname === '/api/stats') {
      if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method Not Allowed', { status: 405, headers: { allow: 'GET' } });
      try { return await handleStats(env, url); } catch (err) { return json({ error: 'stats unavailable' }, 500); }
    }
    if (url.pathname === '/room-api' || url.pathname.startsWith('/room-api/')) return handleRoom(request, env);
    if (url.pathname.startsWith('/api/')) return json({ error: 'not found' }, 404);
    return env.ASSETS.fetch(request); // mọi thứ khác: tài sản tĩnh, giữ nguyên 404-page / auto-trailing-slash
  },
};
