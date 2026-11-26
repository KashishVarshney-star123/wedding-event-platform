'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const form = $('registerForm'), name = $('signupName'), email = $('signupEmail'), password = $('signupPassword'),
        confirm = $('confirmPassword'), role = $('signupRole'), terms = $('acceptTerms'),
        bar = $('meterBar'), btn = form.querySelector('.submit-btn');

  bindToggle($('toggleSignupPassword'), password, confirm);

  password.addEventListener('input', () => {
    const p = password.value;
    const s = (p.length >= 8) + (/[a-z]/.test(p) && /[A-Z]/.test(p)) + /\d/.test(p) + /[^A-Za-z0-9]/.test(p);
    bar.style.width = (p ? Math.max(s, 1) * 25 : 0) + '%';
    bar.style.background = ['#a33b3b', '#a33b3b', '#d09a2c', '#7a9a4a', '#3f6644'][p ? s : 0];
  });
  [name, email, password, confirm].forEach(i => i.addEventListener('input', () => mark(i, false)));

  function fail(input, text) { mark(input, true); say('signupMessage', text, 'error'); input.focus(); return false; }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fullName = name.value.trim().replace(/\s+/g, ' '), mail = email.value.trim().toLowerCase(), pass = password.value;
    if (fullName.length < 2) return fail(name, 'Enter your full name.');
    if (!emailOk(mail)) return fail(email, 'Enter a valid email address.');
    if (pass.length < 8 || !/[A-Za-z]/.test(pass) || !/\d/.test(pass)) return fail(password, 'Use 8+ characters with at least one letter and one number.');
    if (pass !== confirm.value) return fail(confirm, 'Passwords do not match.');
    if (!['customer', 'vendor'].includes(role.value)) return fail(role, 'Select a valid account type.');
    if (!terms.checked) { say('signupMessage', 'Please accept the terms to continue.', 'error'); return terms.focus(); }

    const users = readUsers();
    if (users.some(u => u.email === mail)) return fail(email, 'This email is already registered.');

    btn.disabled = true;
    try {
      const salt = newSalt();
      users.push({ name: fullName, email: mail, role: role.value, salt, hash: await hashPw(pass, salt) });
      if (!writeUsers(users)) say('signupMessage', 'Storage is blocked, so this account only lasts until you close the tab.', 'error');
      go('login.html?registered=1');
    } catch (err) {
      console.error(err); say('signupMessage', 'Something went wrong. Please try again.', 'error');
    } finally { btn.disabled = false; }
  });
})();
