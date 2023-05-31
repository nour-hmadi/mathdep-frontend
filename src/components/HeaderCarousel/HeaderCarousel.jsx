import React, { useRef } from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assests/wallpaper.jpg";
import "./HeaderCarousel.css";

const url = "https://mathdep.onrender.com/api/carousel/";


const HeaderCarousel = () => {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  useEffect(() => {
    getAllInfo();
  }, []);

  const getAllInfo = async () => {
    setIsLoading(true);
    await axios
      .get(`${url}`)
      .then((response) => {
        setInfo(response.data.data);
        setIsLoading(false);
        // console.log("response.data: " + response.data.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  };
  // console.log("info " + info);

  const cards = info.map((item, index) => {
    // ("the object id is : " + item._id);

    return (
      <div key={index}>
        <div className="image-container">
          <img
            className="home-carousel-images"
            src={item.image.url}
            alt="carousel image"
          />
          <div className="filter-carousel-header">{item.title}</div>
        </div>
      </div>
    );
    
  });
  return (
    // <div style={backgroundStyle}>
    <div className="carousel-container" onWheel={handleScroll}>
      <Slider {...settings} ref={sliderRef}>
        {cards}
      </Slider>
    </div>
    // </div>
  );
};

export default HeaderCarousel;
