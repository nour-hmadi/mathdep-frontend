import React, { useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Overview from "./Overview";
import PendingPosts from "./PendingPosts";
import News from "./News";
import Staff from "./Staff";
import Users from "./Users";
import Gallery from "./Gallery";
import Research from "./Research";
import Homepage from "./Homepage";
import { Programs, Courses, CalendarAndAdmissions, SiteText } from "./SiteContent";
import "./admin.css";

// The admin's workspace: one tab for each part of the site, in three groups.
// Every tab reads and changes its data through src/api.js, which sends the admin's token.
const GROUPS = [
  ["Every day", [
    { id: "overview", name: "Overview", Component: Overview },
    { id: "pending", name: "Pending posts", Component: PendingPosts },
    { id: "news", name: "News and events", Component: News },
  ]],
  ["People", [
    { id: "staff", name: "Teaching staff", Component: Staff },
    { id: "users", name: "Users", Component: Users },
  ]],
  ["Site content", [
    { id: "homepage", name: "Home page", Component: Homepage },
    { id: "gallery", name: "Gallery", Component: Gallery },
    { id: "research", name: "Research", Component: Research },
    { id: "programs", name: "Programs", Component: Programs },
    { id: "courses", name: "Courses", Component: Courses },
    { id: "calendar", name: "Calendar and admissions", Component: CalendarAndAdmissions },
    { id: "sitetext", name: "Site text and contact", Component: SiteText },
  ]],
];
const TABS = GROUPS.flatMap(([, tabs]) => tabs);

function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const { Component } = TABS.find((item) => item.id === tab);
  const name = sessionStorage.getItem("first_name");

  return (
    <>
      <PageHeader title="Dashboard" lead={`Welcome back${name ? `, ${name}` : ""}. Everything you can change on the site is here.`} />
      <div className="page admin">
        <nav className="admin__tabs" aria-label="Dashboard sections">
          {GROUPS.map(([group, tabs]) => (
            <React.Fragment key={group}>
              <span className="admin__group">{group}</span>
              {tabs.map((item) => (
                <button key={item.id} type="button" onClick={() => setTab(item.id)}
                        className={`admin__tab${item.id === tab ? " admin__tab--active" : ""}`}>
                  {item.name}
                </button>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <section className="admin__content">
          <Component openTab={setTab} />
        </section>
      </div>
    </>
  );
}

export default AdminDashboard;
