const BASE = '/api'

function getToken() {
  return localStorage.getItem('admin_token')
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` }
}

async function request(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401) {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
    return
  }
  return res.json()
}

export const api = {
  login: (password) =>
    fetch(BASE + '/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).then(r => r.json()),

  // Doctors
  getDoctors: () => fetch(BASE + '/doctors').then(r => r.json()),
  createDoctor: (d) => request('POST', '/doctors', d),
  updateDoctor: (id, d) => request('PUT', `/doctors/${id}`, d),
  deleteDoctor: (id) => request('DELETE', `/doctors/${id}`),

  // Services
  getServices: () => fetch(BASE + '/services').then(r => r.json()),
  createService: (s) => request('POST', '/services', s),
  updateService: (id, s) => request('PUT', `/services/${id}`, s),
  deleteService: (id) => request('DELETE', `/services/${id}`),

  // Content
  getContent: () => fetch(BASE + '/content').then(r => r.json()),
  updateContent: (section, data) => request('PUT', `/content/${section}`, data),
}
