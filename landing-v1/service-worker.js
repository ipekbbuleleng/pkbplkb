// E-PKB Kabupaten Buleleng - Landing Page Service Worker
// Scope aman: hanya folder /landing-v1/
// Version: 0.1.9-LANDING-PUBLIC-V1-SAFE

const CACHE_NAME = 'epkb-landing-public-v1-safe-20260524';
const PUBLIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './js/config.js',
  './js/app.js',
  './js/router.js',
  './js/pwaInstall.js',
  './js/views/landingView.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png'
];

function isSensitiveOrApiRequest(request) {
  const url = new URL(request.url);

  if (request.method !== 'GET') return true;
  if (request.headers.has('authorization')) return true;

  const href = url.href.toLowerCase();
  const search = url.search.toLowerCase();
  const pathname = url.pathname.toLowerCase();

  return (
    href.includes('script.google.com') ||
    href.includes('googleusercontent.com') ||
    pathname.includes('/exec') ||
    search.includes('action=') ||
    search.includes('token=') ||
    search.includes('session=') ||
    search.includes('password=')
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PUBLIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('epkb-landing-public-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (isSensitiveOrApiRequest(request)) {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
