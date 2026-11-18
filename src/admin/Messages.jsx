import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { formatDate, time } from "./format";

// Messages sent from the Contact page. New ones come first and are highlighted;
// opening one marks it as read, and Reply opens the admin's email app.
const replyLink = (item) => `mailto:${item.email}?subject=${encodeURIComponent("Your message to the Department of Mathematics")}`;

function Messages() {
  const [items, setItems] = useState(null);
  const [open, setOpen] = useState(null);
  const [message, setMessage] = useState("");

  const load = () =>
    api.get("/api/messages")
      .then((res) => setItems([...res.data.data].sort((a, b) => a.read - b.read)))
      .catch(() => { setItems([]); setMessage("The messages could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const mark = (item, read) => api.put(`/api/messages/${item._id}`, { read }).then(load);
  const read = (item) => {
    setOpen(item);
    if (!item.read) mark(item, true);
  };
  const remove = (item) => {
    if (window.confirm(`Delete the message from ${item.name}? This cannot be undone.`))
      api.delete(`/api/messages/${item._id}`).then(() => { setOpen(null); setMessage("The message was deleted."); load(); });
  };

  if (!items) return <Loader />;
  const unread = items.filter((item) => !item.read).length;

  return (
    <>
      <div className="admin-head"><h2>Messages</h2></div>
      {unread > 0 && <p className="admin-alert" role="status">✉️ {unread} new {unread === 1 ? "message" : "messages"}.</p>}
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={items}
        searchPlaceholder="Search name, email or text…"
        empty="No messages yet."
        rowClass={(item) => (item.read ? undefined : "data-table__row--alert")}
        columns={[
          { key: "createdAt", label: "Received", value: (item) => time(item.createdAt), text: (item) => formatDate(item.createdAt) },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "message", label: "Message", render: (item) => <span className="data-table__text">{item.message}</span> },
          { key: "read", label: "Status", value: (item) => (item.read ? "Read" : "New"),
            render: (item) => (item.read ? <span className="status status--off">Read</span> : <span className="status status--alert">New</span>) },
        ]}
        filters={[{ key: "read", label: "Status", options: [["new", "New"], ["read", "Read"]],
                    match: (item, value) => (value === "read") === Boolean(item.read) }]}
        actions={(item) => (
          <>
            <button type="button" className="admin-button admin-button--small" onClick={() => read(item)}>Read</button>
            <a className="admin-button admin-button--small admin-button--light" href={replyLink(item)}>Reply</a>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(item)}>Delete</button>
          </>
        )}
      />
      {open && (
        <Modal title={`Message from ${open.name}`} onClose={() => setOpen(null)}>
          <p className="admin-item__meta">{open.email} · {formatDate(open.createdAt)}</p>
          <p className="admin-letter">{open.message}</p>
          <div className="admin-form__buttons">
            <button type="button" className="admin-button admin-button--light" onClick={() => { mark(open, false); setOpen(null); }}>Mark as new</button>
            <a className="admin-button" href={replyLink(open)}>Reply by email</a>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Messages;
