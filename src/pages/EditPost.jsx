import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API_URL}/posts/${id}`);
        setTitle(res.data.title || "");
        setContent(res.data.content || "");
      } catch (e) {
        setError("Ne mogu da učitam post. Proveri da li radi json-server.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Naslov i sadržaj su obavezni.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await axios.put(`${API_URL}/posts/${id}`, {
        title: title.trim(),
        content: content.trim(),
      });

      navigate("/admin");
    } catch (e) {
      setError("Greška pri čuvanju. Proveri json-server.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div>
      <h1>✏️ Edit posta</h1>

      <p>
        <Link to="/admin">← Nazad na Admin</Link>
      </p>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Naslov</label>
          <br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Unesi naslov"
            style={{ width: 420, padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Sadržaj</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Unesi sadržaj"
            rows={6}
            style={{ width: 420, padding: 8 }}
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Čuvam..." : "Sačuvaj izmene"}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
