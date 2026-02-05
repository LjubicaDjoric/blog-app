import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_URL}/posts/${id}`);
        setPost(res.data);
      } catch (e) {
        setError("Post nije pronađen ili je došlo do greške.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Nema podataka.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <br />
      <Link to="/posts">← Nazad na sve postove</Link>
    </div>
  );
}

export default PostDetails;
