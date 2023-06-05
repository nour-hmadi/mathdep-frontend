import React from "react";
import avatar from "../assests/imagetwo.png";
import "../styles/MathCommunity.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";

const url = "https://mathdep.onrender.com/api/posts/";

function MathCommunity() {
  const [info, setInfo] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [comment, setComment] = useState([]);
  const [newinfo, setNewInfo] = useState({

    description:"",
    postId:Number
  });



  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedin(true);
      console.log(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getAllInfo();
  }, []);

  //   const Comment = async()=>{
  // try {
  //  const response= await axios.get("http://localhost:5000/api/comments/")

  //   setComment(response.data)
  //   console.log("Comment",response.data[0].post)
  // } catch (error) {
  //   console.log(error)
  // }
  //   }

  const addComment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/comments/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComment([...comment, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInfo = async () => {
    await axios
      .get(`${url}`)
      .then((response) => {
        setInfo(response.data);

        console.log("responsedata: ", response.data);
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
    <div className="math-community-page-container">
      {isLoggedin ? <button>Add Post</button> : null}
      <h1>HELLO MATH COMM</h1>
      {cards}
      <input
          type="text"
          value={newinfo.description}
          onChange={(e) => setNewInfo({...newinfo, description:e.target.value})}
        ></input>
          <input
          type="text"
          value={newinfo.postId}
          placeholder="post id"
          onChange={(e) => setNewInfo({...newinfo, postId:e.target.value})}
        ></input>
        <button onClick={addComment}>add comment</button>
        <button>
          <AiOutlineComment />
        </button>
      
    </div>
  );
}

export default MathCommunity;
