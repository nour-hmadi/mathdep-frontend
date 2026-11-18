import API_URL from "../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { TeacherCard } from "../components/TeacherCard/TeacherCard";
import { NAVIGATION } from "../content/site";
import wallpaper from "../assests/wallpaper.jpg";
import "../styles/Home.css";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const academics = NAVIGATION.find((section) => section.title === "Academics");

// The home page: one request per section, and each section renders as soon as its data arrives.
function Home() {
  const [slides, setSlides] = useState([]);
  const [research, setResearch] = useState([]);
  const [news, setNews] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [head, setHead] = useState(null);

  useEffect(() => {
    const load = (path, pick, set) => axios.get(`${API_URL}${path}`).then((res) => set(pick(res.data))).catch(() => {});
    load("/api/carousel/", (data) => data.data, setSlides);
    load("/api/research/", (data) => data.data, setResearch);
    load("/api/announcements/", (data) => data.data, setNews);
    load("/api/user/teachers", (data) => data.data, setTeachers);
    load("/api/headdepartment/", (data) => data.data[0], setHead);
  }, []);

  // The pictures at the top take turns every 6 seconds
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => setSlide((current) => (current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);
  const hero = slides[slide]?.image?.url || wallpaper;
  const latestNews = [...news].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  const latestResearch = [...research].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">Lebanese University · Faculty of Sciences</p>
            <h1>Department of <span>Mathematics</span></h1>
            <p className="hero__lead">
              Pure and applied mathematics, from first-year calculus to research in analysis, algebra, statistics and
              numerical computing. A small department where every student knows their professors.
            </p>
            <div className="hero__actions">
              <Link to="/academics/programs" className="site-button">Our programs</Link>
              <Link to="/academics/admissions" className="site-button site-button--ghost">How to apply</Link>
            </div>
          </div>
          <div className="hero__picture">
            <img key={hero} src={hero} alt="" className="hero__slide" />
          </div>
        </div>
        <div className="hero__stats">
          <div className="stat"><FaGraduationCap aria-hidden="true" /><strong>350+</strong><span>Students</span></div>
          <div className="stat"><FaChalkboardTeacher aria-hidden="true" /><strong>{teachers.length || "…"}</strong><span>Teachers</span></div>
          <div className="stat"><FaBookOpen aria-hidden="true" /><strong>{research.length || "…"}</strong><span>Research projects</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <h2>Research</h2>
            <p>What the department is working on, written for students.</p>
          </div>
          <Link to="/researchs" className="section__more">All research →</Link>
        </div>
        <div className="card-grid">
          {latestResearch.map((item) => (
            <Link key={item._id} to={`/research/${item._id}`} className="panel research-card">
              <img src={item.image?.url} alt="" className="research-card__image" />
              <h3>{item.title}</h3>
              <p>{item.description.length > 110 ? `${item.description.slice(0, 110)}…` : item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="section__head">
          <div>
            <h2>News and events</h2>
            <p>Open days, seminars, exam schedules and competitions.</p>
          </div>
          <Link to="/news&events" className="section__more">All news →</Link>
        </div>
        <div className="news-list">
          {latestNews.map((item) => (
            <article key={item._id} className="panel news-item">
              <div className="news-item__date"><strong>{item.day}</strong><span>{item.month?.slice(0, 3)}</span></div>
              <div>
                <span className="tag">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>Posted {formatDate(item.createdAt)}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      {head && (
        <section className="head-band">
          <div className="head-band__inner">
            <img src={head.image?.url} alt={head.name} className="head-band__photo" />
            <div>
              <p className="hero__eyebrow">Head of the department</p>
              <h2>{head.name}</h2>
              <p className="head-band__text">“{head.description}”</p>
              <a href={`mailto:${head.email}`} className="head-band__mail">{head.email}</a>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section__head">
          <div>
            <h2>Teaching staff</h2>
            <p>Professors and lecturers, and what each of them teaches.</p>
          </div>
          <Link to="/academics/teachingstaff" className="section__more">All staff →</Link>
        </div>
        <div className="teachers-grid">
          {teachers.slice(0, 4).map((teacher) => (
            <TeacherCard key={teacher._id} name={teacher.name} title={teacher.title} image={teacher.image} />
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="section__head">
          <div>
            <h2>Academics</h2>
            <p>Everything a student needs, in four pages.</p>
          </div>
        </div>
        <div className="card-grid">
          {academics.items.map((item) => (
            <Link key={item.path} to={item.path} className="panel">
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
