import React from "react";
import "./TeacherCard.css";

// One teacher: photo, name, title and a short description, from the public /api/user/teachers list.
export const TeacherCard = ({ name, title, description, image }) => (
  <div className="teacher-card-container card">
    <div className="temporary_text">
      {image && <img src={image} alt={name} className="teacher-card-image" />}
    </div>
    <div className="card_content teacher-card-details">
      <span className="card_title">
        <h1>{name}</h1>
      </span>
      {title && (
        <span className="card_subtitle">
          <p>{title}</p>
        </span>
      )}
      {description && <p className="card_description">{description}</p>}
    </div>
  </div>
);
