import React from "react";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import "../styles/ContactUs.css";
import ContactCard from "../components/ContactCard/ContactCard";
import ContactForm from "../components/ContactForm/ContactForm";
// import Navbar from '../components/Navbar/Navbar';
// import ContactHeader from '../components/ContactHeader/ContactHeader';

 import contactUsTwo from '../assests/wallpaper.jpg'
import ContactUsMap from "../components/ContactUsMap/ContactUsMap";

function ContactUs() {
  return (
    <div className="contact-page-container">
      <div className="filter-top-layer">
      <img className="image-contact-us-page-header" alt="contact us header" src={contactUsTwo} />
      </div>
      <div className="contact-page">
        <div className="contact-form-background">
          <div className="contact_form_con">
            <div className="contact_form_conn">
              <ContactForm />
            </div>
            
          </div>
        </div>
        <div className="contact-details">
          <ContactCard
            icon={<BsTelephone style={{ height: 28, width: 28 }} />}
            title="Call us"
            address="00 000 00 000 000"
          />
          <ContactCard
            icon={<HiOutlineMail style={{ height: 28, width: 28 }} />}
            title="Send us an email"
            address="studentsRequiries@ul.edu.lb"
          />
          <ContactCard
            icon={<SlLocationPin style={{ height: 28, width: 28 }} />}
            title="Visit our office"
            address="Hadath - Rafik Al Hariri Camous - faculty of sciences - floor 2"
          />
        </div>
        <div >
          <ContactUsMap />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
