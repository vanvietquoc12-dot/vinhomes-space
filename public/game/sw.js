/* Vỏ game thôi. Không nhớ phòng đấu (/room-api) và không nhớ API thống kê. */
const CACHE = 'van-dau-tu-shell-v2';
const SHELL = [
  './',
  './index.html',
  './engine.js',
  './data/game-data.json',
  './manifest.webmanifest',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function shellPath(url) {
  const path = new URL(url).pathname;
  return SHELL.some((item) => {
    const full = new URL(item, self.registration.scope).pathname;
    return path === full;
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes('/room-api') || url.pathname.startsWith('/api/')) return;
  if (!shellPath(req.url)) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(new Request(url.pathname), copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
