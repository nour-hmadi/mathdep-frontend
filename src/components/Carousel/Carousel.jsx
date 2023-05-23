import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../Loader/Loader";

const url = "http://localhost:5000/api/carousel/";

function Carousel() {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllInfo();
  }, []);

  const getAllInfo = async () => {
    setIsLoading(true);
    await axios
      .get(`${url}`)
      .then((response) => {
        setInfo(response.data);

        setIsLoading(false);
        // console.log("response.data: " + response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="carousel-arrow prev" onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="carousel-arrow next" onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </button>
    );
  };

  const settings = {
    arrows:true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="carousel-container">
          <Slider {...settings}>
            {info.map((item) => (
              <div key={item.id} className="image-container">
                <img
                  className="home-carousel-images"
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt="carousel image"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default Carousel;