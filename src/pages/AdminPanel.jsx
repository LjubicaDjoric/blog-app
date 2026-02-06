import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!title.trim() || !content.trim()) {
      setMsg("Popuni i naslov i sadržaj.");
      return;
    }

    try {
      setLoading(true);

      // Ako šalješ id kao broj, json-server može i sam da dodeli id (najčešće).
      const newPost = {
        title: title.trim(),
        content: content.trim(),
      };

      await axios.post(`${API_URL}/posts`, newPost);

      setTitle("");
      setContent("");
      setMsg("✅ Post je dodat!");
    } catch (err) {
      console.error(err);
      setMsg("❌ Greška pri dodavanju posta. Proveri da li radi json-server.");
    } finally {
      setLoading(false);
    }
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
            placeholder="Unesi naslov..."
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Sadržaj</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: 8, minHeight: 120 }}
            placeholder="Unesi sadržaj..."
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Dodajem..." : "Dodaj post"}
        </button>

        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </form>
    </div>
  );
}

export default AdminPanel;
