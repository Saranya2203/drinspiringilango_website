import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import SocialNotification from '../components/socialNotification';
import './Blogs.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Blogs = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socialLoading, setSocialLoading] = useState(true);
  const [error, setError] = useState(null);

  const lang = i18n?.language?.split('-')[0] || 'en';

  // -------------------------
  // Fetch Blogs
  // -------------------------
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dashboard`, { timeout: 30000 });
        const data = Array.isArray(res.data?.blogs)
          ? res.data.blogs
          : Array.isArray(res.data?.data?.blogs)
          ? res.data.data.blogs
          : [];

        const sorted = data.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setBlogs(sorted);
      } catch (err) {
        setError('Failed to fetch blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [t]);

  const blogLink = (blog, index) => `${window.location.origin}/blog/${blog._id || index}`;

  // -------------------------
  // Fetch Today's Social Posts
  // -------------------------
  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/social-posts`);
        setSocialPosts(res.data || []);
      } catch (err) {
        console.error('Failed to fetch social posts', err);
      } finally {
        setSocialLoading(false);
      }
    };
    fetchSocial();
  }, []);
const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // change to false if you want 24-hour format
  });
};

  // -------------------------
  // Render
  // -------------------------
  return (
    <div className="blogs-container">
      {/* BLOG SECTION */}
      <h2>{t('blogs.title') || 'Latest Blog Posts'}</h2>
      {loading && <p className="loading">{t('blogs.loading') || 'Loading blogs...'}</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && blogs.length === 0 && <p>{t('blogs.empty') || 'No blogs available.'}</p>}
      {!loading && !error && blogs.length > 0 && (
        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div className="blog-card" key={blog._id || blog.timestamp || index}>
              {blog.image && <img src={blog.image} alt={blog.title?.[lang] || `Blog ${index}`} className="blog-image" />}
              <div className="blog-info">
                <h3 className="blog-title">{blog.title?.[lang] || blog.title?.en || 'Untitled'}</h3>
                <p className="blog-content">
                  {blog.content?.[lang]
                    ? blog.content[lang].length > 250
                      ? blog.content[lang].slice(0, 250) + '...'
                      : blog.content[lang]
                    : blog.content?.en || 'No content available.'}
                </p>
                {blog.timestamp && (
                  <p className="blog-date">
                    <small>{formatDateTime(blog.timestamp)}</small>
                  </p>
                )}
                <div className="blog-actions">
                  <button
                    className="copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(blogLink(blog, index));
                      alert(t('blogs.linkCopied') || 'Link copied!');
                    }}
                  >
                    {t('blogs.copyLink') || 'Copy Link'}
                  </button>
                  <button
                    className="share-btn"
                    onClick={async () => {
                      const link = blogLink(blog, index);
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: blog.title?.[lang] || blog.title?.en || 'Blog',
                            text: t('blogs.shareText') || 'Check out this blog!',
                            url: link,
                          });
                        } catch (err) {
                          console.log('Share canceled', err);
                        }
                      } else {
                        navigator.clipboard.writeText(link);
                        alert(
                          t('blogs.shareNotSupported') || 'Share not supported — link copied instead.'
                        );
                      }
                    }}
                  >
                    {t('blogs.share') || 'Share'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SOCIAL MEDIA SECTION */}
      <h2 style={{ marginTop: '50px' }}>{t('blogs.socialUpdates') || 'Today’s Social Media Updates'}</h2>
      {socialLoading && <p>{t('blogs.socialLoading') || 'Loading social media posts...'}</p>}
      {!socialLoading && socialPosts.length === 0 && <p>{t('blogs.socialEmpty') || 'No social posts today.'}</p>}
      {!socialLoading && socialPosts.length > 0 && (
        <div className="blog-grid">
          {socialPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              {post.platform === 'instagram' && post.media_url && (
                <video src={post.media_url} controls className="blog-image" />
              )}
              <div className="blog-info">
                <h3>
                  {post.platform === 'instagram'
                    ? post.post_url.includes('/reel/')
                      ? 'Instagram Reel'
                      : 'Instagram Post'
                    : 'Facebook Post'}
                </h3>
                <p>{post.caption || 'New update!'}</p>
                <p className="blog-date">
                  <small>{formatDateTime(post.created_at)}</small>
                </p>
                <div className="blog-actions">
                  <button
                    className="copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(post.post_url);
                      alert(t('blogs.linkCopied') || 'Link copied!');
                    }}
                  >
                    {t('blogs.copyLink') || 'Copy Link'}
                  </button>
                  <button
                    className="share-btn"
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title:
                              post.platform === 'instagram'
                                ? post.post_url.includes('/reel/')
                                  ? 'Instagram Reel'
                                  : 'Instagram Post'
                                : 'Facebook Post',
                            text: 'Check out this post!',
                            url: post.post_url,
                          });
                        } catch (err) {
                          console.log('Share canceled', err);
                        }
                      } else {
                        navigator.clipboard.writeText(post.post_url);
                        alert(t('blogs.shareNotSupported') || 'Share not supported — link copied instead.');
                      }
                    }}
                  >
                    {t('blogs.share') || 'Share'}
                  </button>
                  <button className="share-btn" onClick={() => window.open(post.post_url, '_blank')}>
                    {t('blogs.view') || 'View'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SOCIAL NOTIFICATION COMPONENT */}
      <SocialNotification />
    </div>
  );
};

export default Blogs;
