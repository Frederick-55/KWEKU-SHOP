// RetailConnect - Account Page
(function() {
  const nameEl = document.getElementById('accountName');
  const emailEl = document.getElementById('accountEmail');

  const user = JSON.parse(localStorage.getItem('retailconnect_user') || '{}');
  if (user.name) {
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email || 'Logged in';
  }
})();
