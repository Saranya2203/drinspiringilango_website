import React from 'react';
import { useTranslation } from 'react-i18next';

const buttonStyles = (active) => ({
  padding: '0.5rem 1rem',
  cursor: active ? 'default' : 'pointer',
  backgroundColor: active ? '#005fcc' : '#e0e0e0',
  color: active ? '#fff' : '#333',
  border: '2px solid #005fcc',
  borderRadius: '6px',
  fontWeight: active ? '600' : '400',
  transition: 'background-color 0.25s ease, color 0.25s ease',
  outline: 'none',
  flex: '1 1 auto',
  textAlign: 'center',
  userSelect: 'none',
});

const containerStyles = {
  display: 'flex',
  gap: '0.75rem',
  maxWidth: '300px',
  margin: '0 auto',
  padding: '0 1rem',
  flexWrap: 'wrap',
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
  ];

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <nav aria-label="Language selector" style={containerStyles}>
      {languages.map(({ code, label }) => {
        const active = i18n.language === code;
        return (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            disabled={active}
            aria-current={active ? 'true' : undefined}
            aria-pressed={active}
            type="button"
            style={buttonStyles(active)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                changeLanguage(code);
              }
            }}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
