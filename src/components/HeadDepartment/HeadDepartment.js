import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import "./SectionOne.css";

const url = "http://localhost:5000/api/headdepartment/";

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
      <div  className="head-dep-">
        <div className="about--section-one-container">
          <div key={index} className="blue-filter">
            <div className="about--section-one-column-one">
              <p className="agenda-title-hd"> Head Department</p>
              <p className="about--section-one-title">{object.name}</p>
              <p className="about--section-one-description">
                {object.description}
              </p>
            
                  <div className="email-icon-headdep">
                    <MdOutlineMarkEmailRead />{object.email}
                  </div>
                 
              
            </div>
            <div className="about--section-one-column-two">
              <div className="about--section-one-image-backgroud">
                <img
                  src={object.image.url}
                  alt="image"
                  className="about-section-one-image"
                />
                <div className="transparent-dots"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return null;
  });
  return <div>{cards}</div>;
}

export default HeadDepartment;
