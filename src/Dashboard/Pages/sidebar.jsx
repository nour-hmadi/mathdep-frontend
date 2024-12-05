// import React, { useState } from 'react';
// import "./Dashboard.css";
// import { useNavigate, NavLink } from "react-router-dom";


// const Dashboard = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="app-container">
//       {/* Sidebar */}
//       <nav className={`sidebar ${isOpen ? "open" : ""}`}>
//         <div className="sidebar-header">
//           <h3>Admin Dashboard Sidebar</h3>
//           <button className="close-btn" onClick={toggleSidebar}>×</button>
//         </div>
//         <ul className="menu">
          
//           <NavLink to={`/registerusers`} >
//           <li><a href="#">Registration</a></li>
//         </NavLink>
//           <li><a href="#">Starred</a></li>
//           <li><a href="#">Send Email</a></li>
//           <li><a href="#">Drafts</a></li>
//           <hr />
//           <li><a href="#">All Mail</a></li>
//           <li><a href="#">Trash</a></li>
//           <li><a href="#">Spam</a></li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="main-content">
//         <header>
//           <button className="menu-btn" onClick={toggleSidebar}>☰</button>
//           <h1>Dashboard</h1>
//         </header>
//         <section>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
//           <p>More content goes here...</p>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
