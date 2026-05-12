// Rucika TechSheet — Product Database
// Data sourced from official Rucika Kelen Green spreadsheet

const MATERIAL_PROPERTIES = {
  density: '0.91 g/cm³',
  tensileStrength: '40 MPa',
  elongationAtBreak: '800%',
  modulusOfElasticity: '900 N/mm²',
  thermalExpansion: '0.15 mm/m°C',
  thermalConductivity: '0.24 W/m°C',
  maxOperatingTemp: '70 °C',
  standard: 'ISO 15874'
};

const CERTIFICATIONS = {
  localContent: {
    label: 'Local Content (TKDN)',
    value: 'Certified — 30.17% local content'
  },
  permenkes: {
    label: 'Permenkes No. 2 Tahun 2023',
    value: 'Compliant — Safe for drinking water distribution per Indonesian Ministry of Health regulation'
  },
  greenLabel: {
    label: 'Green Label',
    value: 'Certified — Environmentally friendly product, lead-free and recyclable material'
  },
  chemicalResistance: {
    label: 'Chemical Resistance',
    value: 'Excellent resistance to acids, alkalis, and saline solutions. Not suitable for organic solvents.'
  }
};

// HDPE Pipe — Material Properties (PE100)
const HDPE_MATERIAL_PROPERTIES = {
  density: '0.959 g/cm³',
  meltFlowRate: '0.2 – 1.3 g/10 min',
  oxidationInductionTime: '84.01 minutes',
  tensileStrength: '23 MPa',
  elongationAtBreak: '>600%',
  modulusOfElasticity: '1000 MPa',
  vicatSofteningPoint: '124 °C',
  thermalExpansion: '1.3 × 10⁻⁴ mm/m°C',
  thermalConductivity: '0.4 W/m°C',
  brittlenessTemperature: '-100 °C',
  maxOperatingTemp: '40 °C',
  standard: 'SNI 4829:2015',
  // Pressure & Temperature Derating Curve (% Rating vs Operating Temperature)
  pressureDerating: [
    { temp: 20, factor: 100 },
    { temp: 25, factor: 94 },
    { temp: 30, factor: 87 },
    { temp: 35, factor: 81 },
    { temp: 40, factor: 74 }
  ]
};

// HDPE Pipe — Certifications & Compliance
const HDPE_CERTIFICATIONS = {
  localContent: {
    label: 'Local Content (TKDN)',
    value: 'Certified — 55.03% local content'
  },
  sniCertificate: {
    label: 'SNI Certificate',
    value: 'SNI 4829.2:2015 — Certified for PE piping systems'
  },
  permenkes: {
    label: 'Drinking Water Compliance',
    value: 'Compliant — Permenkes No. 2 Tahun 2023'
  },
  greenLabel: {
    label: 'Green Label',
    value: 'Certified — Level Gold'
  },
  antifungi: {
    label: 'Antifungi Certificate',
    value: 'Certified — ASTM G21 standard'
  }
};

const PRODUCTS = {
  materialProperties: MATERIAL_PROPERTIES,
  certifications: CERTIFICATIONS,
  hdpeMaterialProperties: HDPE_MATERIAL_PROPERTIES,
  hdpeCertifications: HDPE_CERTIFICATIONS,

  categories: [
    { id: 'ppr-pipe', name: 'PPR Pipes', icon: '🟢', count: 3 },
    { id: 'fitting', name: 'Fittings', icon: '🔧', count: 3 },
    { id: 'accessories', name: 'Accessories', icon: '⚙️', count: 1 },
    { id: 'hdpe-pipe', name: 'HDPE Pipes', icon: '⚫', count: 6 }
  ],

  items: [
    // ============================================================
    //  KELEN GREEN PN 10
    // ============================================================
    {
      id: 'kelen-green-pn10',
      category: 'ppr-pipe',
      name: 'Kelen Green PN10',
      pnRating: 'PN10',
      pnClass: 'pn10',
      description: 'PPR pipe for cold water systems. Suitable for pressurized chilled water applications.',
      material: 'PP-R (Polypropylene Random)',
      standard: MATERIAL_PROPERTIES.standard,
      application: 'Pressurized Chilled Water',
      maxTemp: MATERIAL_PROPERTIES.maxOperatingTemp,
      sizeRange: '20 - 160 mm',
      color: 'Green with Blue Line',
      image: './assets/products/ppr-pn10.png',
      sizes: [
        { dn: 20, od: 20, wallThickness: 2.3, weightPerM: 0.13, pipeLength: 4 },
        { dn: 25, od: 25, wallThickness: 2.3, weightPerM: 0.17, pipeLength: 4 },
        { dn: 32, od: 32, wallThickness: 2.9, weightPerM: 0.27, pipeLength: 4 },
        { dn: 40, od: 40, wallThickness: 3.7, weightPerM: 0.43, pipeLength: 4 },
        { dn: 50, od: 50, wallThickness: 4.6, weightPerM: 0.67, pipeLength: 4 },
        { dn: 63, od: 63, wallThickness: 5.8, weightPerM: 1.06, pipeLength: 4 },
        { dn: 75, od: 75, wallThickness: 6.8, weightPerM: 1.48, pipeLength: 4 },
        { dn: 90, od: 90, wallThickness: 8.2, weightPerM: 2.12, pipeLength: 4 },
        { dn: 110, od: 110, wallThickness: 10.0, weightPerM: 3.17, pipeLength: 4 },
        { dn: 160, od: 160, wallThickness: 14.6, weightPerM: 6.67, pipeLength: 4 }
      ]
    },

    // ============================================================
    //  KELEN GREEN PN 16
    // ============================================================
    {
      id: 'kelen-green-pn16',
      category: 'ppr-pipe',
      name: 'Kelen Green PN16',
      pnRating: 'PN16',
      pnClass: 'pn16',
      description: 'PPR pipe for hot and cold water systems. Versatile for both pressurized hot and cold water.',
      material: 'PP-R (Polypropylene Random)',
      standard: MATERIAL_PROPERTIES.standard,
      application: 'Pressurized Hot & Cold Water',
      maxTemp: MATERIAL_PROPERTIES.maxOperatingTemp,
      sizeRange: '20 - 160 mm',
      color: 'Green with Yellow Line',
      image: './assets/products/ppr-pn16.png',
      sizes: [
        { dn: 20, od: 20, wallThickness: 2.8, weightPerM: 0.15, pipeLength: 4 },
        { dn: 25, od: 25, wallThickness: 3.5, weightPerM: 0.24, pipeLength: 4 },
        { dn: 32, od: 32, wallThickness: 4.4, weightPerM: 0.38, pipeLength: 4 },
        { dn: 40, od: 40, wallThickness: 5.5, weightPerM: 0.60, pipeLength: 4 },
        { dn: 50, od: 50, wallThickness: 6.9, weightPerM: 0.94, pipeLength: 4 },
        { dn: 63, od: 63, wallThickness: 8.6, weightPerM: 1.46, pipeLength: 4 },
        { dn: 75, od: 75, wallThickness: 10.3, weightPerM: 2.11, pipeLength: 4 },
        { dn: 90, od: 90, wallThickness: 12.3, weightPerM: 3.01, pipeLength: 4 },
        { dn: 110, od: 110, wallThickness: 15.1, weightPerM: 4.53, pipeLength: 4 },
        { dn: 160, od: 160, wallThickness: 21.9, weightPerM: 9.55, pipeLength: 4 }
      ]
    },

    // ============================================================
    //  KELEN GREEN PN 20
    // ============================================================
    {
      id: 'kelen-green-pn20',
      category: 'ppr-pipe',
      name: 'Kelen Green PN20',
      pnRating: 'PN20',
      pnClass: 'pn20',
      description: 'PPR pipe for high-pressure hot water systems. Designed for pressurized hot water applications.',
      material: 'PP-R (Polypropylene Random)',
      standard: MATERIAL_PROPERTIES.standard,
      application: 'Pressurized Hot Water',
      maxTemp: MATERIAL_PROPERTIES.maxOperatingTemp,
      sizeRange: '20 - 160 mm',
      color: 'Green with Red Line',
      image: './assets/products/ppr-pn20.png',
      sizes: [
        { dn: 20, od: 20, wallThickness: 3.4, weightPerM: 0.18, pipeLength: 4 },
        { dn: 25, od: 25, wallThickness: 4.2, weightPerM: 0.28, pipeLength: 4 },
        { dn: 32, od: 32, wallThickness: 5.4, weightPerM: 0.46, pipeLength: 4 },
        { dn: 40, od: 40, wallThickness: 6.7, weightPerM: 0.71, pipeLength: 4 },
        { dn: 50, od: 50, wallThickness: 8.3, weightPerM: 1.10, pipeLength: 4 },
        { dn: 63, od: 63, wallThickness: 10.5, weightPerM: 1.75, pipeLength: 4 },
        { dn: 75, od: 75, wallThickness: 12.5, weightPerM: 2.48, pipeLength: 4 },
        { dn: 90, od: 90, wallThickness: 15.0, weightPerM: 3.56, pipeLength: 4 },
        { dn: 110, od: 110, wallThickness: 18.3, weightPerM: 5.33, pipeLength: 4 },
        { dn: 160, od: 160, wallThickness: 26.6, weightPerM: 11.25, pipeLength: 4 }
      ]
    },

    // ============================================================
    //  FITTINGS
    // ============================================================
    {
      id: 'fitting-elbow-90',
      category: 'fitting',
      name: 'Elbow 90°',
      pnRating: 'PN20',
      pnClass: 'pn20',
      description: '90-degree elbow fitting for PPR pipe direction changes.',
      material: 'PP-R (Polypropylene Random)',
      standard: MATERIAL_PROPERTIES.standard,
      application: 'Direction Change',
      sizeRange: '20 - 63 mm',
      color: 'Green',
      sizes: [
        { dn: 20, od: 20, wallThickness: 3.4, weightPerM: 0.025, pipeLength: null },
        { dn: 25, od: 25, wallThickness: 4.2, weightPerM: 0.042, pipeLength: null },
        { dn: 32, od: 32, wallThickness: 5.4, weightPerM: 0.075, pipeLength: null },
        { dn: 40, od: 40, wallThickness: 6.7, weightPerM: 0.125, pipeLength: null },
        { dn: 50, od: 50, wallThickness: 8.3, weightPerM: 0.210, pipeLength: null },
        { dn: 63, od: 63, wallThickness: 10.5, weightPerM: 0.350, pipeLength: null }
      ]
    },
    {
      id: 'fitting-tee',
      category: 'fitting',
      name: 'Equal Tee',
      pnRating: 'PN20',
      pnClass: 'pn20',
      description: 'Equal tee fitting for PPR pipe branching connections.',
      material: 'PP-R (Polypropylene Random)',
      standard: MATERIAL_PROPERTIES.standard,
      application: 'Branch Connection',
      sizeRange: '20 - 63 mm',
      color: 'Green',
      sizes: [
        { dn: 20, od: 20, wallThickness: 3.4, weightPerM: 0.032, pipeLength: null },
        { dn: 25, od: 25, wallThickness: 4.2, weightPerM: 0.055, pipeLength: null },
        { dn: 32, od: 32, wallThickness: 5.4, weightPerM: 0.098, pipeLength: null },
        { dn: 40, od: 40, wallThickness: 6.7, weightPerM: 0.160, pipeLength: null },
        { dn: 50, od: 50, wallThickness: 8.3, weightPerM: 0.280, pipeLength: null },
        { dn: 63, od: 63, wallThickness: 10.5, weightPerM: 0.450, pipeLength: null }
      ]
    },
    {
      id: 'fitting-coupling',
      category: 'fitting',
      name: 'Coupling / Socket',
      pnRating: 'PN20',
      pnClass: 'pn20',
      description: 'Straight coupling for joining two equal-size PPR pipes.',
      material: 'PP-R (Polypropylene Random)',
      standard: MATERIAL_PROPERTIES.standard,
      application: 'Pipe Joining',
      sizeRange: '20 - 63 mm',
      color: 'Green',
      sizes: [
        { dn: 20, od: 20, wallThickness: 3.4, weightPerM: 0.012, pipeLength: null },
        { dn: 25, od: 25, wallThickness: 4.2, weightPerM: 0.020, pipeLength: null },
        { dn: 32, od: 32, wallThickness: 5.4, weightPerM: 0.035, pipeLength: null },
        { dn: 40, od: 40, wallThickness: 6.7, weightPerM: 0.058, pipeLength: null },
        { dn: 50, od: 50, wallThickness: 8.3, weightPerM: 0.095, pipeLength: null },
        { dn: 63, od: 63, wallThickness: 10.5, weightPerM: 0.155, pipeLength: null }
      ]
    },

    // ============================================================
    //  ACCESSORIES
    // ============================================================
    {
      id: 'acc-pipe-clip',
      category: 'accessories',
      name: 'Pipe Clip',
      pnRating: '-',
      pnClass: 'pn20',
      description: 'Mounting clip for securing PPR pipes to walls and ceilings.',
      material: 'PP (Polypropylene)',
      standard: '-',
      application: 'Pipe Mounting',
      sizeRange: '20 - 63 mm',
      color: 'White',
      sizes: [
        { dn: 20, od: 20, wallThickness: null, weightPerM: 0.005, pipeLength: null },
        { dn: 25, od: 25, wallThickness: null, weightPerM: 0.007, pipeLength: null },
        { dn: 32, od: 32, wallThickness: null, weightPerM: 0.010, pipeLength: null },
        { dn: 40, od: 40, wallThickness: null, weightPerM: 0.014, pipeLength: null },
        { dn: 50, od: 50, wallThickness: null, weightPerM: 0.020, pipeLength: null },
        { dn: 63, od: 63, wallThickness: null, weightPerM: 0.028, pipeLength: null }
      ]
    },

    // ============================================================
    //  HDPE PIPES — Rucika Black
    // ============================================================

    // HDPE SDR 9 (PN20)
    {
      id: 'hdpe-sdr9-pn20',
      category: 'hdpe-pipe',
      name: 'HDPE SDR 9 (PN20)',
      pnRating: 'PN20',
      pnClass: 'pn20',
      description: 'Rucika Black is High Density Polyethylene (HDPE) Pipe with MRS 10.0 (PE100) material which has low degree of cracking, stronger and excellence flexibility. Following ISO 4427 and SNI 4829 standard for plastics piping systems Polyethylene pipes and fittings for water supply.',
      material: 'PE100 (High Density Polyethylene)',
      standard: 'SNI 4829:2015',
      application: 'Water Supply, Sewage Project, Industrial Drainage, Chiller Application, Underground Hydrant Pipe, Mining Dewatering Pipe, Tailing Pipe, Electrical Sub-duct & Conduit',
      maxTemp: '40 °C',
      sizeRange: '20 - 630 mm',
      color: 'Black with Blue Stripe',
      image: './assets/products/hdpe-pipe.png',
      sizes: [
        { dn: 20, od: 20, wallThickness: 2.3, weightPerM: 0.1351, pipeLength: 'Coil (50–300m)' },
        { dn: 25, od: 25, wallThickness: 2.8, weightPerM: 0.2151, pipeLength: 'Coil (50–300m)' },
        { dn: 32, od: 32, wallThickness: 3.6, weightPerM: 0.3336, pipeLength: 'Coil (50-300m)' },
        { dn: 40, od: 40, wallThickness: 4.5, weightPerM: 0.5202, pipeLength: 'Coil (50–200m)' },
        { dn: 50, od: 50, wallThickness: 5.6, weightPerM: 0.8061, pipeLength: 'Coil (50-200m)' },
        { dn: 63, od: 63, wallThickness: 7.1, weightPerM: 1.2862, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 75, od: 75, wallThickness: 8.4, weightPerM: 1.8078, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 90, od: 90, wallThickness: 10.1, weightPerM: 2.6075, pipeLength: '6 / 12' },
        { dn: 110, od: 110, wallThickness: 12.3, weightPerM: 3.8745, pipeLength: '6 / 12' },
        { dn: 125, od: 125, wallThickness: 14.0, weightPerM: 5.0114, pipeLength: '6 / 12' },
        { dn: 140, od: 140, wallThickness: 15.7, weightPerM: 6.2780, pipeLength: '6 / 12' },
        { dn: 160, od: 160, wallThickness: 17.9, weightPerM: 8.1749, pipeLength: '6 / 12' },
        { dn: 180, od: 180, wallThickness: 20.1, weightPerM: 10.3427, pipeLength: '6 / 12' },
        { dn: 200, od: 200, wallThickness: 22.4, weightPerM: 12.7889, pipeLength: '6 / 12' },
        { dn: 225, od: 225, wallThickness: 25.2, weightPerM: 16.1881, pipeLength: '6 / 12' },
        { dn: 250, od: 250, wallThickness: 27.9, weightPerM: 19.8949, pipeLength: '6 / 12' },
        { dn: 280, od: 280, wallThickness: 31.3, weightPerM: 25.0084, pipeLength: '6 / 12' },
        { dn: 315, od: 315, wallThickness: 35.2, weightPerM: 31.6366, pipeLength: '6 / 12' },
        { dn: 355, od: 355, wallThickness: 39.7, weightPerM: 40.1817, pipeLength: '6 / 12' },
        { dn: 400, od: 400, wallThickness: 44.7, weightPerM: 50.9687, pipeLength: '6 / 12' },
        { dn: 450, od: 450, wallThickness: 50.3, weightPerM: 64.5336, pipeLength: '6 / 12' },
        { dn: 500, od: 500, wallThickness: 55.8, weightPerM: 79.5213, pipeLength: '6 / 12' },
        { dn: 560, od: 560, wallThickness: 62.2, weightPerM: 99.7715, pipeLength: '6 / 12' },
        { dn: 630, od: 630, wallThickness: 70.0, weightPerM: 126.2518, pipeLength: '6 / 12' }
      ]
    },

    // HDPE SDR 11 (PN16)
    {
      id: 'hdpe-sdr11-pn16',
      category: 'hdpe-pipe',
      name: 'HDPE SDR 11 (PN16)',
      pnRating: 'PN16',
      pnClass: 'pn16',
      description: 'Rucika Black is High Density Polyethylene (HDPE) Pipe with MRS 10.0 (PE100) material which has low degree of cracking, stronger and excellence flexibility. Following ISO 4427 and SNI 4829 standard for plastics piping systems Polyethylene pipes and fittings for water supply.',
      material: 'PE100 (High Density Polyethylene)',
      standard: 'SNI 4829:2015',
      application: 'Water Supply, Sewage Project, Industrial Drainage, Chiller Application, Underground Hydrant Pipe, Mining Dewatering Pipe, Tailing Pipe, Electrical Sub-duct & Conduit',
      maxTemp: '40 °C',
      sizeRange: '20 - 1200 mm',
      color: 'Black with Blue Stripe',
      image: './assets/products/hdpe-pipe.png',
      sizes: [
        { dn: 20, od: 20, wallThickness: 1.9, weightPerM: 0.1185, pipeLength: 'Coil (50–300m)' },
        { dn: 25, od: 25, wallThickness: 2.3, weightPerM: 0.1734, pipeLength: 'Coil (50–300m)' },
        { dn: 32, od: 32, wallThickness: 2.9, weightPerM: 0.2836, pipeLength: 'Coil (50-300m)' },
        { dn: 40, od: 40, wallThickness: 3.7, weightPerM: 0.4369, pipeLength: 'Coil (50–200m)' },
        { dn: 50, od: 50, wallThickness: 4.6, weightPerM: 0.6772, pipeLength: 'Coil (50-200m)' },
        { dn: 63, od: 63, wallThickness: 5.8, weightPerM: 1.0727, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 75, od: 75, wallThickness: 6.8, weightPerM: 1.4983, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 90, od: 90, wallThickness: 8.2, weightPerM: 2.1736, pipeLength: 'Coil (50m) / 6 / 12' },
        { dn: 110, od: 110, wallThickness: 10.0, weightPerM: 3.2237, pipeLength: 'Coil (50m) / 6 / 12' },
        { dn: 125, od: 125, wallThickness: 11.4, weightPerM: 4.1820, pipeLength: '6 / 12' },
        { dn: 140, od: 140, wallThickness: 12.7, weightPerM: 5.2075, pipeLength: '6 / 12' },
        { dn: 160, od: 160, wallThickness: 14.6, weightPerM: 6.8338, pipeLength: '6 / 12' },
        { dn: 180, od: 180, wallThickness: 16.4, weightPerM: 8.6472, pipeLength: '6 / 12' },
        { dn: 200, od: 200, wallThickness: 18.2, weightPerM: 10.6638, pipeLength: '6 / 12' },
        { dn: 225, od: 225, wallThickness: 20.5, weightPerM: 13.4844, pipeLength: '6 / 12' },
        { dn: 250, od: 250, wallThickness: 22.7, weightPerM: 16.5911, pipeLength: '6 / 12' },
        { dn: 280, od: 280, wallThickness: 25.4, weightPerM: 20.8118, pipeLength: '6 / 12' },
        { dn: 315, od: 315, wallThickness: 28.6, weightPerM: 26.3287, pipeLength: '6 / 12' },
        { dn: 355, od: 355, wallThickness: 32.2, weightPerM: 33.4432, pipeLength: '6 / 12' },
        { dn: 400, od: 400, wallThickness: 36.3, weightPerM: 42.4572, pipeLength: '6 / 12' },
        { dn: 450, od: 450, wallThickness: 40.9, weightPerM: 53.7632, pipeLength: '6 / 12' },
        { dn: 500, od: 500, wallThickness: 45.4, weightPerM: 66.3397, pipeLength: '6 / 12' },
        { dn: 560, od: 560, wallThickness: 50.8, weightPerM: 83.1088, pipeLength: '6 / 12' },
        { dn: 630, od: 630, wallThickness: 57.2, weightPerM: 105.2994, pipeLength: '6 / 12' },
        { dn: 710, od: 710, wallThickness: 64.5, weightPerM: 133.9920, pipeLength: '6 / 12' },
        { dn: 800, od: 800, wallThickness: 72.6, weightPerM: null, pipeLength: '6 / 12' },
        { dn: 900, od: 900, wallThickness: 81.7, weightPerM: null, pipeLength: '6 / 12' },
        { dn: 1000, od: 1000, wallThickness: 90.2, weightPerM: null, pipeLength: '6 / 12' },
        { dn: 1200, od: 1200, wallThickness: 99.4, weightPerM: null, pipeLength: '6 / 12' }
      ]
    },

    // HDPE SDR 13.6 (PN12.5)
    {
      id: 'hdpe-sdr13-pn12',
      category: 'hdpe-pipe',
      name: 'HDPE SDR 13.6 (PN12.5)',
      pnRating: 'PN12.5',
      pnClass: 'pn12',
      description: 'Rucika Black is High Density Polyethylene (HDPE) Pipe with MRS 10.0 (PE100) material which has low degree of cracking, stronger and excellence flexibility. Following ISO 4427 and SNI 4829 standard for plastics piping systems Polyethylene pipes and fittings for water supply.',
      material: 'PE100 (High Density Polyethylene)',
      standard: 'SNI 4829:2015',
      application: 'Water Supply, Sewage Project, Industrial Drainage, Chiller Application, Underground Hydrant Pipe, Mining Dewatering Pipe, Tailing Pipe, Electrical Sub-duct & Conduit',
      maxTemp: '40 °C',
      sizeRange: '50 - 1200 mm',
      color: 'Black with Blue Stripe',
      image: './assets/products/hdpe-pipe.png',
      sizes: [
        { dn: 50, od: 50, wallThickness: 3.7, weightPerM: 0.5594, pipeLength: 'Coil (50-200m)' },
        { dn: 63, od: 63, wallThickness: 4.7, weightPerM: 0.8910, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 75, od: 75, wallThickness: 5.5, weightPerM: 1.2625, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 90, od: 90, wallThickness: 6.6, weightPerM: 1.8087, pipeLength: 'Coil (50m) / 6 / 12' },
        { dn: 110, od: 110, wallThickness: 8.1, weightPerM: 2.6793, pipeLength: 'Coil (50m) / 6 / 12' },
        { dn: 125, od: 125, wallThickness: 9.2, weightPerM: 3.4526, pipeLength: '6 / 12' },
        { dn: 140, od: 140, wallThickness: 10.3, weightPerM: 4.3237, pipeLength: '6 / 12' },
        { dn: 160, od: 160, wallThickness: 11.8, weightPerM: 5.6439, pipeLength: '6 / 12' },
        { dn: 180, od: 180, wallThickness: 13.3, weightPerM: 7.1629, pipeLength: '6 / 12' },
        { dn: 200, od: 200, wallThickness: 14.7, weightPerM: 8.7849, pipeLength: '6 / 12' },
        { dn: 225, od: 225, wallThickness: 16.6, weightPerM: 11.1563, pipeLength: '6 / 12' },
        { dn: 250, od: 250, wallThickness: 18.4, weightPerM: 13.7426, pipeLength: '6 / 12' },
        { dn: 280, od: 280, wallThickness: 20.5, weightPerM: 17.2192, pipeLength: '6 / 12' },
        { dn: 315, od: 315, wallThickness: 23.2, weightPerM: 21.8232, pipeLength: '6 / 12' },
        { dn: 355, od: 355, wallThickness: 26.1, weightPerM: 27.6696, pipeLength: '6 / 12' },
        { dn: 400, od: 400, wallThickness: 29.4, weightPerM: 35.0880, pipeLength: '6 / 12' },
        { dn: 450, od: 450, wallThickness: 33.1, weightPerM: 44.4447, pipeLength: '6 / 12' },
        { dn: 500, od: 500, wallThickness: 36.8, weightPerM: 54.8415, pipeLength: '6 / 12' },
        { dn: 560, od: 560, wallThickness: 41.2, weightPerM: 68.8045, pipeLength: '6 / 12' },
        { dn: 630, od: 630, wallThickness: 46.3, weightPerM: 86.9664, pipeLength: '6 / 12' },
        { dn: 710, od: 710, wallThickness: 52.2, weightPerM: 110.6715, pipeLength: '6 / 12' },
        { dn: 800, od: 800, wallThickness: 58.8, weightPerM: null, pipeLength: '6 / 12' },
        { dn: 900, od: 900, wallThickness: 66.2, weightPerM: null, pipeLength: '6 / 12' },
        { dn: 1000, od: 1000, wallThickness: 72.5, weightPerM: null, pipeLength: '6 / 12' },
        { dn: 1200, od: 1200, wallThickness: 88.2, weightPerM: null, pipeLength: '6 / 12' }
      ]
    },

    // HDPE SDR 17 (PN10)
    {
      id: 'hdpe-sdr17-pn10',
      category: 'hdpe-pipe',
      name: 'HDPE SDR 17 (PN10)',
      pnRating: 'PN10',
      pnClass: 'pn10',
      description: 'Rucika Black is High Density Polyethylene (HDPE) Pipe with MRS 10.0 (PE100) material which has low degree of cracking, stronger and excellence flexibility. Following ISO 4427 and SNI 4829 standard for plastics piping systems Polyethylene pipes and fittings for water supply.',
      material: 'PE100 (High Density Polyethylene)',
      standard: 'SNI 4829:2015',
      application: 'Water Supply, Sewage Project, Industrial Drainage, Chiller Application, Underground Hydrant Pipe, Mining Dewatering Pipe, Tailing Pipe, Electrical Sub-duct & Conduit',
      maxTemp: '40 °C',
      sizeRange: '50 - 1200 mm',
      color: 'Black with Blue Stripe',
      image: './assets/products/hdpe-pipe.png',
      sizes: [
        { dn: 50, od: 50, wallThickness: 3.0, weightPerM: 0.4605, pipeLength: 'Coil (50-200m)' },
        { dn: 63, od: 63, wallThickness: 3.8, weightPerM: 0.7318, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 75, od: 75, wallThickness: 4.5, weightPerM: 1.0304, pipeLength: 'Coil (50-100m) / 6 / 12' },
        { dn: 90, od: 90, wallThickness: 5.4, weightPerM: 1.4886, pipeLength: 'Coil (50m) / 6 / 12' },
        { dn: 110, od: 110, wallThickness: 6.6, weightPerM: 2.2094, pipeLength: 'Coil (50m) / 6 / 12' },
        { dn: 125, od: 125, wallThickness: 7.4, weightPerM: 2.8256, pipeLength: '6 / 12' },
        { dn: 140, od: 140, wallThickness: 8.3, weightPerM: 3.5475, pipeLength: '6 / 12' },
        { dn: 160, od: 160, wallThickness: 9.5, weightPerM: 4.6192, pipeLength: '6 / 12' },
        { dn: 180, od: 180, wallThickness: 10.7, weightPerM: 5.8491, pipeLength: '6 / 12' },
        { dn: 200, od: 200, wallThickness: 11.9, weightPerM: 7.2239, pipeLength: '6 / 12' },
        { dn: 225, od: 225, wallThickness: 13.4, weightPerM: 9.1662, pipeLength: '6 / 12' },
        { dn: 250, od: 250, wallThickness: 14.8, weightPerM: 11.2261, pipeLength: '6 / 12' },
        { dn: 280, od: 280, wallThickness: 16.6, weightPerM: 14.0971, pipeLength: '6 / 12' },
        { dn: 315, od: 315, wallThickness: 18.7, weightPerM: 17.8582, pipeLength: '6 / 12' },
        { dn: 355, od: 355, wallThickness: 21.1, weightPerM: 22.7458, pipeLength: '6 / 12' },
        { dn: 400, od: 400, wallThickness: 23.7, weightPerM: 28.7293, pipeLength: '6 / 12' },
        { dn: 450, od: 450, wallThickness: 26.7, weightPerM: 36.4006, pipeLength: '6 / 12' },
        { dn: 500, od: 500, wallThickness: 29.6, weightPerM: 44.9786, pipeLength: '6 / 12' },
        { dn: 560, od: 560, wallThickness: 33.2, weightPerM: 56.3732, pipeLength: '6 / 12' },
        { dn: 630, od: 630, wallThickness: 37.3, weightPerM: 71.3989, pipeLength: '6 / 12' },
        { dn: 710, od: 710, wallThickness: 42.1, weightPerM: 90.7445, pipeLength: '6 / 12' },
        { dn: 800, od: 800, wallThickness: 47.4, weightPerM: 115.0664, pipeLength: '6 / 12' },
        { dn: 900, od: 900, wallThickness: 53.3, weightPerM: 145.5551, pipeLength: '6 / 12' },
        { dn: 1000, od: 1000, wallThickness: 59.3, weightPerM: 179.8923, pipeLength: '6 / 12' },
        { dn: 1200, od: 1200, wallThickness: 67.9, weightPerM: null, pipeLength: '6 / 12' }
      ]
    },

    // HDPE SDR 21 (PN8)
    {
      id: 'hdpe-sdr21-pn8',
      category: 'hdpe-pipe',
      name: 'HDPE SDR 21 (PN8)',
      pnRating: 'PN8',
      pnClass: 'pn8',
      description: 'Rucika Black is High Density Polyethylene (HDPE) Pipe with MRS 10.0 (PE100) material which has low degree of cracking, stronger and excellence flexibility. Following ISO 4427 and SNI 4829 standard for plastics piping systems Polyethylene pipes and fittings for water supply.',
      material: 'PE100 (High Density Polyethylene)',
      standard: 'SNI 4829:2015',
      application: 'Water Supply, Sewage Project, Industrial Drainage, Chiller Application, Underground Hydrant Pipe, Mining Dewatering Pipe, Tailing Pipe, Electrical Sub-duct & Conduit',
      maxTemp: '40 °C',
      sizeRange: '75 - 1200 mm',
      color: 'Black with Blue Stripe',
      image: './assets/products/hdpe-pipe.png',
      sizes: [
        { dn: 75, od: 75, wallThickness: 3.6, weightPerM: 0.8376, pipeLength: 'Coil (50-100m) / 12' },
        { dn: 90, od: 90, wallThickness: 4.3, weightPerM: 1.2072, pipeLength: '6 / 12' },
        { dn: 110, od: 110, wallThickness: 5.3, weightPerM: 1.8114, pipeLength: '6 / 12' },
        { dn: 125, od: 125, wallThickness: 6.0, weightPerM: 2.3149, pipeLength: '6 / 12' },
        { dn: 140, od: 140, wallThickness: 6.7, weightPerM: 2.8935, pipeLength: '6 / 12' },
        { dn: 160, od: 160, wallThickness: 7.7, weightPerM: 3.7956, pipeLength: '6 / 12' },
        { dn: 180, od: 180, wallThickness: 8.6, weightPerM: 4.7677, pipeLength: '6 / 12' },
        { dn: 200, od: 200, wallThickness: 9.6, weightPerM: 5.9084, pipeLength: '6 / 12' },
        { dn: 225, od: 225, wallThickness: 10.8, weightPerM: 7.4748, pipeLength: '6 / 12' },
        { dn: 250, od: 250, wallThickness: 11.9, weightPerM: 9.1507, pipeLength: '6 / 12' },
        { dn: 280, od: 280, wallThickness: 13.4, weightPerM: 11.5561, pipeLength: '6 / 12' },
        { dn: 315, od: 315, wallThickness: 15.0, weightPerM: 14.5221, pipeLength: '6 / 12' },
        { dn: 355, od: 355, wallThickness: 16.9, weightPerM: 18.4350, pipeLength: '6 / 12' },
        { dn: 400, od: 400, wallThickness: 19.1, weightPerM: 23.5120, pipeLength: '6 / 12' },
        { dn: 450, od: 450, wallThickness: 21.5, weightPerM: 29.7031, pipeLength: '6 / 12' },
        { dn: 500, od: 500, wallThickness: 23.9, weightPerM: 36.6790, pipeLength: '6 / 12' },
        { dn: 560, od: 560, wallThickness: 26.7, weightPerM: 45.8922, pipeLength: '6 / 12' },
        { dn: 630, od: 630, wallThickness: 30.0, weightPerM: 58.0016, pipeLength: '6 / 12' },
        { dn: 710, od: 710, wallThickness: 33.9, weightPerM: 73.9724, pipeLength: '6 / 12' },
        { dn: 800, od: 800, wallThickness: 38.1, weightPerM: 93.7610, pipeLength: '6 / 12' },
        { dn: 900, od: 900, wallThickness: 49.2, weightPerM: 118.6352, pipeLength: '6 / 12' },
        { dn: 1000, od: 1000, wallThickness: 47.7, weightPerM: 146.5708, pipeLength: '6 / 12' },
        { dn: 1200, od: 1200, wallThickness: 57.2, weightPerM: null, pipeLength: '6 / 12' }
      ]
    },

    // HDPE SDR 26 (PN6.3)
    {
      id: 'hdpe-sdr26-pn6',
      category: 'hdpe-pipe',
      name: 'HDPE SDR 26 (PN6.3)',
      pnRating: 'PN6.3',
      pnClass: 'pn6',
      description: 'Rucika Black is High Density Polyethylene (HDPE) Pipe with MRS 10.0 (PE100) material which has low degree of cracking, stronger and excellence flexibility. Following ISO 4427 and SNI 4829 standard for plastics piping systems Polyethylene pipes and fittings for water supply.',
      material: 'PE100 (High Density Polyethylene)',
      standard: 'SNI 4829:2015',
      application: 'Water Supply, Sewage Project, Industrial Drainage, Chiller Application, Underground Hydrant Pipe, Mining Dewatering Pipe, Tailing Pipe, Electrical Sub-duct & Conduit',
      maxTemp: '40 °C',
      sizeRange: '90 - 1200 mm',
      color: 'Black with Blue Stripe',
      image: './assets/products/hdpe-pipe.png',
      sizes: [
        { dn: 90, od: 90, wallThickness: 3.5, weightPerM: 0.9876, pipeLength: '6 / 12' },
        { dn: 110, od: 110, wallThickness: 4.3, weightPerM: 1.4586, pipeLength: '6 / 12' },
        { dn: 125, od: 125, wallThickness: 4.8, weightPerM: 1.8753, pipeLength: '6 / 12' },
        { dn: 140, od: 140, wallThickness: 5.4, weightPerM: 2.3718, pipeLength: '6 / 12' },
        { dn: 160, od: 160, wallThickness: 6.2, weightPerM: 3.1104, pipeLength: '6 / 12' },
        { dn: 180, od: 180, wallThickness: 6.9, weightPerM: 3.8704, pipeLength: '6 / 12' },
        { dn: 200, od: 200, wallThickness: 7.7, weightPerM: 4.7946, pipeLength: '6 / 12' },
        { dn: 225, od: 225, wallThickness: 8.6, weightPerM: 6.0233, pipeLength: '6 / 12' },
        { dn: 250, od: 250, wallThickness: 9.6, weightPerM: 7.4642, pipeLength: '6 / 12' },
        { dn: 280, od: 280, wallThickness: 10.7, weightPerM: 9.3156, pipeLength: '6 / 12' },
        { dn: 315, od: 315, wallThickness: 12.1, weightPerM: 11.8826, pipeLength: '6 / 12' },
        { dn: 355, od: 355, wallThickness: 13.6, weightPerM: 14.9978, pipeLength: '6 / 12' },
        { dn: 400, od: 400, wallThickness: 15.3, weightPerM: 19.0429, pipeLength: '6 / 12' },
        { dn: 450, od: 450, wallThickness: 17.2, weightPerM: 24.0774, pipeLength: '6 / 12' },
        { dn: 500, od: 500, wallThickness: 19.1, weightPerM: 29.7016, pipeLength: '6 / 12' },
        { dn: 560, od: 560, wallThickness: 21.4, weightPerM: 37.2308, pipeLength: '6 / 12' },
        { dn: 630, od: 630, wallThickness: 24.1, weightPerM: 47.1748, pipeLength: '6 / 12' },
        { dn: 710, od: 710, wallThickness: 27.2, weightPerM: 60.0633, pipeLength: '6 / 12' },
        { dn: 800, od: 800, wallThickness: 30.6, weightPerM: 76.0702, pipeLength: '6 / 12' },
        { dn: 900, od: 900, wallThickness: 34.4, weightPerM: 96.5948, pipeLength: '6 / 12' },
        { dn: 1000, od: 1000, wallThickness: 38.2, weightPerM: 118.7183, pipeLength: '6 / 12' },
        { dn: 1200, od: 1200, wallThickness: 45.9, weightPerM: null, pipeLength: '6 / 12' }
      ]
    }
  ]
};

export default PRODUCTS;
