import React, { useEffect, useRef } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 1.0;

      // Try to play the audio after a short delay to increase success
      setTimeout(() => {
        audio.play().catch((err) => {
          console.warn('Autoplay blocked. Audio will play on user interaction.', err);
        });
      }, 200); // slight delay helps sometimes
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);

    // Optional: Stop music after language is selected
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onSelect(); // Hide popup
  };

  return (
    <div className="language-popup">
      <audio ref={audioRef}>
        <source src="/assets/background-music1.mp3" type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      <div className="popup-content">
        <h1 className="popup-title">Dr. Inspiring Ilango</h1>
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
