import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import { formatDate, time } from "./format";

// Students' posts waiting for approval. Approving one publishes it on the Math Community page.
function PendingPosts() {
  const [posts, setPosts] = useState(null);
  const [message, setMessage] = useState("");

  const load = () =>
    api.get("/api/posts/pending")
      .then((res) => setPosts(res.data))
      .catch(() => { setPosts([]); setMessage("The posts could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const approve = (post) =>
    api.put(`/api/posts/${post._id}`, { status: true })
      .then(() => { setMessage(`"${post.title}" is now on the Math Community page.`); load(); });

  const remove = (post) => {
    if (window.confirm(`Delete "${post.title}"? This cannot be undone.`))
      api.delete(`/api/posts/${post._id}`).then(() => { setMessage(`"${post.title}" was deleted.`); load(); });
  };

  if (!posts) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Pending posts</h2></div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={posts}
        searchPlaceholder="Search posts…"
        empty="No posts are waiting. You're all caught up."
        columns={[
          { key: "createdAt", label: "Sent", value: (post) => time(post.createdAt), text: (post) => formatDate(post.createdAt) },
          { key: "name", label: "Author", value: (post) => post.name || "A student" },
          { key: "title", label: "Title" },
          { key: "description", label: "Post",
            render: (post) => <span className="data-table__text" title={post.description}>{post.description}</span> },
        ]}
        actions={(post) => (
          <>
            <button type="button" className="admin-button admin-button--small" onClick={() => approve(post)}>Approve</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(post)}>Delete</button>
          </>
        )}
      />
    </>
  );
}

export default PendingPosts;
