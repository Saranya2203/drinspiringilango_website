import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/derlc4lyq/image/upload';
const CLOUDINARY_PRESET = 'blog_upload';
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/685e88048561e97a502cbd91';
const JSONBIN_API_KEY = '$2a$10$LR0UoKdp73g6ex3pWvL2V.u0WWX0OVFbpHoIGNRVPiTnpLKA8SyTu';

const Dashboard = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(JSONBIN_URL, {
        headers: { 'X-Master-Key': JSONBIN_API_KEY }
      });
      setBlogs(res.data.record.blogs || []);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  };

  const handlePostBlog = async () => {
    if (!blogTitle || !blogContent) {
      setStatus('Please enter both title and content.');
      return;
    }

    try {
      setStatus(editingIndex !== null ? 'Updating blog...' : 'Posting blog...');
      const imageUrl = imageFile ? await handleImageUpload() : blogs[editingIndex]?.image;
      const newBlog = {
        title: blogTitle,
        content: blogContent,
        image: imageUrl,
        timestamp: new Date().toISOString()
      };

      const updatedBlogs = [...blogs];
      if (editingIndex !== null) {
        updatedBlogs[editingIndex] = newBlog;
      } else {
        updatedBlogs.unshift(newBlog);
      }

      await axios.put(
        JSONBIN_URL,
        { blogs: updatedBlogs },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_API_KEY,
            'X-Bin-Versioning': false
          }
        }
      );

      setBlogs(updatedBlogs);
      setBlogTitle('');
      setBlogContent('');
      setImageFile(null);
      setEditingIndex(null);
      setStatus('✅ Blog successfully saved!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to save blog.');
    }
  };

  const handleEdit = (index) => {
    const blog = blogs[index];
    setBlogTitle(blog.title);
    setBlogContent(blog.content);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    await axios.put(
      JSONBIN_URL,
      { blogs: updatedBlogs },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
          'X-Bin-Versioning': false
        }
      }
    );
    setBlogs(updatedBlogs);
    setStatus('🗑️ Blog deleted.');
  };

  return (
    <div className="dashboard-container">
      <h2 className="text-center">Admin Dashboard</h2>

      <div className="form-group">
        <label>Blog Title</label>
        <input
          type="text"
          className="form-control"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>

      <div className="form-group">
        <label>Blog Content</label>
        <textarea
          className="form-control"
          rows="4"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          placeholder="Write your blog content..."
        />
      </div>

      <div className="form-group">
        <label>Blog Image</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <button className="btn btn-primary" onClick={handlePostBlog}>
        {editingIndex !== null ? 'Update Blog' : 'Post Blog'}
      </button>

      {status && <p className="status-message">{status}</p>}

      <hr />
      <h3>All Blogs</h3>
      <div className="blog-list">
        {blogs.length === 0 && <p>No blogs available.</p>}
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <img src={blog.image} alt="Blog" />
            <div className="blog-body">
              <h4>{blog.title}</h4>
              <p>{blog.content}</p>
              <small>{new Date(blog.timestamp).toLocaleString()}</small>
              <div className="blog-actions">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blog.image)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blog.image)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title + ' - ' + blog.content)}&url=${encodeURIComponent(blog.image)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on X
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
