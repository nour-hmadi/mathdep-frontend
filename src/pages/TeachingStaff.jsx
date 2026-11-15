import API_URL from "../config";
import React from "react";
import '../styles/TeachingStaff.css'
import axios from "axios";
import { TeacherCard } from "../components/TeacherCard/TeacherCard";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import PageLinks from "../components/PageLinks/PageLinks";

const url = `${API_URL}/api/user/teachers`;    // public fields only: name, title, description and photo

export const TeachingStaff = () => {
  const [teacherCards, setTeacherCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setTeacherCards(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="teaching-staff-page">
      <PageLinks />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="column-two-teaching-staff-page">
          {teacherCards.length > 0 ? (
            teacherCards.map((teacher) => (
              <TeacherCard
                key={teacher._id}
                name={teacher.name}
                title={teacher.title}
                description={teacher.description}
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
