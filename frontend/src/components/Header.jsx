import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';
import logo from '../Log.png';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="container">
        <div className="left-section">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Site Logo" />
            </Link>
          </div>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {/* HOME with submenu */}
          <div className={`nav-item ${isSubMenuOpen ? 'open' : ''}`}>
  <div className="nav-link-with-toggle">
    <Link to="/" className="nav-link">{t('header.navHome')}</Link>
    <span className="submenu-toggle" onClick={() => setSubMenuOpen(!isSubMenuOpen)}>▼</span>
  </div>
  <div className="submenu">
    <Link to="/viif">{t('header.navVIIF')}</Link>
    <Link to="/ace-panacea">{t('header.navAcePanacea')}</Link>
  </div>
</div>

          {/* Other links */}
          <Link to="/about" onClick={() => setMenuOpen(false)}>{t('header.navAbout')}</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>{t('header.navServices')}</Link>
          <Link to="/blogs" onClick={() => setMenuOpen(false)}>{t('header.navBlogs')}</Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>{t('header.navEvents')}</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('header.navContact')}</Link>
          <Link to="/membership" onClick={() => setMenuOpen(false)}>{t('header.navMembership')}</Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>{t('header.navAdmin')}</Link>

          {/* Language Switcher for mobile */}
          <div className="mobile-language">
            <LanguageSwitcher />
          </div>
        </div>

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
