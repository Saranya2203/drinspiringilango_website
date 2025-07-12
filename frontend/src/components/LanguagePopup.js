import React, { useRef, useState } from 'react';
import './LanguagePopup.css';
import { useTranslation } from 'react-i18next';

const LanguagePopup = ({ onSelect }) => {
  const { i18n } = useTranslation();
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const handlePlayAudio = () => {
    const audio = audioRef.current;
    if (audio && !audioStarted) {
      audio.loop = true;
      audio.volume = 1.0;
      audio.muted = false;

      audio.play()
        .then(() => {
          setAudioStarted(true);
        })
        .catch((err) => {
          console.warn('Autoplay blocked until user interaction:', err);
        });
    }
  };

  const handleMuteToggle = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);

    // Stop and reset music
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    onSelect(); // hide popup
  };

  return (
    <div className="language-popup" onClick={handlePlayAudio}>
      <audio ref={audioRef} preload="auto">
        <source src="/assets/background-music1.mp3" type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      <div className="popup-content">
        <h1 className="popup-title">Dr. Inspiring Ilango</h1>
        <h2>Select Your Language</h2>
        <p className="popup-instruction">Tap anywhere to enable background music</p>

        <div className="language-buttons">
          <button onClick={() => handleLanguageSelect('en')}>English</button>
          <button onClick={() => handleLanguageSelect('ta')}>தமிழ்</button>
        </div>

        {audioStarted && (
          <button className="mute-button" onClick={handleMuteToggle}>
            {isMuted ? 'Unmute 🔈' : 'Mute 🔇'}
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguagePopup;
