// Check multiple possible keys used by login/signup
const possibleKeys = ['wvCurrentUser', 'currentUser', 'loggedInUser', 'user', 'wedvistaUser'];
let currentUser = null;

for (const key of possibleKeys) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object') {
        currentUser = parsed;
        break;
      }
    } catch (e) {}
  }
}

// Fallback sirf tab jab koi bhi user logged-in na ho
if (!currentUser) {
  currentUser = { name: 'Guest User', role: 'customer' };
}

// Name extract karo (chahe name, fullName, username, ya email se save hua ho)
const displayName =
  currentUser.name ||
  currentUser.fullName ||
  currentUser.username ||
  (currentUser.email ? currentUser.email.split('@')[0] : 'Customer');

document.getElementById('userName').textContent = displayName + ' · Customer';

// Logout: saare possible session keys clear karo
document.getElementById('logoutBtn').addEventListener('click', function () {
  possibleKeys.forEach((key) => localStorage.removeItem(key));
});
