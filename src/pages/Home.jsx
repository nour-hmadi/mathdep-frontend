import React from "react";
import Footer from "../components/Footer/Footer";
import "../styles/Home.css";
import logo from "../assests/imagefive.png";
import HomeParallax from "../components/HomeParallax/HomeParallax";
import HeaderCarousel from "../components/HeaderCarousel/HeaderCarousel";
import ResearchComponent from "../components/ResearchComponent/ResearchComponent";
import CalendarComponent from "../components/AnnouncementsComponent/AnnouncementsComponent";
import HomeBio from "../components/HomeBio/HomeBio";
import SectionTwo from "../components/SectionTwo/SectionTwo";
import HeadDepartment from "../components/HeadDepartment/HeadDepartment";
import Carousel from "../components/Carousel/Carousel";

function Home() {
  return (
    <div className="home-page-container">
      <HeaderCarousel />
      <HomeBio />
      <ResearchComponent />
      <HomeParallax />
      <CalendarComponent />
      <HeadDepartment />
      <SectionTwo />
      <Carousel />
    </div>
  );
}

export default Home;
