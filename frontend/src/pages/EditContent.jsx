import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './adminStyles.css';

const mockData = [
  { id: 1, title: 'Welcome to Inspiring Ilango', type: 'Page', status: 'Published' },
  { id: 2, title: 'Emotional Intelligence in Leadership', type: 'Blog', status: 'Draft' },
  { id: 3, title: 'Workshop Recap Video', type: 'Video', status: 'Published' }
];

const EditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState({ title: '', type: '', status: '' });

  useEffect(() => {
    const found = mockData.find(item => item.id === parseInt(id));
    if (found) setContent(found);
    else alert('Content not found');
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Content updated (mock)');
    navigate('/admin/manage-content');
  };

  return (
    <div className="admin-container">
      <h2>Edit Content</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={content.title}
          onChange={handleChange}
          required
        />
        <select name="type" value={content.type} onChange={handleChange}>
          <option value="Page">Page</option>
          <option value="Blog">Blog</option>
          <option value="Video">Video</option>
        </select>
        <select name="status" value={content.status} onChange={handleChange}>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditContent;
