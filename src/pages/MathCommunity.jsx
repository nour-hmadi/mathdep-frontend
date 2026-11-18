import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import PageHeader from "../components/PageHeader/PageHeader";
import Loader from "../components/Loader/Loader";
import MathText from "../components/MathText/MathText";
import MathEditor from "../components/MathEditor/MathEditor";
import "../styles/MathCommunity.css";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
const postOf = (comment) => (comment.post && comment.post._id) || comment.post;   // populated or plain id

// The students' board. Everyone can read the approved posts and their replies.
// A signed-in student can ask a question (a teacher approves it before it appears) and reply to posts.
// Math is written in LaTeX between $ signs, with a toolbar and a live preview.
function MathCommunity() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState({ title: "", description: "" });
  const [asking, setAsking] = useState(false);
  const [replyTo, setReplyTo] = useState(null);       // the post whose reply box is open
  const [reply, setReply] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const signedIn = Boolean(sessionStorage.getItem("token"));
  const me = sessionStorage.getItem("id");
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const load = () =>
    Promise.all([api.get("/api/posts"), api.get("/api/comments").catch(() => ({ data: [] }))])
      .then(([postsRes, commentsRes]) => {
        setPosts(postsRes.data || []);
        setComments(commentsRes.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));

  useEffect(() => { load(); }, []);

  const failed = (err) => setError(err.response?.data?.message || "That didn't work. Try again.");

  const ask = (event) => {
    event.preventDefault();
    setError("");
    api.post("/api/posts", question)
      .then(() => {
        setNotice("Thank you! A teacher will review your post, then it will appear here.");
        setQuestion({ title: "", description: "" });
        setAsking(false);
      })
      .catch(failed);
  };

  const send = (event, postId) => {
    event.preventDefault();
    setError("");
    api.post("/api/comments", { postId, description: reply })
      .then(() => { setReply(""); setReplyTo(null); load(); })
      .catch(failed);
  };

  const remove = (comment) => {
    if (window.confirm("Delete this reply?")) api.delete(`/api/comments/${comment._id}`).then(load).catch(failed);
  };

  return (
    <>
      <PageHeader title="Math Community" crumbs={[{ name: "Community", path: "/mathcommunity" }]}
                  lead="Questions, solutions and ideas shared between the department's students. A teacher reviews every post before it appears." />
      <div className="page">
        {!signedIn && <p className="note">Students <Link to="/login">sign in</Link> to ask and reply. Everyone can read.</p>}
        {notice && <p className="note note--success" role="status">{notice}</p>}
        {error && <p className="note note--error" role="alert">{error}</p>}

        {signedIn && (asking ? (
          <form className="panel community-form" onSubmit={ask}>
            <h3>Ask a question or share a solution</h3>
            <label>Title
              <input value={question.title} onChange={(event) => setQuestion({ ...question, title: event.target.value })} required />
            </label>
            <MathEditor label="Your post" rows={6} value={question.description}
                        onChange={(description) => setQuestion({ ...question, description })}
                        placeholder="Explain your question. Math goes between $ signs, like $\frac{1}{2}$." />
            <div className="community-form__buttons">
              <button type="button" className="community-button community-button--light" onClick={() => setAsking(false)}>Cancel</button>
              <button type="submit" className="community-button">Send for review</button>
            </div>
          </form>
        ) : (
          <button type="button" className="community-button community-ask" onClick={() => { setAsking(true); setNotice(""); }}>
            + Ask a question
          </button>
        ))}

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
                  <p><MathText text={post.description} /></p>
                  {replies.length > 0 && (
                    <div className="post__replies">
                      <h4>{replies.length} {replies.length === 1 ? "reply" : "replies"}</h4>
                      {replies.map((comment) => (
                        <div key={comment._id} className="reply">
                          <strong>{comment.name || "A student"}</strong>
                          <span className="post__date"> · {formatDate(comment.createdAt)}</span>
                          {(isAdmin || comment.user === me) && (
                            <button type="button" className="reply__delete" onClick={() => remove(comment)}>Delete</button>
                          )}
                          <p><MathText text={comment.description} /></p>
                        </div>
                      ))}
                    </div>
                  )}
                  {signedIn && (replyTo === post._id ? (
                    <form className="community-form community-form--reply" onSubmit={(event) => send(event, post._id)}>
                      <MathEditor label="Your reply" rows={3} value={reply} onChange={setReply} placeholder="Write your reply…" />
                      <div className="community-form__buttons">
                        <button type="button" className="community-button community-button--light" onClick={() => setReplyTo(null)}>Cancel</button>
                        <button type="submit" className="community-button">Reply</button>
                      </div>
                    </form>
                  ) : (
                    <button type="button" className="community-button community-button--light"
                            onClick={() => { setReplyTo(post._id); setReply(""); }}>Reply</button>
                  ))}
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
