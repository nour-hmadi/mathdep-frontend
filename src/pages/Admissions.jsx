import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import { ADMISSIONS } from "../content/site";

const crumbs = [{ name: "Academics", path: "/academics" }];

function Admissions() {
  return (
    <>
      <PageHeader title="Admissions" crumbs={crumbs}
                  lead="What you need, how to apply, and what it costs. Applications open at the start of each semester." />
      <div className="page">
        <h2>Requirements</h2>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Requirement</th><th>Applies to</th></tr></thead>
            <tbody>
              {ADMISSIONS.requirements.map(([requirement, programs]) => (
                <tr key={requirement}><td>{requirement}</td><td>{programs}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How to apply</h2>
        <ol className="steps">
          {ADMISSIONS.steps.map(([title, text]) => (
            <li key={title}><div><strong>{title}</strong><span>{text}</span></div></li>
          ))}
        </ol>

        <h2>Fees</h2>
        <div className="table-wrap">
          <table className="table">
            <tbody>
              {ADMISSIONS.fees.map(([program, fee]) => <tr key={program}><td>{program}</td><td>{fee}</td></tr>)}
            </tbody>
          </table>
        </div>

        <p className="note" style={{ marginTop: 32 }}>
          Questions? The secretariat answers by email and phone, see <Link to="/contactus">Contact</Link>.
          Dates are on the <Link to="/academics/calendar">calendar page</Link>.
        </p>
      </div>
    </>
  );
}

export default Admissions;
