import React, { useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Overview from "./Overview";
import PendingPosts from "./PendingPosts";
import "./admin.css";

// The admin's workspace: one tab for each part of the site.
// Every tab reads and changes its data through src/api.js, which sends the admin's token.
const TABS = [
  { id: "overview", name: "Overview", Component: Overview },
  { id: "pending", name: "Pending posts", Component: PendingPosts },
];

function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const { Component } = TABS.find((item) => item.id === tab);
  const name = sessionStorage.getItem("first_name");

  return (
    <>
      <PageHeader title="Dashboard" lead={`Welcome back${name ? `, ${name}` : ""}. Everything you can change on the site is here.`} />
      <div className="page admin">
        <nav className="admin__tabs" aria-label="Dashboard sections">
          {TABS.map((item) => (
            <button key={item.id} type="button" onClick={() => setTab(item.id)}
                    className={`admin__tab${item.id === tab ? " admin__tab--active" : ""}`}>
              {item.name}
            </button>
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
