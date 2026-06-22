// Rucika TechSheet — Main Application Entry
import { inject } from '@vercel/analytics';
import Router from './router.js';
import Auth from './utils/auth.js';
import LoginScreen from './components/LoginScreen.js';
import Dashboard from './pages/Dashboard.js';
import ProductSelection from './pages/ProductSelection.js';
import CreateDatasheet from './pages/CreateDatasheet.js';
import History from './pages/History.js';
import Settings from './pages/Settings.js';

// Initialize Vercel Web Analytics
inject();

// Register routes
Router.register('/', Dashboard);
Router.register('/products', ProductSelection);
Router.register('/create', CreateDatasheet);
Router.register('/history', History);
Router.register('/settings', Settings);

// Init app with auth check
document.addEventListener('DOMContentLoaded', () => {
  if (Auth.isAuthenticated()) {
    initApp();
  } else {
    LoginScreen(() => initApp());
  }
});

function initApp() {
  // Ensure app is visible
  const app = document.querySelector('.app');
  if (app) app.style.display = '';

  Router.init();

  // Mobile sidebar toggle
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    // Close sidebar on navigation (mobile)
    window.addEventListener('hashchange', () => sidebar.classList.remove('open'));
  }

  // Logout button
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Auth.logout();
      location.reload();
    });
  }

  // Expose emergency reset for console use
  window.__resetPassword = () => Auth.resetToDefault();
}
