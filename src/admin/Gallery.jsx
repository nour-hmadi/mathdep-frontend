import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";
import { formatDate, time } from "./format";

// The photos on the Gallery page. Each has a title and a section (campus, events…);
// the section list grows by itself when the admin types a new one.
const EMPTY = { title: "", section: "campus" };

function Gallery() {
  const [photos, setPhotos] = useState(null);
  const [form, setForm] = useState(null);             // null while the pop-up is closed
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);   // null while adding a new photo
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/gallery")
      .then((res) => setPhotos(res.data.data))
      .catch(() => { setPhotos([]); setMessage("The photos could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const sections = [...new Set((photos || []).map((photo) => photo.section).filter(Boolean))].sort();

  const open = (photo) => {
    setEditingId(photo ? photo._id : null);
    setForm(photo ? { title: photo.title, section: photo.section } : EMPTY);
    setFile(null);
    setPreview(photo ? photo.image?.url : "");
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
    data.append("title", form.title);
    data.append("section", form.section.trim().toLowerCase());
    if (file) data.append("image", file);
    setSaving(true);
    const request = editingId ? api.put(`/api/gallery/${editingId}`, data) : api.post("/api/gallery", data);
    return request
      .then(() => { setMessage(`"${form.title}" was ${editingId ? "saved" : "added to the gallery"}.`); close(); load(); })
      .catch((err) => setError(err.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  const remove = (photo) => {
    if (window.confirm(`Delete "${photo.title}" from the gallery? This cannot be undone.`))
      api.delete(`/api/gallery/${photo._id}`).then(() => { setMessage(`"${photo.title}" was deleted.`); load(); });
  };

  if (!photos) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Gallery</h2></div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={photos}
        searchPlaceholder="Search photos…"
        empty="No photos yet."
        columns={[
          { key: "photo", label: "Photo", sortable: false, text: () => "",
            render: (photo) => <img className="data-table__picture" src={photo.image?.url} alt="" /> },
          { key: "title", label: "Title" },
          { key: "section", label: "Section", render: (photo) => <span className="tag">{photo.section}</span> },
          { key: "createdAt", label: "Added", value: (photo) => time(photo.createdAt), text: (photo) => formatDate(photo.createdAt) },
        ]}
        filters={[
          { key: "section", label: "Section", options: sections.map((section) => [section, section]),
            match: (photo, value) => photo.section === value },
        ]}
        toolbar={<button type="button" className="admin-button" onClick={() => open(null)}>+ Add photo</button>}
        actions={(photo) => (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => open(photo)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(photo)}>Delete</button>
          </>
        )}
      />

      {form && (
        <Modal title={editingId ? "Edit photo" : "Add a photo"} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            {preview && <img className="admin-form__preview" src={preview} alt="" />}
            <label>Photo {editingId && <small>(leave empty to keep the current one)</small>}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={choose} />
            </label>
            <div className="admin-form__row admin-form__row--narrow-first">
              <label>Section
                <input name="section" list="gallery-sections" value={form.section} onChange={change} required />
                <datalist id="gallery-sections">{sections.map((section) => <option key={section} value={section} />)}</datalist>
              </label>
              <label>Title<input name="title" value={form.title} onChange={change} required /></label>
            </div>
            {error && <p className="admin-form__error">{error}</p>}
            <div className="admin-form__buttons">
              <button type="button" className="admin-button admin-button--light" onClick={close}>Cancel</button>
              <button type="submit" className="admin-button" disabled={saving}>
                {saving ? "Uploading…" : editingId ? "Save changes" : "Add photo"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default Gallery;
