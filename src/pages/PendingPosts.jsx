import React from "react";
import "../styles/MathCommunity.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PendingPosts.css";
import avatar from "../assests/megaphone.png";

const url = "https://mathdep.onrender.com/api/posts/";

const Delete = async (id) => {
  const response = await axios.delete(`https://mathdep.onrender.com/api/posts/${id}`);
  console.log(response);
};

function PendingPosts() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [info, setInfo] = useState([]);
  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    }
  }, []);
  useEffect(() => {
    getAllInfo();
  }, []);
//get all posts info
  const getAllInfo = async () => {
    await axios
      .get(`${url}`)
      .then((response) => {
        setInfo(response.data);
        console.log("response.data POSTSSS: ", response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };


  const filteredCards = info.filter((item) => item.status === false);
  const cards = filteredCards.map((item, index) => {
    return (
      <div className="pending-post-container">
        {isAdmin ? (
          <div key={index}>
            <div className="post_header">
              <img className="users_avatar" alt="user's avatar" src={avatar} />
              <div className="post_definition">
                <p className="post_header_paragraph-one">{item.name}</p>
                <p className="post_header_paragraph-two">{item.createdAt}</p>
              </div>
            </div>
            <div className="post_question">
              {console.log(item._id)}
              <p className="">{item.title}</p>

              <p className="post-description">{item.description}</p>
            </div>
          </div>
        ) : (
          <h1>YOU ARE NOT AUTHORIZED</h1>
        )}
        <button onClick={() => Delete(item._id)}>D</button>
        <button>A</button>
      </div>
    );
  });

  return (
    <div className="pending-posts-container-page">
      <h1>HELLO PENDING POSTS</h1>
      {cards}
    </div>
  );
}

export default PendingPosts;
