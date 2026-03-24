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
    return this.get('profile') || {
      companyName: 'PT. Wahana Duta Jaya Rucika',
      address: 'Alia Building, 7th Floor, Jl. Ridwan Rais 10-18 (Gambir) Jakarta 10110, Indonesia',
      phone: '(021) 386 7717',
      email: 'info@rucika.co.id',
      website: 'www.rucika.co.id'
    };
  },

  saveProfile(profile) {
    this.set('profile', profile);
  }
};

export default Storage;
