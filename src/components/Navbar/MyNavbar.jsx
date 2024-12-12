

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
//npm install react-icons --save
import { AiOutlineUser } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import DepartmentLogo from "../DepartmentLogo/DepartmentLogo";

const navigationStyle = ({ isActive }) => ({
  color: isActive ? "#3162a4" : "white",
  textDecoration: "none",
});

function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navRef = useRef();
  const navigate = useNavigate(); 

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);
  
  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

   // Handle logout functionality
   const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("userImage");
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  
    // Update state immediately after logout
    setIsLoggedin(false);
    setIsAdmin(false);
  
    // Redirect to home page after logout
    navigate("/");
   
  };
  
  const userImage = sessionStorage.getItem("userImage");
  const userFirstName = sessionStorage.getItem("first_name");
  const menuItems = [
    {
      title: "Academics",
      path: "/academics",
      subtitles: Array.from({ length: 13 }, (_, i) => ({
        name: `Submenu ${i + 1}`,
        path: `/academics/submenu${i + 1}`,
      })),
    },
    {
      title: "Admissions",
      path: "/admissions",
      subtitles: Array.from({ length: 13 }, (_, i) => ({
        name: `Admission Info ${i + 1}`,
        path: `/admissions/info${i + 1}`,
      })),
    },
    {
      title: "Research",
      path: "/research",
      subtitles: Array.from({ length: 13 }, (_, i) => ({
        name: `Research Area ${i + 1}`,
        path: `/research/area${i + 1}`,
      })),
    },
    // Add more titles with similar structure
  ];

  return (
    <div className="navbar-container">
      <div className="logo-oart-of-the-navbar">
        <DepartmentLogo />
      </div>
      <div ref={navRef} className="navbar">
        {isAdmin && (
          <NavLink to={`/admin-dashboard`} style={navigationStyle}>
            <p className="home">Dashboard</p>
          </NavLink>
        )}
      
        {menuItems.map((menu, index) => (
          <div key={index} className="dropdown">
            <NavLink to={menu.path} style={navigationStyle} >
              <button className="dropbtn">{menu.title}</button>
            </NavLink>
            <div className="dropdown-menu">
            <div className="dropdown-menu-subdiv">
              {menu.subtitles.map((submenu, subIndex) => (
                <NavLink
                  key={subIndex}
                  to={submenu.path}
                  className="dropdown-item"
                  style={navigationStyle}
                >
                  {submenu.name}
                </NavLink>
              ))}
              </div>
            </div>
          </div>
        ))}
      
        <NavLink to={`/`} style={navigationStyle}>
          <p className="homepage">Home Page</p>
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
        <NavLink to={`/admissions`} style={navigationStyle}>
          <p className="home">Admissions </p>{" "}
        </NavLink>

        {/* <NavLink to={`/academics/teachingstaff`} style={navigationStyle}>
          <p className="home">Teaching Staff</p>
        </NavLink>  */}

        {/* <NavLink to={`/research`} style={navigationStyle}>
          <p className="home">Research</p>
        </NavLink> */}

        <NavLink to={`/resources`} style={navigationStyle}>
          <p className="home">Resources</p>
        </NavLink>

        <NavLink to={`/research`} style={navigationStyle}>
          <p className="home">Research</p>
        </NavLink>

        <NavLink to={`/outreach`} style={navigationStyle}>
          <p className="home">Outreach</p>
        </NavLink>

        <div className="dropdown">
          {isLoggedin ? (
            <NavLink to={`/`}>
              <button className="dropbtn" onClick={handleLogout}>
                
                <span>
                {userImage ? (
                  <div>
                  <img
                    src={userImage}
                  
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      // objectFit: "cover",
                    }}
                  />
                 
                 </div>) : (
                  <AiOutlineUser />
                )}
                {userFirstName}
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
