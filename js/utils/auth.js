// Rucika TechSheet — Authentication Module
// Password-based access protection with session management

const AUTH_PREFIX = 'rucika_techsheet_';
const SESSION_KEY = 'rucika_techsheet_session';

/**
 * Simple hash function using SubtleCrypto (SHA-256).
 * Falls back to basic hash for environments without crypto.subtle.
 */
async function hashPassword(password) {
  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_rucika_salt_2026');
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback: simple hash for older browsers
  let hash = 0;
  const str = password + '_rucika_salt_2026';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

const Auth = {
  /**
   * Get the stored password hash, or set default if none exists.
   * Default password: rucika2026
   */
  async getPasswordHash() {
    const stored = localStorage.getItem(AUTH_PREFIX + 'password_hash');
    if (stored) return stored;
    // Set default password on first use
    const defaultHash = await hashPassword('rucika2026');
    localStorage.setItem(AUTH_PREFIX + 'password_hash', defaultHash);
    return defaultHash;
  },

  /**
   * Check if user is currently authenticated (session-based).
   * Session is cleared when browser/tab is closed.
   */
  isAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
  },

  /**
   * Attempt login with the given password.
   * Returns true if successful, false otherwise.
   */
  async login(password) {
    const inputHash = await hashPassword(password);
    const storedHash = await this.getPasswordHash();
    if (inputHash === storedHash) {
      sessionStorage.setItem(SESSION_KEY, 'authenticated');
      return true;
    }
    return false;
  },

  /**
   * Logout — clear the session.
   */
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },

  /**
   * Change the password. Requires current password verification.
   * Returns { success: boolean, message: string }
   */
  async changePassword(currentPassword, newPassword) {
    // Verify current password
    const currentHash = await hashPassword(currentPassword);
    const storedHash = await this.getPasswordHash();
    if (currentHash !== storedHash) {
      return { success: false, message: 'Current password is incorrect.' };
    }

    if (newPassword.length < 4) {
      return { success: false, message: 'New password must be at least 4 characters.' };
    }

    const newHash = await hashPassword(newPassword);
    localStorage.setItem(AUTH_PREFIX + 'password_hash', newHash);
    return { success: true, message: 'Password changed successfully!' };
  },

  /**
   * Reset password to default (rucika2026).
   * This can be called from browser console as emergency reset.
   */
  async resetToDefault() {
    const defaultHash = await hashPassword('rucika2026');
    localStorage.setItem(AUTH_PREFIX + 'password_hash', defaultHash);
    sessionStorage.removeItem(SESSION_KEY);
    return 'Password reset to default: rucika2026';
  }
};

export default Auth;
