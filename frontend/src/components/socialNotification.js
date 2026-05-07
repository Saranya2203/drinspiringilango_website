import { useEffect, useRef } from 'react';

const API_URL = process.env.REACT_APP_API_URL + '/api/latest-post';

const SocialNotification = () => {
  const lastPostId = useRef(null);

  useEffect(() => {
    const showPopup = (post) => {
      const popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.bottom = '20px';
      popup.style.left = '20px';
      popup.style.background = 'white';
      popup.style.border = '1px solid #ccc';
      popup.style.borderRadius = '10px';
      popup.style.padding = '12px';
      popup.style.maxWidth = '260px';
      popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      popup.style.zIndex = '9999';
      popup.style.cursor = 'pointer';

      popup.innerHTML = `
        ${post.media_url ? `<img src="${post.media_url}" style="width:100%; border-radius:8px;" />` : ''}
        <h4 style="margin:10px 0 5px;">New ${post.platform === 'instagram' ? (post.post_url.includes('/reel/') ? 'Reel' : 'Instagram Post') : 'Facebook Post'}!</h4>
        <p style="font-size:14px; max-height:40px; overflow:hidden;">${post.caption || 'No caption'}</p>
        <button id="readMoreBtn" style="background:#007bff;color:white;border:none;padding:6px 10px;border-radius:5px;margin-top:8px;">
          Read More
        </button>
      `;

      popup.onclick = (e) => {
        if (e.target.id !== 'readMoreBtn') window.location.href = '/blogs';
      };

      popup.querySelector('#readMoreBtn').onclick = (e) => {
        e.stopPropagation();
        window.open(post.post_url, '_blank');
      };

      document.body.appendChild(popup);

      setTimeout(() => {
        if (popup.parentNode) popup.parentNode.removeChild(popup);
      }, 10000);
    };

    const loadNotification = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) return;

        const post = await res.json();
        if (!post || post.id === lastPostId.current) return;

        lastPostId.current = post.id;
        showPopup(post);
      } catch (err) {
        console.error('Failed to load social notification:', err);
      }
    };

    loadNotification();
    const interval = setInterval(loadNotification, 60000); // check every 60s

    return () => clearInterval(interval);
  }, []);

  return null; // this component only manages popups
};

export default SocialNotification;
