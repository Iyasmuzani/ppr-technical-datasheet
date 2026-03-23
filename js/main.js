// Rucika TechSheet — Main Application Entry
import Router from './router.js';
import Dashboard from './pages/Dashboard.js';
import ProductSelection from './pages/ProductSelection.js';
import CreateDatasheet from './pages/CreateDatasheet.js';
import History from './pages/History.js';
import Settings from './pages/Settings.js';

// Register routes
Router.register('/', Dashboard);
Router.register('/products', ProductSelection);
Router.register('/create', CreateDatasheet);
Router.register('/history', History);
Router.register('/settings', Settings);

// Init router
document.addEventListener('DOMContentLoaded', () => {
  Router.init();

  // Mobile sidebar toggle
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    // Close sidebar on navigation (mobile)
    window.addEventListener('hashchange', () => sidebar.classList.remove('open'));
  }
});
