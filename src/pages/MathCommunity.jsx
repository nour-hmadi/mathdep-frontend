import React from "react";
import avatar from "../assests/imagetwo.png";
import "../styles/MathCommunity.css";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:5000/api/posts/";

function MathCommunity() {
  const [info, setInfo] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedin(true);
      console.log(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getAllInfo();
  }, []);

  const getAllInfo = async () => {
    await axios
      .get(`${url}`)
      .then((response) => {
        setInfo(response.data);

        // console.log("response.data: " + response.data.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  const filteredCards = info.filter((item) => item.status === true);
  const cards = filteredCards.map((item, index) => {
    return (
      <div className="pending-post-container" key={index}>
        <div className="post_header">
          <img className="users_avatar" alt="user's avatar" src={item.image} />
          <div className="post_definition">
            <p className="post_header_paragraph-one">{item.name}</p>
            <p className="post_header_paragraph-two">{item.createdAt}</p>
          </div>
        </div>
        <div className="post_question">
          <p>{item.title}</p>

          <p>{item.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
    {isLoggedin ? <button>Add Post</button> : null }
      <h1>HELLO MATH COMM</h1>
      {cards}
    </div>
  );
}

export default MathCommunity;
