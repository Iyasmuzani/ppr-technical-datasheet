// Rucika TechSheet — Create Datasheet Wizard (4-Step)
import PRODUCTS from '../data/products.js?v=1';
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
    const hdpePipes = PRODUCTS.items.filter(p => p.category === 'hdpe-pipe');
    const fittings = PRODUCTS.items.filter(p => p.category === 'fitting');
    const acc = PRODUCTS.items.filter(p => p.category === 'accessories');

    el.innerHTML = `
      <h3 style="margin-bottom: var(--space-lg);">Select a Product</h3>
      <h4 style="color: var(--text-secondary); margin-bottom: var(--space-md);">PPR Pipes</h4>
      <div class="product-grid" style="margin-bottom: var(--space-xl);">
        ${pipes.map(p => productCardHTML(p)).join('')}
      </div>
      <h4 style="color: var(--text-secondary); margin-bottom: var(--space-md);">HDPE Pipes</h4>
      <div class="product-grid" style="margin-bottom: var(--space-xl);">
        ${hdpePipes.map(p => productCardHTML(p)).join('')}
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
          // For solvent cement products, select all variants by packaging name
          if (product.specifications) {
            state.selectedSizes = product.sizes.map((s, i) => i);
          } else {
            state.selectedSizes = product.sizes.map(s => s.dn);
          }
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
          ${p.image ? `<img src="${p.image}" alt="${p.name}" class="product-card__img">` : `<span style="font-size:3rem;">${p.category === 'hdpe-pipe' ? '⚫' : '🟢'}</span>`}
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

  function isSolventCement(product) {
    return !!(product && product.specifications);
  }

  function renderStepConfig(el) {
    const p = state.selectedProduct;
    if (!p) { state.step = 0; render(); return; }
    const isSC = isSolventCement(p);

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
              <p style="font-size:var(--font-size-sm); color:var(--text-secondary); margin-bottom:var(--space-md);">${p.description}</p>
              ${isSC && p.advantages ? `
                <div style="margin-bottom:var(--space-md);">
                  <strong style="font-size:var(--font-size-sm); color:var(--text-primary);">Advantages:</strong>
                  <ul style="margin-top:var(--space-xs); padding-left:var(--space-lg); font-size:var(--font-size-sm); color:var(--text-secondary);">
                    ${p.advantages.map(a => `<li>${a}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); font-size:var(--font-size-sm);">
                ${!isSC ? `<div><span style="color:var(--text-muted);">Material:</span><br><strong>${p.material}</strong></div>` : ''}
                <div><span style="color:var(--text-muted);">Standard:</span><br><strong>${p.standard}</strong></div>
                ${!isSC ? `<div><span style="color:var(--text-muted);">Application:</span><br><strong>${p.application}</strong></div>` : ''}
                ${!isSC ? `<div><span style="color:var(--text-muted);">PN Rating:</span><br><strong><span class="badge badge--${p.pnClass}">${p.pnRating}</span></strong></div>` : ''}
              </div>
            </div>
          </div>

          ${isSC ? `
          <div class="card">
            <div class="card__header"><h4 class="card__title">Specifications</h4></div>
            <div class="card__body" style="padding:0; overflow-x:auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    ${p.specifications.variants.map(v => `<th>${v.packaging}</th>`).join('')}
                    <th>Standard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="font-weight:600;">Color</td>
                    ${p.specifications.variants.map(() => `<td>Clear</td>`).join('')}
                    <td>Clear</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">Viscosity (cP)</td>
                    ${p.specifications.variants.map(v => `<td>${v.viscosity.replace(' cP','')}</td>`).join('')}
                    <td>${p.specifications.acceptanceCriteria.viscosity}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">Specific Gravity (g/cc)</td>
                    ${p.specifications.variants.map(v => `<td>${v.specificGravity.replace(' g/cc','')}</td>`).join('')}
                    <td>${p.specifications.acceptanceCriteria.specificGravity}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">Hydrostatic Test</td>
                    ${p.specifications.variants.map(() => `<td>Ok</td>`).join('')}
                    <td>${p.specifications.acceptanceCriteria.hydrostaticTest}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">Tensile Test (kgf/cm²)</td>
                    ${p.specifications.variants.map(v => `<td>${v.tensileStrength.replace(' kgf/cm²','')}</td>`).join('')}
                    <td>${p.specifications.acceptanceCriteria.tensileStrength}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          ` : `
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
          `}
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

    if (!isSC) {
      // Checkboxes (only for pipe/fitting products)
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
    }

    el.querySelector('#btn-back-step0')?.addEventListener('click', () => { state.step = 0; render(); });
    el.querySelector('#btn-next-step2')?.addEventListener('click', () => {
      if (!isSC && state.selectedSizes.length === 0) { showToast('Please select at least one size.', 'error'); return; }
      state.step = 2;
      render();
    });
  }

  function renderStepPreview(el) {
    const p = state.selectedProduct;
    const profile = Storage.getProfile();
    const isSC = isSolventCement(p);
    const selectedSizeData = isSC ? p.sizes : p.sizes.filter(s => state.selectedSizes.includes(s.dn));

    el.innerHTML = `
      <div style="max-width:860px; margin:0 auto;">
        <div class="pdf-preview" id="pdf-preview-content">
          <!-- PDF Header -->
          <div class="pdf-preview__header">
            <img src="assets/logo-rucika.png" alt="Rucika" style="height:36px; width:auto;">
            <div class="pdf-preview__company">
              <strong>${profile.companyName}</strong><br>
              ${profile.address1 ? profile.address1 + '<br>' : ''}
              ${profile.address2 ? profile.address2 + '<br>' : ''}
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

          ${isSC ? renderSolventCementPreview(p) : renderPipePreview(p, selectedSizeData)}

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

  function renderSolventCementPreview(p) {
    const specs = p.specifications;
    return `
      <!-- Product Description -->
      <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
        Product Description
      </h3>
      <p style="font-size:0.85rem; color:#333; margin-bottom:20px;">${p.description}</p>

      <!-- Advantages -->
      ${p.advantages ? `
      <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
        Advantages
      </h3>
      <ol style="font-size:0.85rem; color:#333; margin-bottom:20px; padding-left:20px;">
        ${p.advantages.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')}
      </ol>
      ` : ''}

      <!-- Specifications Table -->
      <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
        Specifications
      </h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:12px;">
        <thead>
          <tr style="background:#1F3E7C;">
            <th style="padding:8px 10px; color:#fff; font-size:0.8rem; text-align:left; border:1px solid #e2e8f0;">Specification</th>
            ${specs.variants.map(v => `<th style="padding:8px 10px; color:#fff; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">${v.packaging}</th>`).join('')}
            <th style="padding:8px 10px; color:#fff; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">Standard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:6px 10px; font-size:0.8rem; font-weight:600; border:1px solid #e2e8f0;">Color</td>
            ${specs.variants.map(() => `<td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">Clear</td>`).join('')}
            <td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">Clear</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding:6px 10px; font-size:0.8rem; font-weight:600; border:1px solid #e2e8f0;">Viscosity (cP)</td>
            ${specs.variants.map(v => `<td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">${v.viscosity.replace(' cP','')}</td>`).join('')}
            <td style="padding:6px 10px; font-size:0.78rem; text-align:center; border:1px solid #e2e8f0;">${specs.acceptanceCriteria.viscosity}</td>
          </tr>
          <tr>
            <td style="padding:6px 10px; font-size:0.8rem; font-weight:600; border:1px solid #e2e8f0;">Specific Gravity (g/cc)</td>
            ${specs.variants.map(v => `<td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">${v.specificGravity.replace(' g/cc','')}</td>`).join('')}
            <td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">${specs.acceptanceCriteria.specificGravity}</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding:6px 10px; font-size:0.8rem; font-weight:600; border:1px solid #e2e8f0;">Hydrostatic Test</td>
            ${specs.variants.map(() => `<td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">Ok</td>`).join('')}
            <td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">${specs.acceptanceCriteria.hydrostaticTest}</td>
          </tr>
          <tr>
            <td style="padding:6px 10px; font-size:0.8rem; font-weight:600; border:1px solid #e2e8f0;">Tensile Test (kgf/cm²)</td>
            ${specs.variants.map(v => `<td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">${v.tensileStrength.replace(' kgf/cm²','')}</td>`).join('')}
            <td style="padding:6px 10px; font-size:0.8rem; text-align:center; border:1px solid #e2e8f0;">${specs.acceptanceCriteria.tensileStrength}</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:0.75rem; color:#666; margin-bottom:20px;">Note: Reference ${specs.standard}</p>
    `;
  }

  function renderPipePreview(p, selectedSizeData) {
    return `
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
      ${(() => {
        const isHDPE = p.category === 'hdpe-pipe';
        const matProps = isHDPE ? PRODUCTS.hdpeMaterialProperties : PRODUCTS.materialProperties;
        if (!matProps || p.category === 'accessories') return '';
        return `
      <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Material Properties</h3>
      <table style="width:100%; margin-bottom:24px; border-collapse:collapse;">
        <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666; width:200px;">Density</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.density}</td></tr>
        ${isHDPE ? `
        <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Melt Flow Rate (MFR)</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.meltFlowRate}</td></tr>
        <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Oxidation Induction Time (OIT)</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.oxidationInductionTime}</td></tr>
        ` : ''}
        <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Tensile Strength @ Yield</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.tensileStrength}</td></tr>
        <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Elongation @ Break</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.elongationAtBreak}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Modulus of Elasticity</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.modulusOfElasticity}</td></tr>
        ${isHDPE ? `<tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Vicat Softening Point</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.vicatSofteningPoint}</td></tr>` : ''}
        <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Coeff. of Thermal Expansion</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.thermalExpansion}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Thermal Conductivity</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.thermalConductivity}</td></tr>
        ${isHDPE ? `<tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Brittleness Temperature</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.brittlenessTemperature}</td></tr>` : ''}
        <tr><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Max Operating Temperature</td><td style="padding:4px 12px; font-size:0.8rem;">${matProps.maxOperatingTemp}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:4px 12px; font-size:0.8rem; color:#666;">Standards & Regulatory Codes</td><td style="padding:4px 12px; font-size:0.8rem; font-weight:600;">${matProps.standard}</td></tr>
      </table>
      `;
      })()}

      ${(() => {
        const isHDPE = p.category === 'hdpe-pipe';
        const matProps = isHDPE ? PRODUCTS.hdpeMaterialProperties : null;
        if (!isHDPE || !matProps || !matProps.pressureDerating) return '';
        const dr = matProps.pressureDerating;
        const W = 480, H = 260, padL = 60, padR = 30, padT = 30, padB = 50;
        const chartW = W - padL - padR, chartH = H - padT - padB;
        const xMin = 20, xMax = 40, yMin = 0, yMax = 120;
        const toX = (t) => padL + ((t - xMin) / (xMax - xMin)) * chartW;
        const toY = (f) => padT + chartH - ((f - yMin) / (yMax - yMin)) * chartH;
        const points = dr.map(d => `${toX(d.temp)},${toY(d.factor)}`).join(' ');
        const yTicks = [0, 20, 40, 60, 80, 100, 120];
        const xTicks = [20, 25, 30, 35, 40];
        return `
      <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Pressure & Temperature Derating Curve</h3>
      <div style="text-align:center; margin-bottom:24px;">
        <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="font-family:Inter,sans-serif; max-width:100%;">
          <rect x="${padL}" y="${padT}" width="${chartW}" height="${chartH}" fill="#f8fafc" rx="4"/>
          ${yTicks.map(y => `<line x1="${padL}" y1="${toY(y)}" x2="${padL + chartW}" y2="${toY(y)}" stroke="#e2e8f0" stroke-width="1"/><text x="${padL - 8}" y="${toY(y) + 4}" text-anchor="end" fill="#888" font-size="10">${y}</text>`).join('')}
          ${xTicks.map(t => `<line x1="${toX(t)}" y1="${padT}" x2="${toX(t)}" y2="${padT + chartH}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4,3"/><text x="${toX(t)}" y="${padT + chartH + 18}" text-anchor="middle" fill="#888" font-size="10">${t}</text>`).join('')}
          <defs><linearGradient id="deratingGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2dd4bf"/><stop offset="100%" stop-color="#14b8a6"/></linearGradient></defs>
          <polyline points="${points}" fill="none" stroke="url(#deratingGrad)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
          ${dr.map(d => `<circle cx="${toX(d.temp)}" cy="${toY(d.factor)}" r="5" fill="#14b8a6" stroke="#fff" stroke-width="2"/><text x="${toX(d.temp)}" y="${toY(d.factor) - 12}" text-anchor="middle" fill="#1F3E7C" font-size="11" font-weight="600">${d.factor}</text>`).join('')}
          <text x="${padL + chartW / 2}" y="${H - 4}" text-anchor="middle" fill="#555" font-size="11">Temperatur Kerja (°C)</text>
          <text x="14" y="${padT + chartH / 2}" text-anchor="middle" fill="#555" font-size="9" transform="rotate(-90, 14, ${padT + chartH / 2})">% Rating Faktor Pengali Tekanan</text>
        </svg>
      </div>
      `;
      })()}

      <!-- Spec Table -->
      <h3 style="font-size:1rem; color:#1F3E7C; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Dimensional Specifications</h3>
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
      ${(() => {
        const isHDPE = p.category === 'hdpe-pipe';
        const certs = isHDPE ? PRODUCTS.hdpeCertifications : PRODUCTS.certifications;
        if (!certs || p.category === 'accessories') return '';
        return `
      <h3 style="font-size:1rem; color:#1F3E7C; margin-top:24px; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Certifications & Compliance</h3>
      <table style="width:100%; margin-bottom:24px; border-collapse:collapse;">
        ${Object.values(certs).map((c, i) => `
          <tr${i % 2 === 1 ? ' style="background:#f8fafc;"' : ''}>
            <td style="padding:6px 12px; font-size:0.8rem; color:#666; width:200px; font-weight:600;">${c.label}</td>
            <td style="padding:6px 12px; font-size:0.8rem;">${c.value}</td>
          </tr>
        `).join('')}
      </table>
      `;
      })()}
    `;
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
    const isSC = isSolventCement(p);
    const selectedSizeData = isSC ? p.sizes : p.sizes.filter(s => state.selectedSizes.includes(s.dn));

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
                ...(profile.address1 ? [{ text: profile.address1 + '\n', fontSize: 8 }] : []),
                ...(profile.address2 ? [{ text: profile.address2 + '\n', fontSize: 8 }] : []),
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
        ...(isSC ? [
          { text: 'Product Description', style: 'sectionTitle', margin: [0, 0, 0, 8] },
          { text: p.description, fontSize: 9, margin: [0, 0, 0, 16] },
          ...(p.advantages ? [
            { text: 'Advantages', style: 'sectionTitle', margin: [0, 0, 0, 8] },
            { ol: p.advantages.map(a => ({ text: a, fontSize: 9 })), margin: [0, 0, 0, 16] }
          ] : [])
        ] : [
          {
            unbreakable: true,
            stack: [
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
              }
            ]
          }
        ]),

        // Material Properties (skip for solvent cement)
        ...(() => {
          if (isSC) return [];
          const isHDPE = p.category === 'hdpe-pipe';
          const matProps = isHDPE ? PRODUCTS.hdpeMaterialProperties : PRODUCTS.materialProperties;
          if (!matProps || p.category === 'accessories') return [];
          const rows = [
            ['Density', matProps.density],
            ...(isHDPE ? [
              ['Melt Flow Rate (MFR)', matProps.meltFlowRate],
              ['Oxidation Induction Time (OIT)', matProps.oxidationInductionTime]
            ] : []),
            ['Tensile Strength @ Yield', matProps.tensileStrength],
            ['Elongation @ Break', matProps.elongationAtBreak],
            ['Modulus of Elasticity', matProps.modulusOfElasticity],
            ...(isHDPE ? [['Vicat Softening Point', matProps.vicatSofteningPoint]] : []),
            ['Coeff. of Thermal Expansion', matProps.thermalExpansion],
            ['Thermal Conductivity', matProps.thermalConductivity],
            ...(isHDPE ? [['Brittleness Temperature', matProps.brittlenessTemperature]] : []),
            ['Max Operating Temperature', matProps.maxOperatingTemp],
            ['Standards & Regulatory Codes', { text: matProps.standard, bold: true }]
          ];
          return [
            {
              unbreakable: true,
              stack: [
                { text: 'Material Properties', style: 'sectionTitle', margin: [0, 0, 0, 10] },
                {
                  table: {
                    headerRows: 1,
                    dontBreakRows: true,
                    widths: ['*', '*'],
                    body: [
                      [{ text: 'Property', style: 'tableHeader' }, { text: 'Value', style: 'tableHeader' }],
                      ...rows
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
              ]
            }
          ];
        })(),

        // Pressure & Temperature Derating Curve (HDPE only)
        ...(() => {
          if (isSC) return [];
          const isHDPE = p.category === 'hdpe-pipe';
          const matProps = isHDPE ? PRODUCTS.hdpeMaterialProperties : null;
          if (!isHDPE || !matProps || !matProps.pressureDerating) return [];
          const dr = matProps.pressureDerating;
          const W = 480, H = 260, padL = 60, padR = 30, padT = 30, padB = 50;
          const chartW = W - padL - padR, chartH = H - padT - padB;
          const xMin = 20, xMax = 40, yMin = 0, yMax = 120;
          const toX = (t) => padL + ((t - xMin) / (xMax - xMin)) * chartW;
          const toY = (f) => padT + chartH - ((f - yMin) / (yMax - yMin)) * chartH;
          const points = dr.map(d => `${toX(d.temp)},${toY(d.factor)}`).join(' ');
          const yTicks = [0, 20, 40, 60, 80, 100, 120];
          const xTicks = [20, 25, 30, 35, 40];
          
          const svgString = `
            <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="font-family:Inter,sans-serif;">
              <rect x="${padL}" y="${padT}" width="${chartW}" height="${chartH}" fill="#f8fafc" rx="4"/>
              ${yTicks.map(y => `<line x1="${padL}" y1="${toY(y)}" x2="${padL + chartW}" y2="${toY(y)}" stroke="#e2e8f0" stroke-width="1"/><text x="${padL - 8}" y="${toY(y) + 4}" text-anchor="end" fill="#888" font-size="10">${y}</text>`).join('')}
              ${xTicks.map(t => `<line x1="${toX(t)}" y1="${padT}" x2="${toX(t)}" y2="${padT + chartH}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4,3"/><text x="${toX(t)}" y="${padT + chartH + 18}" text-anchor="middle" fill="#888" font-size="10">${t}</text>`).join('')}
              <defs><linearGradient id="deratingGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2dd4bf"/><stop offset="100%" stop-color="#14b8a6"/></linearGradient></defs>
              <polyline points="${points}" fill="none" stroke="url(#deratingGrad)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
              ${dr.map(d => `<circle cx="${toX(d.temp)}" cy="${toY(d.factor)}" r="5" fill="#14b8a6" stroke="#fff" stroke-width="2"/><text x="${toX(d.temp)}" y="${toY(d.factor) - 12}" text-anchor="middle" fill="#1F3E7C" font-size="11" font-weight="600">${d.factor}</text>`).join('')}
              <text x="${padL + chartW / 2}" y="${H - 4}" text-anchor="middle" fill="#555" font-size="11">Temperatur Kerja (C)</text>
              <text x="14" y="${padT + chartH / 2}" text-anchor="middle" fill="#555" font-size="9" transform="rotate(-90, 14, ${padT + chartH / 2})">% Rating Faktor Pengali Tekanan</text>
            </svg>
          `;

          return [
            {
              unbreakable: true,
              stack: [
                { text: 'Pressure & Temperature Derating Curve', style: 'sectionTitle', margin: [0, 0, 0, 10] },
                { svg: svgString, width: 500, alignment: 'center', margin: [0, 0, 0, 20] }
              ]
            }
          ];
        })(),

        // Spec Table — different for solvent cement vs pipes
        ...(() => {
          if (isSC) {
            const specs = p.specifications;
            return [
              {
                unbreakable: true,
                stack: [
                  { text: 'Specifications', style: 'sectionTitle', margin: [0, 0, 0, 10] },
                  {
                    table: {
                      headerRows: 1,
                      dontBreakRows: true,
                      widths: ['auto', ...specs.variants.map(() => '*'), '*'],
                      body: [
                        [
                          { text: 'Specification', style: 'tableHeader' },
                          ...specs.variants.map(v => ({ text: v.packaging, style: 'tableHeader', alignment: 'center' })),
                          { text: 'Standard', style: 'tableHeader', alignment: 'center' }
                        ],
                        [
                          { text: 'Color', bold: true },
                          ...specs.variants.map(() => ({ text: 'Clear', alignment: 'center' })),
                          { text: 'Clear', alignment: 'center' }
                        ],
                        [
                          { text: 'Viscosity (cP)', bold: true },
                          ...specs.variants.map(v => ({ text: v.viscosity.replace(' cP',''), alignment: 'center' })),
                          { text: specs.acceptanceCriteria.viscosity, alignment: 'center', fontSize: 7 }
                        ],
                        [
                          { text: 'Specific Gravity (g/cc)', bold: true },
                          ...specs.variants.map(v => ({ text: v.specificGravity.replace(' g/cc',''), alignment: 'center' })),
                          { text: specs.acceptanceCriteria.specificGravity, alignment: 'center' }
                        ],
                        [
                          { text: 'Hydrostatic Test', bold: true },
                          ...specs.variants.map(() => ({ text: 'Ok', alignment: 'center' })),
                          { text: specs.acceptanceCriteria.hydrostaticTest, alignment: 'center' }
                        ],
                        [
                          { text: 'Tensile Test (kgf/cm²)', bold: true },
                          ...specs.variants.map(v => ({ text: v.tensileStrength.replace(' kgf/cm²',''), alignment: 'center' })),
                          { text: specs.acceptanceCriteria.tensileStrength, alignment: 'center' }
                        ]
                      ]
                    },
                    layout: {
                      hLineWidth: () => 0.5,
                      vLineWidth: () => 0.5,
                      hLineColor: () => '#e2e8f0',
                      vLineColor: () => '#e2e8f0',
                      fillColor: (row) => row === 0 ? '#1F3E7C' : (row % 2 === 0 ? '#f8fafc' : null)
                    },
                    margin: [0, 0, 0, 8]
                  },
                  { text: 'Note: Reference ' + specs.standard, fontSize: 7, color: '#666', margin: [0, 0, 0, 20] }
                ]
              }
            ];
          }
          return [
            {
              unbreakable: true,
              stack: [
                { text: 'Dimensional Specifications', style: 'sectionTitle', margin: [0, 0, 0, 10] },
                {
                  table: {
                    headerRows: 1,
                    dontBreakRows: true,
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
                }
              ]
            }
          ];
        })(),

        // Certifications & Compliance (skip for solvent cement)
        ...(() => {
          if (isSC || p.category === 'accessories') return [];
          const isHDPE = p.category === 'hdpe-pipe';
          const certs = isHDPE ? PRODUCTS.hdpeCertifications : PRODUCTS.certifications;
          if (!certs) return [];
          return [
            {
              unbreakable: true,
              stack: [
                { text: 'Certifications & Compliance', style: 'sectionTitle', margin: [0, 0, 0, 10] },
                {
                  table: {
                    headerRows: 1,
                    dontBreakRows: true,
                    widths: ['*', '*'],
                    body: [
                      [{ text: 'Certification', style: 'tableHeader' }, { text: 'Status', style: 'tableHeader' }],
                      ...Object.values(certs).map(c => [{ text: c.label, bold: true }, c.value])
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
              ]
            }
          ];
        })(),

        // Notes
        ...(state.notes ? [
          {
            unbreakable: true,
            stack: [
              { text: 'Notes', style: 'sectionTitle', margin: [0, 10, 0, 8] },
              { text: state.notes, fontSize: 9, color: '#555' }
            ]
          }
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
