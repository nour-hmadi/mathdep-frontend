import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader/PageHeader";
import Loader from "../components/Loader/Loader";

const url = `${API_URL}/api/announcements/`;

// News dates are whole days stored at midnight UTC, so they are read in UTC to never shift by a day
const day = (date) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const today = () => {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
};

// Where an item stands today: an event is upcoming, today, happening now or over;
// a period (e.g. registration) opens, is open, or has closed.
const stateOf = (item) => {
  if (!item.startDate) return null;
  const start = new Date(item.startDate).getTime();
  const end = item.endDate ? new Date(item.endDate).getTime() : start;
  const now = today();
  const isEvent = item.type === "event";
  if (now < start) return isEvent ? ["Upcoming", "soon"] : (item.endDate ? [`Opens ${day(item.startDate)}`, "soon"] : null);
  if (now <= end) {
    if (isEvent) return start === end ? ["Today", "now"] : ["Happening now", "now"];
    return item.endDate ? [`Open until ${day(item.endDate)}`, "now"] : null;
  }
  return isEvent ? ["Ended", "past"] : (item.endDate ? ["Closed", "past"] : null);
};

function NewsItem({ item }) {
  const start = item.startDate ? new Date(item.startDate) : null;
  const state = stateOf(item);
  return (
    <article className={`panel news-item${state?.[1] === "past" ? " news-item--past" : ""}`}>
      <div className="news-item__date">
        <strong>{start ? start.getUTCDate() : item.day}</strong>
        <span>{start ? start.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }) : item.month?.slice(0, 3)}</span>
      </div>
      <div>
        <span className="tag">{item.type}</span>
        {state && <span className={`news-state news-state--${state[1]}`}>{state[0]}</span>}
        <h3>{item.title}</h3>
        {item.endDate && <p className="news-item__period">{day(item.startDate)} – {day(item.endDate)}</p>}
        <p>{item.description}</p>
      </div>
    </article>
  );
}

// Events, soonest first with the ones that are over at the end; announcements, newest first.
function NewsnEvents() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then((response) => setItems(response.data.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const when = (item) => new Date(item.startDate || item.createdAt).getTime();
  const over = (item) => stateOf(item)?.[1] === "past";
  const events = items.filter((item) => item.type === "event")
    .sort((a, b) => over(a) - over(b) || (over(a) ? when(b) - when(a) : when(a) - when(b)));
  const announcements = items.filter((item) => item.type !== "event").sort((a, b) => when(b) - when(a));

  return (
    <>
      <PageHeader title="News and events" crumbs={[{ name: "Community", path: "/mathcommunity" }]}
                  lead="Open days, seminars and competitions to attend, and announcements from the secretariat." />
      <div className="page">
        {isLoading ? <Loader /> : items.length ? (
          <div className="news-columns">
            <section>
              <h2>Events</h2>
              {events.length ? <div className="news-list">{events.map((item) => <NewsItem key={item._id} item={item} />)}</div>
                : <p className="empty">No events planned right now.</p>}
            </section>
            <section>
              <h2>Announcements</h2>
              {announcements.length ? <div className="news-list">{announcements.map((item) => <NewsItem key={item._id} item={item} />)}</div>
                : <p className="empty">No announcements right now.</p>}
            </section>
          </div>
        ) : <p className="empty">Nothing has been announced yet.</p>}
      </div>
    </>
  );
}

export { stateOf };   // for the tests
export default NewsnEvents;
