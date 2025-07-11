import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Gallery.css';

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/685e88048561e97a502cbd91';
const JSONBIN_API_KEY = '$2a$10$LR0UoKdp73g6ex3pWvL2V.u0WWX0OVFbpHoIGNRVPiTnpLKA8SyTu';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(JSONBIN_URL, {
        headers: { 'X-Master-Key': JSONBIN_API_KEY }
      });

      const allData = res.data.record;
      const items = allData.gallery || [];
      const sortedItems = items.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setGalleryItems(sortedItems);
    } catch (err) {
      console.error('Error loading gallery:', err);
      setError('❌ Failed to load gallery.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-heading">📸 Event Gallery</h2>

      {loading && <p className="gallery-status">Loading gallery...</p>}
      {error && <p className="gallery-status error">{error}</p>}

      {!loading && galleryItems.length === 0 && (
        <p className="gallery-status">No images found in the gallery.</p>
      )}

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div className="gallery-card" key={index}>
            <img src={item.url} alt={item.title || 'Gallery Image'} />
            <h4>{item.title}</h4>
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
