import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";

// The first thing the admin sees: each part of the site, how much it holds, and what needs attention.
const isTeacher = (user) => user.isTeacher === true || user.type === "teacher";

function Overview({ openTab }) {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/api/posts/pending"), api.get("/api/announcements/all"), api.get("/api/user")])
      .then(([pending, news, users]) => setRows([
        { tab: "pending", section: "Posts waiting for approval", count: pending.data.length, attention: true },
        { tab: "news", section: "News past the due date, still on the site", attention: true,
          count: news.data.data.filter((item) => item.status === "past-due").length },
        { tab: "news", section: "News and events", count: news.data.data.length },
        { tab: "staff", section: "Teaching staff", count: users.data.data.filter(isTeacher).length },
        { tab: null, section: "User accounts", count: users.data.data.length },
      ]))
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="note">The dashboard could not reach the server. Try again in a minute.</p>;
  if (!rows) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Overview</h2></div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Section</th><th>Items</th><th><span className="sr-only">Open</span></th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.section}>
                <td>{row.section} {row.attention && row.count > 0 && <span className="status status--alert">⚠️ Needs attention</span>}</td>
                <td>{row.count}</td>
                <td className="data-table__actions">
                  {row.tab && (
                    <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => openTab(row.tab)}>
                      Open
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Overview;
