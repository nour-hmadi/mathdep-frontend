import React from "react";
import '../styles/Gallery.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const url = "http://localhost:5000/api/gallery/";

function Gallery() {
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

  

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="gallery-container">
          {info.map((item, index) => (
            <div key={index} className="image-container-gallery">
              <img
                className="home-gallery-images"
                src={item.image.url}
                alt="carousel image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Gallery;
