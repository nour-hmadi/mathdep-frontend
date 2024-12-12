import React, { useState } from "react";
import "./Navbar.css";
import DepartmentLogo from "../DepartmentLogo/DepartmentLogo";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const menuData = [
    {
      title: "HOME",
      items: [
        "Welcome", "Features", "Updates",
        "Gallery", "Testimonials", "Pricing",
        "FAQ", "Support", "Contact Us"
      ]
    },
    {
      title: "OUTREACH",
      items: [
        "EMAIL", "Features", "Updates",
        "Gallery", "Testimonials", "Pricing",
        "FAQ", "Support", "Contact Us"
      ]
    },
    {
      title: "RESEARCH",
      items: [
        "Welcome", "Features", "Updates",
        "research", "trials", "practicing",
        "FAQ", "Support", "Contact Us"
      ]
    },
    {
      title: "ACADEMICS",
      items: [
        "hello", "below", "sorrow",
        "Gallery", "Testimonials", "Pricing",
        "FAQ", "Support", "Contact Us"
      ]
    },
    {
      title: "ABOUT",
      items: [
        "Our Story", "Mission", "Vision",
        "Team", "Careers", "Partners",
        "Achievements", "Sustainability", "Values"
      ]
    },
    {
      title: "SERVICES",
      items: [
        "Consulting", "Development", "Design",
        "Training", "Support", "Maintenance",
        "Integration", "Optimization", "Research"
      ]
    },
    {
      title: "CONTACT",
      items: [
        "Email Us", "Call Us", "Find Us",
        "Follow Us", "Customer Support", "Feedback",
        "Live Chat", "FAQs", "Resources"
      ]
    }
  ];

  const handleHover = (items) => {
    setActiveMenu(items);
    setShowDropdown(true);
  };

  const handleLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className="navbar-container" onMouseLeave={handleLeave}>
      <nav className="navbar">
      <DepartmentLogo />
        {menuData.map((menuItem, index) => (
          <div
            key={index}
            className="navbar-item"
            onMouseEnter={() => handleHover(menuItem.items)}
          >
            {menuItem.title}
          </div>
        ))}
      </nav>

      {showDropdown && (
        <div className="dropdown-menu" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={handleLeave}>
          <div className="dropdown-content">
            {activeMenu.map((item, index) => (
              <div key={index} className="dropdown-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
