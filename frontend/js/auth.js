// Check auth & role, redirect if unauthorized
function requireAuth(allowedRoles = []) {
  const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
  if (!user) return window.location.href = '/login.html';
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return window.location.href = '/index.html';
  }
  return user;
}

// Update navbar based on auth state
function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
  
  const elLogin = document.getElementById('nav-login');
  const elLogout = document.getElementById('nav-logout');
  const elAdmin = document.getElementById('nav-admin');

  if (elLogin) elLogin.style.display = user ? 'none' : 'inline-block';
  if (elLogout) elLogout.style.display = user ? 'inline-block' : 'none';
  if (elAdmin) elAdmin.style.display = (user?.role === 'admin') ? 'inline-block' : 'none';
}

document.addEventListener('DOMContentLoaded', updateAuthUI);

// Global logout function
window.handleLogout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  window.location.href = '/index.html';
};