import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ResearchComponent.css";
import Loader from "../Loader/Loader";

const url = "http://localhost:5000/api/research/";

function ResearchComponent() {
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
  const cards = info.map((item, index) => {
    return (
      <div key={index} className="home-research-component-container">
        <div className="row-one-research-container-home-page">
          <img src={item.image.url} />
        </div>

        <div className="row-two-container-research-home-page">
          <h2 className="blue-title-research-container-row-one">Research</h2>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="section-container-research-home-page">
          <p className="agenda-title"> Now at the Department of Mathematics</p>

          <div className="section-research-home-page">{cards}</div>
          <button className="show-more-research-section-home-page">Show More</button>
        </div>
      )}
    </div>
  );
}

export default ResearchComponent;
