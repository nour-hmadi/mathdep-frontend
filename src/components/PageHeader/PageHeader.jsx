import React from "react";
import { Link } from "react-router-dom";
import "./PageHeader.css";

// The band at the top of every inner page: breadcrumb, title and one line that says what the page is for.
function PageHeader({ title, lead, crumbs = [] }) {
  return (
    <section className="page-header">
      <div className="page-header__inner">
        <nav className="page-header__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((crumb) => (
            <React.Fragment key={crumb.path}>
              <span aria-hidden="true"> / </span>
              <Link to={crumb.path}>{crumb.name}</Link>
            </React.Fragment>
          ))}
          <span aria-hidden="true"> / </span>
          <span className="page-header__current">{title}</span>
        </nav>
        <h1 className="page-header__title">{title}</h1>
        {lead && <p className="page-header__lead">{lead}</p>}
      </div>
    </section>
  );
}

export default PageHeader;
