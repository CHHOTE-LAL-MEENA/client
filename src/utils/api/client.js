const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function api(path, { method = "GET", body, token, headers } = {}) {
  const auth = token || JSON.parse(localStorage.getItem("auth") || "{}")?.token;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data?.msg ||
      data?.message ||
      data?.error ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}
