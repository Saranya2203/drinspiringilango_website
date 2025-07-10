import React, { useRef, useState } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);
  const [audioStarted, setAudioStarted] = useState(false);

  const handlePlayAudio = () => {
    const audio = audioRef.current;
    if (audio && !audioStarted) {
      audio.loop = true;
      audio.volume = 1.0;
      audio.play().then(() => {
        setAudioStarted(true);
      }).catch((err) => {
        console.warn('Audio play failed:', err);
      });
    }
  };

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);

    // Stop music after language selected
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
        <p className="popup-instruction">Tap once to enable background music</p>
        <div className="language-buttons">
          <button
            onClick={() => {
              handlePlayAudio();
              handleLanguageSelect('en');
            }}
          >
            English
          </button>
          <button
            onClick={() => {
              handlePlayAudio();
              handleLanguageSelect('ta');
            }}
          >
            தமிழ்
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;
