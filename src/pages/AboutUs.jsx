import React from "react";
import "../styles/AboutUs.css";
//npm install axios
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AboutUs.css";

import AboutUsCardEven from "../components/AboutUsCard/AboutUsCardEven.jsx";
import AboutUsCardOdd from "../components/AboutUsCard/AboutUsCardOdd.jsx";
import Loader from "../components/Loader/Loader";
const url = "http://localhost:5000/api/aboutus/";

function AboutUs() {
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

  const cards = info.map((item, index) => {
    if (index % 2 === 0) {
      return (
        <AboutUsCardEven
          key={item.id}
          title={item.title}
          description={item.description}
          imageSrc={item.image}
        />
      );
    } else if (index % 2 === 1) {
      return (
        <AboutUsCardOdd
          key={item.id}
          title={item.title}
          description={item.description}
          imageSrc={item.image}
        />
      );
    }
    return null;
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="about-us-page-cards-container">{cards}</div>
      )}
    </div>
  );
}

export default AboutUs;
