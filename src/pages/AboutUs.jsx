import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import "../styles/AboutUs.css";
import one from "../assests/imageone.png";
import two from "../assests/imagetwo.png";
import three from "../assests/imagethree.png";
import four from "../assests/imagefour.png";
import five from "../assests/imagefive.png";
import six from "../assests/imagesix.png";
import seven from "../assests/imageseven.png";

function AboutUs() {
  return (
    <div>
      <PageHeader title="About the department" lead="Who we are, what we teach, and the community around the classes." />
      <div className="home-grid">
        <div className="before-home-grid-container">
        <h1>
            About The<span> Department</span>
            <br /> of <span>Mathematics</span>
          </h1>
          <p>
            The Department of Mathematics teaches pure and applied mathematics, from first-year calculus and
            linear algebra to master's-level analysis, statistics and numerical computing. Its teachers combine
            teaching with research, and its graduates go on to teach, to study further, or to work with data
            in industry and finance.
          </p>
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
          <p>
            Beyond the classes, students meet in the Math Community: they post questions, share solutions and
            organise the department's competitions and seminars. A teacher reviews every post before it
            appears, so the space stays helpful and respectful.
          </p>
        </div>
      </div>

    </div>
  );
}

export default AboutUs;
