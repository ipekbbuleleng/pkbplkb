import { renderLandingView } from './views/landingView.js';

const ROUTES = Object.freeze({
  '': renderLandingView,
  '#/': renderLandingView,
  '#/landing': renderLandingView
});

export function initRouter(config) {
  const outlet = document.getElementById('app');
  if (!outlet) {
    throw new Error('Outlet #app tidak ditemukan.');
  }

  const render = () => {
    const hash = window.location.hash || '';
    const view = ROUTES[hash] || renderLandingView;
    outlet.innerHTML = view(config);
  };

  window.addEventListener('hashchange', render);
  render();
}
