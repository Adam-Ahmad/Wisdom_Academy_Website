const API_BASE = process.env.API_BASE || "https://wisdom-academy-website-backend.vercel.app/api";

// Auth Guard
function requireAdmin() {
  const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
  if (!user || user.role !== 'admin') {
    window.location.href = '../login.html';
  }
  return user;
}

// API Fetch Wrapper
async function adminFetch(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  } catch (err) {
    if (err.message.includes('401')) {
      localStorage.clear();
      window.location.href = '../login.html';
    }
    throw err;
  }
}

// Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container') || (() => {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'toast-container';
    document.body.appendChild(div);
    return div;
  })();
  
  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-danger'}"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Dynamic Table Renderer
function renderTable(data, tbodyId, rowTemplate) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = data.length ? data.map(rowTemplate).join('') : '<tr><td colspan="10" class="text-center py-4 text-muted">No records found</td></tr>';
}

// Status Badge Helper
function statusBadge(status) {
  const map = { pending: 'status-pending', approved: 'status-approved', rejected: 'status-rejected' };
  return `<span class="status-badge ${map[status] || 'status-pending'}">${status.toUpperCase()}</span>`;
}

// Initialize Sidebar & User Info
document.addEventListener('DOMContentLoaded', () => {
  const user = requireAdmin();
  const nameEl = document.getElementById('adminName');
  const roleEl = document.getElementById('adminRole');
  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role.toUpperCase();

  // Mobile toggle
  const toggle = document.querySelector('.mobile-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Active nav highlight
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(link => {
    if (link.getAttribute('href')?.includes(currentPage)) {
      link.classList.add('active');
    }
  });
});

// Global Logout
window.handleLogout = () => {
  localStorage.clear();
  window.location.href = '../index.html';
};