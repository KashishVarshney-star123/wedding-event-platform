let currentUser = null;

// localStorage aur sessionStorage ki saari keys check karo
[sessionStorage, localStorage].forEach((storage) => {
  if (currentUser) return;
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    // Events, bookings, aur registered users list ko skip karo
    if (key === 'wvEvents' || key === 'wvBookings' || key.toLowerCase().includes('users')) continue;
    try {
      const parsed = JSON.parse(storage.getItem(key));
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        if (parsed.name || parsed.fullName || parsed.email) {
          currentUser = parsed;
          break;
        }
      }
    } catch (e) {}
  }
});

const displayName = currentUser
  ? (currentUser.name || currentUser.fullName || currentUser.email.split('@')[0])
  : 'Guest User';

document.getElementById('userName').textContent = displayName + ' · Customer';

// Logout: sirf session keys clear karo (registered accounts delete mat karna!)
document.getElementById('logoutBtn').addEventListener('click', function () {
  sessionStorage.clear();
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.toLowerCase().includes('session') || key.toLowerCase().includes('current')) {
      localStorage.removeItem(key);
    }
  }
});
