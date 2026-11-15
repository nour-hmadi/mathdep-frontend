import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { NAVIGATION } from "../../content/site";
import logo from "../../assests/facultyofsciences.jpg";
import "./Navbar.css";

// The site's menu, built from NAVIGATION in src/content/site.js.
// Desktop: the sections open on hover (and on keyboard focus). Phones: a full-screen menu with sections that unfold.
function Navbar() {
  const [open, setOpen] = useState(false);          // the phone menu
  const [unfolded, setUnfolded] = useState(null);   // which section is unfolded on the phone menu
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {                                 // on every page change: close the phone menu, re-read the login
    setOpen(false);
    setUnfolded(null);
    const token = sessionStorage.getItem("token");
    setUser(token ? { name: sessionStorage.getItem("first_name") || "Account",
                      isAdmin: sessionStorage.getItem("isAdmin") === "true" } : null);
  }, [location]);

  const logout = () => {
    ["token", "id", "isAdmin", "first_name", "userImage"].forEach((key) => sessionStorage.removeItem(key));
    setUser(null);
    navigate("/");
  };

  return (
    <header className={`site-header${open ? " site-header--open" : ""}`}>
      <div className="site-header__bar">
        <Link to="/" className="site-brand" aria-label="Mathematics Department, home">
          <img src={logo} alt="" className="site-brand__logo" />
          <span className="site-brand__name"><span>Mathematics</span>Department</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__list">
            {NAVIGATION.map((section) => (
              <li key={section.title} className={`site-nav__item${section.items ? " site-nav__item--menu" : ""}`}>
                <NavLink to={section.path} end={section.path === "/"} className="site-nav__link">
                  {section.title}
                  {section.items && <FaChevronDown className="site-nav__chevron" aria-hidden="true" />}
                </NavLink>
                {section.items && (
                  <div className="site-menu">
                    {section.items.map((item) => (
                      <NavLink key={item.name} to={item.path} className="site-menu__link">
                        <span className="site-menu__name">{item.name}</span>
                        <span className="site-menu__note">{item.note}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__account">
          {user ? (
            <>
              {user.isAdmin && <Link to="/admin-dashboard" className="site-button site-button--ghost">Dashboard</Link>}
              <button type="button" className="site-button site-button--ghost" onClick={logout}>
                <FaUserCircle aria-hidden="true" /> {user.name} · Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="site-button">Sign in</Link>
          )}
        </div>

        <button type="button" className="site-header__toggle" aria-expanded={open} aria-controls="phone-menu"
                aria-label={open ? "Close the menu" : "Open the menu"} onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav id="phone-menu" className="phone-menu" aria-label="Main, phone">
        {NAVIGATION.map((section) => (
          <div key={section.title} className="phone-menu__section">
            {section.items ? (
              <button type="button" className="phone-menu__heading" aria-expanded={unfolded === section.title}
                      onClick={() => setUnfolded(unfolded === section.title ? null : section.title)}>
                {section.title}
                <FaChevronDown className={`site-nav__chevron${unfolded === section.title ? " site-nav__chevron--up" : ""}`}
                               aria-hidden="true" />
              </button>
            ) : (
              <NavLink to={section.path} end={section.path === "/"} className="phone-menu__heading">{section.title}</NavLink>
            )}
            {section.items && unfolded === section.title && section.items.map((item) => (
              <NavLink key={item.name} to={item.path} className="phone-menu__link">{item.name}</NavLink>
            ))}
          </div>
        ))}
        <div className="phone-menu__account">
          {user ? (
            <>
              {user.isAdmin && <Link to="/admin-dashboard" className="site-button site-button--ghost">Dashboard</Link>}
              <button type="button" className="site-button site-button--ghost" onClick={logout}>Sign out ({user.name})</button>
            </>
          ) : (
            <Link to="/login" className="site-button">Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
