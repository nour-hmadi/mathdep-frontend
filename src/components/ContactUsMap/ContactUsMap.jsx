import React from "react";
import "./ContactUsMap.css";
import { TbClockHour11 } from "react-icons/tb";
import ContactCard from "../ContactCard/ContactCard";

function ContactUsMap() {
  return (
    <div className="contact-us-third-section-container">
      
      <ContactCard
        icon={<TbClockHour11 />}
        title="Working Hours"
        address="Monday To Thursday : from 9:00 am to 1:00 pm"
      />{" "}
      <ContactCard
        icon={<TbClockHour11 />}
        title="Working Hours"
        address="Friday : from 9:00 am to 12:00 pm"
      />
    </div>
  );
}

export default ContactUsMap;
