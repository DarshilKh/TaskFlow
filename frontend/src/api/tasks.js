const BASE_URL = `${import.meta.env.VITE_API_URL}/api/tasks`

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const json = await res.json()

  if (!res.ok || !json.success) {
    throw new Error(json.message || `Request failed with status ${res.status}`)
  }

  return json.data
}

export const taskApi = {
  getAll: () => request(BASE_URL),
  create: (title) => request(BASE_URL, { method: 'POST', body: JSON.stringify({ title }) }),
  update: (id, patch) => request(`${BASE_URL}/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  delete: (id) => request(`${BASE_URL}/${id}`, { method: 'DELETE' }),
}
