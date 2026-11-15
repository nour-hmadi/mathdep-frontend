import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";

function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" lead="The address may be wrong, or the page may have moved." />
      <div className="page">
        <p><Link to="/">Back to the home page</Link></p>
      </div>
    </>
  );
}

export default NotFound;
