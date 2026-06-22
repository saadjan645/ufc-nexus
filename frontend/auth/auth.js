import { api, storage } from '../components/api.js';
import { toast } from '../components/toast.js';
import { mountLoader } from '../components/loader.js';
import { initAnimations } from '../components/animations.js';

mountLoader();
initAnimations();

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const forgotBtn = document.getElementById('forgotBtn');
const passwordHint = document.getElementById('passwordHint');

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = Object.fromEntries(new FormData(loginForm));

  try {
    const d = await api('/auth/login', {
      method: 'POST',
      body
    });

    storage.setToken(d.token, body.remember === 'on');
    storage.setUser(d.user, body.remember === 'on');

    toast('Signed in. Welcome to the arena', 'success');

    setTimeout(() => {
      location.href = d.user.role === 'admin'
        ? '../admin/admin.html'
        : '../profile/profile.html';
    }, 700);
  } catch (err) {
    console.error('Login error:', err);
    toast(err.message, 'error');
  }
});

forgotBtn?.addEventListener('click', async () => {
  const email = loginForm?.email?.value;

  if (!email) {
    return toast('Enter email first', 'error');
  }

  try {
    await api('/auth/forgot-password', {
      method: 'POST',
      body: { email }
    });

    toast('Reset flow queued', 'success');
  } catch (err) {
    console.error('Forgot password error:', err);
    toast(err.message, 'error');
  }
});

signupForm?.addEventListener('input', () => {
  if (!passwordHint) return;

  const p = signupForm.password.value;
  const c = signupForm.confirmPassword.value;

  const strong = p.length >= 8 && /[A-Z]/.test(p) && /\d/.test(p);

  if (!strong) {
    passwordHint.textContent = 'Use 8+ characters with a capital letter and number.';
    passwordHint.style.color = '#ffcc66';
    return;
  }

  if (p !== c) {
    passwordHint.textContent = 'Strong password. Confirm must match.';
    passwordHint.style.color = '#ffcc66';
    return;
  }

  passwordHint.textContent = 'Strong password. Passwords match.';
  passwordHint.style.color = '#59ffa0';
});

signupForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = Object.fromEntries(new FormData(signupForm));

  if (body.password !== body.confirmPassword) {
    return toast('Passwords do not match', 'error');
  }

  try {
    const d = await api('/auth/signup', {
      method: 'POST',
      body
    });

    storage.setToken(d.token);
    storage.setUser(d.user);

    toast('Account created', 'success');

    setTimeout(() => {
      location.href = '../profile/profile.html';
    }, 700);
  } catch (err) {
    console.error('Signup error:', err);
    toast(err.message, 'error');
  }
});