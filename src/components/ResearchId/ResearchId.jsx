import API_URL from "../../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
import Loader from "../Loader/Loader";
import "./ResearchId.css";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
const crumbs = [{ name: "Research", path: "/researchs" }];

// One research post: its own title, date, image and text, from /api/research/:id.
function ResearchId() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/research/${id}`)
      .then((response) => setPost(response.data.data))
      .catch(() => setMissing(true));
  }, [id]);

  if (missing) return <PageHeader title="Research post not found" crumbs={crumbs} />;
  if (!post) return <><PageHeader title="Research" crumbs={crumbs} /><Loader /></>;
  return (
    <>
      <PageHeader title={post.title} crumbs={crumbs} lead={`Published ${formatDate(post.createdAt)}`} />
      <article className="page research-post">
        <img src={post.image?.url} alt="" className="research-post__image" />
        {post.authors && <p className="research-post__authors">By {post.authors}</p>}
        <p>{post.description}</p>
        {post.pdf?.url && (
          <a className="site-button" href={post.pdf.url} target="_blank" rel="noreferrer">Read the full paper (PDF)</a>
        )}
      </article>
    </>
  );
}

export default ResearchId;
