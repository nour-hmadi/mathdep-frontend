import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import Modal from "./Modal";

// One editable list from the content collection (programs, courses, calendar dates…).
// Each tab only describes the list: its kind, its table columns, and its form fields.
//   fields: [{ name, label, type: "text" | "textarea" | "number" | "list" | "select", required, options, half }]
//   "list" is typed one item per line; "half" puts two fields side by side.
const toForm = (fields, item) => Object.fromEntries([
  ...fields.map(({ name, type }) => [name, type === "list" ? (item?.[name] || []).join("\n") : item?.[name] ?? ""]),
  ["order", item?.order ?? ""],
]);

function Field({ field, value, onChange }) {
  const common = { name: field.name, value, onChange, required: field.required, placeholder: field.placeholder };
  if (field.type === "textarea" || field.type === "list") return <textarea rows={field.type === "list" ? 4 : 5} {...common} />;
  if (field.type === "select") {
    return (
      <select {...common}>
        <option value="">Choose…</option>
        {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }
  return <input type={field.type === "number" ? "number" : "text"} {...common} />;
}

function ContentList({ kind, title, hint, columns, fields, filters, withPdf, noun = "item" }) {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(null);             // null while the pop-up is closed
  const [editing, setEditing] = useState(null);       // the item being edited, null while adding
  const [pdf, setPdf] = useState(null);
  const [removePdf, setRemovePdf] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get(`/api/content/${kind}`)
      .then((res) => setItems(res.data.data))
      .catch(() => { setItems([]); setMessage("This list could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, [kind]);   // eslint-disable-line react-hooks/exhaustive-deps

  const open = (item) => {
    setEditing(item);
    setForm(toForm(fields, item));
    setPdf(null);
    setRemovePdf(false);
    setError("");
  };
  const close = () => setForm(null);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const save = (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (pdf) data.append("pdf", pdf);
    if (removePdf && !pdf) data.append("removePdf", "true");
    setSaving(true);
    const request = editing ? api.put(`/api/content/${kind}/${editing._id}`, data) : api.post(`/api/content/${kind}`, data);
    request
      .then(() => { setMessage(editing ? "Changes saved." : `The ${noun} was added.`); close(); load(); })
      .catch((err) => setError(err.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  const remove = (item) => {
    if (window.confirm(`Delete this ${noun}? This cannot be undone.`))
      api.delete(`/api/content/${kind}/${item._id}`).then(() => { setMessage(`The ${noun} was deleted.`); load(); });
  };

  if (!items) return <Loader />;

  return (
    <section className="admin-section">
      <h3>{title}</h3>
      {hint && <p className="admin-form__hint">{hint}</p>}
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={items}
        columns={[...columns, { key: "order", label: "Order" }]}
        filters={filters}
        empty={`No ${noun}s yet.`}
        toolbar={<button type="button" className="admin-button" onClick={() => open(null)}>+ Add {noun}</button>}
        actions={(item) => (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => open(item)}>Edit</button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(item)}>Delete</button>
          </>
        )}
      />
      {form && (
        <Modal title={editing ? `Edit ${noun}` : `Add ${noun}`} onClose={close}>
          <form className="admin-form admin-form__grid" onSubmit={save}>
            {fields.map((field) => (
              <label key={field.name} className={field.half ? undefined : "admin-form__full"}>
                {field.label}{field.type === "list" && <small> (one per line)</small>}
                <Field field={field} value={form[field.name]} onChange={change} />
              </label>
            ))}
            <label>Order <small>(smaller first)</small><input name="order" type="number" value={form.order} onChange={change} /></label>
            {withPdf && (
              <label className="admin-form__full">PDF <small>(optional, 10 MB at most)</small>
                <input type="file" accept="application/pdf" onChange={(event) => setPdf(event.target.files[0] || null)} />
              </label>
            )}
            {withPdf && editing?.pdf?.url && !pdf && (
              <label className="admin-form__check admin-form__full">
                <input type="checkbox" checked={removePdf} onChange={(event) => setRemovePdf(event.target.checked)} />
                Remove the current PDF ({editing.pdf.name || "PDF"})
              </label>
            )}
            {error && <p className="admin-form__error admin-form__full">{error}</p>}
            <div className="admin-form__buttons admin-form__full">
              <button type="button" className="admin-button admin-button--light" onClick={close}>Cancel</button>
              <button type="submit" className="admin-button" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}

export default ContentList;
