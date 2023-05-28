import React from "react";
import "./Navbar.css";
import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assests/facultyofsciences.jpg";
//npm install react-icons --save
import { AiOutlineUser } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import DepartmentLogo from "../DepartmentLogo/DepartmentLogo";
import HeaderCarousel from "../HeaderCarousel/HeaderCarousel";

const navigationStyle = ({ isActive }) => ({
  color: isActive ? "#3162a4" : "white",
  textDecoration: "none",
});

function Navbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  
  return (
   
    
    <div className="navbar-container">
      <div className="logo-oart-of-the-navbar">
        <DepartmentLogo />
      </div>
      <div ref={navRef} className="navbar">
        <NavLink to={`/`} style={navigationStyle}>
          <p className="home">Home</p>
        </NavLink>

        <NavLink to={`/aboutus`} style={navigationStyle}><p className="home">About us</p></NavLink>

        {/* <NavLink to={`/gallery`} style={navigationStyle}>
          <p className="home">Gallery</p>
        </NavLink> */}

        <NavLink to={`/academics`} style={navigationStyle}>
          <p className="home">Academics </p>{" "}
        </NavLink>

        <NavLink to={`/academics/teachingstaff`} style={navigationStyle}>
          <p className="home">Teaching Staff</p>
        </NavLink>

        {/* <NavLink to={`/research`} style={navigationStyle}>
          <p className="home">Research</p>
        </NavLink> */}

        {/* <NavLink to={`/research`} style={navigationStyle}>
          <p className="home">Resources</p>
        </NavLink> */}

        <NavLink to={`/mathcommunity`} style={navigationStyle}>
          <p className="home">Math Community</p>
        </NavLink>

        <div className="dropdown">
          <button className="dropbtn">
            <span>
              <AiOutlineUser />
            </span>
          </button>
          <div className="dropdown-menu" id="last-dropdown-menu">
            <a href="#" className="drop-down-items">log in</a>
            <a href="#" className="drop-down-items">sign up</a>
          </div>
        </div>

        
        <button onClick={showNavbar} className="nav-btn nav-close-btn">
          <FaTimes />
        </button>
      </div>
      <button onClick={showNavbar} className="nav-btn">
        <FaBars />
      </button>
    </div>
   
  );
}

export default Navbar;
