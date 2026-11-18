import React from "react";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { TbClockHour11 } from "react-icons/tb";
import PageHeader from "../components/PageHeader/PageHeader";
import ContactCard from "../components/ContactCard/ContactCard";
import ContactForm from "../components/ContactForm/ContactForm";
import "../styles/ContactUs.css";
import useSiteContent from "../content/useSiteContent";

const icon = { height: 28, width: 28 };

function ContactUs() {
  const { SETTINGS } = useSiteContent();
  return (
    <>
      <PageHeader title="Contact" lead="The secretariat answers students' questions about registration, schedules and exams." />
      <div className="page contact-page">
        <div className="contact-page__form">
          <ContactForm />
        </div>
        <div className="contact-page__cards">
          <ContactCard icon={<BsTelephone style={icon} />} title="Call us" address={SETTINGS.phone} />
          <ContactCard icon={<HiOutlineMail style={icon} />} title="Email us" address={SETTINGS.email} />
          <ContactCard icon={<SlLocationPin style={icon} />} title="Visit us"
                       address={SETTINGS.address} />
          <ContactCard icon={<TbClockHour11 style={icon} />} title="Office hours"
                       address={SETTINGS.officeHours} />
        </div>
      </div>
    </>
  );
}

export default ContactUs;
