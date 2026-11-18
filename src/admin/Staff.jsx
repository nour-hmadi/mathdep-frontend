import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";

// The teachers on the Teaching staff page. A hidden teacher keeps the account
// but disappears from the public page until shown again.
const EMPTY = { first_name: "", last_name: "", email: "", title: "", description: "" };
const isTeacher = (user) => user.isTeacher === true || user.type === "teacher";
const fullName = (user) => (user.first_name ? `${user.first_name} ${user.last_name}` : user.name || "");
const isHidden = (user) => user.isActive === false;

function Staff() {
  const [teachers, setTeachers] = useState(null);
  const [form, setForm] = useState(null);             // null while the pop-up is closed
  const [photo, setPhoto] = useState(null);
  const [editingId, setEditingId] = useState(null);   // null while adding a new teacher
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/api/user")
      .then((res) => setTeachers(res.data.data.filter(isTeacher)))
      .catch(() => { setTeachers([]); setMessage("The teachers could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditingId(null); setForm(EMPTY); setPhoto(null); setError(""); };
  const openEdit = (teacher) => {
    setEditingId(teacher._id);
    setForm({ first_name: teacher.first_name || "", last_name: teacher.last_name || "", email: teacher.email || "",
              title: teacher.title || "", description: teacher.description || "" });
    setPhoto(null);
    setError("");
  };
  const close = () => setForm(null);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const save = (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (photo) data.append("image", photo);
    setSaving(true);
    const request = editingId ? api.put(`/api/user/edit/${editingId}`, data) : api.post("/api/user/staff", data);
    request
      .then(() => { setMessage(`${form.first_name} ${form.last_name} was ${editingId ? "saved" : "added"}.`); close(); load(); })
      .catch((err) => setError(err.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  const toggle = (teacher) =>
    api.put(`/api/user/edit/${teacher._id}`, { isActive: isHidden(teacher) }).then(() => {
      setMessage(`${fullName(teacher)} is now ${isHidden(teacher) ? "shown on" : "hidden from"} the Teaching staff page.`);
      load();
    });

  const remove = (teacher) => {
    if (window.confirm(`Delete ${fullName(teacher)}'s account? This cannot be undone. To take a teacher off the page only, use Hide.`))
      api.delete(`/api/user/${teacher._id}`).then(() => { setMessage(`${fullName(teacher)} was deleted.`); load(); });
  };

  if (!teachers) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Teaching staff</h2></div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={teachers}
        searchPlaceholder="Search teachers…"
        empty="No teachers yet."
        columns={[
          { key: "photo", label: "Photo", sortable: false, text: () => "",
            render: (teacher) => <img className="data-table__photo" src={teacher.image?.url} alt="" /> },
          { key: "name", label: "Name", value: fullName },
          { key: "title", label: "Title" },
          { key: "email", label: "Email" },
          { key: "description", label: "Description",
            render: (teacher) => <span className="data-table__text" title={teacher.description}>{teacher.description}</span> },
          { key: "status", label: "Status", value: (teacher) => (isHidden(teacher) ? "Hidden" : "Shown"),
            render: (teacher) => (isHidden(teacher)
              ? <span className="status status--off">Hidden</span>
              : <span className="status status--on">Shown</span>) },
        ]}
        filters={[
          { key: "status", label: "Status", options: [["shown", "Shown"], ["hidden", "Hidden"]],
            match: (teacher, value) => (value === "hidden") === isHidden(teacher) },
        ]}
        toolbar={<button type="button" className="admin-button" onClick={openAdd}>+ Add teacher</button>}
        actions={(teacher) => (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => openEdit(teacher)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => toggle(teacher)}>
              {isHidden(teacher) ? "Show" : "Hide"}
            </button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(teacher)}>Delete</button>
          </>
        )}
      />

      {form && (
        <Modal title={editingId ? "Edit teacher" : "Add a teacher"} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            <div className="admin-form__row">
              <label>First name<input name="first_name" value={form.first_name} onChange={change} required autoFocus /></label>
              <label>Last name<input name="last_name" value={form.last_name} onChange={change} required /></label>
            </div>
            <div className="admin-form__row">
              <label>Email<input name="email" type="email" value={form.email} onChange={change} required /></label>
              <label>Title<input name="title" value={form.title} onChange={change} placeholder="e.g. Professor of Analysis" /></label>
            </div>
            <label>Short description<textarea name="description" rows="4" value={form.description} onChange={change} /></label>
            <label>Photo {editingId ? "(leave empty to keep the current one)" : "(optional: without one, the initials are used)"}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setPhoto(event.target.files[0])} />
            </label>
            {error && <p className="admin-form__error">{error}</p>}
            <div className="admin-form__buttons">
              <button type="button" className="admin-button admin-button--light" onClick={close}>Cancel</button>
              <button type="submit" className="admin-button" disabled={saving}>
                {saving ? "Saving…" : editingId ? "Save changes" : "Add teacher"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default Staff;
