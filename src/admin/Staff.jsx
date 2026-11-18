import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";

// The teachers on the Teaching staff page. A hidden teacher keeps the account
// but disappears from the public page until shown again.
const EMPTY = { first_name: "", last_name: "", email: "", title: "", description: "" };
const isTeacher = (user) => user.isTeacher === true || user.type === "teacher";
const fullName = (user) => (user.first_name ? `${user.first_name} ${user.last_name}` : user.name || "");

function Staff() {
  const [teachers, setTeachers] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [editingId, setEditingId] = useState(null);   // null while adding a new teacher
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () =>
    api.get("/api/user")
      .then((res) => setTeachers(res.data.data.filter(isTeacher).sort((a, b) => fullName(a).localeCompare(fullName(b)))))
      .catch(() => { setTeachers([]); setMessage("The teachers could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const reset = () => { setForm(EMPTY); setPhoto(null); setEditingId(null); };

  const save = (event) => {
    event.preventDefault();
    const formElement = event.target;
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (photo) data.append("image", photo);
    setSaving(true);
    const request = editingId ? api.put(`/api/user/edit/${editingId}`, data) : api.post("/api/user/staff", data);
    request
      .then(() => { setMessage(editingId ? "Changes saved." : "Teacher added."); reset(); formElement.reset(); load(); })
      .catch((error) => setMessage(error.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  const edit = (teacher) => {
    setEditingId(teacher._id);
    setForm({ first_name: teacher.first_name || "", last_name: teacher.last_name || "", email: teacher.email || "",
              title: teacher.title || "", description: teacher.description || "" });
    setPhoto(null);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggle = (teacher) =>
    api.put(`/api/user/edit/${teacher._id}`, { isActive: teacher.isActive === false }).then(load);

  const remove = (teacher) => {
    if (window.confirm(`Delete ${fullName(teacher)}'s account? This cannot be undone. To remove a teacher from the page only, use Hide.`))
      api.delete(`/api/user/${teacher._id}`).then(load);
  };

  return (
    <>
      <form className="panel admin-form" onSubmit={save}>
        <h3>{editingId ? "Edit teacher" : "Add a teacher"}</h3>
        <div className="admin-form__row admin-form__row--two">
          <label>First name<input name="first_name" value={form.first_name} onChange={change} required /></label>
          <label>Last name<input name="last_name" value={form.last_name} onChange={change} required /></label>
        </div>
        <div className="admin-form__row admin-form__row--two">
          <label>Email<input name="email" type="email" value={form.email} onChange={change} required /></label>
          <label>Title<input name="title" value={form.title} onChange={change} placeholder="e.g. Professor of Analysis" /></label>
        </div>
        <label>Short description<textarea name="description" rows="3" value={form.description} onChange={change} /></label>
        <label>Photo {editingId && "(leave empty to keep the current one)"}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setPhoto(event.target.files[0])} />
        </label>
        <div className="admin-item__actions">
          <button type="submit" className="site-button" disabled={saving}>{saving ? "Saving…" : editingId ? "Save changes" : "Add teacher"}</button>
          {editingId && <button type="button" className="site-button site-button--ghost" onClick={reset}>Cancel</button>}
        </div>
        {message && <p className="admin-form__message">{message}</p>}
      </form>

      {!teachers ? <Loader /> : !teachers.length ? <p className="empty">No teachers yet.</p> : (
        <div className="admin-list">
          {teachers.map((teacher) => (
            <article key={teacher._id} className={`panel admin-person${teacher.isActive === false ? " admin-person--hidden" : ""}`}>
              <img src={teacher.image?.url} alt="" />
              <div className="admin-person__body">
                <div className="admin-item__meta">
                  {teacher.title || "Teacher"}{teacher.isActive === false && <span className="tag"> Hidden</span>}
                </div>
                <h3>{fullName(teacher)}</h3>
                {teacher.description && <p>{teacher.description}</p>}
                <div className="admin-item__actions">
                  <button type="button" className="site-button site-button--ghost" onClick={() => edit(teacher)}>Edit</button>
                  <button type="button" className="site-button site-button--ghost" onClick={() => toggle(teacher)}>
                    {teacher.isActive === false ? "Show" : "Hide"}
                  </button>
                  <button type="button" className="site-button site-button--ghost" onClick={() => remove(teacher)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default Staff;
