import React from "react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import UserTable from "../UserTable";
import { useState } from "react";
import Register from "../../pages/Auth/Register";

const Dashboard = () => {
  const adminName = sessionStorage.getItem("first_name") || "Admin";

  // State to manage the selected section
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Dashboard Sidebar</h3>
        </div>
        <ul className="menu">
          <li>
            <a href="#" onClick={() => setSelectedSection("register")}>
              Registration
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setSelectedSection("userTable")}>
              Users Table
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setSelectedSection("sendEmail")}>
              Send Email
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setSelectedSection("drafts")}>
              Drafts
            </a>
          </li>
          <hr />
          <li>
            <a href="#" onClick={() => setSelectedSection("allMail")}>
              All Mail
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setSelectedSection("trash")}>
              Trash
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setSelectedSection("spam")}>
              Spam
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h1>Hello Dr. {adminName}</h1>
        </header>

        <section>
          {selectedSection === "register" && <Register />}
          {selectedSection === "userTable" && <UserTable />}{" "}
          {selectedSection === "sendEmail" && <p>Send email form...</p>}
          {selectedSection === "drafts" && <p>Drafts content...</p>}
          {selectedSection === "allMail" && <p>All mail content...</p>}
          {selectedSection === "trash" && <p>Trash content...</p>}
          {selectedSection === "spam" && <p>Spam content...</p>}
          {!selectedSection && <p>Welcome to the admin dashboard!</p>}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

// const Dashboard = () => {
//   const adminName = sessionStorage.getItem("first_name") || "Admin";

//   return (
//     <div className="app-container">
//       {/* Sidebar */}
//       <nav className="sidebar">
//         <div className="sidebar-header">
//           <h3>Admin Dashboard Sidebar</h3>
//         </div>
//         <ul className="menu">
//           <NavLink to={`/registerusers`}>
//             <li>
//               <a href="#">Registration</a>
//             </li>
//           </NavLink>
//           <li>
//             <a href="#">Starred</a>
//           </li>
//           <li>
//             <a href="#">Send Email</a>
//           </li>
//           <li>
//             <a href="#">Drafts</a>
//           </li>
//           <hr />
//           <li>
//             <a href="#">All Mail</a>
//           </li>
//           <li>
//             <a href="#">Trash</a>
//           </li>
//           <li>
//             <a href="#">Spam</a>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="main-content">
//         <header>
//         <h1>Hello Dr. {adminName}</h1>        </header>
//         <section>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
//           <p>More content goes here...</p>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
