import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { addDays, formatDay, time, toInput } from "./format";

// News and events. Each item has a date (or a period), and an optional due date ("show until").
// After the due date it is past due: with auto-hide it leaves the site by itself; otherwise it stays,
// and this tab flags it ⚠️ until the admin hides it, keeps it, or gives it a new due date.
const STATUS = {
  visible: ["Visible", "status--on"],
  "past-due": ["⚠️ Past due", "status--alert"],
  kept: ["Kept after due date", "status--on"],
  "auto-hidden": ["Auto-hidden", "status--off"],
  hidden: ["Hidden", "status--off"],
};
const EMPTY = { type: "announcement", title: "", startDate: "", endDate: "", visibleUntil: "", autoHide: true, description: "" };

// The due date the form suggests: 3 days after an event, the last day of a period, none otherwise
const suggestDue = (form) => {
  if (form.type === "event" && (form.endDate || form.startDate)) return addDays(form.endDate || form.startDate, 3);
  return form.endDate || "";
};
const dates = (item) => (item.endDate ? `${formatDay(item.startDate)} – ${formatDay(item.endDate)}` : formatDay(item.startDate));

function News() {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(null);             // null while the pop-up is closed
  const [editingId, setEditingId] = useState(null);   // null while adding a new item
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/announcements/all")
      .then((res) => setItems([...res.data.data].sort((a, b) => (b.status === "past-due") - (a.status === "past-due"))))
      .catch(() => { setItems([]); setMessage("The news could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditingId(null); setForm(EMPTY); setError(""); };
  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({ type: item.type, title: item.title, description: item.description, autoHide: Boolean(item.autoHide),
              startDate: toInput(item.startDate), endDate: toInput(item.endDate), visibleUntil: toInput(item.visibleUntil) });
    setError("");
  };
  const close = () => setForm(null);

  // While the admin hasn't typed their own due date, it follows the suggestion
  const change = (event) => {
    const { name, type, value, checked } = event.target;
    const next = { ...form, [name]: type === "checkbox" ? checked : value };
    if (["type", "startDate", "endDate"].includes(name) && form.visibleUntil === suggestDue(form)) next.visibleUntil = suggestDue(next);
    setForm(next);
  };

  const save = (event) => {
    event.preventDefault();
    const request = editingId ? api.put(`/api/announcements/${editingId}`, form) : api.post("/api/announcements", form);
    request
      .then(() => { setMessage(`"${form.title}" was ${editingId ? "saved" : "published"}.`); close(); load(); })
      .catch((err) => setError(err.response?.data?.message || "It could not be saved. Check every field and try again."));
  };

  const update = (item, fields, done) =>
    api.put(`/api/announcements/${item._id}`, fields).then(() => { setMessage(`"${item.title}" ${done}.`); load(); });

  const remove = (item) => {
    if (window.confirm(`Delete "${item.title}"? This cannot be undone.`))
      api.delete(`/api/announcements/${item._id}`).then(() => { setMessage(`"${item.title}" was deleted.`); load(); });
  };

  if (!items) return <Loader />;
  const pastDue = items.filter((item) => item.status === "past-due").length;

  return (
    <>
      <div className="admin-head"><h2>News and events</h2></div>
      {pastDue > 0 && (
        <p className="admin-alert" role="status">
          ⚠️ {pastDue} {pastDue === 1 ? "item is" : "items are"} past the due date and still on the site. Hide or keep {pastDue === 1 ? "it" : "each one"}.
        </p>
      )}
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={items}
        searchPlaceholder="Search news…"
        empty="No news yet."
        rowClass={(item) => (item.status === "past-due" ? "data-table__row--alert" : undefined)}
        columns={[
          { key: "startDate", label: "Date", value: (item) => time(item.startDate), text: dates },
          { key: "type", label: "Type", render: (item) => <span className="tag">{item.type}</span> },
          { key: "title", label: "Title" },
          { key: "description", label: "Description",
            render: (item) => <span className="data-table__text" title={item.description}>{item.description}</span> },
          { key: "visibleUntil", label: "Show until", value: (item) => time(item.visibleUntil),
            text: (item) => (item.visibleUntil ? `${formatDay(item.visibleUntil)}${item.autoHide ? " (auto-hide)" : ""}` : "No due date") },
          { key: "status", label: "Status", value: (item) => STATUS[item.status][0],
            render: (item) => <span className={`status ${STATUS[item.status][1]}`}>{STATUS[item.status][0]}</span> },
        ]}
        filters={[
          { key: "type", label: "Type", options: [["announcement", "Announcements"], ["event", "Events"]],
            match: (item, value) => (value === "event" ? item.type === "event" : item.type !== "event") },
          { key: "status", label: "Status", options: Object.entries(STATUS).map(([value, [label]]) => [value, label]),
            match: (item, value) => item.status === value },
        ]}
        toolbar={<button type="button" className="admin-button" onClick={openAdd}>+ Add news</button>}
        actions={(item) => (
          <>
            {item.status === "past-due" && (
              <button type="button" className="admin-button admin-button--small" onClick={() => update(item, { keepAfterDue: true }, "will stay on the site")}>
                Keep
              </button>
            )}
            {item.status === "auto-hidden" ? (
              <button type="button" className="admin-button admin-button--small admin-button--light"
                      onClick={() => update(item, { autoHide: false, keepAfterDue: true }, "is back on the site")}>Show again</button>
            ) : (
              <button type="button" className="admin-button admin-button--small admin-button--light"
                      onClick={() => update(item, { hidden: !item.hidden }, item.hidden ? "is back on the site" : "was hidden")}>
                {item.hidden ? "Show" : "Hide"}
              </button>
            )}
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => openEdit(item)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(item)}>Delete</button>
          </>
        )}
      />

      {form && (
        <Modal title={editingId ? "Edit news" : "Add news or an event"} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            <div className="admin-form__row admin-form__row--narrow-first">
              <label>Type
                <select name="type" value={form.type} onChange={change}>
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                </select>
              </label>
              <label>Title<input name="title" value={form.title} onChange={change} required autoFocus /></label>
            </div>
            <div className="admin-form__row">
              <label>{form.type === "event" ? "Date of the event" : "Date (or first day)"}
                <input name="startDate" type="date" value={form.startDate} onChange={change} required />
              </label>
              <label>End date <small>(optional, for a period)</small>
                <input name="endDate" type="date" min={form.startDate} value={form.endDate} onChange={change} />
              </label>
            </div>
            <div className="admin-form__row">
              <label>Show until <small>(due date, optional)</small>
                <input name="visibleUntil" type="date" min={form.startDate} value={form.visibleUntil} onChange={change} />
              </label>
              <label className="admin-form__check">
                <input name="autoHide" type="checkbox" checked={form.autoHide} onChange={change} disabled={!form.visibleUntil} />
                Hide it automatically after the due date
              </label>
            </div>
            <p className="admin-form__hint">
              {!form.visibleUntil ? "No due date: it stays on the site until you hide it."
                : form.autoHide ? `It leaves the site by itself after ${formatDay(form.visibleUntil)}.`
                  : `After ${formatDay(form.visibleUntil)} it stays on the site, and this tab marks it ⚠️ so you can hide or keep it.`}
            </p>
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
