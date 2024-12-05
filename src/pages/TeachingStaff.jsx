import React from "react";
import '../styles/TeachingStaff.css'
import axios from "axios";
import { TeacherCard } from "../components/TeacherCard/TeacherCard";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import PageLinks from "../components/PageLinks/PageLinks";
import ResearchId from "../components/ResearchId/ResearchId";
// const url = "https://mathdep.onrender.com/api/user/";
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
      console.log(err);
      setIsLoading(false)}); 
  }, []);

  return (
    <div className="teaching-staff-page">
      <PageLinks />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="column-two-teaching-staff-page">
          {teacherCards.length > 0 ? (
            teacherCards.map((teacher, index) => (
              <TeacherCard
                key={index}
                name={teacher.name}
                position={teacher.position}
                image={teacher.image} 
              />
            ))
          ) : (
            <p>No teaching staff data available.</p>
          )}
        </div>
      )}
    </div>
  );
};
