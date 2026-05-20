// E-PKB Kabupaten Buleleng - Service Worker ringan
// Version: 0.1.4-ADMIN-ROLE-SCOPE-V1
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Tidak melakukan cache agresif pada tahap fondasi agar update index.html tidak tertahan.
});
