import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../Inspiring_Ilango.png';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHomeSubMenuOpen, setHomeSubMenuOpen] = useState(false);
  const [isAboutSubMenuOpen, setAboutSubMenuOpen] = useState(false);
  const [showMusicPopup, setShowMusicPopup] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Home click handler (also scrolls to top)
  const handleHomeClick = () => {
    navigate('/');
    setHomeSubMenuOpen(false);
    setAboutSubMenuOpen(false);
    setMenuOpen(false);
    scrollToTop();
  };

  // Handle autoplay
  useEffect(() => {
    if (audioRef.current && !isMuted) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.warn('Autoplay blocked:', error);
        }
      };
      playAudio();
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const dismissPopup = () => {
    setShowMusicPopup(false);
  };

  // Generic handler for all menu links (closes menu + scrolls to top)
  const handleLinkClick = () => {
    setMenuOpen(false);
    scrollToTop();
  };

  return (
    <header className="main-header">
      <div className="container">
        {/* Logo */}
        <div className="left-section">
          <div
            className="logo"
            onClick={handleHomeClick}
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} alt="Site Logo" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {/* Home with submenu */}
          <div
            className={`nav-item ${isHomeSubMenuOpen ? 'open' : ''}`}
            onClick={() => {
              setHomeSubMenuOpen(!isHomeSubMenuOpen);
              setAboutSubMenuOpen(false);
            }}
          >
            <span className="nav-link">Home ▼</span>
            <div className="submenu">
              <Link to="/" onClick={handleHomeClick}>Inspiring Ilango</Link>
              <Link to="/viif" onClick={handleLinkClick}>VIIF</Link>
              <Link to="/ace-panacea" onClick={handleLinkClick}>Ace Panacea</Link>
            </div>
          </div>

          {/* About with submenu */}
          <div
            className={`nav-item ${isAboutSubMenuOpen ? 'open' : ''}`}
            onClick={() => {
              setAboutSubMenuOpen(!isAboutSubMenuOpen);
              setHomeSubMenuOpen(false);
            }}
          >
            <span className="nav-link">About ▼</span>
            <div className="submenu">
              <Link to="/about" onClick={handleLinkClick}>About Us</Link>
              <Link to="/about/gallery" onClick={handleLinkClick}>Gallery</Link>
            </div>
          </div>

          {/* Other links */}
          <Link to="/services" onClick={handleLinkClick}>Services</Link>
          <Link to="/blogs" onClick={handleLinkClick}>Blogs</Link>
          <Link to="/events" onClick={handleLinkClick}>Events</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          <Link to="/membership" onClick={handleLinkClick}>Membership</Link>
        </div>

        {/* Right Section: Music & Hamburger */}
        <div className="right-section">
          {/* Music Button */}
          <div className="music-button">
            <button onClick={toggleMute}>
              {isMuted ? '🔇' : '🔊'}
            </button>
            <audio ref={audioRef} src="./assets/Web_music.mp3" loop autoPlay muted={isMuted} />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="hamburger" onClick={() => setMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Music Popup */}
        {showMusicPopup && (
          <div className="music-popup">
            <p>Background music is playing.</p>
            <button onClick={dismissPopup}>Okay</button>
            <button
              onClick={() => {
                setIsMuted(true);
                dismissPopup();
              }}
            >
              Mute
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
