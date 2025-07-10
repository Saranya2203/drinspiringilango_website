import React, { useRef } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onSelect(); // Hide the popup
  };

  const playMusicAndSelect = (lang) => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 1.0;
      audio
        .play()
        .then(() => {
          // Start music, then wait a bit before changing language
          setTimeout(() => {
            handleLanguageSelect(lang);
          }, 300); // Delay allows audio to start before stopping
        })
        .catch((err) => {
          console.warn('Audio playback failed:', err);
          handleLanguageSelect(lang); // Fallback
        });
    } else {
      handleLanguageSelect(lang);
    }
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
          <button onClick={() => playMusicAndSelect('en')}>English</button>
          <button onClick={() => playMusicAndSelect('ta')}>தமிழ்</button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;
