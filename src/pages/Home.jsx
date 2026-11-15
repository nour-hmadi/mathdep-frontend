import React from "react";
import "../styles/Home.css";
import HeaderCarousel from "../components/HeaderCarousel/HeaderCarousel";
import ResearchComponent from "../components/ResearchComponent/ResearchComponent";
import HomeParallax from "../components/HomeParallax/HomeParallax";
import AnnouncementsComponent from "../components/AnnouncementsComponent/AnnouncementsComponent";
import HeadDepartment from "../components/HeadDepartment/HeadDepartment";
import SectionTwo from "../components/SectionTwo/SectionTwo";

function Home() {
  return (
    <div className="home-page-container">
      <HeaderCarousel />
      <ResearchComponent />
      <HomeParallax />
      <AnnouncementsComponent />
      <HeadDepartment />
      <SectionTwo />
    </div>
  );
}

export default Home;
