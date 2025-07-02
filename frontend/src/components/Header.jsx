import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';
import logo from '../Log.png';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false); // 👈 submenu toggle

  return (
    <header className="main-header">
      <div className="container">
        <div className="left-section">
          <div className="logo">
            <img src={logo} alt="Site Logo" />
          </div>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {/* Home with submenu */}
          <div
            className={`nav-item ${isSubMenuOpen ? 'open' : ''}`}
            onClick={() => setSubMenuOpen(!isSubMenuOpen)}
          >
            <span className="nav-link">{t('header.navHome')} ▼</span>
            <div className="submenu">
              <Link to="/viif">{t('header.navVIIF')}</Link>
              <Link to="/ace-panacea">{t('header.navAcePanacea')}</Link>
            </div>
          </div>

          {/* Other links */}
          <Link to="/about">{t('header.navAbout')}</Link>
          <Link to="/services">{t('header.navServices')}</Link>
          <Link to="/blogs">{t('header.navBlogs')}</Link>
          <Link to="/events">{t('header.navEvents')}</Link>
          <Link to="/contact">{t('header.navContact')}</Link>
          <Link to="/membership">{t('header.navMembership')}</Link>
          <Link to="/admin">{t('header.navAdmin')}</Link>
          <div className="mobile-language"><LanguageSwitcher /></div>
        </div>

        <div className="right-section">
          <div className="desktop-language"><LanguageSwitcher /></div>
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
