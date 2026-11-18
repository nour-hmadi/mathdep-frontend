import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";

// Students' posts waiting for approval. Approving one publishes it on the Math Community page.
function PendingPosts() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/posts/pending")
      .then((res) => setPosts(res.data))
      .catch(() => setError("The posts could not be loaded. Try again in a minute."));

  useEffect(() => { load(); }, []);

  const approve = (id) => api.put(`/api/posts/${id}`, { status: true }).then(load);
  const remove = (post) => {
    if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) api.delete(`/api/posts/${post._id}`).then(load);
  };

  if (error) return <p className="note">{error}</p>;
  if (!posts) return <Loader />;
  if (!posts.length) return <p className="empty">No posts are waiting. You're all caught up.</p>;

  return (
    <div className="admin-list">
      {posts.map((post) => (
        <article key={post._id} className="panel">
          <div className="admin-item__meta">
            {post.name || "A student"} · {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <div className="admin-item__actions">
            <button type="button" className="site-button" onClick={() => approve(post._id)}>Approve</button>
            <button type="button" className="site-button site-button--ghost" onClick={() => remove(post)}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PendingPosts;
