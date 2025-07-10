import React, { useEffect, useRef } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current?.play().catch(() => {}); // autoplay might be blocked
  }, []);

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);
    audioRef.current.pause();
    onSelect(); // hide popup
  };

  return (
    <div className="language-popup">
      <audio ref={audioRef} loop autoPlay>
        <source src="/assets/background-music.mp3" type="audio/mp3" />
      </audio>

      <div className="popup-content">
        <h2>Select Your Language</h2>
        <div className="language-buttons">
          <button onClick={() => handleLanguageSelect('en')}>English</button>
          <button onClick={() => handleLanguageSelect('ta')}>தமிழ்</button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;
