import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assests/wallpaper.jpg";
import './HeaderCarousel.css';


// const backgroundStyle = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   // Additional styles...
// };


const HeaderCarousel = () => {
  const sliderRef = useRef(null);

  const handleScroll = (event) => {
    const delta = event.nativeEvent.wheelDelta || -event.nativeEvent.detail;
    if (delta > 0) {
      sliderRef.current.slickPrev(); // Scroll up, move to next slide
    } else if (delta < 0) {
      sliderRef.current.slickNext(); // Scroll down, move to previous slide
    }
  };

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    // <div style={backgroundStyle}>
    <div className="carousel-container" onWheel={handleScroll}>
      <Slider {...settings} ref={sliderRef}>
        <div className="image-container">
       
          <img
            className="home-carousel-images"
            src={logo}
            alt="carousel image"
          />
           <div className="filter-carousel-header">
          </div>
        </div>
        <div className="image-container">
       
          <img
            className="home-carousel-images"
            src={logo}
            alt="carousel image"
          />
           <div className="filter-carousel-header">
          </div>
        </div>
        <div className="image-container">
          <img
            className="home-carousel-images"
            src={logo}
            alt="carousel image"
          />
        </div>
      </Slider>
    </div>
    // </div>
  );
};

export default HeaderCarousel;
