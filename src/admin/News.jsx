import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { formatDate, time } from "./format";

// News and events, shown on the News and events page and on the home page.
const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
// The last day of each month (February allows 29, because the year is not stored)
const daysIn = (month) => ({ February: 29, April: 30, June: 30, September: 30, November: 30 }[month] || 31);
const EMPTY = { title: "", type: "announcement", day: "", month: MONTHS[new Date().getMonth()], description: "" };

function News() {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(null);             // null while the pop-up is closed
  const [editingId, setEditingId] = useState(null);   // null while adding a new item
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/announcements")
      .then((res) => setItems(res.data.data))
      .catch(() => { setItems([]); setMessage("The news could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditingId(null); setForm(EMPTY); setError(""); };
  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({ title: item.title, type: item.type, day: item.day, month: item.month, description: item.description });
    setError("");
  };
  const close = () => setForm(null);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const save = (event) => {
    event.preventDefault();
    const request = editingId ? api.put(`/api/announcements/${editingId}`, form) : api.post("/api/announcements", form);
    request
      .then(() => { setMessage(`"${form.title}" was ${editingId ? "saved" : "published"}.`); close(); load(); })
      .catch(() => setError("It could not be saved. Check every field and try again."));
  };

  const remove = (item) => {
    if (window.confirm(`Delete "${item.title}"? This cannot be undone.`))
      api.delete(`/api/announcements/${item._id}`).then(() => { setMessage(`"${item.title}" was deleted.`); load(); });
  };

  if (!items) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>News and events</h2></div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={items}
        searchPlaceholder="Search news…"
        empty="No news yet."
        columns={[
          { key: "date", label: "Date", value: (item) => MONTHS.indexOf(item.month) * 100 + Number(item.day),
            text: (item) => `${item.day} ${item.month}` },
          { key: "type", label: "Type", render: (item) => <span className="tag">{item.type}</span> },
          { key: "title", label: "Title" },
          { key: "description", label: "Description",
            render: (item) => <span className="data-table__text" title={item.description}>{item.description}</span> },
          { key: "createdAt", label: "Posted", value: (item) => time(item.createdAt), text: (item) => formatDate(item.createdAt) },
        ]}
        filters={[
          { key: "type", label: "Type", options: [["announcement", "Announcements"], ["event", "Events"]],
            match: (item, value) => (value === "event" ? item.type === "event" : item.type !== "event") },
        ]}
        toolbar={<button type="button" className="admin-button" onClick={openAdd}>+ Add news</button>}
        actions={(item) => (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => openEdit(item)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(item)}>Delete</button>
          </>
        )}
      />

      {form && (
        <Modal title={editingId ? "Edit news" : "Add news or an event"} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            <label>Title<input name="title" value={form.title} onChange={change} required autoFocus /></label>
            <div className="admin-form__row admin-form__row--three">
              <label>Type
                <select name="type" value={form.type} onChange={change}>
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                </select>
              </label>
              <label>Day<input name="day" type="number" min="1" max={daysIn(form.month)} value={form.day} onChange={change} required /></label>
              <label>Month
                <select name="month" value={form.month} onChange={change}>
                  {MONTHS.map((month) => <option key={month}>{month}</option>)}
                </select>
              </label>
            </div>
            <label>Description<textarea name="description" rows="5" value={form.description} onChange={change} required /></label>
            {error && <p className="admin-form__error">{error}</p>}
            <div className="admin-form__buttons">
              <button type="button" className="admin-button admin-button--light" onClick={close}>Cancel</button>
              <button type="submit" className="admin-button">{editingId ? "Save changes" : "Publish"}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default News;
