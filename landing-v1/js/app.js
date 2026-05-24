import { APP_CONFIG } from './config.js';
import { initRouter } from './router.js';
import { initPwaInstall } from './pwaInstall.js';

function qs(selector) {
  return document.querySelector(selector);
}

function setText(selector, value) {
  const el = qs(selector);
  if (el) el.textContent = value;
}

function setConnectionStatus() {
  const el = qs('[data-connection-status]');
  if (!el) return;

  const isOnline = navigator.onLine;
  el.className = 'badge ' + (isOnline ? 'badge--online' : 'badge--offline');
  el.textContent = isOnline ? 'Online' : 'Offline';
}

function applySavedTheme() {
  const saved = localStorage.getItem('epkb_landing_theme') || 'light';
  document.body.classList.toggle('dark', saved === 'dark');
}

function bindThemeToggle() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;

    const nextDark = !document.body.classList.contains('dark');
    document.body.classList.toggle('dark', nextDark);
    localStorage.setItem('epkb_landing_theme', nextDark ? 'dark' : 'light');
  });
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    setText('[data-update-status]', 'Service worker tidak didukung browser ini');
    const badge = qs('[data-update-badge]');
    if (badge) badge.textContent = 'SW tidak tersedia';
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(APP_CONFIG.SERVICE_WORKER_PATH, { scope: './' });
    setText('[data-update-status]', 'Service worker aktif pada folder landing-v1');
    const badge = qs('[data-update-badge]');
    if (badge) badge.textContent = 'SW aktif';

    registration.addEventListener('updatefound', () => {
      setText('[data-update-status]', 'Update landing page sedang disiapkan');
      const worker = registration.installing;
      if (!worker) return;

      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
          setText('[data-update-status]', navigator.serviceWorker.controller ? 'Update tersedia. Muat ulang halaman.' : 'Landing page siap digunakan offline ringan.');
        }
      });
    });
  } catch (error) {
    console.warn('[E-PKB Landing] Service worker gagal didaftarkan:', error);
    setText('[data-update-status]', 'Service worker gagal didaftarkan');
    const badge = qs('[data-update-badge]');
    if (badge) badge.textContent = 'SW gagal';
  }
}

function bindUpdateCheck() {
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState !== 'visible') return;
    if (!navigator.serviceWorker) return;

    try {
      const registration = await navigator.serviceWorker.getRegistration('./');
      if (registration) registration.update();
    } catch (error) {
      console.warn('[E-PKB Landing] Cek update gagal:', error);
    }
  });
}

function initRuntimeStatus() {
  setConnectionStatus();
  setText('[data-app-version]', APP_CONFIG.APP_VERSION);
  setText('[data-footer-version]', APP_CONFIG.APP_VERSION);

  window.addEventListener('online', setConnectionStatus);
  window.addEventListener('offline', setConnectionStatus);
}

document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  initRouter(APP_CONFIG);
  initRuntimeStatus();
  initPwaInstall();
  bindThemeToggle();
  bindUpdateCheck();
  registerServiceWorker();
});
