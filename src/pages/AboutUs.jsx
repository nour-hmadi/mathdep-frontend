import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import "../styles/AboutUs.css";
import useSiteContent from "../content/useSiteContent";

// The campus photos also fill the Gallery page: see public/images/gallery and the backend seed.
const photo = (n) => `/images/gallery/campus-${n}.jpg`;
const [one, two, three, four, five, six, seven] = [1, 2, 3, 4, 5, 6, 7].map(photo);

function AboutUs() {
  const { SETTINGS } = useSiteContent();
  return (
    <div>
      <PageHeader title="About the department" lead="Who we are, what we teach, and the community around the classes." />
      <div className="home-grid">
        <div className="before-home-grid-container">
        <h1>
            About The<span> Department</span>
            <br /> of <span>Mathematics</span>
          </h1>
          <p>{SETTINGS.aboutDepartment}</p>
        </div>
        <div className="photos-grid-container-home">
          <div className="row-one row">
            <img src={one} className="photos-grid-home" alt="" />
            <img src={two} className="photos-grid-home" alt="" />
          </div>
          <div className="row-3 row">
            <img src={three} className="photos-grid-home" alt="" />
            <img src={four} className="photos-grid-home" alt="" />
            <img src={five} className="photos-grid-home" alt="" />
          </div>
          <div className="row-two row">
            <img src={six} className="photos-grid-home" alt="" />
            <img src={seven} className="photos-grid-home" alt="" />
            <img src={one} className="photos-grid-home" alt="" />
          </div>
          <div className="row-two row">
            <img src={three} className="photos-grid-home" alt="" />
            <img src={five} className="photos-grid-home" alt="" />
          </div>
        </div>
      </div>

      <div className="home-grid">

        <div className="photos-grid-container-home">
        <div className="row-two row">
            <img src={three} className="photos-grid-home" alt="" />
            <img src={five} className="photos-grid-home" alt="" />
          </div>
          <div className="row-two row">
            <img src={six} className="photos-grid-home" alt="" />
            <img src={seven} className="photos-grid-home" alt="" />
            <img src={one} className="photos-grid-home" alt="" />
          </div>
          <div className="row-3 row">
            <img src={three} className="photos-grid-home" alt="" />
            <img src={four} className="photos-grid-home" alt="" />
            <img src={five} className="photos-grid-home" alt="" />
          </div>
          <div className="row-one row">
            <img src={one} className="photos-grid-home" alt="" />
            <img src={two} className="photos-grid-home" alt="" />
          </div>



        </div>
        <div className="before-home-grid-container">
          <h1>
            About The<span> Community</span>
            <br /> of <span>Mathematics</span>
          </h1>
          <p>{SETTINGS.aboutCommunity}</p>
        </div>
      </div>

    </div>
  );
}

export default AboutUs;
