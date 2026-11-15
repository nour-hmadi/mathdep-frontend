import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import { COURSES } from "../content/site";

const crumbs = [{ name: "Academics", path: "/academics" }];
const credits = (semester) => semester.courses.reduce((sum, [, , ects]) => sum + ects, 0);

// The bachelor's courses, one table per semester.
function Courses() {
  return (
    <>
      <PageHeader title="Courses" crumbs={crumbs}
                  lead="The Bachelor of Science in Mathematics, semester by semester. Each semester is worth 30 ECTS credits." />
      <div className="page">
        {COURSES.map((year) => (
          <section key={year.year}>
            <h2>{year.year}</h2>
            <div className="card-grid">
              {year.semesters.map((semester) => (
                <div key={semester.name} className="table-wrap">
                  <table className="table">
                    <caption className="sr-only">{semester.name}</caption>
                    <thead>
                      <tr><th>Code</th><th>{semester.name}</th><th className="number">ECTS</th></tr>
                    </thead>
                    <tbody>
                      {semester.courses.map(([code, title, ects]) => (
                        <tr key={code}><td>{code}</td><td>{title}</td><td className="number">{ects}</td></tr>
                      ))}
                      <tr><td /><td><strong>Total</strong></td><td className="number"><strong>{credits(semester)}</strong></td></tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        ))}
        <p className="note" style={{ marginTop: 32 }}>
          Master's courses are chosen with a supervisor at registration; see the <Link to="/academics/programs">programs page</Link>.
        </p>
      </div>
    </>
  );
}

export default Courses;
