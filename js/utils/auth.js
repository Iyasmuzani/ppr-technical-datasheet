// Rucika TechSheet — Authentication Module
// Password-based access protection with session management

const AUTH_PREFIX = 'rucika_techsheet_';
const SESSION_KEY = 'rucika_techsheet_session';
const SALT = '_rucika_salt_2026';
const SALT_VERSION = '2';  // Increment this when changing SALT to auto-invalidate old hashes
const DEFAULT_PASSWORD = 'rucika2026';

/**
 * Simple hash function using SubtleCrypto (SHA-256).
 * Falls back to basic hash for environments without crypto.subtle.
 */
async function hashPassword(password) {
  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + SALT);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback: simple hash for older browsers
  let hash = 0;
  const str = password + SALT;
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
   * Also checks salt version — if the salt changed, old hash is invalidated
   * and reset to the default password.
   */
  async getPasswordHash() {
    const storedVersion = localStorage.getItem(AUTH_PREFIX + 'salt_version');

    // If salt version changed (or never set), invalidate old hash and reset
    if (storedVersion !== SALT_VERSION) {
      console.log('[Auth] Salt version changed, resetting to default password.');
      localStorage.removeItem(AUTH_PREFIX + 'password_hash');
      localStorage.setItem(AUTH_PREFIX + 'salt_version', SALT_VERSION);
    }

    const stored = localStorage.getItem(AUTH_PREFIX + 'password_hash');
    if (stored) return stored;

    // Set default password on first use
    const defaultHash = await hashPassword(DEFAULT_PASSWORD);
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
    const defaultHash = await hashPassword(DEFAULT_PASSWORD);
    localStorage.setItem(AUTH_PREFIX + 'password_hash', defaultHash);
    localStorage.setItem(AUTH_PREFIX + 'salt_version', SALT_VERSION);
    sessionStorage.removeItem(SESSION_KEY);
    return 'Password reset to default: ' + DEFAULT_PASSWORD;
  }
};

export default Auth;
