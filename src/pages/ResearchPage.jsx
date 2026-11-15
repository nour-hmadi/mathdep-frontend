import API_URL from "../config";
import React from "react";
import "../styles/ResearchPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { NavLink } from "react-router-dom";
import board from "../assests/unsplash.jpg";
const url = `${API_URL}/api/research/`;

function ResearchPage() {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 100;
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
  const cards = info.map((item, index) => {
    return (
      <div key={index} className="home-research-component-container">
        <div className="row-two-container-research-research-page">
          <h1>{item.title}</h1>
          <p>
            {item.description.slice(0, maxLength)}..
            <span>
              {" "}
              <NavLink to={`/research/${item._id}`}>find out more</NavLink>
            </span>
          </p>
        </div>
      </div>
    );
  });
  return (
    <div className="Research-Page-Container">
      <div className="research-page-hero-section">
        <h1 className="RESEARCH-title-page">Research</h1>

        <div className="div-research-page-hero-image">
          <img
            src={board}
            alt="math-chalk-board"
            className="research-page-hero-image"
          />
        </div>
        <h1>Mathematics that solves real problems</h1>
        <p className="paragraph-research-page-hero">
          Research in the department covers pure and applied mathematics: algebra and topology, analysis and
          differential equations, probability and statistics, numerical methods and optimization.
        </p>
        <p className="paragraph-research-page-hero">
          Many projects start from a real question, such as how to make a bus network more robust, how to
          estimate a quantity from a few observations, or how to keep online payments secure, and turn it
          into a model that can be studied and tested.
        </p>
        <p className="paragraph-research-page-hero">
          Students take part through their final-year projects and the weekly seminar. The latest projects
          are listed on this page.
        </p>
      </div>
      <div className="cards-fetching-research-section">
        {cards.splice(0, 8)}
      </div>
    </div>
  );
}

export default ResearchPage;
