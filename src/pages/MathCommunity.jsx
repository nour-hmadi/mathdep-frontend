import React from "react";
import "../styles/Home.css";
import '../styles/MathCommunity.css'
import  one from "../../src/assests/imageone.png";
import  two from "../../src/assests/imagetwo.png";
import  three from "../../src/assests/imagethree.png";
import  four from "../../src/assests/imagefour.png";
import  five from "../../src/assests/imagefive.png";
import  six from "../../src/assests/imagesix.png";
import  seven from "../../src/assests/imageseven.png";


function MathCommunity() {
  return (
    <div>
    <div className="home-grid">
    <div className="before-home-grid-container">
      <h1 >Welcome  to the students <span>community</span><br/> of <span>Mathematics</span></h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lacinia ligula. Vestue vel dapibus mi. Nulla facilisi. Nullam gravida feugiat mauris, sit amet malesuada dui facilisis at. Donec vehicula finibus diam, a sollicitudin massa molestie id. Nulla vel pulvinar justo. Nullam volutpat eleifend erat ut ultrices. Proin interdum libero ut quam semper vestibulum. Sed mollis velit id libero viverra, vitae placerat urna vulputate. Curabitur non tellus vitae erat egestas tempus. Vestibulum ultricies justo sed lectus scelerisque, eu laoreet justo dignissim</p>
      <button className="math-com-button">
    Join Us!
</button>
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
    <div className="wave-container">
  
    <div className="wave-two"></div>
 
</div>

    </div>
  );
}

export default MathCommunity;
