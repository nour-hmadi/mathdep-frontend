import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader/PageHeader";
import { TeacherCard } from "../components/TeacherCard/TeacherCard";
import Loader from "../components/Loader/Loader";
import "../styles/TeachingStaff.css";

const url = `${API_URL}/api/user/teachers`;    // public fields only: name, title, description and photo
const crumbs = [{ name: "Academics", path: "/academics" }];

export const TeachingStaff = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then((res) => setTeachers(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Teaching staff" crumbs={crumbs}
                  lead="The professors and lecturers of the department, and what each of them teaches." />
      <div className="page">
        {isLoading ? <Loader /> : teachers.length ? (
          <div className="teachers-grid">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher._id} name={teacher.name} title={teacher.title}
                           description={teacher.description} image={teacher.image} />
            ))}
          </div>
        ) : <p className="empty">The staff list is not available right now.</p>}
      </div>
    </>
  );
};
