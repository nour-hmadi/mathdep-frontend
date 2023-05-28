import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AnnouncementsComponent.css";
import { useState, useEffect } from "react";
import axios from "axios";
import loudspeakericontwo from "../../assests/microphone.png";
import { BsCalendar4Event } from "react-icons/bs";
const url = "http://localhost:5000/api/announcements/";

function CalendarComponent() {
  const [info, setInfo] = useState([]);

  // const sliderRef = useRef(null);
  // const handleScroll = (event) => {
  //   const delta = event.nativeEvent.wheelDelta || -event.nativeEvent.detail;
  //   if (delta > 0) {
  //     sliderRef.current.slickPrev(); // Scroll up, move to next slide
  //   } else if (delta < 0) {
  //     sliderRef.current.slickNext(); // Scroll down, move to previous slide
  //   }
  // };

  // const settings = {
  //   arrows: true,
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  // };

  useEffect(() => {
    getAllInfo();
  }, []);

  const getAllInfo = async () => {
    await axios
      .get(`${url}`)
      .then((response) => {
        setInfo(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const anncards = info.map((object, index) => {
    console.log(object, index);

    if (object.type === "announcement") {
      return (
        <div key={index} className="calendar-one-day-container">
          <div className="calendar-day-type">
            <img
              src={loudspeakericontwo}
              alt="icon loud speaker"
              className="icon-loudspeaker"
            />

            <h2 className="calendar-day-date">{object.type}</h2>
          </div>
          <h1 className="calendar-day-the-alert">{object.title}</h1>
          <p className="calendar-day-description">{object.description}</p>
          <h6 className="calendar-day-post-date">{object.createdAt}</h6>
        </div>
      );
    } else if (object.type === "event") {
      return (
        <div key={index} className="calendar-one-day-container">
          <div className="calendar-day-type">
            <BsCalendar4Event className="re-icon-loudspeaker" />

            <h2 className="calendar-day-date">{object.type}</h2>
          </div>
          <h1 className="calendar-day-the-alert">{object.title}</h1>
          <p className="calendar-day-description">{object.description}</p>
          <h6 className="calendar-day-post-date">{object.createdAt}</h6>
        </div>
      );
    }
  });
  console.log( "anncards: " + anncards);
  return (
    <div className="announcements-hero-section-of-the-home-page">
      <p className="agenda-title">News & Events</p>
      <div
        className="announcements-section-of-the-home-page"
        >
     
      {anncards}
   
      </div>
    </div>
  );
}

export default CalendarComponent;
