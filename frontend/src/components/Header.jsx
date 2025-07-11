import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';
import logo from '../Log.png';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHomeSubMenuOpen, setHomeSubMenuOpen] = useState(false);
  const [isAboutSubMenuOpen, setAboutSubMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
    setHomeSubMenuOpen(false);
    setAboutSubMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="container">
        {/* Logo */}
        <div className="left-section">
          <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
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
            <span className="nav-link">
              {t('header.navHome')} ▼
            </span>
            <div className="submenu">
              <Link to="/" onClick={handleHomeClick}>
                {t('header.navHomepage')}
              </Link>
              <Link to="/viif" onClick={() => setMenuOpen(false)}>
                {t('header.navVIIF')}
              </Link>
              <Link to="/ace-panacea" onClick={() => setMenuOpen(false)}>
                {t('header.navAcePanacea')}
              </Link>
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
            <span className="nav-link">
              {t('header.navAbout')} ▼
            </span>
            <div className="submenu">
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                {t('header.navAboutMain', 'About')}
              </Link>
              <Link to="/about/gallery" onClick={() => setMenuOpen(false)}>
                {t('header.navGallery', 'Gallery')}
              </Link>
            </div>
          </div>

          {/* Other links */}
          <Link to="/services" onClick={() => setMenuOpen(false)}>{t('header.navServices')}</Link>
          <Link to="/blogs" onClick={() => setMenuOpen(false)}>{t('header.navBlogs')}</Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>{t('header.navEvents')}</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('header.navContact')}</Link>
          <Link to="/membership" onClick={() => setMenuOpen(false)}>{t('header.navMembership')}</Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>{t('header.navAdmin')}</Link>

          {/* Mobile Language Switcher */}
          <div className="mobile-language">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Right Section: Language and Hamburger */}
        <div className="right-section">
          <div className="desktop-language">
            <LanguageSwitcher />
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
