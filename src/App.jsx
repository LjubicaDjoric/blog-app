import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import AdminPanel from "./pages/AdminPanel";
import EditPost from "./pages/EditPost";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/edit/:id" element={<EditPost />} />
      </Routes>
    </>
  );
}
