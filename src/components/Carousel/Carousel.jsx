import React from "react";
import "./Carousel.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
