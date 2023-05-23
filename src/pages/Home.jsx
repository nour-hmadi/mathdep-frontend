import React from "react";
import Footer from "../components/Footer/Footer";
import "../styles/Home.css";
import logo from "../assests/imagefive.png";
import HomeParallax from "../components/HomeParallax/HomeParallax";
import Carousel from "../components/Carousel/Carousel";
import HeaderCarousel from "../components/HeaderCarousel/HeaderCarousel";
import NewsletterForm from "../components/NewsLetter/NewsLetter";
import Navbar from "../components/Navbar/Navbar";
import ResearchComponent from "../components/ResearchComponent/ResearchComponent";

function Home() {
  return (
    <div className="home-page-container">
     
      <HeaderCarousel />
      <HomeParallax />
      <ResearchComponent />
    
    </div>
  );
}

export default Home;
