// Rucika TechSheet — Settings Page
import Storage from '../utils/storage.js';
import Auth from '../utils/auth.js';
import PRODUCTS from '../data/products.js?v=1';
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
        <button class="tab ${activeTab === 'security' ? 'active' : ''}" data-tab="security">🔒 Security</button>
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
    else if (activeTab === 'products') renderProductsTab(tabContent);
    else if (activeTab === 'security') renderSecurityTab(tabContent);
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
            <label class="form-label">Address Line 1</label>
            <input type="text" class="form-input" id="s-address1" value="${profile.address1}">
          </div>
          <div class="form-group">
            <label class="form-label">Address Line 2</label>
            <input type="text" class="form-input" id="s-address2" value="${profile.address2}">
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
        address1: el.querySelector('#s-address1').value,
        address2: el.querySelector('#s-address2').value,
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

  function renderSecurityTab(el) {
    el.innerHTML = `
      <div class="card" style="max-width:640px;">
        <div class="card__header"><h4 class="card__title">🔒 Access Security</h4></div>
        <div class="card__body">
          <div class="security-info-box">
            <span class="security-info-box__icon">🛡️</span>
            <div class="security-info-box__text">
              <strong>Password Protection Active</strong><br>
              This application requires a password to access. The session will expire when the browser or tab is closed. 
              Default password: <code style="background:var(--bg-primary); padding:2px 6px; border-radius:4px; font-size:var(--font-size-sm);">rucika2024</code>
            </div>
          </div>

          <h4 style="margin-bottom:var(--space-md); font-size:var(--font-size-base);">Change Password</h4>

          <div class="form-group">
            <label class="form-label">Current Password</label>
            <input type="password" class="form-input" id="sec-current-pw" placeholder="Enter current password" autocomplete="current-password">
          </div>
          <div class="form-group">
            <label class="form-label">New Password</label>
            <input type="password" class="form-input" id="sec-new-pw" placeholder="Enter new password (min 4 characters)" autocomplete="new-password">
            <div class="pw-strength" id="pw-strength">
              <div class="pw-strength__bar" id="pw-strength-bar"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Confirm New Password</label>
            <input type="password" class="form-input" id="sec-confirm-pw" placeholder="Re-enter new password" autocomplete="new-password">
          </div>
          <div style="display:flex; gap:var(--space-md); align-items:center; flex-wrap:wrap;">
            <button class="btn btn-primary" id="btn-change-pw">Change Password</button>
            <button class="btn" id="btn-reset-pw" style="background:var(--bg-tertiary); color:var(--text-secondary);">Reset to Default</button>
          </div>
        </div>
      </div>

      <div class="card" style="max-width:640px; margin-top:var(--space-lg);">
        <div class="card__header"><h4 class="card__title">⚠️ Emergency Access</h4></div>
        <div class="card__body">
          <p style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-bottom:var(--space-md);">
            If you forget your password, open the browser's Developer Console (F12) and run:
          </p>
          <code style="display:block; background:var(--bg-primary); padding:var(--space-md); border-radius:var(--radius-sm); color:var(--rucika-green-light); font-size:var(--font-size-sm); word-break:break-all;">
            __resetPassword()
          </code>
          <p style="color:var(--text-muted); font-size:var(--font-size-xs); margin-top:var(--space-sm);">
            This will reset the password back to the default: <strong>rucika2024</strong>
          </p>
        </div>
      </div>
    `;

    // Password strength indicator
    const newPwInput = el.querySelector('#sec-new-pw');
    const strengthBar = el.querySelector('#pw-strength-bar');

    newPwInput.addEventListener('input', () => {
      const pw = newPwInput.value;
      let strength = 0;
      if (pw.length >= 4) strength += 25;
      if (pw.length >= 8) strength += 25;
      if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) strength += 25;
      if (/[0-9]/.test(pw) || /[^A-Za-z0-9]/.test(pw)) strength += 25;

      strengthBar.style.width = strength + '%';
      if (strength <= 25) strengthBar.style.background = 'var(--status-error)';
      else if (strength <= 50) strengthBar.style.background = 'var(--status-draft)';
      else if (strength <= 75) strengthBar.style.background = 'var(--pn10-blue)';
      else strengthBar.style.background = 'var(--status-published)';
    });

    // Change password
    el.querySelector('#btn-change-pw').addEventListener('click', async () => {
      const currentPw = el.querySelector('#sec-current-pw').value;
      const newPw = el.querySelector('#sec-new-pw').value;
      const confirmPw = el.querySelector('#sec-confirm-pw').value;

      if (!currentPw || !newPw || !confirmPw) {
        showToast('Please fill in all password fields.', 'error');
        return;
      }

      if (newPw !== confirmPw) {
        showToast('New passwords do not match.', 'error');
        return;
      }

      const result = await Auth.changePassword(currentPw, newPw);
      if (result.success) {
        showToast(result.message, 'success');
        el.querySelector('#sec-current-pw').value = '';
        el.querySelector('#sec-new-pw').value = '';
        el.querySelector('#sec-confirm-pw').value = '';
        strengthBar.style.width = '0%';
      } else {
        showToast(result.message, 'error');
      }
    });

    // Reset to default
    el.querySelector('#btn-reset-pw').addEventListener('click', async () => {
      if (confirm('Are you sure you want to reset the password to default (rucika2024)?')) {
        await Auth.resetToDefault();
        showToast('Password has been reset to default: rucika2024', 'success');
        el.querySelector('#sec-current-pw').value = '';
        el.querySelector('#sec-new-pw').value = '';
        el.querySelector('#sec-confirm-pw').value = '';
        strengthBar.style.width = '0%';
      }
    });
  }

  render();
}
