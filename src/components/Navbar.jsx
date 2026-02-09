import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginAsUser = () => {
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", "user");
    navigate("/posts");
  };

  const loginAsAdmin = () => {
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", "admin");
    navigate("/admin");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <p>Demo login (bez pravog backenda):</p>

      <button onClick={loginAsUser}>Login kao User</button>
      <button onClick={loginAsAdmin} style={{ marginLeft: 10 }}>
        Login kao Admin
      </button>

      <div style={{ marginTop: 20 }}>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
