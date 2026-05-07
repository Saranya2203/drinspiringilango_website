import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import VIIF from "./pages/VIIF";
import AcePanacea from "./pages/AcePanacea";
import UserAccess from "./pages/UserAccess";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Events from "./pages/Events";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";

import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { ToggleProvider } from './components/ToggleContext';

import "./index.css";

function App() {
  // 🔒 PROTECT DASHBOARD & CHANGE PASSWORD ROUTES
  const ProtectedRoute = ({ children }) => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    return loggedIn ? children : <Navigate to="/admin" replace />;
  };

  return (
    <Router>
      <ToggleProvider>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viif" element={<VIIF />} />
            <Route path="/ace-panacea" element={<AcePanacea />} />
            <Route path="/user-access" element={<UserAccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/membership" element={<Membership />} />

            {/* Admin Login */}
            <Route path="/admin-ilango-login-9835" element={<Admin />} />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Change Password */}
            <Route path="/change-password" element={<ChangePassword />} />

          </Routes>
        </main>

        <Footer />
      </ToggleProvider>
    </Router>
  );
}

export default App;
