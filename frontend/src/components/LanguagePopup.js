import React, { useRef } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);

  const handleLanguageSelect = async (lang) => {
    try {
      const audio = audioRef.current;
      if (audio) {
        // Attempt to play audio on user interaction
        await audio.play();
        audio.loop = true;
        audio.volume = 1.0;
      }
    } catch (err) {
      console.warn('Playback failed:', err);
    }

    i18n.changeLanguage(lang);

    // Optional: stop music after language selection
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onSelect(); // Hide popup
  };

  return (
    <div className="language-popup">
      <audio ref={audioRef} preload="auto">
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
