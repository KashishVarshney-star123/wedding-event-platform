const currentUser = JSON.parse(localStorage.getItem('wvCurrentUser'));

// Guard: only a logged-in customer can see this page
if (!currentUser || currentUser.role !== 'customer') {
  window.location.href = 'login.html';
} else {
  document.getElementById('userName').textContent = currentUser.name + ' · Customer';
}

// Logout: remove the saved session
document.getElementById('logoutBtn').addEventListener('click', function () {
  localStorage.removeItem('wvCurrentUser');
});