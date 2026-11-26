'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const form = $('loginForm'), email = $('loginEmail'), password = $('loginPassword'),
        remember = $('rememberMe'), btn = form.querySelector('.submit-btn');

  const saved = store.get(K.remember);
  if (saved) { email.value = saved; remember.checked = true; }
  bindToggle($('togglePassword'), password);

  const registered = () => say('loginMessage', 'Account created. Please sign in.', 'success');
  if (new URLSearchParams(location.search).get('registered') === '1') registered();
  document.addEventListener('wv:registered', registered);

  $('forgotPassword').addEventListener('click', e => {
    e.preventDefault(); say('loginMessage', 'Password reset needs a backend and verified email.', 'error');
  });
  [email, password].forEach(i => i.addEventListener('input', () => mark(i, false)));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const mail = email.value.trim().toLowerCase(), pass = password.value;
    mark(email, !emailOk(mail)); mark(password, !pass);
    if (!emailOk(mail)) { say('loginMessage', 'Enter a valid email address.', 'error'); return email.focus(); }
    if (!pass) { say('loginMessage', 'Enter your password.', 'error'); return password.focus(); }

    btn.disabled = true;
    try {
      const user = readUsers().find(u => u.email === mail);
      if (!user || user.hash !== await hashPw(pass, user.salt)) {
        mark(password, true); say('loginMessage', 'Invalid email or password.', 'error'); return password.focus();
      }
      remember.checked ? store.set(K.remember, mail) : store.del(K.remember);
      setSession({ name: user.name, email: user.email, role: user.role });
      say('loginMessage', `Welcome back, ${user.name.split(' ')[0]}! Redirecting…`, 'success');
      setTimeout(() => go(user.role === 'customer' ? 'customer-dashboard.html' : 'backend-not-available.html'), 800);
    } catch (err) {
      console.error(err); say('loginMessage', 'Something went wrong. Please try again.', 'error');
    } finally { btn.disabled = false; }
  });
})();
