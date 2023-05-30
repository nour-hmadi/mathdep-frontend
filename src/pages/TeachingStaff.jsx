import React from "react";
import '../styles/TeachingStaff.css'
import axios from "axios";
import { TeacherCard } from "../components/TeacherCard/TeacherCard";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import PageLinks from "../components/PageLinks/PageLinks";
import ResearchId from "../components/ResearchId/ResearchId";
const url = "http://localhost:5000/api/user/";



export const TeachingStaff = () => {
  const [teacherCards, setTeacherCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    axios
      .get(`${url}`)
      .then((res) => {
        setTeacherCards(res.data.data);
        // console.log(res.data.data)
        setIsLoading(false); 
      })
      .catch((err) => {
      // console.log(err);
      setIsLoading(false)}); 
  }, []);

  return (
    <div className="teaching-staff-page">
   
      
      <PageLinks />
      <div className="column-two-teaching-staff-page">
      <div className='about--section-two-card-container'>
      {/* <img src={card} alt="image" className='about--section-two-card-image'/> */}
      <div className="overlay-text">
        <h2>teacher name</h2>
        <p>teacher position</p>
      </div>
    </div>


        
      </div>
    </div>
    
  );
};
