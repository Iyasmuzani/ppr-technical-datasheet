// Rucika TechSheet — Login Screen Component
import Auth from '../utils/auth.js';

export default function LoginScreen(onSuccess) {
  const app = document.querySelector('.app');
  const body = document.body;

  // Hide main app
  if (app) app.style.display = 'none';

  // Create login overlay
  const overlay = document.createElement('div');
  overlay.id = 'login-screen';
  overlay.className = 'login-screen';
  overlay.innerHTML = `
    <div class="login-backdrop"></div>
    <div class="login-container">
      <div class="login-card">
        <div class="login-card__glow"></div>
        <div class="login-card__content">
          <!-- Logo & Brand -->
          <div class="login-brand">
            <div class="login-brand__logo-wrapper">
              <img src="assets/logo-rucika.png" alt="Rucika" class="login-brand__logo">
            </div>
            <h1 class="login-brand__title">
              Rucika<span>TechSheet</span>
            </h1>
            <p class="login-brand__subtitle">Technical Datasheet Generator</p>
          </div>

          <!-- Login Form -->
          <form class="login-form" id="login-form" autocomplete="off">
            <div class="login-form__group">
              <label class="login-form__label" for="login-password">
                <span class="login-form__label-icon">🔒</span>
                Password
              </label>
              <div class="login-form__input-wrapper">
                <input
                  type="password"
                  id="login-password"
                  class="login-form__input"
                  placeholder="Enter access password"
                  autocomplete="current-password"
                  autofocus
                >
                <button type="button" class="login-form__toggle-pw" id="toggle-password" title="Show password">
                  👁️
                </button>
              </div>
              <div class="login-form__error" id="login-error"></div>
            </div>

            <button type="submit" class="login-form__submit" id="login-submit">
              <span class="login-form__submit-text">Sign In</span>
              <span class="login-form__submit-loader" style="display:none;">
                <span class="spinner"></span>
              </span>
            </button>
          </form>

          <!-- Footer -->
          <div class="login-footer">
            <div class="login-footer__badge">
              <span class="login-footer__lock">🛡️</span>
              Restricted Access — Authorized Personnel Only
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="login-particles">
        <div class="particle particle--1"></div>
        <div class="particle particle--2"></div>
        <div class="particle particle--3"></div>
        <div class="particle particle--4"></div>
        <div class="particle particle--5"></div>
      </div>
    </div>
  `;

  body.appendChild(overlay);

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('login-screen--visible');
  });

  // Toggle password visibility
  const toggleBtn = overlay.querySelector('#toggle-password');
  const passwordInput = overlay.querySelector('#login-password');
  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.textContent = isPassword ? '🙈' : '👁️';
  });

  // Handle form submit
  const form = overlay.querySelector('#login-form');
  const errorEl = overlay.querySelector('#login-error');
  const submitBtn = overlay.querySelector('#login-submit');
  const submitText = overlay.querySelector('.login-form__submit-text');
  const submitLoader = overlay.querySelector('.login-form__submit-loader');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = passwordInput.value.trim();

    if (!password) {
      showError('Please enter a password.');
      shakeInput();
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoader.style.display = 'inline-flex';
    errorEl.textContent = '';
    errorEl.classList.remove('login-form__error--visible');

    // Simulate slight delay for UX
    await new Promise(r => setTimeout(r, 400));

    const success = await Auth.login(password);

    if (success) {
      // Success animation
      overlay.classList.add('login-screen--success');
      await new Promise(r => setTimeout(r, 600));

      // Remove login screen and show app
      overlay.classList.remove('login-screen--visible');
      await new Promise(r => setTimeout(r, 400));

      if (app) app.style.display = '';
      overlay.remove();

      if (onSuccess) onSuccess();
    } else {
      submitBtn.disabled = false;
      submitText.style.display = '';
      submitLoader.style.display = 'none';
      showError('Incorrect password. Please try again.');
      shakeInput();
      passwordInput.select();
    }
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.add('login-form__error--visible');
  }

  function shakeInput() {
    passwordInput.classList.add('shake');
    setTimeout(() => passwordInput.classList.remove('shake'), 500);
  }

  // Focus password input
  setTimeout(() => passwordInput.focus(), 100);
}
