import React from "react";
import "./Footer.css";
import { useNavigate, NavLink } from "react-router-dom";

import logo from "../../assests/facultyofsciences.jpg";
import SocialMediaIcon from "../SocialMediaIcon/SocialMediaIcon";
import { AiFillInstagram } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io";
const navigationStyle = ({ isActive }) => ({
  color: isActive ? "#3162a4" : "white",
  textDecoration: "none",
  ":hover": {
    color: "red",
  },
});
function Footer() {
  return (
    <div className="footer">
      <div className="footer-row-one">
        <div className="footer-section-one">
          <div className="footer-logo-container">
            <img src={logo} alt="mathdep logo" className="footer-logo" />
            <h1 className="footer-title">
              {" "}
              <span>MATH</span>dep{" "}
            </h1>
          </div>
          <p>
            If you are going to use a passage LorIsum, you anythirassing hidden
            in the middle of text. Iators on the Internet tend to.
          </p>
          <h1 className="follow-us-footer-icons-header"> Follow Us</h1>
          <div className="footer-social-media-icons">
            <SocialMediaIcon icon={<AiFillInstagram />} />
            <SocialMediaIcon icon={<GrFacebookOption />} />
            <SocialMediaIcon icon={<BsYoutube />} />
            <SocialMediaIcon icon={<IoLogoLinkedin />} />
          </div>
        </div>
        <div className="footer-section-two">
            <p>Lebanese University</p>
            <p>hadath Campus</p>
            <p>+961 01 000 000</p>
            </div>
            <div className="footer-section-three">
          <NavLink to={`/contactus`} style={navigationStyle}>    <p className="footer-links-pages">Contact us</p></NavLink>
          <NavLink to={`/calendar`} style={navigationStyle}>     <p className="footer-links-pages">Calendar</p></NavLink>
          <NavLink to={`/news&events`} style={navigationStyle}>  <p className="footer-links-pages">New & Events</p></NavLink>
          <NavLink to={`/gallery`} style={navigationStyle}>      <p className="footer-links-pages">Gallery</p></NavLink>
 


        </div>
        <div className="footer-section-four"></div>
      </div>
      <div className="footer-last-line">
        <p className="footer-nour"> 2023 NourHmadi</p>
      </div>
    </div>
  );
}

export default Footer;
