// Rucika TechSheet — Dashboard Page
import Storage from '../utils/storage.js';
import { formatDate } from '../utils/helpers.js';

export default function Dashboard() {
  const container = document.getElementById('page-content');
  const datasheets = Storage.getDatasheets();

  const totalProducts = 7;
  const totalDocs = datasheets.length;
  const published = datasheets.filter(d => d.status === 'Published').length;

  container.innerHTML = `
    <div class="dashboard">
      <div class="dashboard__header">
        <div>
          <h1>Dashboard</h1>
          <p style="color: var(--text-secondary); margin-top: var(--space-xs);">
            Welcome back! Manage your technical datasheets.
          </p>
        </div>
        <a href="#/create" class="btn btn-primary btn-lg" id="btn-create-new">
          <span>＋</span> Create New Datasheet
        </a>
      </div>

      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-card__icon">📦</div>
          <div class="summary-card__label">Total Products</div>
          <div class="summary-card__value">${totalProducts}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card__icon">📄</div>
          <div class="summary-card__label">Documents Created</div>
          <div class="summary-card__value">${totalDocs}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card__icon">✅</div>
          <div class="summary-card__label">Published</div>
          <div class="summary-card__value">${published}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card__icon">📝</div>
          <div class="summary-card__label">Drafts</div>
          <div class="summary-card__value">${totalDocs - published}</div>
        </div>
      </div>

      <div class="card" style="margin-top: var(--space-xl);">
        <div class="card__header">
          <h3 class="card__title">Recent Datasheets</h3>
        </div>
        <div class="card__body" style="padding: 0;">
          ${datasheets.length > 0 ? `
            <div class="data-table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Product</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${datasheets.slice(0, 10).map(d => `
                    <tr>
                      <td style="font-weight: 600;">${d.documentName || 'Untitled'}</td>
                      <td>${d.productName || '-'}</td>
                      <td>${d.clientName || '-'}</td>
                      <td>${formatDate(d.createdAt)}</td>
                      <td><span class="badge badge--${d.status === 'Published' ? 'published' : 'draft'}">${d.status || 'Draft'}</span></td>
                      <td>
                        <div style="display: flex; gap: var(--space-sm);">
                          <button class="btn btn-sm btn-ghost btn-view-ds" data-id="${d.id}" title="View">👁</button>
                          <button class="btn btn-sm btn-ghost btn-duplicate-ds" data-id="${d.id}" title="Duplicate">📋</button>
                          <button class="btn btn-sm btn-ghost btn-delete-ds" data-id="${d.id}" title="Delete" style="color: var(--status-error);">🗑</button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-state__icon">📋</div>
              <div class="empty-state__title">No Datasheets Yet</div>
              <div class="empty-state__desc">Create your first technical datasheet to get started.</div>
              <a href="#/create" class="btn btn-primary">Create New Datasheet</a>
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  // Style
  const style = container.querySelector('.dashboard__header')?.style;
  if (style) {
    container.querySelector('.dashboard__header').style.cssText =
      'display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--space-xl);flex-wrap:wrap;gap:var(--space-md);';
  }

  // Delete handlers
  container.querySelectorAll('.btn-delete-ds').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Delete this datasheet?')) {
        Storage.deleteDatasheet(btn.dataset.id);
        Dashboard();
      }
    });
  });

  // Duplicate handlers
  container.querySelectorAll('.btn-duplicate-ds').forEach(btn => {
    btn.addEventListener('click', () => {
      const ds = datasheets.find(d => d.id === btn.dataset.id);
      if (ds) {
        const copy = { ...ds, id: null, documentName: ds.documentName + ' (Copy)', status: 'Draft', createdAt: null };
        Storage.saveDatasheet(copy);
        Dashboard();
      }
    });
  });
}
