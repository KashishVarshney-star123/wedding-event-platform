const USERS_KEY = 'wvUsers';
const SESSION_KEY = 'wvCurrentUser';

function getUsers() {
  const saved = localStorage.getItem(USERS_KEY);
  return saved === null ? [] : JSON.parse(saved);
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = 'form-message ' + type;
}

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Coming from the signup page: show a success message
if (new URLSearchParams(window.location.search).get('registered') === '1') {
  showMessage(loginMessage, 'Account created. Please log in.', 'success');
}

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  const user = getUsers().find((u) => u.email === email && u.password === password);
  if (!user) {
    showMessage(loginMessage, 'Invalid email or password.', 'error');
    return;
  }

  // Save who is logged in (never save the password here)
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    name: user.name,
    email: user.email,
    role: user.role
  }));

  if (user.role === 'customer') {
    window.location.href = 'customer-dashboard.html';
  } else {
    window.location.href = 'backend-not-available.html';
  }
});
