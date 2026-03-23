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
    value: 'Certified — Meets Indonesian TKDN requirements for local content compliance'
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

const PRODUCTS = {
  materialProperties: MATERIAL_PROPERTIES,
  certifications: CERTIFICATIONS,

  categories: [
    { id: 'ppr-pipe', name: 'PPR Pipes', icon: '🟢', count: 3 },
    { id: 'fitting', name: 'Fittings', icon: '🔧', count: 3 },
    { id: 'accessories', name: 'Accessories', icon: '⚙️', count: 1 }
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
      pnRating: 'PN16',
      pnClass: 'pn16',
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
      pnRating: 'PN16',
      pnClass: 'pn16',
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
      pnRating: 'PN16',
      pnClass: 'pn16',
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
      pnClass: 'pn10',
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
    }
  ]
};

export default PRODUCTS;
