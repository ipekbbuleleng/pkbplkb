// E-PKB Kabupaten Buleleng - Service Worker ringan
// Version: 0.2.5-LAPOR-KEGIATAN-PKB-V1-R5
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Tidak melakukan cache agresif pada tahap fondasi agar update index.html tidak tertahan.
});
