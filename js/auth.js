let currentUser = JSON.parse(localStorage.getItem('wvCurrentUser'));

// Agar login se data nahi aaya toh default customer set kar do
if (!currentUser || currentUser.role !== 'customer') {
  currentUser = { name: 'Kashish', role: 'customer' };
  localStorage.setItem('wvCurrentUser', JSON.stringify(currentUser));
}

document.getElementById('userName').textContent = currentUser.name + ' · Customer';

// Logout: remove the saved session
document.getElementById('logoutBtn').addEventListener('click', function () {
  localStorage.removeItem('wvCurrentUser');
});