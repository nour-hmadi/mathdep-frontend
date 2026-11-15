import React from "react";
import "./TeacherCard.css";

// One teacher: photo, name, title and (when given) a short description, from the public /api/user/teachers list.
export const TeacherCard = ({ name, title, description, image }) => (
  <article className="panel teacher">
    {image && <img src={image} alt="" className="teacher__photo" loading="lazy" />}
    <h3 className="teacher__name">{name}</h3>
    {title && <p className="teacher__title">{title}</p>}
    {description && <p className="teacher__about">{description}</p>}
  </article>
);
