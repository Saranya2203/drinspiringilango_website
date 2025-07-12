import React, { useRef, useEffect, useState } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 1.0;
      audio.muted = false;

      // Try to autoplay (works on desktop, blocked on mobile unless user interacts)
      audio.play().catch((err) => {
        console.warn('Autoplay failed, will require user interaction:', err);
      });
    }

    return () => {
      // Cleanup: stop audio if component unmounts early
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleMuteToggle = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLanguageSelect = (lang) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    i18n.changeLanguage(lang);
    onSelect(); // hide popup
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

        <button className="mute-button" onClick={handleMuteToggle}>
          {isMuted ? 'Unmute 🔈' : 'Mute 🔇'}
        </button>
      </div>
    </div>
  );
};

export default LanguagePopup;
