import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import Loader from "../components/Loader/Loader";
import "../styles/MathCommunity.css";

const url = `${API_URL}/api/posts/`;
const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

// The students' board: approved posts, newest first. Signed-in students can write; a teacher approves each post.
function MathCommunity() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const signedIn = Boolean(sessionStorage.getItem("token"));

  useEffect(() => {
    axios.get(url)
      .then((response) => setPosts((response.data || []).filter((post) => post.status === true).reverse()))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Math Community" crumbs={[{ name: "Community", path: "/mathcommunity" }]}
                  lead="Questions, solutions and ideas shared between the department's students. A teacher reviews every post before it appears." />
      <div className="page">
        <p className="note">
          {signedIn ? "Posting from the site is coming soon. For now, send your post to the secretariat and a teacher will publish it."
                    : <>Students <Link to="/login">sign in</Link> to take part. Everyone can read.</>}
        </p>
        {isLoading ? <Loader /> : posts.length ? (
          <div className="posts">
            {posts.map((post) => (
              <article key={post._id} className="post panel">
                <header className="post__header">
                  {post.image ? <img className="post__avatar" src={post.image} alt="" /> : <span className="post__avatar" />}
                  <div>
                    <strong>{post.name || "A student"}</strong>
                    <div className="post__date">{formatDate(post.createdAt)}</div>
                  </div>
                </header>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </article>
            ))}
          </div>
        ) : <p className="empty">No posts yet. Be the first to ask a question.</p>}
      </div>
    </>
  );
}

export default MathCommunity;
