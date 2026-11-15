import React from "react";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { TbClockHour11 } from "react-icons/tb";
import PageHeader from "../components/PageHeader/PageHeader";
import ContactCard from "../components/ContactCard/ContactCard";
import ContactForm from "../components/ContactForm/ContactForm";
import "../styles/ContactUs.css";

const icon = { height: 28, width: 28 };

function ContactUs() {
  return (
    <>
      <PageHeader title="Contact" lead="The secretariat answers students' questions about registration, schedules and exams." />
      <div className="page contact-page">
        <div className="contact-page__form">
          <ContactForm />
        </div>
        <div className="contact-page__cards">
          <ContactCard icon={<BsTelephone style={icon} />} title="Call us" address="+961 1 000 000" />
          <ContactCard icon={<HiOutlineMail style={icon} />} title="Email us" address="mathdep@example.edu.lb" />
          <ContactCard icon={<SlLocationPin style={icon} />} title="Visit us"
                       address="Hadath campus, Faculty of Sciences, building B, floor 2" />
          <ContactCard icon={<TbClockHour11 style={icon} />} title="Office hours"
                       address="Monday to Thursday 9:00 to 13:00, Friday 9:00 to 12:00" />
        </div>
      </div>
    </>
  );
}

export default ContactUs;
