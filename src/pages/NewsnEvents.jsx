import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader/PageHeader";
import Loader from "../components/Loader/Loader";

const url = `${API_URL}/api/announcements/`;
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function NewsItem({ item }) {
  return (
    <article className="panel news-item">
      <div className="news-item__date"><strong>{item.day}</strong><span>{item.month?.slice(0, 3)}</span></div>
      <div>
        <span className="tag">{item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <small>Posted {formatDate(item.createdAt)}</small>
      </div>
    </article>
  );
}

// Events (with a date to attend) and announcements (things to know), newest first.
function NewsnEvents() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then((response) => setItems([...response.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const events = items.filter((item) => item.type === "event");
  const announcements = items.filter((item) => item.type !== "event");

  return (
    <>
      <PageHeader title="News and events" crumbs={[{ name: "Community", path: "/mathcommunity" }]}
                  lead="Open days, seminars and competitions to attend, and announcements from the secretariat." />
      <div className="page">
        {isLoading ? <Loader /> : items.length ? (
          <div className="news-columns">
            <section>
              <h2>Upcoming events</h2>
              <div className="news-list">{events.map((item) => <NewsItem key={item._id} item={item} />)}</div>
            </section>
            <section>
              <h2>Announcements</h2>
              <div className="news-list">{announcements.map((item) => <NewsItem key={item._id} item={item} />)}</div>
            </section>
          </div>
        ) : <p className="empty">Nothing has been announced yet.</p>}
      </div>
    </>
  );
}

export default NewsnEvents;
