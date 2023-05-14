import React from "react";
import '../styles/TeachingStaff.css'
import axios from "axios";
import { TeacherCard } from "../components/TeacherCard/TeacherCard";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
const url = "http://localhost:5000/api/teachercard/";

export const TeachingStaff = () => {
  const [teacherCards, setTeacherCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    axios
      .get(`${url}`)
      .then((res) => {
        setTeacherCards(res.data);
        console.log(res.data)
        setIsLoading(false); 
      })
      .catch((err) => {
      console.log(err);
      setIsLoading(false)}); 
  }, []);

  return (
    <div>
    {isLoading ? <Loader />: (
    <div className="teaching-staff-page">
      {teacherCards.map((card) => (
        <TeacherCard
        key={card.id}
          name={card.name}
          profession={card.profession}
          position={card.description_title}
          description={card.description_parag}
          email={card.email}
          gatelink={card.platform_link}
          subjects={card.subject}
          imageSrc={card.image}
        />
      ))}

      
       </div>)}
    </div>
    
  );
};
