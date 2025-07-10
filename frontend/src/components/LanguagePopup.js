import React, { useRef, useState } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const startAudio = async () => {
    const audio = audioRef.current;
    if (audio && !isPlaying) {
      try {
        audio.loop = true;
        audio.volume = 1.0;
        audio.muted = false;
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Autoplay blocked or failed:', err);
      }
    }
  };

  const handleMuteToggle = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLanguageSelect = async (lang) => {
    await startAudio(); // start music on first interaction
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
        <p className="popup-instruction">Tap a language to start background music</p>
        <div className="language-buttons">
          <button onClick={() => handleLanguageSelect('en')}>English</button>
          <button onClick={() => handleLanguageSelect('ta')}>தமிழ்</button>
        </div>

        {isPlaying && (
          <button className="mute-button" onClick={handleMuteToggle}>
            {isMuted ? 'Unmute 🔈' : 'Mute 🔇'}
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguagePopup;
