import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Blogs.css';

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/685e88048561e97a502cbd91';
const JSONBIN_API_KEY = '$2a$10$LR0UoKdp73g6ex3pWvL2V.u0WWX0OVFbpHoIGNRVPiTnpLKA8SyTu';

const Blogs = () => {
  const { i18n, t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(JSONBIN_URL, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY
        }
      });
      const data = response.data.record.blogs || [];
      const sorted = data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setBlogs(sorted);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="blogs-container">
      <h2>{t('blogs.title') || 'Latest Blog Posts'}</h2>
      {loading ? (
        <p className="loading">{t('blogs.loading') || 'Loading blogs...'}</p>
      ) : blogs.length === 0 ? (
        <p className="no-blogs">{t('blogs.empty') || 'No blogs available.'}</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div className="blog-card" key={index}>
              {blog.image && <img src={blog.image} alt={`Blog ${index}`} />}
              <div className="blog-info">
                <h3 className="blog-title">{blog.title?.[i18n.language] || t('blogs.untitled') || 'Untitled'}</h3>
                <p className="blog-content">
                  {blog.content?.[i18n.language]
                    ? blog.content[i18n.language].length > 250
                      ? blog.content[i18n.language].slice(0, 250) + '...'
                      : blog.content[i18n.language]
                    : t('blogs.noContent') || 'No content available.'}
                </p>
                <p className="blog-date">
                  <small>{new Date(blog.timestamp).toLocaleString()}</small>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
