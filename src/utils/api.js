export async function registerUser(name, email, password) {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "student", 
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Registration failed");
  return data;
}
