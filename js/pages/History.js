// Rucika TechSheet — History Page
import Storage from '../utils/storage.js';
import { formatDate, showToast } from '../utils/helpers.js';

export default function History() {
  const container = document.getElementById('page-content');
  let datasheets = Storage.getDatasheets();
  let filterStatus = '';
  let searchQuery = '';
  let currentPage = 0;
  const perPage = 10;

  function getFiltered() {
    let items = [...datasheets];
    if (filterStatus) items = items.filter(d => d.status === filterStatus);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(d =>
        (d.documentName || '').toLowerCase().includes(q) ||
        (d.productName || '').toLowerCase().includes(q) ||
        (d.clientName || '').toLowerCase().includes(q)
      );
    }
    return items;
  }

  function render() {
    const filtered = getFiltered();
    const totalPages = Math.ceil(filtered.length / perPage);
    const page = filtered.slice(currentPage * perPage, (currentPage + 1) * perPage);

    container.innerHTML = `
      <div class="header__breadcrumb" style="margin-bottom: var(--space-lg);">
        <a href="#/">Dashboard</a>
        <span class="separator">›</span>
        <span class="current">History</span>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-lg); flex-wrap:wrap; gap:var(--space-md);">
        <h1>Datasheet History</h1>
        <span style="color:var(--text-muted); font-size:var(--font-size-sm);">${filtered.length} document(s)</span>
      </div>

      <div class="filter-bar">
        <div class="filter-bar__search">
          <span class="filter-bar__search-icon">🔍</span>
          <input type="text" class="filter-bar__search-input" id="history-search"
            placeholder="Search documents..." value="${searchQuery}">
        </div>
        <select class="filter-bar__select" id="filter-status">
          <option value="">All Status</option>
          <option value="Published" ${filterStatus === 'Published' ? 'selected' : ''}>Published</option>
          <option value="Draft" ${filterStatus === 'Draft' ? 'selected' : ''}>Draft</option>
        </select>
      </div>

      ${filtered.length > 0 ? `
        <div class="card">
          <div class="card__body" style="padding:0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Product</th>
                  <th>Client</th>
                  <th>Project</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${page.map(d => `
                  <tr>
                    <td style="font-weight:600;">${d.documentName || 'Untitled'}</td>
                    <td><span class="badge badge--${d.pnRating === 'PN10' ? 'pn10' : d.pnRating === 'PN16' ? 'pn16' : d.pnRating === 'PN20' ? 'pn20' : 'draft'}">${d.pnRating || '-'}</span> ${d.productName || '-'}</td>
                    <td>${d.clientName || '-'}</td>
                    <td>${d.projectName || '-'}</td>
                    <td>${formatDate(d.createdAt)}</td>
                    <td><span class="badge badge--${d.status === 'Published' ? 'published' : 'draft'}">${d.status || 'Draft'}</span></td>
                    <td>
                      <div style="display:flex; gap:var(--space-xs);">
                        <button class="btn btn-sm btn-ghost btn-dup" data-id="${d.id}" title="Duplicate">📋</button>
                        <button class="btn btn-sm btn-ghost btn-del" data-id="${d.id}" title="Delete" style="color:var(--status-error);">🗑</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        ${totalPages > 1 ? `
          <div class="pagination">
            ${Array.from({ length: totalPages }, (_, i) => `
              <button class="pagination__btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i + 1}</button>
            `).join('')}
          </div>
        ` : ''}
      ` : `
        <div class="empty-state">
          <div class="empty-state__icon">📋</div>
          <div class="empty-state__title">No Documents Found</div>
          <div class="empty-state__desc">${searchQuery || filterStatus ? 'Try adjusting your filters.' : 'Create your first datasheet to see it here.'}</div>
          <a href="#/create" class="btn btn-primary">Create Datasheet</a>
        </div>
      `}
    `;

    // Search
    container.querySelector('#history-search')?.addEventListener('input', e => {
      searchQuery = e.target.value;
      currentPage = 0;
      render();
    });

    // Filter
    container.querySelector('#filter-status')?.addEventListener('change', e => {
      filterStatus = e.target.value;
      currentPage = 0;
      render();
    });

    // Pagination
    container.querySelectorAll('.pagination__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        render();
      });
    });

    // Delete
    container.querySelectorAll('.btn-del').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this datasheet?')) {
          Storage.deleteDatasheet(btn.dataset.id);
          datasheets = Storage.getDatasheets();
          showToast('Datasheet deleted.', 'success');
          render();
        }
      });
    });

    // Duplicate
    container.querySelectorAll('.btn-dup').forEach(btn => {
      btn.addEventListener('click', () => {
        const ds = datasheets.find(d => d.id === btn.dataset.id);
        if (ds) {
          Storage.saveDatasheet({ ...ds, id: null, documentName: ds.documentName + ' (Copy)', status: 'Draft', createdAt: null });
          datasheets = Storage.getDatasheets();
          showToast('Datasheet duplicated.', 'success');
          render();
        }
      });
    });
  }

  render();
}
