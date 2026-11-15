import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import { PROGRAMS } from "../content/site";
import "../styles/Programs.css";

const crumbs = [{ name: "Academics", path: "/academics" }];

function Programs() {
  return (
    <>
      <PageHeader title="Programs" crumbs={crumbs}
                  lead="Four programs, from a first degree in mathematics to a research master's and a teaching diploma." />
      <div className="page">
        {PROGRAMS.map((program) => (
          <article key={program.name} className="program">
            <div className="program__head">
              <div>
                <span className="tag">{program.level}</span>
                <h2>{program.name}</h2>
              </div>
              <dl className="program__facts">
                <div><dt>Duration</dt><dd>{program.years} {program.years === 1 ? "year" : "years"}</dd></div>
                <div><dt>Credits</dt><dd>{program.credits} ECTS</dd></div>
                <div><dt>Language</dt><dd>{program.language}</dd></div>
              </dl>
            </div>
            <p>{program.summary}</p>
            <div className="program__columns">
              <div className="panel">
                <h3>What you learn</h3>
                <ul>{program.learn.map((line) => <li key={line}>{line}</li>)}</ul>
              </div>
              <div className="panel">
                <h3>Where it leads</h3>
                <ul>{program.careers.map((line) => <li key={line}>{line}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default Programs;
