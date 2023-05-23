import React from "react";

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
        setInfo(response.data.data);
        setIsLoading(false);
        console.log("response.data: " + response.data.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  };
  console.log("info " + info);
  const cards = info.map((item, index) => {
    console.log("the object id is : " + item._id)
    if (index % 2 === 0) {

      return (
        <div className="about-us-card-container" key={index}>
        
          <img
            src={item.image.url}
            alt="a description for the math department and the math community"
            className="aboutus-card-description-image"
          />
          <div className="about-info">
            <h1 className="about-title">{item.title}</h1>
            <p className="about-description">{item.description}</p>
          </div>
        </div>
      );
    } else if (index % 2 === 1) {
      return (
        <div className="about-us-card-container" key={index}>
          <div className="about-info">
            <h1 className="about-title">{item.title}</h1>
            <p className="about-description">{item.description}</p>
          </div>
          <img
            src={item.image.url}
            alt="a description for the math department and the math community"
            className="aboutus-card-description-image"
          />
        </div>
      );
    }
    return null;
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="about-us-page-cards-container">{cards}</div>
        </div>
      )}
    </div>
  );
}

export default AboutUs;
