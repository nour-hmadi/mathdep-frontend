import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import { CALENDAR } from "../content/site";

const crumbs = [{ name: "Academics", path: "/academics" }];

function AcademicCalendar() {
  return (
    <>
      <PageHeader title="Calendar and exams" crumbs={crumbs}
                  lead="Key dates of the academic year and the rules that apply in every exam." />
      <div className="page">
        <div className="card-grid">
          {CALENDAR.semesters.map((semester) => (
            <div key={semester.name} className="table-wrap">
              <table className="table">
                <thead><tr><th colSpan="2">{semester.name}</th></tr></thead>
                <tbody>
                  {semester.rows.map(([what, when]) => <tr key={what}><td>{what}</td><td>{when}</td></tr>)}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <h2>Exam rules</h2>
        <div className="panel">
          <ul>{CALENDAR.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
        </div>
      </div>
    </>
  );
}

export default AcademicCalendar;
