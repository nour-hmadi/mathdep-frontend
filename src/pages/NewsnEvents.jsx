import API_URL from "../config";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader/PageHeader";
import '../styles/NewsnEvents.css';

const url = `${API_URL}/api/announcements/`;


function NewsnEvents() {
    const [info, setInfo] = useState([]);


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
    if (index%2 === 0) {
return (
    <div key={object._id} className='even-bordered-ann-container'>
    <div className='date-ann-div'><h1>{object.day}</h1>
    <p className='month-ann-n-events-date'>{object.month}</p></div>

    <div className='definition-ann-div'>
        <p className='events-n-news-title'>{object.title}</p>
        <p className='events-n-news-description'>{object.description}</p>
        <p className='events-n-news-createdAt-even'>{new Date(object.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
    </div>


    </div>
)}
else if (index%2 === 1) {
    return (
        <div key={object._id} className='odd-bordered-ann-container'>
        <div className='date-ann-div'>
        <h1>{object.day}</h1>
        <p className='month-ann-n-events-date'>{object.month}</p></div>

        <div className='definition-ann-div'>
            <p className='events-n-news-title'>{object.title}</p>
            <p className='events-n-news-description'>{object.description}</p>
            <p className='events-n-news-createdAt-odd'>{new Date(object.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
        </div>


        </div>
    )}

});

  return (
    <div>
      <PageHeader title="News and events" lead="Announcements, open days, seminars and competitions." />
      <div className='ann-n-events-hero-page-container'>
       {anncards}
      </div>
    </div>
  )
}

export default NewsnEvents

