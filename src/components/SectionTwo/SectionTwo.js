import React from "react";
import CardSectionTwo from "./CardSectionTwo";
import "./SectionTwo.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

// const url = "http://localhost:5000/api/about/";

function SectionTwo() {
  // const [info, setInfo] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [numItems, setNumItems] = useState(3);

  // useEffect(() => {
  //   getAllInfo();
  // }, []);

  // const getAllInfo = () => {
  //   axios
  //     .get(`${url}`)
  //     .then((response) => {
  //       setInfo(response.data);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  const handlePrevClick = () => {
    setStartIndex(startIndex - 1);
  };

  const handleNextClick = () => {
    setStartIndex(startIndex + 1 );
  };

   // numItems=3 //info=6
   //info.length = mapping over all the items in the about collection including the ones of section one and three
   const prevButtonDisabled = startIndex === 0;
   const nextButtonDisabled = startIndex + 3 === 6;
   console.log("start:"+ startIndex)
  //  console.log("filtered:"+ filteredCards.length)
  //  console.log("info:" +  info.length)
   console.log("items:" + numItems)
  //  const cards = filteredCards.slice(startIndex, startIndex + numItems).map((object) => {
    // if (object.section === "2") {
  //     return (
  //       <CardSectionTwo
  //         title={object.title}
  //         description={object.description}
  //         key={object._id}
  //       />
  //     );
  //   // }
  //   return null;
  // });

  return (
    <div>
          <p className="teachingstaff-title"> Teaching Staff</p>

    <div className="about--section-two-container">
     
      <div className="test">
        {prevButtonDisabled ? (
          <Button id="disabled" className="about-nofunction-button" style={{cursor:"default", minWidth: "10px"}}></Button>
        ) : (
          <Button
           style={{ minWidth: "10px" }}
            className="carousel-control-prev"
            variant="contained"
            color="primary"
            onClick={handlePrevClick}
            id="enabled"
          >
            <span style={{ fontWeight: "lighter", fontSize: "20px" }}>{"«"}</span>
          </Button>
        )}
       
       
        <div className="team-cards">   
        
        
        <CardSectionTwo
          title="team member one"
          description="description one "
      
        />
           <CardSectionTwo
          title="team member one"
          description="description one "
      
        />
           <CardSectionTwo
          title="team member one"
          description="description one "
      
        />
   
        
        </div>

        {nextButtonDisabled ? (
          <Button className="about-nofunction-button" id="disabled" style={{cursor:"default", minWidth: "10px"}}></Button>) : (
          <Button
            style={{ minWidth: "10px" }}
            id="enabled"
            className="carousel-control-next"
            variant="contained"
            color="primary"
            onClick={handleNextClick}
          >
           <span style={{ fontWeight: "lighter", fontSize: "20px" }}>{"»"}</span>
          </Button>
        )}
      </div>
      </div> 
      </div>
  );
}

export default SectionTwo;
