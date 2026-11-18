import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { formatDate, time } from "./format";

// Two parts of the home page: the pictures at the top (they take turns every 6 seconds),
// and the head of the department with their message.

function HeroPictures() {
  const [slides, setSlides] = useState(null);
  const [form, setForm] = useState(null);             // null while the pop-up is closed
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/carousel")
      .then((res) => setSlides(res.data.data))
      .catch(() => { setSlides([]); setMessage("The pictures could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const open = (slide) => {
    setEditingId(slide ? slide._id : null);
    setForm({ title: slide?.title || "" });
    setFile(null);
    setPreview(slide ? slide.image?.url : "");
    setError("");
  };
  const close = () => setForm(null);
  const choose = (event) => {
    const chosen = event.target.files[0];
    setFile(chosen || null);
    if (chosen) setPreview(URL.createObjectURL(chosen));
  };

  const save = (event) => {
    event.preventDefault();
    if (!editingId && !file) return setError("Please choose a picture.");
    const data = new FormData();
    data.append("title", form.title);
    if (file) data.append("image", file);
    setSaving(true);
    const request = editingId ? api.put(`/api/carousel/${editingId}`, data) : api.post("/api/carousel", data);
    return request
      .then(() => { setMessage(editingId ? "The picture was saved." : "The picture was added to the home page."); close(); load(); })
      .catch((err) => setError(err.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  const remove = (slide) => {
    if (window.confirm("Remove this picture from the home page? This cannot be undone."))
      api.delete(`/api/carousel/${slide._id}`).then(() => { setMessage("The picture was removed."); load(); });
  };

  if (!slides) return <Loader />;

  return (
    <section className="admin-section">
      <h3>Pictures at the top of the home page</h3>
      <p className="admin-form__hint">They take turns every 6 seconds, oldest first. Without any, the default campus picture is shown.</p>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={slides}
        searchPlaceholder="Search pictures…"
        empty="No pictures yet: the default campus picture is shown."
        columns={[
          { key: "picture", label: "Picture", sortable: false, text: () => "",
            render: (slide) => <img className="data-table__picture" src={slide.image?.url} alt="" /> },
          { key: "title", label: "Title", text: (slide) => slide.title || "" },
          { key: "createdAt", label: "Added", value: (slide) => time(slide.createdAt), text: (slide) => formatDate(slide.createdAt) },
        ]}
        toolbar={<button type="button" className="admin-button" onClick={() => open(null)}>+ Add picture</button>}
        actions={(slide) => (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => open(slide)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(slide)}>Delete</button>
          </>
        )}
      />
      {form && (
        <Modal title={editingId ? "Edit picture" : "Add a picture"} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            {preview && <img className="admin-form__preview" src={preview} alt="" />}
            <label>Picture {editingId && <small>(leave empty to keep the current one)</small>}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={choose} />
            </label>
            <label>Title <small>(optional, for your own reference)</small>
              <input value={form.title} onChange={(event) => setForm({ title: event.target.value })} />
            </label>
            {error && <p className="admin-form__error">{error}</p>}
            <div className="admin-form__buttons">
              <button type="button" className="admin-button admin-button--light" onClick={close}>Cancel</button>
              <button type="submit" className="admin-button" disabled={saving}>{saving ? "Uploading…" : "Save"}</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}

const EMPTY_HEAD = { name: "", email: "", description: "" };

function HeadOfDepartment() {
  const [heads, setHeads] = useState(null);
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/headdepartment")
      .then((res) => setHeads(res.data.data))
      .catch(() => { setHeads([]); setMessage("The head of department could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const open = (head) => {
    setEditingId(head ? head._id : null);
    setForm(head ? { name: head.name, email: head.email, description: head.description } : EMPTY_HEAD);
    setFile(null);
    setPreview(head ? head.image?.url : "");
    setError("");
  };
  const close = () => setForm(null);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const choose = (event) => {
    const chosen = event.target.files[0];
    setFile(chosen || null);
    if (chosen) setPreview(URL.createObjectURL(chosen));
  };

  const save = (event) => {
    event.preventDefault();
    if (!editingId && !file) return setError("Please choose a photo.");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (file) data.append("image", file);
    setSaving(true);
    const request = editingId ? api.put(`/api/headdepartment/${editingId}`, data) : api.post("/api/headdepartment", data);
    return request
      .then(() => { setMessage(`${form.name} was saved.`); close(); load(); })
      .catch((err) => setError(err.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  const remove = (head) => {
    if (window.confirm(`Remove ${head.name} from the home page? This cannot be undone.`))
      api.delete(`/api/headdepartment/${head._id}`).then(() => { setMessage(`${head.name} was removed.`); load(); });
  };

  if (!heads) return <Loader />;

  return (
    <section className="admin-section">
      <h3>Head of the department</h3>
      <p className="admin-form__hint">The home page shows the first one, with the photo, the message and the email.</p>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={heads}
        empty="Nobody yet: the home page skips this part."
        columns={[
          { key: "photo", label: "Photo", sortable: false, text: () => "",
            render: (head) => <img className="data-table__photo" src={head.image?.url} alt="" /> },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "description", label: "Message",
            render: (head) => <span className="data-table__text" title={head.description}>{head.description}</span> },
        ]}
        toolbar={!heads.length && <button type="button" className="admin-button" onClick={() => open(null)}>+ Add head of department</button>}
        actions={(head) => (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => open(head)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(head)}>Delete</button>
          </>
        )}
      />
      {form && (
        <Modal title={editingId ? "Edit the head of department" : "Add the head of department"} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            {preview && <img className="admin-form__preview admin-form__preview--portrait" src={preview} alt="" />}
            <label>Photo {editingId && <small>(leave empty to keep the current one)</small>}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={choose} />
            </label>
            <div className="admin-form__row">
              <label>Name<input name="name" value={form.name} onChange={change} required placeholder="e.g. Prof. Nadim Saliba" /></label>
              <label>Email<input name="email" type="email" value={form.email} onChange={change} required /></label>
            </div>
            <label>Message to visitors<textarea name="description" rows="5" value={form.description} onChange={change} required /></label>
            {error && <p className="admin-form__error">{error}</p>}
            <div className="admin-form__buttons">
              <button type="button" className="admin-button admin-button--light" onClick={close}>Cancel</button>
              <button type="submit" className="admin-button" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}

function Homepage() {
  return (
    <>
      <div className="admin-head"><h2>Home page</h2></div>
      <HeroPictures />
      <HeadOfDepartment />
    </>
  );
}

export default Homepage;
