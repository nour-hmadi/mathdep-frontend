import React from 'react'
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import '../styles/ContactUs.css'
import ContactCard from '../components/ContactCard/ContactCard';
import ContactForm from '../components/ContactForm/ContactForm';
// import Navbar from '../components/Navbar/Navbar';
// import ContactHeader from '../components/ContactHeader/ContactHeader';

// import contactUsTwo from '../assests/wallpaper.jpg'


function ContactUs() {
  return (
    <div className='contact-page-container'>
    <div className="filter-top-layer">
      {/* <ContactHeader  backgroundImage={contactUsTwo} minHeight={"600px"}/>
       */}
      </div>
    <div className="contact-page">
   
      <div className="contact-form-background">
      <div className='contact_form_con'> 
      <div className='contact_form_conn'><ContactForm /></div>
      <div className='transparent-dotss'></div>
     
      </div>
      
      
      </div>
      <div className="contact-details">
  
  <ContactCard icon={ <BsTelephone style={{height:28, width:28}}/>} title="Call us" address="00 000 00 000 000"/>
  <ContactCard icon={ <HiOutlineMail style={{height:28, width:28}}/>} title="send us an email" address="info@jaykhawand.com"/>
  <ContactCard icon={ <SlLocationPin style={{height:28, width:28}}/>} title="visit our office" address="Jay Khawand Studios, Sinn el Fil, Jisr el Wati, Fattal street Younes building, 1st floor Beirut"/>


</div>
    </div>
    </div>
   
    
  )
}

export default ContactUs









