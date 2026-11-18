import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { formatDate, time } from "./format";

// Research posts: a picture, a text, the authors, and an optional PDF of the full paper.
// A hidden post stays here but leaves the Research page.
const EMPTY = { title: "", authors: "", description: "" };
const isHidden = (post) => post.hidden === true;

function Research() {
  const [posts, setPosts] = useState(null);
  const [form, setForm] = useState(null);             // null while the pop-up is closed
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState("");
  const [pdf, setPdf] = useState(null);
  const [removePdf, setRemovePdf] = useState(false);
  const [editing, setEditing] = useState(null);       // the post being edited, null while adding
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/research/all")
      .then((res) => setPosts(res.data.data))
      .catch(() => { setPosts([]); setMessage("The research posts could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const open = (post) => {
    setEditing(post);
    setForm(post ? { title: post.title, authors: post.authors || "", description: post.description } : EMPTY);
    setPicture(null);
    setPreview(post ? post.image?.url : "");
    setPdf(null);
    setRemovePdf(false);
    setError("");
  };
  const close = () => setForm(null);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const choosePicture = (event) => {
    const chosen = event.target.files[0];
    setPicture(chosen || null);
    if (chosen) setPreview(URL.createObjectURL(chosen));
  };

  const save = (event) => {
    event.preventDefault();
    if (!editing && !picture) return setError("Please choose a picture.");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (picture) data.append("image", picture);
    if (pdf) data.append("pdf", pdf);
    if (removePdf && !pdf) data.append("removePdf", "true");
    setSaving(true);
    const request = editing ? api.put(`/api/research/${editing._id}`, data) : api.post("/api/research", data);
    return request
      .then(() => { setMessage(`"${form.title}" was ${editing ? "saved" : "published"}.`); close(); load(); })
      .catch((err) => setError(err.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  const toggle = (post) =>
    api.put(`/api/research/${post._id}`, { hidden: !isHidden(post) })
      .then(() => { setMessage(`"${post.title}" ${isHidden(post) ? "is back on" : "was hidden from"} the Research page.`); load(); });

  const remove = (post) => {
    if (window.confirm(`Delete "${post.title}", its picture and its PDF? This cannot be undone. To take it off the site only, use Hide.`))
      api.delete(`/api/research/${post._id}`).then(() => { setMessage(`"${post.title}" was deleted.`); load(); });
  };

  if (!posts) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Research</h2></div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={posts}
        searchPlaceholder="Search title, authors or text…"
        empty="No research posts yet."
        columns={[
          { key: "picture", label: "Picture", sortable: false, text: () => "",
            render: (post) => <img className="data-table__picture" src={post.image?.url} alt="" /> },
          { key: "title", label: "Title" },
          { key: "authors", label: "Authors" },
          { key: "description", label: "Text",
            render: (post) => <span className="data-table__text" title={post.description}>{post.description}</span> },
          { key: "pdf", label: "PDF", value: (post) => (post.pdf?.url ? "PDF" : ""),
            render: (post) => (post.pdf?.url ? <a href={post.pdf.url} target="_blank" rel="noreferrer">Open</a> : "—") },
          { key: "status", label: "Status", value: (post) => (isHidden(post) ? "Hidden" : "Shown"),
            render: (post) => (isHidden(post)
              ? <span className="status status--off">Hidden</span>
              : <span className="status status--on">Shown</span>) },
          { key: "createdAt", label: "Added", value: (post) => time(post.createdAt), text: (post) => formatDate(post.createdAt) },
        ]}
        filters={[
          { key: "status", label: "Status", options: [["shown", "Shown"], ["hidden", "Hidden"]],
            match: (post, value) => (value === "hidden") === isHidden(post) },
          { key: "pdf", label: "PDF", options: [["with", "With a PDF"], ["without", "Without a PDF"]],
            match: (post, value) => (value === "with") === Boolean(post.pdf?.url) },
        ]}
        toolbar={<button type="button" className="admin-button" onClick={() => open(null)}>+ Add research</button>}
        actions={(post) => (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => toggle(post)}>
              {isHidden(post) ? "Show" : "Hide"}
            </button>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => open(post)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(post)}>Delete</button>
          </>
        )}
      />

      {form && (
        <Modal title={editing ? "Edit research post" : "Add a research post"} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            <label>Title<input name="title" value={form.title} onChange={change} required autoFocus /></label>
            <label>Authors <small>(e.g. Dr. Maya Haddad and Dr. Karim Saad)</small>
              <input name="authors" value={form.authors} onChange={change} />
            </label>
            <label>Text<textarea name="description" rows="8" value={form.description} onChange={change} required /></label>
            {preview && <img className="admin-form__preview" src={preview} alt="" />}
            <label>Picture {editing && <small>(leave empty to keep the current one)</small>}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePicture} />
            </label>
            <label>PDF of the full paper <small>(optional, 10 MB at most)</small>
              <input type="file" accept="application/pdf" onChange={(event) => setPdf(event.target.files[0] || null)} />
            </label>
            {editing?.pdf?.url && !pdf && (
              <label className="admin-form__check">
                <input type="checkbox" checked={removePdf} onChange={(event) => setRemovePdf(event.target.checked)} />
                Remove the current PDF ({editing.pdf.name || "PDF"})
              </label>
            )}
            {error && <p className="admin-form__error">{error}</p>}
            <div className="admin-form__buttons">
              <button type="button" className="admin-button admin-button--light" onClick={close}>Cancel</button>
              <button type="submit" className="admin-button" disabled={saving}>
                {saving ? "Uploading…" : editing ? "Save changes" : "Publish"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default Research;
