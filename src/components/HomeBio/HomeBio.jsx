import React from "react";
import "./HomeBio.css";

function HomeBio(props) {
  return (
    <div>
      <div className="home-bio-container">
        <div className="home-bio-container-column-one">
          <p>{props.title}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeBio;
