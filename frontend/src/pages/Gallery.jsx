import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Gallery.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const CATEGORY_OPTIONS = [
  { key: 'team', en: 'Team', ta: 'அணி' },
  { key: 'adventure_fitness', en: 'Adventure and Fitness', ta: 'சாகசம் மற்றும் உடற்பயிற்சி' },
  { key: 'audience_honoured', en: 'Audience and Honoured', ta: 'பார்வையாளர்கள் மற்றும் பாராட்டுகள்' },
  { key: 'lighting_lamp', en: 'Lighting Lamp', ta: 'விளக்கேற்றுதல்' },
  { key: 'audience_podium', en: 'Audience and Podium', ta: 'பார்வையாளர்கள் மற்றும் மேடை' },
  { key: 'chief_guest', en: 'Received as the Chief Guest', ta: 'முக்கிய விருந்தினராக வரவேற்பு' },
  { key: 'author', en: 'Author', ta: 'எழுத்தாளர்' },
  { key: 'autographs_selfies', en: 'Autographs & Selfies', ta: 'கையொப்பங்கள் மற்றும் செல்ஃபிகள்' },
  { key: 'award_receiving', en: 'Award Receiving', ta: 'விருது பெற்றல்' },
  { key: 'award_giving', en: 'Award Giving', ta: 'விருது வழங்கல்' },
  { key: 'banners', en: 'Banners', ta: 'பேனர்கள்' },
  { key: 'inspiration_day', en: 'Inspiration Day', ta: 'ஊக்கம் வழங்கும் நாள்' },
  { key: 'brand_ambassador', en: 'Brand Ambassador', ta: 'தூதர்' },
  { key: 'childhood', en: 'Childhood', ta: 'குழந்தைப் பருவம்' },
  { key: 'collages', en: 'Collages', ta: 'கலாச்சித்திரங்கள்' },
  { key: 'doctorate', en: 'Doctorate', ta: 'பட்டமளிப்பு' },
  { key: 'personal_family', en: 'Personal Family', ta: 'தனிப்பட்ட குடும்பம்' },
  { key: 'profile_documents', en: 'Profile Documents', ta: 'சுயவிவர ஆவணங்கள்' },
  { key: 'paper_clips', en: 'Paper Clips and Testimonies', ta: 'காகிதக் கிளிப்புகள் மற்றும் சாட்சியங்கள்' },
  { key: 'personalities', en: 'Personalities', ta: 'நட்புறவுகள்' },
  { key: 'voice_artiste', en: 'Voice Artiste', ta: 'குரல் கலைஞர்' },
  { key: 'inspiring_ilango', en: 'Inspiring Ilango', ta: 'ஊக்கமளிக்கும் இளங்கோ' },
];

const MAX_VISIBLE = 6;

const Gallery = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language?.split('-')[0] || 'en';
  const [galleryItems, setGalleryItems] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dashboard`, { timeout: 30000 });
        const data = res.data?.gallery || [];

        // Sort by newest first
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setGalleryItems(sorted);
      } catch (err) {
        console.error('❌ Failed to fetch gallery:', err);
        setError(t('gallery1.loadError') || 'Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [t]);

  const toggleCategory = (key) => {
    setExpandedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-heading">{t('gallery1.title') || 'Gallery'}</h2>

      {loading && <p className="gallery-status">{t('gallery1.loading') || 'Loading gallery...'}</p>}
      {error && <p className="gallery-status error">{error}</p>}
      {!loading && galleryItems.length === 0 && (
        <p className="gallery-status">{t('gallery1.empty') || 'No gallery images available.'}</p>
      )}

      {CATEGORY_OPTIONS.map((category) => {
        const items = galleryItems.filter((img) => img.category === category.key);
        if (items.length === 0) return null;

        const expanded = expandedCategories[category.key];
        const visible = expanded ? items : items.slice(0, MAX_VISIBLE);

        return (
          <div key={category.key} className="gallery-section">
            <h3 className="gallery-category">
              {category?.[lang] || category.en}
            </h3>

            <div className="gallery-grid">
              {visible.map((item, index) => (
                <div className="gallery-card" key={item.url || index}>
                  {item.url ? (
                    <img
                      src={item.url}
                      alt={category?.[lang] || category.en}
                      loading="lazy"
                    />
                  ) : (
                    <div className="fallback-image">
                      {t('gallery1.noImage') || 'No Image'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {items.length > MAX_VISIBLE && (
              <button
                className="toggle-button"
                onClick={() => toggleCategory(category.key)}
              >
                {expanded
                  ? t('gallery1.showLess') || 'Show Less'
                  : t('gallery1.showMore') || 'Show More'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
