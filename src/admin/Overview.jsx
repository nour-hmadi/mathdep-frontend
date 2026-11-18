import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";

// The first thing the admin sees: what needs attention, and how much is on the site.
function Overview({ openTab }) {
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/api/posts/pending"), api.get("/api/user"), api.get("/api/announcements")])
      .then(([pending, users, news]) => setCounts({
        pending: pending.data.length,
        users: users.data.data.length,
        news: news.data.data.length,
      }))
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="note">The dashboard could not reach the server. Try again in a minute.</p>;
  if (!counts) return <Loader />;

  return (
    <div className="admin-cards">
      <button type="button" className="panel admin-card admin-card--action" onClick={() => openTab("pending")}>
        <strong>{counts.pending}</strong>
        <span>{counts.pending === 1 ? "post waits" : "posts wait"} for approval</span>
      </button>
      <div className="panel admin-card">
        <strong>{counts.users}</strong>
        <span>user accounts</span>
      </div>
      <div className="panel admin-card">
        <strong>{counts.news}</strong>
        <span>news and events</span>
      </div>
    </div>
  );
}

export default Overview;
