import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import Loader from "../components/Loader/Loader";
import "../styles/ResearchPage.css";

const url = `${API_URL}/api/research/`;

function ResearchPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then((response) => setPosts([...response.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Research" lead="Mathematics that solves real problems: the department's current projects, written for students." />
      <div className="page">
        <div className="research-intro">
          <p>
            Research in the department covers pure and applied mathematics: algebra and topology, analysis and
            differential equations, probability and statistics, numerical methods and optimization.
          </p>
          <p>
            Many projects start from a real question, such as how to make a bus network more robust, how to estimate a
            quantity from a few observations, or how to keep online payments secure, and turn it into a model that can
            be studied and tested. Students take part through their final-year projects and the weekly seminar.
          </p>
        </div>
        {isLoading ? <Loader /> : (
          <div className="card-grid">
            {posts.map((post) => (
              <Link key={post._id} to={`/research/${post._id}`} className="panel research-card">
                <img src={post.image?.url} alt="" className="research-card__image" />
                <h3>{post.title}</h3>
                <p>{post.description.length > 120 ? `${post.description.slice(0, 120)}…` : post.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ResearchPage;
