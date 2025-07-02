// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



import Home from './pages/Home';
import VIIF from './pages/VIIF';
import AcePanacea from './pages/AcePanacea';
import About from './pages/About';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import Events from './pages/Events';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Contact from './pages/Contact';
import Membership from './pages/Membership';

import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';


function App() {
  
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/viif" element={<VIIF />} />
          <Route path="/ace-panacea" element={<AcePanacea />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;