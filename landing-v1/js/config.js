export const APP_CONFIG = Object.freeze({
  APP_NAME: 'E-PKB Kabupaten Buleleng',
  APP_SHORT_NAME: 'E-PKB',
  APP_VERSION: '0.1.9-LANDING-PUBLIC-V1-SAFE',
  APP_ENV: 'public-landing',
  COPYRIGHT_YEAR: '2026',

  // Aman untuk paket drop-in:
  // - Landing page berada di /landing-v1/
  // - Aplikasi aktif lama tetap berada di root repository: ../index.html
  // - Tidak ada Spreadsheet ID, APP_SECRET, token permanen, atau endpoint data PKB di file ini.
  ACTIVE_APP_URL: '../index.html',

  HELP_TITLE: 'Butuh bantuan akses?',
  HELP_TEXT: 'Jika lupa password atau mengalami kendala masuk aplikasi, hubungi admin kecamatan/kabupaten sesuai kewenangan.',

  SERVICE_WORKER_PATH: './service-worker.js',

  HEALTH_CHECK: Object.freeze({
    ENABLED: false,
    URL: '',
    TIMEOUT_MS: 1800
  })
});
