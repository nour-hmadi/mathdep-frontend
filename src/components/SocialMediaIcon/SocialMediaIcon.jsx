import React from "react";
import "./SocialMediaIcon.css";

// One social icon in the footer, opening the department's page in a new tab
function SocialMediaIcon({ icon, href, label }) {
  return (
    <div className="icons-div">
      <a className="social-media-react-icon" href={href} target="_blank" rel="noreferrer" aria-label={label}>{icon}</a>
    </div>
  );
}

export default SocialMediaIcon;
