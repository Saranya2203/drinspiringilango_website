import React, { useRef, useState } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleLanguageSelect = async (lang) => {
    const audio = audioRef.current;

    if (audio && !hasInteracted) {
      try {
        audio.loop = true;
        audio.volume = 1.0;
        await audio.play();
        setHasInteracted(true);
      } catch (err) {
        console.warn('Audio playback failed:', err);
      }
    }

    i18n.changeLanguage(lang);

    // Optional: Stop music after language selection
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
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
        <p className="popup-instruction">Tap a button to enable background music</p>
        <div className="language-buttons">
          <button onClick={() => handleLanguageSelect('en')}>English</button>
          <button onClick={() => handleLanguageSelect('ta')}>தமிழ்</button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;
