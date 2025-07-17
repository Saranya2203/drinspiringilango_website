import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Gallery.css';

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/685e88048561e97a502cbd91';
const JSONBIN_API_KEY = '$2a$10$LR0UoKdp73g6ex3pWvL2V.u0WWX0OVFbpHoIGNRVPiTnpLKA8SyTu';

const Gallery = () => {
  const { i18n, t } = useTranslation();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(JSONBIN_URL, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY
        }
      });

      const items = res.data.record.gallery || [];
      const sortedItems = items.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setGalleryItems(sortedItems);
    } catch (err) {
      console.error('Error loading gallery:', err);
      setError(t('gallery.loadError') || '❌ Failed to load gallery.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-heading">{t('gallery.title') || 'Gallery'}</h2>

      {loading && <p className="gallery-status">{t('gallery.loading') || 'Loading gallery...'}</p>}
      {error && <p className="gallery-status error">{error}</p>}

      {!loading && galleryItems.length === 0 && (
        <p className="gallery-status">{t('gallery.empty') || 'No images found in the gallery.'}</p>
      )}

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div className="gallery-card" key={index}>
            {item.url ? (
              <img
                src={item.url}
                alt={item.title?.[i18n.language] || 'Image'}
                loading="lazy"
              />
            ) : (
              <div className="fallback-image">{t('gallery.noImage') || 'No Image'}</div>
            )}
            <h4>{item.title?.[i18n.language] || t('gallery.untitled') || 'Untitled'}</h4>
            {item.timestamp && (
              <small>
                {new Date(item.timestamp).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
