// Rucika TechSheet — LocalStorage Helpers
const STORAGE_PREFIX = 'rucika_techsheet_';

const Storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) { console.error('Storage write error:', e); }
  },

  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  // Datasheets CRUD
  getDatasheets() {
    return this.get('datasheets') || [];
  },

  saveDatasheet(datasheet) {
    const all = this.getDatasheets();
    datasheet.id = datasheet.id || crypto.randomUUID();
    datasheet.createdAt = datasheet.createdAt || new Date().toISOString();
    datasheet.updatedAt = new Date().toISOString();
    const idx = all.findIndex(d => d.id === datasheet.id);
    if (idx >= 0) all[idx] = datasheet;
    else all.unshift(datasheet);
    this.set('datasheets', all);
    return datasheet;
  },

  deleteDatasheet(id) {
    const all = this.getDatasheets().filter(d => d.id !== id);
    this.set('datasheets', all);
  },

  // Company profile
  getProfile() {
    const defaults = {
      companyName: 'PT. Wahana Duta Jaya Rucika',
      address1: 'Alia Building, 7th Floor, Jl. Ridwan Rais 10-18 (Gambir)',
      address2: 'Jakarta 10110, Indonesia',
      phone: '(021) 386 7717',
      email: 'info@rucika.co.id',
      website: 'www.rucika.co.id'
    };
    const saved = this.get('profile');
    if (!saved) return defaults;
    // Migrate old single 'address' field to address1/address2
    if (saved.address && !saved.address1) {
      // Split the old address: everything before "Jakarta" goes to line 1, the rest to line 2
      const fullAddr = saved.address;
      const splitIdx = fullAddr.indexOf('Jakarta');
      if (splitIdx > 0) {
        saved.address1 = fullAddr.substring(0, splitIdx).trim().replace(/,\s*$/, '');
        saved.address2 = fullAddr.substring(splitIdx).trim();
      } else {
        saved.address1 = fullAddr;
        saved.address2 = '';
      }
      delete saved.address;
      this.set('profile', saved);
    }
    // Filter out undefined/null values so defaults fill in missing fields
    const cleaned = Object.fromEntries(
      Object.entries(saved).filter(([, v]) => v !== undefined && v !== null && v !== '')
    );
    return { ...defaults, ...cleaned };
  },

  saveProfile(profile) {
    this.set('profile', profile);
  }
};

export default Storage;
