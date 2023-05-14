import React from "react";
import "./Navbar.css";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assests/facultyofsciences.jpg";
//npm install react-icons --save
import { AiOutlineUser } from "react-icons/ai";

const navigationStyle = ({ isActive }) => ({
  color: isActive ? "#3162a4" : "black",
  textDecoration: "none",
  ":hover":{
    color: "red", 
  },

});

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <img src={logo} alt="mathdep logo" className="navbar-logo" />
        <h1 className="navbar-title"><span>MATH</span>dep</h1>




        <NavLink to={`/`} style={navigationStyle}>
          <p className="home">HOME</p>
        </NavLink>

        <NavLink to={`/aboutus`} style={navigationStyle}>
          <p className="home">ABOUTUS</p>
        </NavLink>
        <div className="dropdown">
          <button className="dropbtn">
            <span>
              <NavLink to={`/gallery`} style={navigationStyle}>
                GALLERY
              </NavLink>
            </span>
          </button>
          <div className="dropdown-menu">
            <a href="#">phd students</a>
            <a href="#">festivals</a>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <span>
              <NavLink to={`/academics`} style={navigationStyle}>
                ACADEMICS
              </NavLink>
            </span>
          </button>
          <div className="dropdown-menu">
          <NavLink to={`/academics/teachingstaff`} style={navigationStyle}>Teaching Staff</NavLink>
            <a href="#">Directory Team</a>
            <a href="#">Teachung Courses</a>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">
            <span>
            
              <NavLink to={`/research`} style={navigationStyle}>
                RESEARCH
              </NavLink>
            </span>
          </button>
          <div className="dropdown-menu">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <span>RESOURCES</span>
          </button>
          <div className="dropdown-menu">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <span>NEWS & EVENTS</span>
          </button>
          <div className="dropdown-menu">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">
            <span>CONTACT US</span>
          </button>
          <div className="dropdown-menu">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <span> MATH COMMUNITY</span>
          </button>
          <div className="dropdown-menu">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <span>
              <AiOutlineUser />
            </span>
          </button>
          <div className="dropdown-menu" id="last-dropdown-menu">
            <a href="#">log in</a>
            <a href="#">sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
