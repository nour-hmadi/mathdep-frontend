import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import Loader from "../components/Loader/Loader";
import "../styles/MathCommunity.css";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
const postOf = (comment) => (comment.post && comment.post._id) || comment.post;   // populated or plain id

// The students' board: approved posts, newest first, each with its comments. A teacher approves every post.
function MathCommunity() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const signedIn = Boolean(sessionStorage.getItem("token"));

  useEffect(() => {
    Promise.all([axios.get(`${API_URL}/api/posts/`), axios.get(`${API_URL}/api/comments/`).catch(() => ({ data: [] }))])
      .then(([postsRes, commentsRes]) => {
        setPosts((postsRes.data || []).filter((post) => post.status === true)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setComments(commentsRes.data || []);
      })
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
            {posts.map((post) => {
              const replies = comments.filter((comment) => postOf(comment) === post._id)
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
              return (
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
                  {replies.length > 0 && (
                    <div className="post__replies">
                      <h4>{replies.length} {replies.length === 1 ? "reply" : "replies"}</h4>
                      {replies.map((reply) => (
                        <div key={reply._id} className="reply">
                          <strong>{reply.name || "A student"}</strong>
                          <span className="post__date"> · {formatDate(reply.createdAt)}</span>
                          <p>{reply.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : <p className="empty">No posts yet. Be the first to ask a question.</p>}
      </div>
    </>
  );
}

export default MathCommunity;
