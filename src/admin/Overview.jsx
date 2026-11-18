import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import { describe } from "./actions";
import { formatDate } from "./format";

// The first thing the admin sees: their own most frequent actions (shortcuts),
// what needs attention, how much each part of the site holds, and the recent changes by any admin.
const isTeacher = (user) => user.isTeacher === true || user.type === "teacher";

function OpenButton({ tab, openTab, label = "Open" }) {
  if (!tab) return null;
  return (
    <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => openTab(tab)}>
      {label}
    </button>
  );
}

function Overview({ openTab }) {
  const [rows, setRows] = useState(null);
  const [top, setTop] = useState([]);
  const [recent, setRecent] = useState([]);
  const [extra, setExtra] = useState({ unread: 0, subscribers: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/api/posts/pending"), api.get("/api/announcements/all"), api.get("/api/user")])
      .then(([pending, news, users]) => setRows([
        { tab: "pending", section: "Posts waiting for approval", count: pending.data.length, attention: true },
        { tab: "news", section: "News past the due date, still on the site", attention: true,
          count: news.data.data.filter((item) => item.status === "past-due").length },
        { tab: "news", section: "News and events", count: news.data.data.length },
        { tab: "staff", section: "Teaching staff", count: users.data.data.filter(isTeacher).length },
        { tab: "users", section: "User accounts", count: users.data.data.length },
      ]))
      .catch(() => setError(true));
    Promise.all([api.get("/api/messages"), api.get("/api/subscribers")])
      .then(([messages, subscribers]) => setExtra({ unread: messages.data.data.filter((item) => !item.read).length,
                                                    subscribers: subscribers.data.data.length }))
      .catch(() => {});
    api.get("/api/activity/me/top").then((res) => setTop(res.data.data)).catch(() => {});
    api.get("/api/activity/recent").then((res) => setRecent(res.data.data)).catch(() => {});
  }, []);

  if (error) return <p className="note">The dashboard could not reach the server. Try again in a minute.</p>;
  if (!rows) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Overview</h2></div>

      <section className="admin-section">
        <h3>Your most frequent actions</h3>
        <p className="admin-form__hint">In the last 30 days, most frequent first. Each admin sees their own.</p>
        {top.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Action</th><th>Times</th><th><span className="sr-only">Open</span></th></tr></thead>
              <tbody>
                {top.map(({ action, count }) => {
                  const [label, tab] = describe(action);
                  return (
                    <tr key={action}>
                      <td>{label}</td>
                      <td>{count}</td>
                      <td className="data-table__actions"><OpenButton tab={tab} openTab={openTab} label="Go" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : <p className="empty">Nothing yet: your shortcuts appear here as you work.</p>}
      </section>

      <section className="admin-section">
        <h3>The site today</h3>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Section</th><th>Items</th><th><span className="sr-only">Open</span></th></tr></thead>
            <tbody>
              {[...rows.slice(0, 1),
                { tab: "messages", section: "New messages from the Contact page", count: extra.unread, attention: true },
                ...rows.slice(1),
                { tab: "newsletter", section: "Newsletter subscribers", count: extra.subscribers }].map((row) => (
                <tr key={row.section}>
                  <td>{row.section} {row.attention && row.count > 0 && <span className="status status--alert">⚠️ Needs attention</span>}</td>
                  <td>{row.count}</td>
                  <td className="data-table__actions"><OpenButton tab={row.tab} openTab={openTab} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-section">
        <h3>Recent changes</h3>
        <p className="admin-form__hint">The last 15 changes by any admin.</p>
        {recent.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>When</th><th>Who</th><th>What</th></tr></thead>
              <tbody>
                {recent.map((item) => (
                  <tr key={item._id}>
                    <td>{formatDate(item.createdAt)}, {new Date(item.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</td>
                    <td>{item.admin}</td>
                    <td>{describe(item.action)[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="empty">No changes recorded yet.</p>}
      </section>
    </>
  );
}

export default Overview;
