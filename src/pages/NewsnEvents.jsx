
import React from 'react';
import '../styles/NewsnEvents.css';

import { useState, useEffect } from "react";
import axios from "axios";

import loudspeakericontwo from "../assests/microphone.png";
import { BsCalendar4Event } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const url = "http://localhost:5000/api/announcements/";


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
    <div className='even-bordered-ann-container'>
    <div className='date-ann-div'><h1>{object.day}</h1>
    <p className='month-ann-n-events-date'>{object.month}</p></div>
    
    <div className='definition-ann-div'>
        <p className='events-n-news-title'>{object.title}</p>
        <p className='events-n-news-description'>{object.description}</p>
        <p className='events-n-news-createdAt-even'>{object.createdAt}</p>
    </div>


    </div>
)}
else if (index%2 === 1) {
    return (
        <div className='odd-bordered-ann-container'>
        <div className='date-ann-div'>
        <h1>{object.day}</h1>
        <p className='month-ann-n-events-date'>{object.month}</p></div>
        
        <div className='definition-ann-div'>
            <p className='events-n-news-title'>{object.title}</p>
            <p className='events-n-news-description'>{object.description}</p>
            <p className='events-n-news-createdAt-odd'>{object.createdAt}</p>
        </div>
    
    
        </div>
    )}

});

  return (
    <div>
      <div className='ann-n-events-hero-page-container'>

       {anncards}
      </div>


    </div>
  )
}

export default NewsnEvents


// // import React from 'react'

// // function NewsnEvents() {
// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }

// // export default NewsnEvents

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "../styles/NewsnEvents.css";
// import Loader from "../components/Loader/Loader";
// import { NavLink } from "react-router-dom";

// const url = "http://localhost:5000/api/announcements/";

// function NewsnEvents() {
//   const [info, setInfo] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     getAllInfo();
//   }, []);

//   const getAllInfo = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${url}`);
//       setInfo(response.data.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(`Error: ${error}`);
//       setIsLoading(false);
//     }
//   };

//   const groupByDate = () => {
//     const groupedInfo = {};
//     info.forEach((item) => {
//       const date = item.eventDate;
//       if (!groupedInfo[date]) {
//         groupedInfo[date] = [];
//       }
//       groupedInfo[date].push(item);
//     });
//     return groupedInfo;
//   };

//   const renderAgenda = () => {
//     const groupedInfo = groupByDate();
//     const agendaItems = Object.entries(groupedInfo).map(([date, items]) => (
//       <div key={date}>
//         <h2 className="agenda-date">{date}</h2>
//         {items.map((item, index) => (
//           <div key={index} className="agenda-item">
//             <h3>{item.title}</h3>
//             <p>{item.description}</p>
//             {/* <NavLink to={`/research/${item._id}`}>Find out more</NavLink> */}
//           </div>
//         ))}
//       </div>
//     ));
//     return agendaItems;
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="section-container-research-home-page">
//           <p className="agenda-title">Now at the Department of Mathematics</p>
//           <div className="agenda-container">{renderAgenda()}</div>
//           <NavLink to={`/researchs`}>
//             <button className="show-more-research-section-home-page">
//               Show More
//             </button>
//           </NavLink>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NewsnEvents;


