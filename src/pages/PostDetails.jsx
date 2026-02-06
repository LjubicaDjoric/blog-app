import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setError("");
        const res = await axios.get(`${API_URL}/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError("Post nije pronađen ili server nije pokrenut.");
      }
    }

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/posts">← Nazad na listu</Link>
      </div>
    );
  }

  if (!post) return <p>Učitavanje...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <br />
      <Link to="/posts">← Nazad na listu</Link>
    </div>
  );
}

export default PostDetails;
