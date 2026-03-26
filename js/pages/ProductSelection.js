// Rucika TechSheet — Product Selection Page
import PRODUCTS from '../data/products.js?v=1';
import { debounce } from '../utils/helpers.js';

export default function ProductSelection() {
  const container = document.getElementById('page-content');
  let activeCategory = 'ppr-pipe';
  let searchQuery = '';
  let filterPN = '';

  function getFiltered() {
    let items = PRODUCTS.items.filter(p => p.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.pnRating.toLowerCase().includes(q) ||
        p.sizeRange.toLowerCase().includes(q)
      );
    }
    if (filterPN) {
      items = items.filter(p => p.pnRating === filterPN);
    }
    return items;
  }

  function render() {
    const items = getFiltered();

    container.innerHTML = `
      <div class="header__breadcrumb" style="margin-bottom: var(--space-lg);">
        <a href="#/">Dashboard</a>
        <span class="separator">›</span>
        <span class="current">Product Selection</span>
      </div>

      <h1 style="margin-bottom: var(--space-lg);">Product Selection</h1>

      <div class="filter-bar">
        <div class="filter-bar__search">
          <span class="filter-bar__search-icon">🔍</span>
          <input type="text" class="filter-bar__search-input" id="product-search"
            placeholder="Search products, sizes..." value="${searchQuery}">
        </div>
        <select class="filter-bar__select" id="filter-pn">
          <option value="">All Pressure Ratings</option>
          <option value="PN10" ${filterPN === 'PN10' ? 'selected' : ''}>PN 10</option>
          <option value="PN16" ${filterPN === 'PN16' ? 'selected' : ''}>PN 16</option>
          <option value="PN20" ${filterPN === 'PN20' ? 'selected' : ''}>PN 20</option>
        </select>
      </div>

      <div style="display: grid; grid-template-columns: 240px 1fr; gap: var(--space-xl);">
        <div class="card" style="align-self: start;">
          <div class="card__header">
            <h4 class="card__title">Categories</h4>
          </div>
          <div class="card__body" style="padding: var(--space-sm);">
            <div class="category-list">
              ${PRODUCTS.categories.map(c => `
                <div class="category-item ${c.id === activeCategory ? 'active' : ''}" data-cat="${c.id}">
                  <span class="category-item__icon">${c.icon}</span>
                  <span>${c.name}</span>
                  <span class="category-item__count">${c.count}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div>
          ${items.length > 0 ? `
            <div class="product-grid">
              ${items.map(p => `
                <div class="product-card card--interactive" data-product-id="${p.id}">
                  <div class="product-card__image">
                    ${p.image ? `<img src="${p.image}" alt="${p.name}" class="product-card__img">` : `<span style="font-size:3rem;">🟢</span>`}
                    <span class="badge badge--${p.pnClass} product-card__pn-badge">${p.pnRating}</span>
                  </div>
                  <div class="product-card__body">
                    <div class="product-card__name">${p.name}</div>
                    <div class="product-card__specs">${p.description.substring(0, 70)}...</div>
                    <div class="product-card__footer">
                      <span class="product-card__size">📏 ${p.sizeRange}</span>
                      <a href="#/create?product=${p.id}" class="btn btn-primary btn-sm">Select</a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-state__icon">🔍</div>
              <div class="empty-state__title">No Products Found</div>
              <div class="empty-state__desc">Try adjusting your search or filter criteria.</div>
            </div>
          `}
        </div>
      </div>
    `;

    // Category click
    container.querySelectorAll('.category-item').forEach(el => {
      el.addEventListener('click', () => {
        activeCategory = el.dataset.cat;
        render();
      });
    });

    // Search
    const searchInput = container.querySelector('#product-search');
    searchInput?.addEventListener('input', debounce(e => {
      searchQuery = e.target.value;
      render();
    }, 250));

    // PN filter
    container.querySelector('#filter-pn')?.addEventListener('change', e => {
      filterPN = e.target.value;
      render();
    });
  }

  render();
}
