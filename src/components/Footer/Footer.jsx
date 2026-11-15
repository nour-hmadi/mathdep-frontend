import React from "react";
import { Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io";
import logo from "../../assests/facultyofsciences.jpg";
import SocialMediaIcon from "../SocialMediaIcon/SocialMediaIcon";
import NewsletterForm from "../NewsLetter/NewsLetter";
import "./Footer.css";

const columns = [
  { title: "Academics", links: [["Programs", "/academics/programs"], ["Courses", "/academics/courses"],
    ["Calendar and exams", "/academics/calendar"], ["Admissions", "/academics/admissions"], ["Teaching staff", "/academics/teachingstaff"]] },
  { title: "Life at the department", links: [["Research", "/researchs"], ["News and events", "/news&events"],
    ["Math Community", "/mathcommunity"], ["Gallery", "/gallery"], ["Contact", "/contactus"]] },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__about">
          <div className="footer__brand">
            <img src={logo} alt="" className="footer__logo" />
            <span><strong>MATH</strong>dep</span>
          </div>
          <p>A student portfolio project by Nour Hmadi. All names, news and research on this site are fictional demo content.</p>
          <p className="footer__address">Lebanese University, Faculty of Sciences<br />Hadath campus, building B, floor 2<br />+961 1 000 000</p>
          <div className="footer__social">
            <SocialMediaIcon icon={<AiFillInstagram />} />
            <SocialMediaIcon icon={<GrFacebookOption />} />
            <SocialMediaIcon icon={<BsYoutube />} />
            <SocialMediaIcon icon={<IoLogoLinkedin />} />
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="footer__column">
            <h2>{column.title}</h2>
            {column.links.map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}
          </div>
        ))}
        <div className="footer__column">
          <h2>Newsletter</h2>
          <NewsletterForm />
        </div>
      </div>
      <div className="footer__line">© {new Date().getFullYear()} Nour Hmadi · Built with React, Node.js and MongoDB</div>
    </footer>
  );
}

export default Footer;
