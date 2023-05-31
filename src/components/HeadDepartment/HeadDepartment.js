import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import "./SectionOne.css";

const url = "https://mathdep.onrender.com/api/headdepartment/";

function HeadDepartment() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getAllInfo();
  }, []);

  const getAllInfo = async () => {
    await axios
      .get(`${url}`)
      .then((response) => {
        setInfo(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const cards = info.map((object, index) => {
    return (
      <div key={index} className="head-dep-item">
        <div className="description-container-head-dep">
          <h1 className="head-dep-name">{object.name}</h1>
          <p className="head-dep-description">{object.description}</p>
          <h5>{object.email}</h5>
        </div>

        <div className="image-container-head-dep">
        <img src={object.image.url} alt="image of the head dep" className="image-head-dep"/></div>
      </div>
    );
    return null;
  });
  return (
    <div className="head-dep-section-home-page">
      <div className="blue-filter">
        <h1 className="head-dep-title-of-the-section">Head of the Deapartment</h1>
        <div>{cards}</div>
      </div>
    </div>
  );
}

export default HeadDepartment;
