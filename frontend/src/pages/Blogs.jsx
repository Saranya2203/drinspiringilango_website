import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blogs.css';

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/685e88048561e97a502cbd91';
const JSONBIN_API_KEY = '$2a$10$LR0UoKdp73g6ex3pWvL2V.u0WWX0OVFbpHoIGNRVPiTnpLKA8SyTu';


const Blogs = () => {
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
      setBlogs(data);
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
      <h2>Latest Blog Posts</h2>
      {loading ? (
        <p className="loading">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="no-blogs">No blogs available.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div className="blog-card" key={index}>
              <img src={blog.image} alt={`Blog ${index}`} />
              <div className="blog-info">
                <p className="blog-content">
                  {blog.content.length > 250
                    ? blog.content.slice(0, 250) + '...'
                    : blog.content}
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

