import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import logo from '../Inspiring_Ilango.png';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Scroll to top smoothly when clicking any link
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Logo and Copyright */}
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <h4>{t('footer.links.heading')}</h4>
          <ul>
            <li><Link to="/" onClick={scrollToTop}>{t('footer.links.home')}</Link></li>
            <li><Link to="/viif" onClick={scrollToTop}>VIIF</Link></li>
            <li><Link to="/ace-panacea" onClick={scrollToTop}>Ace Panacea Life Skills Private Limited</Link></li>
            <li><Link to="/about" onClick={scrollToTop}>{t('footer.links.about')}</Link></li>
            <li><Link to="/about/gallery" onClick={scrollToTop}>{t('footer.links.gallery')}</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>{t('footer.links.services')}</Link></li>
            <li><Link to="/events" onClick={scrollToTop}>{t('footer.links.events')}</Link></li>
            <li><Link to="/blogs" onClick={scrollToTop}>{t('footer.links.blogs')}</Link></li>
            <li><Link to="/contact" onClick={scrollToTop}>{t('footer.links.contact')}</Link></li>
            <li><Link to="/membership" onClick={scrollToTop}>{t('footer.links.membership')}</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h4>{t('footer.contact.heading')}</h4>
          <p>{t('footer.contact.email')}</p>
          <p>{t('footer.contact.phone')}</p>
          <p>{t('footer.contact.location')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
