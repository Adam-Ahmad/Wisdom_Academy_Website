const API_BASE = process.env.API_BASE || "https://wisdom-academy-website-backend.vercel.app/api";

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        window.location.href = '/login.html';
      }
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}