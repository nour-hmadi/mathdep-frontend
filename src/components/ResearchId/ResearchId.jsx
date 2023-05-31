import React from "react";
import "./ResearchId.css";
import { useState, useEffect } from "react";
import axios from "axios";
import lodo from "../../assests/imageone.png";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

function ResearchId() {
  const researchId = useParams();
  const [info, setInfo] = useState([]);
  const [imge, setImge] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getAllInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://mathdep.onrender.com/api/research/${researchId.id}`
        );
        setInfo(response.data.data);
        setImge(response.data.data.image.url)
        setIsLoading(false);
        // console.log(response.data.data);
      } catch (error) {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      }
    };

    getAllInfo();
  }, []);

  // console.log( info);



 
 


  return (
    <div className="research-solo-container-page">
     
      <p className="list-links">
        <NavLink>Home</NavLink> <span>{" > "}</span>{" "}
        <NavLink> Academics </NavLink>
        {" > "}
        <NavLink>research</NavLink>
      </p>
      <div >
      {" "}
      <h1 className="research-main-title">
        The Ice Memory operation saved Arctic climate heritage after an
        expedition endangered by unexpected meltwater
      </h1>
      <p className="square-blue-filter-research">Research</p>
      <p className="on-date-of-the-research">on date 23 may</p>
      <div className="image-container-research-id-page">
        <img src={imge} className="research-id-page-main-image" />
      </div>
      <h2 className="thesis-of-the-research">{info.title}</h2>
      <p className="research-paragraph">
     {info.description}
      </p>
    </div>

    </div>
  );
}

export default ResearchId;
