import API_URL from "../../config";
import React from "react";
import "./ResearchId.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

// One research post: its own title, date, image and text, from /api/research/:id.
function ResearchId() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/research/${id}`)
      .then((response) => setInfo(response.data.data))
      .catch((error) => console.error(`Error: ${error}`));
  }, [id]);

  if (!info) return <div className="research-solo-container-page" />;

  return (
    <div className="research-solo-container-page">
      <p className="list-links">
        <NavLink to="/">Home</NavLink> <span>{" > "}</span>
        <NavLink to="/researchs">Research</NavLink>
      </p>
      <h1 className="research-main-title">{info.title}</h1>
      <p className="square-blue-filter-research">Research</p>
      <p className="on-date-of-the-research">{formatDate(info.createdAt)}</p>
      <div className="image-container-research-id-page">
        <img src={info.image?.url} alt={info.title} className="research-id-page-main-image" />
      </div>
      <p className="research-paragraph">{info.description}</p>
    </div>
  );
}

export default ResearchId;
