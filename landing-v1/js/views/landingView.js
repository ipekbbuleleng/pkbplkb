function featureCard(icon, title, text) {
  return `
    <article class="card feature-card">
      <div class="feature-card__icon" aria-hidden="true">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `;
}

function statusRow(label, valueHtml) {
  return `
    <div class="status-row">
      <div class="status-row__label">${label}</div>
      <div class="status-row__value">${valueHtml}</div>
    </div>
  `;
}

export function renderLandingView(config) {
  const appName = config.APP_NAME;
  const appVersion = config.APP_VERSION;
  const appUrl = config.ACTIVE_APP_URL || '../index.html';

  return `
    <header class="app-header">
      <div class="app-header__inner">
        <a class="brand" href="./" aria-label="${appName}">
          <div class="brand__mark" aria-hidden="true">E</div>
          <div class="brand__text">
            <div class="brand__title">${appName}</div>
            <div class="brand__subtitle">Portal awal aplikasi PKB Kabupaten Buleleng</div>
          </div>
        </a>

        <div class="header-actions">
          <button class="icon-button" type="button" data-theme-toggle aria-label="Ubah mode tampilan" title="Mode terang/gelap">◐</button>
          <a class="button button--secondary" href="${appUrl}">Masuk</a>
        </div>
      </div>
    </header>

    <main class="main">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__content">
          <div class="eyebrow">PWA Publik Ringan · E-PKB Buleleng</div>
          <h1 id="hero-title">Gerbang resmi E-PKB Kabupaten Buleleng.</h1>
          <p>
            E-PKB membantu pengelolaan profil PKB, wilayah binaan, laporan kegiatan,
            target dan capaian, serta notifikasi tugas secara bertahap dan aman.
          </p>

          <div class="hero__actions">
            <a class="button button--primary" href="${appUrl}" data-open-app-button>
              Masuk Aplikasi
              <span aria-hidden="true">→</span>
            </a>
            <button class="button button--ghost" type="button" data-install-button disabled>
              Install Aplikasi
            </button>
          </div>

          <div class="hero__note">
            <span aria-hidden="true">ⓘ</span>
            <span>
              Halaman ini tidak memuat dashboard, target, capaian, atau data PKB.
              Data hanya dibuka setelah login dan session dinyatakan valid.
            </span>
          </div>
        </div>

        <aside class="hero__panel" aria-label="Ringkasan portal">
          <div class="preview-card">
            <div class="preview-card__top">
              <div>
                <div class="preview-card__title">Status Portal</div>
                <div class="preview-card__subtitle">Siap sebagai halaman awal publik</div>
              </div>
              <span class="badge badge--neutral" data-update-badge>Memuat</span>
            </div>

            <div class="kpi-grid">
              <div class="kpi">
                <div class="kpi__label">Akses data</div>
                <div class="kpi__value">Login</div>
                <div class="kpi__caption">Data PKB setelah session valid</div>
              </div>
              <div class="kpi">
                <div class="kpi__label">Mode halaman</div>
                <div class="kpi__value">Public</div>
                <div class="kpi__caption">Tanpa data sensitif</div>
              </div>
              <div class="kpi">
                <div class="kpi__label">PWA</div>
                <div class="kpi__value">Siap</div>
                <div class="kpi__caption">Manifest dan service worker ringan</div>
              </div>
              <div class="kpi">
                <div class="kpi__label">Performa</div>
                <div class="kpi__value">Ringan</div>
                <div class="kpi__caption">Tanpa chart/map library</div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section class="section" aria-labelledby="feature-title">
        <div class="section__header">
          <div>
            <h2 id="feature-title">Fitur yang disiapkan</h2>
            <p>Ringkasan fungsi yang akan dikembangkan di dalam aplikasi setelah pengguna masuk.</p>
          </div>
        </div>

        <div class="feature-grid">
          ${featureCard('👤', 'Profil PKB', 'Pengelolaan identitas, kontak, kepegawaian, dan status profil PKB.')}
          ${featureCard('📍', 'Wilayah Binaan', 'Pemetaan wilayah binaan sebagai dasar target, capaian, dan monitoring.')}
          ${featureCard('🎯', 'Target dan Capaian', 'Pemantauan target program dan ringkasan capaian setelah login.')}
          ${featureCard('📝', 'Laporan PKB', 'Pencatatan kegiatan PKB secara bertahap melalui formulir aplikasi.')}
          ${featureCard('🔔', 'Notifikasi Tugas', 'Informasi tugas atau arahan dari admin sesuai kewenangan.')}
          ${featureCard('🔗', 'Integrasi TPK', 'Integrasi ringkasan dengan TPK dapat disiapkan setelah kebutuhan final ditetapkan.')}
        </div>
      </section>

      <section class="section" aria-labelledby="status-title">
        <div class="section__header">
          <div>
            <h2 id="status-title">Status aplikasi</h2>
            <p>Status ringan yang dibaca dari perangkat dan konfigurasi lokal.</p>
          </div>
        </div>

        <div class="status-layout">
          <div class="status-panel">
            <div class="status-list">
              ${statusRow('Koneksi', '<span class="badge badge--neutral" data-connection-status>Memuat</span>')}
              ${statusRow('Versi aplikasi', `<span data-app-version>${appVersion}</span>`)}
              ${statusRow('Status update', '<span data-update-status>Menunggu service worker</span>')}
              ${statusRow('Install PWA', '<span data-install-hint>Tombol install akan aktif jika browser mendukung.</span>')}
            </div>
          </div>

          <div class="help-panel">
            <h3>${config.HELP_TITLE}</h3>
            <p>${config.HELP_TEXT}</p>
            <a class="button button--secondary" href="${appUrl}">Buka Halaman Login</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="app-footer">
      <div class="app-footer__inner">
        <div>
          <span class="footer-brand">${appName}</span>
          <span class="small-muted"> · Landing Page Publik</span>
        </div>
        <div>Versi: <span data-footer-version>${appVersion}</span></div>
      </div>
    </footer>
  `;
}
