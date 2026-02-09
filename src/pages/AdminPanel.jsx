import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Učitaj sve postove
  const loadPosts = async () => {
    const res = await axios.get(`${API_URL}/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Dodavanje novog posta
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title.trim() || !content.trim()) {
      setMessage("❌ Popuni i naslov i sadržaj.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/posts`, {
        title: title.trim(),
        content: content.trim(),
      });

      setTitle("");
      setContent("");
      setMessage("✅ Post je uspešno dodat!");
      loadPosts();
    } catch (err) {
      console.error(err);
      setMessage("❌ Greška pri dodavanju posta.");
    } finally {
      setLoading(false);
    }
  };

  // Brisanje posta
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Da li si sigurna da želiš da obrišeš post?"
    );
    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/posts/${id}`);
    loadPosts();
  };

  return (
    <div>
      <h1>🔧 Admin Panel</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Naslov</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="Unesi naslov"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Sadržaj</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: 8, minHeight: 120 }}
            placeholder="Unesi sadržaj"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Dodajem..." : "Dodaj post"}
        </button>

        {message && <p style={{ marginTop: 10 }}>{message}</p>}
      </form>

      <hr />

      <h2>Svi postovi</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: 8 }}>
            <b>{post.title}</b>{" "}
            
            <Link
              to={`/admin/edit/${post.id}`}
              style={{ marginRight: 10 }}
            >
              ✏️ Edit
            </Link>

            <button onClick={() => handleDelete(post.id)}>
              🗑 Obriši
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
