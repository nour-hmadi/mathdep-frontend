
import React from 'react';

import { useState, useEffect } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";

const url = "http://localhost:5000/api/announcements/";


function UsersTable() {
    const [userRow, setUserRow] = useState([]);


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

  


  return (
    <div>
      <div className='ann-n-events-hero-page-container'>

       {userRow}
      </div>


    </div>
  )
}

export default UsersTable;


