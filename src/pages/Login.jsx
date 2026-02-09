import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // "user" ili "admin"
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Unesi email i lozinku.");
      return;
    }

    // ✅ Simulacija prijave (backend nije obavezan)
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", role);

    // Ako je admin -> idi na admin panel, inače -> home
    if (role === "admin") navigate("/admin");
    else navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const currentRole = localStorage.getItem("role");

  return (
    <div style={{ padding: 20, maxWidth: 420 }}>
      <h1>🔐 Login</h1>
      <p style={{ color: "#555" }}>
        Ovo je demo login (čuva token i role u localStorage) da bi radila zaštita ruta.
      </p>

      {token ? (
        <div style={{ marginTop: 12 }}>
          <p>
            ✅ Ulogovana si kao: <b>{currentRole || "user"}</b>
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          {error && <p style={{ color: "crimson" }}>{error}</p>}

          <div style={{ marginBottom: 10 }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="npr. ljubica@email.com"
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Unesi lozinku"
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Uloga</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" style={{ padding: "8px 14px" }}>
            Prijavi se
          </button>
        </form>
      )}
    </div>
  );
}
