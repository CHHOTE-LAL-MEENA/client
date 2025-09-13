import { store } from "../../redux/store"; 
export async function fetchWithAuth(url, options = {}) {
  const token = store.getState().user?.token;

  const res = await fetch(`http://localhost:5000/api${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
