import React from "react";
import "./PageLinks.css";
import { useNavigate, NavLink } from "react-router-dom";

const navigationStyle = ({ isActive }) => ({
  color: isActive ? "#EEAF16" : "#3162a4",
  textDecoration: "none",
  ":hover": {
    color: "red",
  },
});
function PageLinks() {
  return (
    <div className="page-side-links-container">
      <h1 className="ul-title-academics-page">Academics</h1>
    <div className="ul-list-items">
      <NavLink to={`/academics/teachingstaff`}   style={navigationStyle}><p className="li-academics-page">Teaching Staff    </p></NavLink>
      <NavLink to={`/academics/subjectsyllabus`}    style={navigationStyle}><p className="li-academics-page">Teaching Syllabus </p></NavLink>
      <NavLink to={`/academics/teachingcourses`} style={navigationStyle}><p className="li-academics-page">Teaching Courses  </p></NavLink>
      <NavLink to={`/academics/teachingschedules`}     style={navigationStyle}><p className="li-academics-page">Teaching Schedules</p></NavLink>
      </div>

      
      
    </div>
  );
}

export default PageLinks;
