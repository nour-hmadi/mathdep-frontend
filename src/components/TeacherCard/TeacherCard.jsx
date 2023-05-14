import React from "react";
import "./TeacherCard.css";
export const TeacherCard = ({
  id,
  name,
  profession,
  position,
  description,
  email,
  gatelink,
  subjects,
  imageSrc,
}) => {
  return (
    <div key={id}>
      <div className="teacher-card-container card">
        <div className="temporary_text">
          <img
            src={`data:image/jpeg;base64,${imageSrc}`}
            alt="imgSrc"
            className="teacher-card-image"
          />
        </div>
        <div className="card_content teacher-card-details">
          <span className="card_title">
            <h1>name : {name}</h1>
          </span>
          <span className="card_subtitle">
            <p>profession :{profession}</p>
          </span>
          <p className="card_description">Position: {position}</p>
          <p className="card_description">description: {description}</p>
          <p className="card_description">email: {email}</p>
          <p className="card_description">gatelink :{gatelink}</p>
          <p className="card_description">subjects: {subjects}</p>
        </div>
      </div>
    </div>
  );
};
