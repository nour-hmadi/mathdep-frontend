import React from "react";
import "../styles/ResearchPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { NavLink } from "react-router-dom";
import board from "../assests/unsplash.jpg";
const url = "https://mathdep.onrender.com/api/research/";

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
        <h1>vitae consequat libero. Nulla facilisi. Quisque consequat risus nec</h1>
        <p className="paragraph-research-page-hero">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vitae consequat libero. Nulla facilisi. Quisque consequat risus nec
          augue facilisis tristique. Duis varius metus vel est fringilla, non
          efficitur lorem pellentesque. Suspendisse potenti. Morbi ac interdum
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          ut eros sit amet tortor ultrices sagittis. Nulla rutrum risus in
          tristique rhoncus. Pellentesque aliquam euismod diam, a malesuada mi
          facilisis ut.
        </p><p className="paragraph-research-page-hero">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vitae consequat libero. Nulla facilisi. Quisque consequat risus nec
          augue facilisis tristique. Duis varius metus vel est fringilla, non
          efficitur lorem pellentesque. Suspendisse potenti. Morbi ac interdum
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          ut eros sit amet tortor ultrices sagittis. Nulla rutrum risus in
          tristique rhoncus. Pellentesque aliquam euismod diam, a malesuada mi
          facilisis ut.
        </p><p className="paragraph-research-page-hero">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vitae consequat libero. Nulla facilisi. Quisque consequat risus nec
          augue facilisis tristique. Duis varius metus vel est fringilla, non
          efficitur lorem pellentesque. Suspendisse potenti. Morbi ac interdum
          efficitur lorem pellentesque. Suspendisse potenti. Morbi ac interdum
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          ut eros sit amet tortor ultrices sagittis. Nulla rutrum risus in
          tristique rhoncus. Pellentesque aliquam euismod diam, a malesuada mi
          facilisis ut.
        </p><p className="paragraph-research-page-hero">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vitae consequat libero. Nulla facilisi. Quisque consequat risus nec
          augue facilisis tristique. Duis varius metus vel est fringilla, non
          efficitur lorem pellentesque. Suspendisse potenti. Morbi ac interdum
          diam. Nullam aliquet posuere ex, eu efficitur nibh consectetur a. Cras
          ut eros sit amet tortor ultrices sagittis. Nulla rutrum risus in
          tristique rhoncus. Pellentesque aliquam euismod diam, a malesuada mi
          facilisis ut.
        </p>
      </div>
      <div className="cards-fetching-research-section">
        {cards.splice(0, 8)}
      </div>
    </div>
  );
}

export default ResearchPage;
