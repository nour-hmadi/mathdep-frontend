//npm install react-dom react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//routes components
import Home from './pages/Home'
import AboutUs from "./pages/AboutUs";

//import navbar
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer.jsx'
//import styles
import './App.css'
import Research from "./pages/Research";
import { TeachingStaff } from "./pages/TeachingStaff";
import Academics from "./pages/Academics";
import Gallery from "./pages/Gallery";
import MathCommunity from "./pages/MathCommunity";
import ContactUs from "./pages/ContactUs";


function App() {
  return (
    <BrowserRouter>
      <div className="app">
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/research" element={<Research />} />
          <Route exact path="/academics" element={<Academics />} />
          <Route exact path="/academics/teachingstaff" element={<TeachingStaff />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/mathcommunity" element={<MathCommunity />} />
          <Route exact path="/contactus" element={<ContactUs />} />
        </Routes>
        <Footer />
        
      </div>
    
    </BrowserRouter>
  );
}

export default App;
