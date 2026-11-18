import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import Scroll from "./components/ScrolltoTop/Scroll.jsx";
import ServerWakeNotice from "./components/ServerWakeNotice/ServerWakeNotice";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Academics from "./pages/Academics";
import Programs from "./pages/Programs";
import Courses from "./pages/Courses";
import AcademicCalendar from "./pages/AcademicCalendar";
import Admissions from "./pages/Admissions";
import { TeachingStaff } from "./pages/TeachingStaff";
import ResearchPage from "./pages/ResearchPage";
import ResearchId from "./components/ResearchId/ResearchId";
import NewsnEvents from "./pages/NewsnEvents";
import MathCommunity from "./pages/MathCommunity";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import AdminDashboard from "./admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app">
        <Navbar />
        <ServerWakeNotice />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/programs" element={<Programs />} />
            <Route path="/academics/courses" element={<Courses />} />
            <Route path="/academics/calendar" element={<AcademicCalendar />} />
            <Route path="/academics/admissions" element={<Admissions />} />
            <Route path="/academics/teachingstaff" element={<TeachingStaff />} />
            <Route path="/researchs" element={<ResearchPage />} />
            <Route path="/research" element={<Navigate to="/researchs" replace />} />
            <Route path="/research/:id" element={<ResearchId />} />
            <Route path="/news&events" element={<NewsnEvents />} />
            <Route path="/calendar" element={<Navigate to="/news&events" replace />} />
            <Route path="/mathcommunity" element={<MathCommunity />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/registerusers" element={<SignUp />} />
            <Route path="/pendingposts" element={<Navigate to="/admin-dashboard" replace />} />
            <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Scroll />
      </div>
    </Router>
  );
}

export default App;
