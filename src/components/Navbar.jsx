import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/posts" style={{ marginRight: 10 }}>Posts</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
