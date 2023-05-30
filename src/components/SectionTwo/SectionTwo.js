import React from "react";
import CardSectionTwo from "./CardSectionTwo";
import "./SectionTwo.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const api_url = "http://localhost:5000/api/user/";

function SectionTwo() {
  const [info, setInfo] = useState([]);
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const numItems = 3;
  useEffect(() => {
    const getAllInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${api_url}`);
        setInfo(response.data.data);
        setImg(response.data.data);
        setIsLoading(false);
        // console.log(response.data.data);
      } catch (error) {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      }
    };

    getAllInfo();
  }, []);

  const handlePrevClick = () => {
    setStartIndex(startIndex - 1);
  };

  const handleNextClick = () => {
    setStartIndex(startIndex + 1);
  };

  // numItems=3 //info=6
  //info.length = mapping over all the items in the about collection including the ones of section one and three
  const prevButtonDisabled = startIndex === 0;
  const filteredCards = info.filter((object) => object.type === "teacher");
  const nextButtonDisabled = startIndex + numItems === filteredCards.length;
  // console.log("start:" + startIndex);
  // console.log("filtered:" + filteredCards.length);
  // console.log("info:" + info.length);
  // console.log("items:" + numItems);
  console.log("IMAGE", img);
  const cards = filteredCards
    .slice(startIndex, startIndex + numItems)
    .map((object) => {
      return (
        <CardSectionTwo
          title={object.name}
          description={object.email}
          key={object.id}
          image={object.image.url}
        />
      );
    });

  return (
    <div className="about--section-two-container">
      <h1> Professional Team</h1>
      <hr className="horizontal" />
      <p>Quisque sed tellus nullam biben the volutpat dignissim pretium.</p>
      <div className="test">
        {prevButtonDisabled ? (
          <Button
            id="disabled"
            className="about-nofunction-button"
            style={{ cursor: "default", minWidth: "10px" }}
          ></Button>
        ) : (
          <Button
            style={{ minWidth: "10px" }}
            className="carousel-control-prev"
            variant="contained"
            color="primary"
            onClick={handlePrevClick}
            id="enabled"
          >
            <span style={{ fontWeight: "lighter", fontSize: "20px" }}>
              {"«"}
            </span>
          </Button>
        )}

        <div className="team-cards">{cards}</div>

        {nextButtonDisabled ? (
          <Button
            className="about-nofunction-button"
            id="disabled"
            style={{ cursor: "default", minWidth: "10px" }}
          ></Button>
        ) : (
          <Button
            style={{ minWidth: "10px" }}
            id="enabled"
            className="carousel-control-next"
            variant="contained"
            color="primary"
            onClick={handleNextClick}
          >
            <span style={{ fontWeight: "lighter", fontSize: "20px" }}>
              {"»"}
            </span>
          </Button>
        )}
      </div>
      <button className="show-more-research-section-home-page">Show More</button>

    </div>
  );
}

export default SectionTwo;
