import React, { useState, useEffect } from "react";
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

const logOut = () => {
  window.sessionStorage.clear();
  window.location.reload(true);
};

function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedin(true);
      console.log(sessionStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  
  return (
    <div className="navbar-container">
      <div className="logo-oart-of-the-navbar">
        <DepartmentLogo />
      </div>
      <div ref={navRef} className="navbar">
        <NavLink to={`/`} style={navigationStyle}>
          <p className="home">Home</p>
        </NavLink>

        <NavLink to={`/aboutus`} style={navigationStyle}>
          <p className="home">About us</p>
        </NavLink>

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

        {isAdmin ? (
          <NavLink to={`/pendingposts`} style={navigationStyle}>
            <p className="home">PendingPosts</p>
          </NavLink>
        ) : null}
        {isAdmin ? (
          <NavLink to={`/students`} style={navigationStyle}>
            <p className="home">Students</p>
          </NavLink>
        ) : null}

        <div className="dropdown">
          {isLoggedin ? (
            <NavLink to={`/`}>
              <button className="dropbtn" onClick={logOut}>
                <span>
                  <AiOutlineUser />
                  logout
                </span>
              </button>
            </NavLink>
          ) : (
            <NavLink to={`/login`}>
              <button className="dropbtn">
                <span>
                  <AiOutlineUser />
                  login
                </span>
              </button>
            </NavLink>
          )}
        </div>

        <button onClick={showNavbar} className="nav-btn nav-close-btn">
          <FaTimes />
        </button>
      </div>
      <button onClick={showNavbar} className="nav-btn">
        <FaBars />
      </button>
      {/* {isLoggedin ? <button > log out </button> :<h1>hello you are not logged in</h1>  } */}
    </div>
  );
}

export default Navbar;
