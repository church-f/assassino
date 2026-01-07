const API = import.meta.env.VITE_API_URL;

export async function apiFetch(path, { method="GET", body, headers } = {}, cb, cbErr) {
  const res = await fetch(`${API}${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`);
    err.status = res.status;
    if(cbErr) cbErr(err, res);
    // showToast({ open: true, message: err.message, severity: 'error' });
    throw err;
  }else{
    if(cb) cb(data, res);
  }
  return data;
}
