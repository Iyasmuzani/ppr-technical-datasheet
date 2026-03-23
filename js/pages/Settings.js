// Rucika TechSheet — Settings Page
import Storage from '../utils/storage.js';
import PRODUCTS from '../data/products.js';
import { showToast } from '../utils/helpers.js';

export default function Settings() {
  const container = document.getElementById('page-content');
  let activeTab = 'profile';

  function render() {
    const profile = Storage.getProfile();

    container.innerHTML = `
      <div class="header__breadcrumb" style="margin-bottom: var(--space-lg);">
        <a href="#/">Dashboard</a>
        <span class="separator">›</span>
        <span class="current">Settings</span>
      </div>

      <h1 style="margin-bottom: var(--space-lg);">Settings</h1>

      <div class="tabs">
        <button class="tab ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">Company Profile</button>
        <button class="tab ${activeTab === 'products' ? 'active' : ''}" data-tab="products">Product Database</button>
      </div>

      <div id="tab-content"></div>
    `;

    // Tab switching
    container.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        render();
      });
    });

    const tabContent = container.querySelector('#tab-content');
    if (activeTab === 'profile') renderProfileTab(tabContent, profile);
    else renderProductsTab(tabContent);
  }

  function renderProfileTab(el, profile) {
    el.innerHTML = `
      <div class="card" style="max-width:640px;">
        <div class="card__header"><h4 class="card__title">Company Profile</h4></div>
        <div class="card__body">
          <div class="form-group">
            <label class="form-label">Company Name</label>
            <input type="text" class="form-input" id="s-company" value="${profile.companyName}">
          </div>
          <div class="form-group">
            <label class="form-label">Address</label>
            <textarea class="form-textarea" id="s-address" rows="2">${profile.address}</textarea>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md);">
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="text" class="form-input" id="s-phone" value="${profile.phone}">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="s-email" value="${profile.email}">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Website</label>
            <input type="text" class="form-input" id="s-website" value="${profile.website}">
          </div>
          <button class="btn btn-primary" id="btn-save-profile">Save Profile</button>
        </div>
      </div>
    `;

    el.querySelector('#btn-save-profile')?.addEventListener('click', () => {
      const updated = {
        companyName: el.querySelector('#s-company').value,
        address: el.querySelector('#s-address').value,
        phone: el.querySelector('#s-phone').value,
        email: el.querySelector('#s-email').value,
        website: el.querySelector('#s-website').value
      };
      Storage.saveProfile(updated);
      showToast('Profile saved successfully!', 'success');
    });
  }

  function renderProductsTab(el) {
    el.innerHTML = `
      <div class="card">
        <div class="card__header">
          <h4 class="card__title">Product Database</h4>
          <span style="color:var(--text-muted); font-size:var(--font-size-sm);">${PRODUCTS.items.length} products</span>
        </div>
        <div class="card__body" style="padding:0;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>PN Rating</th>
                <th>Size Range</th>
                <th>Sizes</th>
              </tr>
            </thead>
            <tbody>
              ${PRODUCTS.items.map(p => `
                <tr>
                  <td style="font-weight:600;">${p.name}</td>
                  <td>${PRODUCTS.categories.find(c => c.id === p.category)?.name || p.category}</td>
                  <td><span class="badge badge--${p.pnClass}">${p.pnRating}</span></td>
                  <td>${p.sizeRange}</td>
                  <td>${p.sizes.length} variants</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <p style="color:var(--text-muted); font-size:var(--font-size-sm); margin-top:var(--space-md);">
        ℹ️ Product data is currently managed in the source code. CRUD management will be available in a future update.
      </p>
    `;
  }

  render();
}
