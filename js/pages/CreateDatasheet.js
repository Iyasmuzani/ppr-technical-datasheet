// Rucika TechSheet — Create Datasheet Wizard (4-Step)
import PRODUCTS from '../data/products.js';
import Storage from '../utils/storage.js';
import Router from '../router.js';
import { showToast, formatDate } from '../utils/helpers.js';
import RUCIKA_LOGO_BASE64 from '../data/logo.js';

const STEPS = ['Select Product', 'Configure Data', 'Preview', 'Export'];

let state = {
  step: 0,
  selectedProduct: null,
  selectedSizes: [],
  clientName: '',
  projectName: '',
  documentDate: new Date().toISOString().slice(0, 10),
  notes: '',
  documentName: ''
};

export default function CreateDatasheet() {
  const container = document.getElementById('page-content');

  // Check for product param from URL
  const params = Router.getQueryParams();
  if (params.product && !state.selectedProduct) {
    const found = PRODUCTS.items.find(p => p.id === params.product);
    if (found) {
      state.selectedProduct = found;
      state.selectedSizes = found.sizes.map(s => s.dn);
      state.documentName = `${found.name}`;
      state.step = 1;
    }
  }

  function render() {
    container.innerHTML = `
      <div class="header__breadcrumb" style="margin-bottom: var(--space-lg);">
        <a href="#/">Dashboard</a>
        <span class="separator">›</span>
        <span class="current">Create Datasheet</span>
      </div>

      <h1 style="margin-bottom: var(--space-md);">Create Datasheet</h1>

      <!-- Stepper -->
      <div class="stepper">
        ${STEPS.map((s, i) => `
          <div class="stepper__step">
            <div class="stepper__step-wrapper">
              <div class="stepper__dot ${i < state.step ? 'completed' : ''} ${i === state.step ? 'active' : ''}">
                ${i < state.step ? '✓' : i + 1}
              </div>
              <div class="stepper__label">${s}</div>
            </div>
          </div>
          ${i < STEPS.length - 1 ? `<div class="stepper__line ${i < state.step ? 'completed' : ''}"></div>` : ''}
        `).join('')}
      </div>

      <div id="wizard-content"></div>
    `;

    const wizardEl = container.querySelector('#wizard-content');
    switch (state.step) {
      case 0: renderStepProduct(wizardEl); break;
      case 1: renderStepConfig(wizardEl); break;
      case 2: renderStepPreview(wizardEl); break;
      case 3: renderStepExport(wizardEl); break;
    }
  }

  function renderStepProduct(el) {
    const pipes = PRODUCTS.items.filter(p => p.category === 'ppr-pipe');
    const fittings = PRODUCTS.items.filter(p => p.category === 'fitting');
    const acc = PRODUCTS.items.filter(p => p.category === 'accessories');

    el.innerHTML = `
      <h3 style="margin-bottom: var(--space-lg);">Select a Product</h3>
      <h4 style="color: var(--text-secondary); margin-bottom: var(--space-md);">PPR Pipes</h4>
      <div class="product-grid" style="margin-bottom: var(--space-xl);">
        ${pipes.map(p => productCardHTML(p)).join('')}
      </div>
      <h4 style="color: var(--text-secondary); margin-bottom: var(--space-md);">Fittings</h4>
      <div class="product-grid" style="margin-bottom: var(--space-xl);">
        ${fittings.map(p => productCardHTML(p)).join('')}
      </div>
      <h4 style="color: var(--text-secondary); margin-bottom: var(--space-md);">Accessories</h4>
      <div class="product-grid">
        ${acc.map(p => productCardHTML(p)).join('')}
      </div>
    `;

    el.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const product = PRODUCTS.items.find(p => p.id === card.dataset.productId);
        if (product) {
          state.selectedProduct = product;
          state.selectedSizes = product.sizes.map(s => s.dn);
          state.documentName = `${product.name}`;
          state.step = 1;
          render();
        }
      });
    });
  }

  function productCardHTML(p) {
    const selected = state.selectedProduct?.id === p.id;
    return `
      <div class="product-card card--interactive ${selected ? 'selected' : ''}" data-product-id="${p.id}" style="cursor:pointer;">
        <div class="product-card__image">
          <span style="font-size:2.5rem;">🟢</span>
          <span class="badge badge--${p.pnClass} product-card__pn-badge">${p.pnRating}</span>
        </div>
        <div class="product-card__body">
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__specs">${p.material || ''}</div>
          <div class="product-card__size" style="margin-top:var(--space-sm);">📏 ${p.sizeRange}</div>
        </div>
      </div>
    `;
  }

  function renderStepConfig(el) {
    const p = state.selectedProduct;
    if (!p) { state.step = 0; render(); return; }

    el.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl);">
        <!-- Left: Form -->
        <div>
          <div class="card">
            <div class="card__header"><h4 class="card__title">Project Information</h4></div>
            <div class="card__body">
              <div class="form-group">
                <label class="form-label">Document Name</label>
                <input type="text" class="form-input" id="doc-name" value="${state.documentName}" placeholder="Technical Datasheet...">
              </div>
              <div class="form-group">
                <label class="form-label">Client Name</label>
                <input type="text" class="form-input" id="client-name" value="${state.clientName}" placeholder="e.g. PT. Pembangunan Jaya">
              </div>
              <div class="form-group">
                <label class="form-label">Project Name</label>
                <input type="text" class="form-input" id="project-name" value="${state.projectName}" placeholder="e.g. Office Tower Project">
              </div>
              <div class="form-group">
                <label class="form-label">Document Date</label>
                <input type="date" class="form-input" id="doc-date" value="${state.documentDate}">
              </div>
              <div class="form-group">
                <label class="form-label">Notes</label>
                <textarea class="form-textarea" id="doc-notes" placeholder="Additional notes for this datasheet...">${state.notes}</textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Specs -->
        <div>
          <div class="card" style="margin-bottom: var(--space-lg);">
            <div class="card__header"><h4 class="card__title">Product: ${p.name}</h4></div>
            <div class="card__body">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); font-size:var(--font-size-sm);">
                <div><span style="color:var(--text-muted);">Material:</span><br><strong>${p.material}</strong></div>
                <div><span style="color:var(--text-muted);">Standard:</span><br><strong>${p.standard}</strong></div>
                <div><span style="color:var(--text-muted);">Application:</span><br><strong>${p.application}</strong></div>
                <div><span style="color:var(--text-muted);">PN Rating:</span><br><strong><span class="badge badge--${p.pnClass}">${p.pnRating}</span></strong></div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <h4 class="card__title">Select Sizes</h4>
              <label class="checkbox-wrapper" style="font-size:var(--font-size-sm);">
                <input type="checkbox" id="select-all-sizes" ${state.selectedSizes.length === p.sizes.length ? 'checked' : ''}>
                Select All
              </label>
            </div>
            <div class="card__body" style="padding:0;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>DN (mm)</th>
                    <th>OD (mm)</th>
                    <th>Wall Thickness (mm)</th>
                    <th>Weight (kg/m)</th>
                    ${p.sizes[0]?.pipeLength ? '<th>Length (m)</th>' : ''}
                  </tr>
                </thead>
                <tbody>
                  ${p.sizes.map(s => `
                    <tr>
                      <td><input type="checkbox" class="size-checkbox" value="${s.dn}" ${state.selectedSizes.includes(s.dn) ? 'checked' : ''}></td>
                      <td><strong>${s.dn}</strong></td>
                      <td>${s.od}</td>
                      <td>${s.wallThickness ?? '-'}</td>
                      <td>${s.weightPerM}</td>
                      ${s.pipeLength ? `<td>${s.pipeLength}</td>` : ''}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:var(--space-xl);">
        <button class="btn btn-ghost" id="btn-back-step0">← Back</button>
        <button class="btn btn-primary btn-lg" id="btn-next-step2">Continue to Preview →</button>
      </div>
    `;

    // Save form state on input
    const inputs = { 'doc-name': 'documentName', 'client-name': 'clientName', 'project-name': 'projectName', 'doc-date': 'documentDate', 'doc-notes': 'notes' };
    Object.entries(inputs).forEach(([id, key]) => {
      el.querySelector(`#${id}`)?.addEventListener('input', e => { state[key] = e.target.value; });
    });

    // Checkboxes
    el.querySelectorAll('.size-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const dn = parseInt(cb.value);
        if (cb.checked) { if (!state.selectedSizes.includes(dn)) state.selectedSizes.push(dn); }
        else { state.selectedSizes = state.selectedSizes.filter(s => s !== dn); }
      });
    });

    el.querySelector('#select-all-sizes')?.addEventListener('change', e => {
      if (e.target.checked) state.selectedSizes = p.sizes.map(s => s.dn);
      else state.selectedSizes = [];
      render();
    });

    el.querySelector('#btn-back-step0')?.addEventListener('click', () => { state.step = 0; render(); });
    el.querySelector('#btn-next-step2')?.addEventListener('click', () => {
      if (state.selectedSizes.length === 0) { showToast('Please select at least one size.', 'error'); return; }
      state.step = 2;
      render();
    });
  }

  function renderStepPreview(el) {
    const p = state.selectedProduct;
    const profile = Storage.getProfile();
    const selectedSizeData = p.sizes.filter(s => state.selectedSizes.includes(s.dn));

    el.innerHTML = `
      <div style="max-width:860px; margin:0 auto;">
        <div class="pdf-preview" id="pdf-preview-content">
          <!-- PDF Header -->
          <div class="pdf-preview__header">
            <img src="assets/logo-rucika.png" alt="Rucika" style="height:36px; width:auto;">
            <div class="pdf-preview__company">
              <strong>${profile.companyName}</strong><br>
              ${profile.address}<br>
              ${profile.phone} | ${profile.email}
            </div>
          </div>

          <div class="pdf-preview__title">Technical Datasheet</div>

          <!-- Project Info -->
          <table style="width:100%; margin-bottom:24px; border-collapse:collapse;">
            <tr>
              <td style="padding:6px 12px; font-size:0.85rem; color:#666; width:140px;">Document</td>
              <td style="padding:6px 12px; font-size:0.85rem; font-weight:600;">${state.documentName}</td>
            </tr>
            ${state.clientName ? `<tr><td style="padding:6px 12px; font-size:0.85rem; color:#666;">Client</td><td style="padding:6px 12px; font-size:0.85rem;">${state.clientName}</td></tr>` : ''}
            ${state.projectName ? `<tr><td style="padding:6px 12px; font-size:0.85rem; color:#666;">Project</td><td style="padding:6px 12px; font-size:0.85rem;">${state.projectName}</td></tr>` : ''}
            <tr><td style="padding:6px 12px; font-size:0.85rem; color:#666;">Date</td><td style="padding:6px 12px; font-size:0.85rem;">${formatDate(state.documentDate)}</td></tr>
          </table>

          <!-- Product Info -->
          <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
            Product: ${p.name}
          </h3>
          <table style="width:100%; margin-bottom:24px; border-collapse:collapse;">
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666; width:140px;">Material</td><td style="padding:4px 12px; font-size:0.8rem;">${p.material}</td></tr>
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Standard</td><td style="padding:4px 12px; font-size:0.8rem;">${p.standard}</td></tr>
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Application</td><td style="padding:4px 12px; font-size:0.8rem;">${p.application}</td></tr>
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Pressure Rating</td><td style="padding:4px 12px; font-size:0.8rem; font-weight:600;">${p.pnRating}</td></tr>
            ${p.maxTemp ? `<tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Max Temperature</td><td style="padding:4px 12px; font-size:0.8rem;">${p.maxTemp}</td></tr>` : ''}
          </table>

          <!-- Material Properties -->
          ${PRODUCTS.materialProperties ? `
          <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
            Material Properties
          </h3>
          <table style="width:100%; margin-bottom:24px; border-collapse:collapse;">
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666; width:200px;">Density</td><td style="padding:4px 12px; font-size:0.8rem;">${PRODUCTS.materialProperties.density}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Tensile Strength @ Yield</td><td style="padding:4px 12px; font-size:0.8rem;">${PRODUCTS.materialProperties.tensileStrength}</td></tr>
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Elongation @ Break</td><td style="padding:4px 12px; font-size:0.8rem;">${PRODUCTS.materialProperties.elongationAtBreak}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Modulus of Elasticity</td><td style="padding:4px 12px; font-size:0.8rem;">${PRODUCTS.materialProperties.modulusOfElasticity}</td></tr>
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Coeff. of Thermal Expansion</td><td style="padding:4px 12px; font-size:0.8rem;">${PRODUCTS.materialProperties.thermalExpansion}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Thermal Conductivity</td><td style="padding:4px 12px; font-size:0.8rem;">${PRODUCTS.materialProperties.thermalConductivity}</td></tr>
            <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Max Operating Temperature</td><td style="padding:4px 12px; font-size:0.8rem;">${PRODUCTS.materialProperties.maxOperatingTemp}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Standards & Regulatory Codes</td><td style="padding:4px 12px; font-size:0.8rem; font-weight:600;">${PRODUCTS.materialProperties.standard}</td></tr>
          </table>
          ` : ''}

          <!-- Spec Table -->
          <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
            Dimensional Specifications
          </h3>
          <table>
            <thead>
              <tr>
                <th>DN (mm)</th>
                <th>Outer Diameter (mm)</th>
                <th>Wall Thickness (mm)</th>
                <th>Weight (kg/m)</th>
                ${selectedSizeData[0]?.pipeLength ? '<th>Pipe Length (m)</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${selectedSizeData.map(s => `
                <tr>
                  <td style="font-weight:600;">${s.dn}</td>
                  <td>${s.od}</td>
                  <td>${s.wallThickness ?? '-'}</td>
                  <td>${s.weightPerM}</td>
                  ${s.pipeLength ? `<td>${s.pipeLength}</td>` : ''}
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Certifications & Compliance -->
          ${PRODUCTS.certifications ? `
          <h3 style="font-size:1rem; color:#1F3E7C; margin-top:24px; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
            Certifications & Compliance
          </h3>
          <table style="width:100%; margin-bottom:24px; border-collapse:collapse;">
            ${Object.values(PRODUCTS.certifications).map((c, i) => `
              <tr${i % 2 === 1 ? ' style="background:#f8fafc;"' : ''}>
                <td style="padding:6px 12px; font-size:0.8rem; color:#666; width:200px; font-weight:600;">${c.label}</td>
                <td style="padding:6px 12px; font-size:0.8rem;">✅ ${c.value}</td>
              </tr>
            `).join('')}
          </table>
          ` : ''}

          ${state.notes ? `
            <h3 style="font-size:1rem; color:#1F3E7C; margin-top:24px; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
              Notes
            </h3>
            <p style="font-size:0.85rem; color:#555; white-space:pre-wrap;">${state.notes}</p>
          ` : ''}

          <div class="pdf-preview__footer">
            ${profile.companyName} — ${profile.website} — Generated by Rucika TechSheet
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:var(--space-xl);">
        <button class="btn btn-ghost" id="btn-back-step1">← Back to Configuration</button>
        <button class="btn btn-primary btn-lg" id="btn-generate-pdf">📄 Generate PDF</button>
      </div>
    `;

    el.querySelector('#btn-back-step1')?.addEventListener('click', () => { state.step = 1; render(); });
    el.querySelector('#btn-generate-pdf')?.addEventListener('click', () => {
      state.step = 3;
      render();
    });
  }

  function renderStepExport(el) {
    // Save to storage
    const datasheet = {
      id: null,
      documentName: state.documentName,
      productId: state.selectedProduct?.id,
      productName: state.selectedProduct?.name,
      pnRating: state.selectedProduct?.pnRating,
      clientName: state.clientName,
      projectName: state.projectName,
      documentDate: state.documentDate,
      notes: state.notes,
      selectedSizes: state.selectedSizes,
      status: 'Published'
    };
    Storage.saveDatasheet(datasheet);

    el.innerHTML = `
      <div style="text-align:center; padding:var(--space-3xl) var(--space-xl);">
        <div style="font-size:4rem; margin-bottom:var(--space-lg);">✅</div>
        <h2 style="margin-bottom:var(--space-md);">Datasheet Generated Successfully!</h2>
        <p style="color:var(--text-secondary); margin-bottom:var(--space-xl); max-width:480px; margin-inline:auto;">
          Your technical datasheet for <strong>${state.selectedProduct?.name}</strong> has been saved and is ready for download.
        </p>

        <div class="progress-bar" style="max-width:400px; margin:0 auto var(--space-xl);">
          <div class="progress-bar__fill" style="width:100%;"></div>
        </div>

        <div style="display:flex; gap:var(--space-md); justify-content:center; flex-wrap:wrap;">
          <button class="btn btn-primary btn-lg" id="btn-download-pdf">📥 Download PDF</button>
          <button class="btn btn-secondary btn-lg" id="btn-create-another">➕ Create Another</button>
          <a href="#/" class="btn btn-ghost btn-lg">← Back to Dashboard</a>
        </div>
      </div>
    `;

    el.querySelector('#btn-download-pdf')?.addEventListener('click', () => {
      generatePDF();
    });

    el.querySelector('#btn-create-another')?.addEventListener('click', () => {
      state = { step: 0, selectedProduct: null, selectedSizes: [], clientName: '', projectName: '', documentDate: new Date().toISOString().slice(0, 10), notes: '', documentName: '' };
      render();
    });
  }

  function generatePDF() {
    const p = state.selectedProduct;
    const profile = Storage.getProfile();
    const selectedSizeData = p.sizes.filter(s => state.selectedSizes.includes(s.dn));

    // Build PDF with pdfmake
    if (typeof pdfMake === 'undefined') {
      showToast('PDF library loading... please try again.', 'info');
      return;
    }

    const docDef = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        // Header
        {
          columns: [
            { image: RUCIKA_LOGO_BASE64, width: 100 },
            {
              text: [
                { text: profile.companyName + '\n', bold: true, fontSize: 9 },
                { text: profile.address + '\n', fontSize: 8 },
                { text: profile.phone + ' | ' + profile.email, fontSize: 8 }
              ],
              alignment: 'right'
            }
          ],
          margin: [0, 0, 0, 10]
        },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: '#1F3E7C' }], margin: [0, 0, 0, 20] },

        // Title
        { text: 'TECHNICAL DATASHEET', style: 'title', alignment: 'center', margin: [0, 0, 0, 20] },

        // Project Info
        {
          table: {
            widths: [120, '*'],
            body: [
              ['Document', state.documentName],
              ...(state.clientName ? [['Client', state.clientName]] : []),
              ...(state.projectName ? [['Project', state.projectName]] : []),
              ['Date', formatDate(state.documentDate)]
            ]
          },
          layout: 'noBorders',
          style: 'infoTable',
          margin: [0, 0, 0, 20]
        },

        // Product Info
        { text: 'Product: ' + p.name, style: 'sectionTitle', margin: [0, 0, 0, 10] },
        {
          table: {
            widths: [120, '*'],
            body: [
              ['Material', p.material],
              ['Standard', p.standard],
              ['Application', p.application],
              ['Pressure Rating', p.pnRating],
              ...(p.maxTemp ? [['Max Temperature', p.maxTemp]] : [])
            ]
          },
          layout: 'noBorders',
          style: 'infoTable',
          margin: [0, 0, 0, 20]
        },

        // Material Properties
        ...(PRODUCTS.materialProperties ? [
          { text: 'Material Properties', style: 'sectionTitle', margin: [0, 0, 0, 10] },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*'],
              body: [
                [{ text: 'Property', style: 'tableHeader' }, { text: 'Value', style: 'tableHeader' }],
                ['Density', PRODUCTS.materialProperties.density],
                ['Tensile Strength @ Yield', PRODUCTS.materialProperties.tensileStrength],
                ['Elongation @ Break', PRODUCTS.materialProperties.elongationAtBreak],
                ['Modulus of Elasticity', PRODUCTS.materialProperties.modulusOfElasticity],
                ['Coeff. of Thermal Expansion', PRODUCTS.materialProperties.thermalExpansion],
                ['Thermal Conductivity', PRODUCTS.materialProperties.thermalConductivity],
                ['Max Operating Temperature', PRODUCTS.materialProperties.maxOperatingTemp],
                ['Standards & Regulatory Codes', { text: PRODUCTS.materialProperties.standard, bold: true }]
              ]
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => '#e2e8f0',
              vLineColor: () => '#e2e8f0',
              fillColor: (row) => row === 0 ? '#1F3E7C' : (row % 2 === 0 ? '#f8fafc' : null)
            },
            margin: [0, 0, 0, 20]
          }
        ] : []),

        // Spec Table
        { text: 'Dimensional Specifications', style: 'sectionTitle', margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', ...(selectedSizeData[0]?.pipeLength ? ['*'] : [])],
            body: [
              [
                { text: 'DN (mm)', style: 'tableHeader' },
                { text: 'OD (mm)', style: 'tableHeader' },
                { text: 'Wall Thickness (mm)', style: 'tableHeader' },
                { text: 'Weight (kg/m)', style: 'tableHeader' },
                ...(selectedSizeData[0]?.pipeLength ? [{ text: 'Length (m)', style: 'tableHeader' }] : [])
              ],
              ...selectedSizeData.map(s => [
                { text: s.dn.toString(), bold: true },
                s.od.toString(),
                (s.wallThickness ?? '-').toString(),
                s.weightPerM.toString(),
                ...(s.pipeLength ? [s.pipeLength.toString()] : [])
              ])
            ]
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => '#e2e8f0',
            vLineColor: () => '#e2e8f0',
            fillColor: (row) => row === 0 ? '#1F3E7C' : (row % 2 === 0 ? '#f8fafc' : null)
          },
          margin: [0, 0, 0, 20]
        },

        // Certifications & Compliance
        ...(PRODUCTS.certifications ? [
          { text: 'Certifications & Compliance', style: 'sectionTitle', margin: [0, 0, 0, 10] },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*'],
              body: [
                [{ text: 'Certification', style: 'tableHeader' }, { text: 'Status', style: 'tableHeader' }],
                ...Object.values(PRODUCTS.certifications).map(c => [{ text: c.label, bold: true }, '✅ ' + c.value])
              ]
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => '#e2e8f0',
              vLineColor: () => '#e2e8f0',
              fillColor: (row) => row === 0 ? '#1F3E7C' : (row % 2 === 0 ? '#f8fafc' : null)
            },
            margin: [0, 0, 0, 20]
          }
        ] : []),

        // Notes
        ...(state.notes ? [
          { text: 'Notes', style: 'sectionTitle', margin: [0, 10, 0, 8] },
          { text: state.notes, fontSize: 9, color: '#555' }
        ] : [])
      ],
      footer: {
        text: profile.companyName + ' — ' + profile.website + ' — Generated by Rucika TechSheet',
        alignment: 'center',
        fontSize: 7,
        color: '#999',
        margin: [40, 20, 40, 0]
      },
      styles: {
        logo: { fontSize: 22, bold: true, color: '#1F3E7C' },
        title: { fontSize: 16, bold: true, color: '#1F3E7C', characterSpacing: 3 },
        sectionTitle: { fontSize: 11, bold: true, color: '#1F3E7C' },
        tableHeader: { bold: true, fontSize: 9, color: '#FFFFFF' },
        infoTable: { fontSize: 9 }
      },
      defaultStyle: { font: 'Roboto', fontSize: 9 }
    };

    const pdf = pdfMake.createPdf(docDef);
    try {
      pdf.getBase64((base64) => {
        const dataUri = 'data:application/pdf;base64,' + base64;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = `${state.documentName.replace(/\s+/g, '_')}.pdf`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('PDF downloaded successfully!', 'success');
      });
    } catch (e) {
      pdf.open();
      showToast('PDF opened in new tab — use Ctrl+S to save.', 'info');
    }
  }

  render();
}

export function resetWizardState() {
  state = { step: 0, selectedProduct: null, selectedSizes: [], clientName: '', projectName: '', documentDate: new Date().toISOString().slice(0, 10), notes: '', documentName: '' };
}
