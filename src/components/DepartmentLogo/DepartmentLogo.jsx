import React, { useState, useEffect } from "react";
import logo from "../../assests/facultyofsciences.jpg";
import "./DepartmentLogo.css";
import axios from "axios";

function DepartmentLogo() {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userId, setUserId] = useState(""); //{{id}} is how i am storing the id in the sessionStorage

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedin(true);
    }
    const sessionId = sessionStorage.getItem("id");
    setUserId(sessionId);
    
  }, []);


 

  return (
    <div className="dep-logo">
       <img src={logo} alt="mathdep logo" className="navbar-logo" />
     
       <h1 className="navbar-title">
        <span>Math</span>ematics
        <br />
        <span>Dep</span>artment
      </h1>
      {isLoggedin ? (
        <div>
         Hi!
        </div>
      ) : 
      null}
    </div>
  );
}

export default DepartmentLogo;
