import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";

// News and events, shown on the News and events page and on the home page.
// The admin adds, edits and deletes them here.
const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
const EMPTY = { title: "", type: "announcement", day: "", month: MONTHS[new Date().getMonth()], description: "" };

function News() {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);   // null while adding a new item
  const [message, setMessage] = useState("");

  const load = () =>
    api.get("/api/announcements")
      .then((res) => setItems([...res.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      .catch(() => { setItems([]); setMessage("The news could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const reset = () => { setForm(EMPTY); setEditingId(null); };

  const save = (event) => {
    event.preventDefault();
    const request = editingId ? api.put(`/api/announcements/${editingId}`, form) : api.post("/api/announcements", form);
    request
      .then(() => { setMessage(editingId ? "Changes saved." : "Published."); reset(); load(); })
      .catch(() => setMessage("It could not be saved. Check every field and try again."));
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({ title: item.title, type: item.type, day: item.day, month: item.month, description: item.description });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = (item) => {
    if (window.confirm(`Delete "${item.title}"? This cannot be undone.`)) api.delete(`/api/announcements/${item._id}`).then(load);
  };

  return (
    <>
      <form className="panel admin-form" onSubmit={save}>
        <h3>{editingId ? "Edit" : "Add news or an event"}</h3>
        <label>Title<input name="title" value={form.title} onChange={change} required /></label>
        <div className="admin-form__row">
          <label>Type
            <select name="type" value={form.type} onChange={change}>
              <option value="announcement">Announcement</option>
              <option value="event">Event</option>
            </select>
          </label>
          <label>Day<input name="day" type="number" min="1" max="31" value={form.day} onChange={change} required /></label>
          <label>Month
            <select name="month" value={form.month} onChange={change}>
              {MONTHS.map((month) => <option key={month}>{month}</option>)}
            </select>
          </label>
        </div>
        <label>Description<textarea name="description" rows="4" value={form.description} onChange={change} required /></label>
        <div className="admin-item__actions">
          <button type="submit" className="site-button">{editingId ? "Save changes" : "Publish"}</button>
          {editingId && <button type="button" className="site-button site-button--ghost" onClick={reset}>Cancel</button>}
        </div>
        {message && <p className="admin-form__message">{message}</p>}
      </form>

      {!items ? <Loader /> : !items.length ? <p className="empty">No news yet.</p> : (
        <div className="admin-list">
          {items.map((item) => (
            <article key={item._id} className="panel">
              <div className="admin-item__meta"><span className="tag">{item.type}</span> {item.day} {item.month}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="admin-item__actions">
                <button type="button" className="site-button site-button--ghost" onClick={() => edit(item)}>Edit</button>
                <button type="button" className="site-button site-button--ghost" onClick={() => remove(item)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default News;
