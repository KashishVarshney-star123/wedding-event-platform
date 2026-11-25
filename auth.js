'use strict';
// Shared helpers for login.js and signup.js. Load this BEFORE them.
const K = { users: 'wvUsers', session: 'wvCurrentUser', remember: 'wvRememberedEmail' };
let memUsers = []; // fallback if the browser blocks storage

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};
function readUsers() {
  try { const v = JSON.parse(store.get(K.users) || '[]'); if (Array.isArray(v) && v.length) return v; } catch {}
  return memUsers;
}
function writeUsers(u) { memUsers = u; return store.set(K.users, JSON.stringify(u)); }
function setSession(s) { try { sessionStorage.setItem(K.session, JSON.stringify(s)); } catch {} }

// Salted SHA-256 (demo-level; real apps hash on the server with bcrypt/argon2)
async function hashPw(pw, salt) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + pw));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
const newSalt = () => [...crypto.getRandomValues(new Uint8Array(12))].map(b => b.toString(16).padStart(2, '0')).join('');

const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
function say(id, text, type) { const el = document.getElementById(id); el.textContent = text; el.className = 'form-message ' + (type || ''); }
function mark(input, bad) { input.closest('.input-wrapper').classList.toggle('invalid', !!bad); }
function bindToggle(btn, ...inputs) {
  btn.addEventListener('click', () => {
    const show = inputs[0].type === 'password';
    inputs.forEach(i => i.type = show ? 'text' : 'password');
    btn.textContent = show ? 'Hide' : 'Show'; btn.setAttribute('aria-pressed', String(show));
  });
}
// Navigation (the live preview overrides window.__nav)
const go = url => window.__nav ? window.__nav(url) : (location.href = url);
