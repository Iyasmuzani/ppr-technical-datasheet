// Rucika TechSheet — Hash-based SPA Router
const Router = {
  routes: {},
  currentRoute: null,

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];

    // Find exact match or fallback to '/'
    const handler = this.routes[path] || this.routes['/'];
    if (handler) {
      this.currentRoute = path;
      // Update active nav
      document.querySelectorAll('.nav-item').forEach(el => {
        const route = el.dataset.route;
        el.classList.toggle('active', route === path);
      });
      handler();
    }
  },

  init() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },

  getQueryParams() {
    const hash = window.location.hash.slice(1);
    const qIdx = hash.indexOf('?');
    if (qIdx < 0) return {};
    const params = new URLSearchParams(hash.slice(qIdx));
    const obj = {};
    params.forEach((v, k) => obj[k] = v);
    return obj;
  }
};

export default Router;
