import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader/PageHeader";
import Loader from "../components/Loader/Loader";
import "../styles/Gallery.css";

const url = `${API_URL}/api/gallery/`;

function Gallery() {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then((response) => setPictures(response.data.data || []))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Gallery" lead="Campus, classrooms and events, in pictures." />
      <div className="page">
        {isLoading ? <Loader /> : pictures.length ? (
          <div className="gallery-grid">
            {pictures.map((picture) => (
              <figure key={picture._id} className="gallery-item">
                <img src={picture.image.url} alt={picture.title || "Department gallery"} loading="lazy" />
                {picture.title && <figcaption>{picture.title}</figcaption>}
              </figure>
            ))}
          </div>
        ) : <p className="empty">No pictures have been published yet.</p>}
      </div>
    </>
  );
}

export default Gallery;
