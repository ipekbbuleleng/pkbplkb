let deferredInstallPrompt = null;

function getInstallButton() {
  return document.querySelector('[data-install-button]');
}

function getInstallHint() {
  return document.querySelector('[data-install-hint]');
}

function setInstallState(message, isReady) {
  const btn = getInstallButton();
  const hint = getInstallHint();

  if (btn) {
    btn.disabled = !isReady;
    btn.dataset.ready = isReady ? '1' : '0';
  }

  if (hint && message) {
    hint.textContent = message;
  }
}

export function initPwaInstall() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    setInstallState('Aplikasi siap diinstal pada perangkat ini.', true);
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    setInstallState('Aplikasi sudah terpasang pada perangkat ini.', false);
  });

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-install-button]');
    if (!button) return;

    if (!deferredInstallPrompt) {
      setInstallState('Jika tombol install belum aktif, gunakan menu browser lalu pilih “Install app” atau “Add to Home screen”.', false);
      return;
    }

    button.disabled = true;

    try {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
    } finally {
      deferredInstallPrompt = null;
      setInstallState('Jika belum terpasang, buka menu browser lalu pilih “Install app” atau “Add to Home screen”.', false);
    }
  });

  setInstallState('Tombol install akan aktif jika browser mendukung instalasi PWA.', false);
}
