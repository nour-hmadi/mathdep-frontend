import React from "react";
import "./AboutUsCard.css";



function AboutUsCardEven(props) {
  return (
    <div  className="about-us-card-container">
      <img
        src={`data:image/jpeg;base64,${props.imageSrc}`}
        alt="a description for the math department and the math community"
        className="aboutus-card-description-image"
      />
      <div className="about-info">
        <h1 className="about-title">{props.title}</h1>
        <p className="about-description">{props.description}</p>
      </div>
    </div>
  );
}

export default AboutUsCardEven;
