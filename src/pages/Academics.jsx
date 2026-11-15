import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import { NAVIGATION, PROGRAMS } from "../content/site";

const academics = NAVIGATION.find((section) => section.title === "Academics");

// The Academics overview: one panel per sub-page, then the programs in short.
function Academics() {
  return (
    <>
      <PageHeader title="Academics"
                  lead="Degrees, courses, semester dates and how to apply. Everything a student needs in one place." />
      <div className="page">
        <div className="card-grid">
          {academics.items.map((item) => (
            <Link key={item.path} to={item.path} className="panel">
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </Link>
          ))}
        </div>

        <h2>Our programs</h2>
        <div className="card-grid">
          {PROGRAMS.map((program) => (
            <Link key={program.name} to="/academics/programs" className="panel">
              <span className="tag">{program.level}</span>
              <span className="tag">{program.years} {program.years === 1 ? "year" : "years"}</span>
              <h3>{program.name}</h3>
              <p>{program.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Academics;
