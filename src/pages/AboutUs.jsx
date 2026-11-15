// import React from "react";

// //npm install axios
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/AboutUs.css";

// import AboutUsCardEven from "../components/AboutUsCard/AboutUsCardEven.jsx";
// import AboutUsCardOdd from "../components/AboutUsCard/AboutUsCardOdd.jsx";
// import Loader from "../components/Loader/Loader";
// const url = "https://mathdep.onrender.com/api/aboutus/";

// function AboutUs() {
//   const [info, setInfo] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     getAllInfo();
//   }, []);

//   const getAllInfo = async () => {
//     setIsLoading(true);
//     await axios
//       .get(`${url}`)
//       .then((response) => {
//         setInfo(response.data.data);
//         setIsLoading(false);
//         console.log("response.data: " + response.data.data);
//       })
//       .catch((error) => {
//         console.error(`Error: ${error}`);
//         setIsLoading(false);
//       });
//   };
//   console.log("info " + info);
//   const cards = info.map((item, index) => {
//     console.log("the object id is : " + item._id);
//     if (index % 2 === 0) {
//       return (
//         <div className="about-us-card-container" key={index}>
//           <img
//             src={item.image.url}
//             alt="a description for the math department and the math community"
//             className="aboutus-card-description-image"
//           />
//           <div className="about-info">
//             <h1 className="about-title">{item.title}</h1>
//             <p className="about-description">{item.description}</p>
//           </div>
//         </div>
//       );
//     } else if (index % 2 === 1) {
//       return (
//         <div className="about-us-card-container" key={index}>
//           <div className="about-info">
//             <h1 className="about-title">{item.title}</h1>
//             <p className="about-description">{item.description}</p>
//           </div>
//           <img
//             src={item.image.url}
//             alt="a description for the math department and the math community"
//             className="aboutus-card-description-image"
//           />
//         </div>
//       );
//     }
//     return null;
//   });

//   return (
//     <div>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <div className="about-us-page-cards-container">{cards}</div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AboutUs;
import React from "react";
import "../styles/Home.css";
import "../styles/MathCommunity.css";
import one from "../../src/assests/imageone.png";
import two from "../../src/assests/imagetwo.png";
import three from "../../src/assests/imagethree.png";
import four from "../../src/assests/imagefour.png";
import five from "../../src/assests/imagefive.png";
import six from "../../src/assests/imagesix.png";
import seven from "../../src/assests/imageseven.png";

function AboutUs() {
  return (
    <div>
      <div className="home-grid">
        <div className="before-home-grid-container">
        <h1>
            About The<span> Department</span>
            <br /> of <span>Mathematics</span>
          </h1>
          <p>
            The Department of Mathematics teaches pure and applied mathematics, from first-year calculus and
            linear algebra to master's-level analysis, statistics and numerical computing. Its teachers combine
            teaching with research, and its graduates go on to teach, to study further, or to work with data
            in industry and finance.
          </p>
          {/* <button className="math-com-button">Join Us!</button> */}
        </div>
        <div className="photos-grid-container-home">
          <div className="row-one row">
            <img src={one} className="photos-grid-home" />
            <img src={two} className="photos-grid-home" />
          </div>
          <div className="row-3 row">
            <img src={three} className="photos-grid-home" />
            <img src={four} className="photos-grid-home" />
            <img src={five} className="photos-grid-home" />
          </div>
          <div className="row-two row">
            <img src={six} className="photos-grid-home" />
            <img src={seven} className="photos-grid-home" />
            <img src={one} className="photos-grid-home" />
          </div>
          <div className="row-two row">
            <img src={three} className="photos-grid-home" />
            <img src={five} className="photos-grid-home" />
          </div>
        </div>
      </div>



      <div className="home-grid">
      
        <div className="photos-grid-container-home">
        <div className="row-two row">
            <img src={three} className="photos-grid-home" />
            <img src={five} className="photos-grid-home" />
          </div>
          <div className="row-two row">
            <img src={six} className="photos-grid-home" />
            <img src={seven} className="photos-grid-home" />
            <img src={one} className="photos-grid-home" />
          </div>
          <div className="row-3 row">
            <img src={three} className="photos-grid-home" />
            <img src={four} className="photos-grid-home" />
            <img src={five} className="photos-grid-home" />
          </div>
          <div className="row-one row">
            <img src={one} className="photos-grid-home" />
            <img src={two} className="photos-grid-home" />
          </div>
          
         
        
        </div>
        <div className="before-home-grid-container">
          <h1>
            About The<span> Community</span>
            <br /> of <span>Mathematics</span>
          </h1>
          <p>
            Beyond the classes, students meet in the Math Community: they post questions, share solutions and
            organise the department's competitions and seminars. A teacher reviews every post before it
            appears, so the space stays helpful and respectful.
          </p>
          {/* <button className="math-com-button">Join Us!</button> */}
        </div>
      </div>
      
    </div>
  );
}

export default AboutUs;
