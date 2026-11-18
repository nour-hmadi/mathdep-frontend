import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import ContentList from "./ContentList";

// The tabs for what used to be written into the frontend. Each list is described here;
// ContentList does the table, the pop-up form and the saving.
const text = (post) => (post ? <span className="data-table__text" title={post}>{post}</span> : "—");
const optionsFrom = (values) => values.map((value) => [String(value), String(value)]);

export function Programs() {
  return (
    <>
      <div className="admin-head"><h2>Programs</h2></div>
      <ContentList
        kind="program" noun="program" title="Degree programs" hint="Shown on the Programs page, in this order."
        columns={[
          { key: "name", label: "Name" },
          { key: "level", label: "Level", render: (item) => <span className="tag">{item.level}</span> },
          { key: "years", label: "Years" },
          { key: "credits", label: "Credits" },
          { key: "language", label: "Language" },
          { key: "summary", label: "Summary", render: (item) => text(item.summary) },
        ]}
        filters={[{ key: "level", label: "Level", options: optionsFrom(["Bachelor's", "Master's", "Diploma"]),
                    match: (item, value) => item.level === value }]}
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "level", label: "Level", type: "select", options: ["Bachelor's", "Master's", "Diploma"], required: true, half: true },
          { name: "language", label: "Language of teaching", half: true },
          { name: "years", label: "Years", type: "number", half: true },
          { name: "credits", label: "Credits (ECTS)", type: "number", half: true },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "learn", label: "What students learn", type: "list" },
          { name: "careers", label: "Careers", type: "list" },
        ]}
      />
    </>
  );
}

export function Courses() {
  return (
    <>
      <div className="admin-head"><h2>Courses</h2></div>
      <ContentList
        kind="course" noun="course" withPdf title="Courses by year and semester"
        hint="Shown on the Courses page. A course can have a syllabus PDF, which students can open from the page."
        columns={[
          { key: "year", label: "Year" },
          { key: "semester", label: "Semester" },
          { key: "code", label: "Code" },
          { key: "name", label: "Course" },
          { key: "credits", label: "Credits" },
          { key: "pdf", label: "Syllabus", value: (item) => (item.pdf?.url ? "PDF" : ""),
            render: (item) => (item.pdf?.url ? <a href={item.pdf.url} target="_blank" rel="noreferrer">Open</a> : "—") },
        ]}
        filters={[
          { key: "year", label: "Year", options: optionsFrom([1, 2, 3]), match: (item, value) => String(item.year) === value },
          { key: "semester", label: "Semester", options: optionsFrom([1, 2, 3, 4, 5, 6]), match: (item, value) => String(item.semester) === value },
        ]}
        fields={[
          { name: "year", label: "Year", type: "number", required: true, half: true },
          { name: "semester", label: "Semester (1 to 6)", type: "number", required: true, half: true },
          { name: "code", label: "Code", required: true, half: true, placeholder: "e.g. MATH 101" },
          { name: "credits", label: "Credits", type: "number", half: true },
          { name: "name", label: "Course name", required: true },
          { name: "description", label: "Short description (optional)", type: "textarea" },
        ]}
      />
    </>
  );
}

export function CalendarAndAdmissions() {
  return (
    <>
      <div className="admin-head"><h2>Calendar and admissions</h2></div>
      <ContentList
        kind="calendar" noun="date" title="Calendar dates" hint="Shown on the Calendar page, grouped by semester."
        columns={[{ key: "semester", label: "Semester" }, { key: "label", label: "What" }, { key: "dates", label: "When" }]}
        filters={[{ key: "semester", label: "Semester", options: optionsFrom(["Fall semester", "Spring semester"]),
                    match: (item, value) => item.semester === value }]}
        fields={[
          { name: "semester", label: "Semester", type: "select", options: ["Fall semester", "Spring semester"], required: true, half: true },
          { name: "label", label: "What", required: true, half: true, placeholder: "e.g. Midterm exams" },
          { name: "dates", label: "When", required: true, placeholder: "e.g. 3 to 8 November" },
        ]}
      />
      <ContentList
        kind="requirement" noun="requirement" title="Admission requirements"
        columns={[{ key: "text", label: "Requirement", render: (item) => text(item.text) }, { key: "appliesTo", label: "For" }]}
        fields={[
          { name: "text", label: "Requirement", type: "textarea", required: true },
          { name: "appliesTo", label: "For which programs", required: true, placeholder: "e.g. Master's programs" },
        ]}
      />
      <ContentList
        kind="step" noun="step" title="How to apply (steps)" hint="Shown as numbered steps, in this order."
        columns={[{ key: "title", label: "Step" }, { key: "text", label: "Details", render: (item) => text(item.text) }]}
        fields={[
          { name: "title", label: "Step", required: true },
          { name: "text", label: "Details", type: "textarea", required: true },
        ]}
      />
      <ContentList
        kind="fee" noun="fee" title="Fees"
        columns={[{ key: "program", label: "Program" }, { key: "fee", label: "Fee" }]}
        fields={[
          { name: "program", label: "Program", required: true },
          { name: "fee", label: "Fee", required: true },
        ]}
      />
    </>
  );
}

// The single texts: home page, About page, contact details, social links and exam rules
const SETTINGS_FORM = [
  ["Home page", [["heroLead", "Text under the title", "textarea"], ["studentsCount", "Number of students (e.g. 350+)"]]],
  ["About page", [["aboutDepartment", "About the department", "textarea"], ["aboutCommunity", "About the community", "textarea"]]],
  ["Contact", [["phone", "Phone"], ["email", "Email"], ["address", "Address"], ["officeHours", "Office hours"]]],
  ["Social links (leave empty to hide an icon)", [["instagram", "Instagram link"], ["facebook", "Facebook link"],
                                                  ["youtube", "YouTube link"], ["linkedin", "LinkedIn link"]]],
  ["Calendar page", [["examRules", "Exam rules", "list"]]],
];

export function SiteText() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/content/settings")
      .then((res) => setForm({ ...res.data.data, examRules: (res.data.data.examRules || []).join("\n") }))
      .catch(() => { setForm({}); setMessage("The texts could not be loaded. Try again in a minute."); });
  }, []);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const save = (event) => {
    event.preventDefault();
    setSaving(true);
    api.put("/api/content/settings", form)
      .then(() => setMessage("Saved. The site shows the new texts now."))
      .catch((err) => setMessage(err.response?.data?.message || "It could not be saved. Try again."))
      .finally(() => setSaving(false));
  };

  if (!form) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Site text and contact</h2></div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <form className="admin-form" onSubmit={save}>
        {SETTINGS_FORM.map(([section, inputs]) => (
          <fieldset key={section} className="panel admin-fieldset">
            <legend>{section}</legend>
            {inputs.map(([name, label, type]) => (
              <label key={name}>{label}{type === "list" && <small> (one per line)</small>}
                {type ? <textarea name={name} rows={type === "list" ? 5 : 4} value={form[name] || ""} onChange={change} />
                  : <input name={name} value={form[name] || ""} onChange={change} />}
              </label>
            ))}
          </fieldset>
        ))}
        <div className="admin-form__buttons">
          <button type="submit" className="admin-button" disabled={saving}>{saving ? "Saving…" : "Save all"}</button>
        </div>
      </form>
    </>
  );
}
