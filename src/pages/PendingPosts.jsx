import API_URL from "../config";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PendingPosts.css";
import avatar from "../assests/megaphone.png";

const url = `${API_URL}/api/posts/`;

const Delete = async (id) => {
  const response = await axios.delete(`${API_URL}/api/posts/${id}`);
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
      <div className="pending-post-container" key={item._id}>
        {isAdmin ? (
          <div>
            <div className="post_header">
              <img className="users_avatar" alt="user's avatar" src={avatar} />
              <div className="post_definition">
                <p className="post_header_paragraph-one">{item.name}</p>
                <p className="post_header_paragraph-two">{item.createdAt}</p>
              </div>
            </div>
            <div className="post_question">
              <p className="">{item.title}</p>

              <p className="post-description">{item.description}</p>
            </div>
          </div>
        ) : (
          <h1>YOU ARE NOT AUTHORIZED</h1>
        )}
        <button onClick={() => Delete(item._id)}>Delete</button>
      </div>
    );
  });

  return (
    <div className="pending-posts-container-page">
      <h1>Pending posts</h1>
      {cards}
    </div>
  );
}

export default PendingPosts;
