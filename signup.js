const USERS_KEY = 'wvUsers';

function getUsers() {
  const saved = localStorage.getItem(USERS_KEY);
  return saved === null ? [] : JSON.parse(saved);
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = 'form-message ' + type;
}

const registerForm = document.getElementById('registerForm');
const signupMessage = document.getElementById('signupMessage');

registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;
  const role = document.getElementById('signupRole').value;

  if (name === '') {
    showMessage(signupMessage, 'Please enter your name.', 'error');
    return;
  }
  if (password.length < 6) {
    showMessage(signupMessage, 'Password must be at least 6 characters.', 'error');
    return;
  }

  const users = getUsers();
  const alreadyExists = users.some((u) => u.email === email);
  if (alreadyExists) {
    showMessage(signupMessage, 'An account with this email already exists.', 'error');
    return;
  }

  users.push({ name, email, password, role });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Go to the login page with a success message
  window.location.href = 'login.html?registered=1';
});
