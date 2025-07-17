import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Dashboard.css';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/derlc4lyq/image/upload';
const CLOUDINARY_PRESET = 'blog_upload';
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/685e88048561e97a502cbd91';
const JSONBIN_API_KEY = '$2a$10$LR0UoKdp73g6ex3pWvL2V.u0WWX0OVFbpHoIGNRVPiTnpLKA8SyTu';

const Dashboard = () => {
  const { t, i18n } = useTranslation();

  const [blogTitle, setBlogTitle] = useState({ en: '', ta: '' });
  const [blogContent, setBlogContent] = useState({ en: '', ta: '' });
  const [imageFile, setImageFile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [galleryImageTitle, setGalleryImageTitle] = useState({ en: '', ta: '' });
  const [galleryEditingIndex, setGalleryEditingIndex] = useState(null);

  const [testimonialName, setTestimonialName] = useState({ en: '', ta: '' });
  const [testimonialComment, setTestimonialComment] = useState({ en: '', ta: '' });

  const [status, setStatus] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get(JSONBIN_URL, {
        headers: { 'X-Master-Key': JSONBIN_API_KEY }
      });
      const data = res.data.record;
      setBlogs(data.blogs || []);
      setGalleryImages(data.gallery || []);
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  };

  const updateJsonBin = async (newData) => {
    await axios.put(
      JSONBIN_URL,
      newData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
          'X-Bin-Versioning': false
        }
      }
    );
  };

  const handlePostBlog = async () => {
    if (!blogTitle.en || !blogContent.en || !blogTitle.ta || !blogContent.ta) {
      setStatus(t('dashboard.enterTitleContent'));
      return;
    }

    try {
      setStatus(editingIndex !== null ? t('dashboard.updating') : t('dashboard.posting'));
      const imageUrl = imageFile ? await handleImageUpload(imageFile) : blogs[editingIndex]?.image;
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

      await updateJsonBin({ blogs: updatedBlogs, gallery: galleryImages, testimonials });
      setBlogs(updatedBlogs);
      setBlogTitle({ en: '', ta: '' });
      setBlogContent({ en: '', ta: '' });
      setImageFile(null);
      setEditingIndex(null);
      setStatus(t('dashboard.blogSaved'));
    } catch (err) {
      console.error(err);
      setStatus(t('dashboard.blogFailed'));
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
    await updateJsonBin({ blogs: updatedBlogs, gallery: galleryImages, testimonials });
    setBlogs(updatedBlogs);
    setStatus(t('dashboard.blogDeleted'));
  };

  const handleUploadGalleryImage = async () => {
    if (!galleryImageFile && galleryEditingIndex === null) {
      setStatus(t('dashboard.selectImage'));
      return;
    }

    try {
      setStatus(t('dashboard.uploadingImage'));
      const imageUrl = galleryImageFile ? await handleImageUpload(galleryImageFile) : galleryImages[galleryEditingIndex]?.url;
      const newImage = {
        title: galleryImageTitle,
        url: imageUrl,
        timestamp: new Date().toISOString()
      };

      let updatedGallery = [...galleryImages];
      if (galleryEditingIndex !== null) {
        updatedGallery[galleryEditingIndex] = newImage;
      } else {
        updatedGallery.unshift(newImage);
      }

      await updateJsonBin({ blogs, gallery: updatedGallery, testimonials });
      setGalleryImages(updatedGallery);
      setGalleryImageFile(null);
      setGalleryImageTitle({ en: '', ta: '' });
      setGalleryEditingIndex(null);
      setStatus(t('dashboard.imageUploaded'));
    } catch (err) {
      console.error(err);
      setStatus(t('dashboard.imageUploadFailed'));
    }
  };

  const handleEditGalleryImage = (index) => {
    const image = galleryImages[index];
    setGalleryImageTitle(image.title);
    setGalleryEditingIndex(index);
  };

  const handleDeleteGalleryImage = async (index) => {
    const updatedGallery = galleryImages.filter((_, i) => i !== index);
    await updateJsonBin({ blogs, gallery: updatedGallery, testimonials });
    setGalleryImages(updatedGallery);
    setStatus(t('dashboard.imageDeleted'));
  };

  const handleUploadTestimonial = async () => {
    if (!testimonialName.en || !testimonialComment.en || !testimonialName.ta || !testimonialComment.ta) {
      setStatus(t('dashboard.enterTestimonial'));
      return;
    }

    try {
      const newTestimonial = {
        name: testimonialName,
        comment: testimonialComment,
        timestamp: new Date().toISOString()
      };
      const updatedTestimonials = [newTestimonial, ...testimonials];
      await updateJsonBin({ blogs, gallery: galleryImages, testimonials: updatedTestimonials });

      setTestimonials(updatedTestimonials);
      setTestimonialName({ en: '', ta: '' });
      setTestimonialComment({ en: '', ta: '' });
      setStatus(t('dashboard.testimonialAdded'));
    } catch (err) {
      console.error(err);
      setStatus(t('dashboard.testimonialFailed'));
    }
  };

  const handleDeleteTestimonial = async (index) => {
    const updatedTestimonials = testimonials.filter((_, i) => i !== index);
    await updateJsonBin({ blogs, gallery: galleryImages, testimonials: updatedTestimonials });
    setTestimonials(updatedTestimonials);
    setStatus(t('dashboard.testimonialDeleted'));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>{t('dashboard.logout')}</button>
      </div>

      <h3>{t('dashboard.postBlog')}</h3>
      <div className="form-group">
        <label>{t('dashboard.blogTitle')} (EN)</label>
        <input type="text" className="form-control" value={blogTitle.en} onChange={(e) => setBlogTitle({ ...blogTitle, en: e.target.value })} />
        <label>{t('dashboard.blogTitle')} (TA)</label>
        <input type="text" className="form-control" value={blogTitle.ta} onChange={(e) => setBlogTitle({ ...blogTitle, ta: e.target.value })} />
      </div>

      <div className="form-group">
        <label>{t('dashboard.blogContent')} (EN)</label>
        <textarea className="form-control" rows="4" value={blogContent.en} onChange={(e) => setBlogContent({ ...blogContent, en: e.target.value })} />
        <label>{t('dashboard.blogContent')} (TA)</label>
        <textarea className="form-control" rows="4" value={blogContent.ta} onChange={(e) => setBlogContent({ ...blogContent, ta: e.target.value })} />
      </div>

      <div className="form-group">
        <label>{t('dashboard.blogImage')}</label>
        <input type="file" accept="image/*" className="form-control" onChange={(e) => setImageFile(e.target.files[0])} />
      </div>

      <button className="btn btn-primary" onClick={handlePostBlog}>
        {editingIndex !== null ? t('dashboard.updateBlog') : t('dashboard.postBlog')}
      </button>

      {status && <p className="status-message">{status}</p>}

      <hr />
      <h3>{t('dashboard.allBlogs')}</h3>
      <div className="blog-list">
        {blogs.length === 0 ? <p>{t('dashboard.noBlogs')}</p> : blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            {blog.image && <img src={blog.image} alt="Blog" />}
            <div className="blog-body">
              <h4>{blog.title[i18n.language]}</h4>
              <p>{blog.content[i18n.language]}</p>
              <small>{new Date(blog.timestamp).toLocaleString()}</small>
              <div className="blog-actions">
                <button onClick={() => handleEdit(index)}>{t('dashboard.edit')}</button>
                <button onClick={() => handleDelete(index)}>{t('dashboard.delete')}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <h3>{t('dashboard.gallery')}</h3>
      <div className="form-group">
        <label>{t('dashboard.galleryTitle')} (EN)</label>
        <input type="text" className="form-control" value={galleryImageTitle.en} onChange={(e) => setGalleryImageTitle({ ...galleryImageTitle, en: e.target.value })} />
        <label>{t('dashboard.galleryTitle')} (TA)</label>
        <input type="text" className="form-control" value={galleryImageTitle.ta} onChange={(e) => setGalleryImageTitle({ ...galleryImageTitle, ta: e.target.value })} />
      </div>

      <div className="form-group">
        <label>{t('dashboard.galleryUpload')}</label>
        <input type="file" accept="image/*" className="form-control" onChange={(e) => setGalleryImageFile(e.target.files[0])} />
      </div>

      <button className="btn btn-secondary" onClick={handleUploadGalleryImage}>
        {galleryEditingIndex !== null ? t('dashboard.updateImage') : t('dashboard.uploadToGallery')}
      </button>

      <div className="gallery-grid">
        {galleryImages.map((item, index) => (
          <div key={index} className="gallery-card">
            <img src={item.url} alt={item.title[i18n.language]} />
            <div className="gallery-actions">
              <strong>{item.title[i18n.language]}</strong>
              <small>{new Date(item.timestamp).toLocaleString()}</small>
              <div className="gallery-buttons">
                <button onClick={() => handleEditGalleryImage(index)}>{t('dashboard.edit')}</button>
                <button onClick={() => handleDeleteGalleryImage(index)}>{t('dashboard.delete')}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <h3>{t('dashboard.testimonials')}</h3>
      <div className="form-group">
        <label>{t('dashboard.testimonialName')} (EN)</label>
        <input type="text" className="form-control" value={testimonialName.en} onChange={(e) => setTestimonialName({ ...testimonialName, en: e.target.value })} />
        <label>{t('dashboard.testimonialName')} (TA)</label>
        <input type="text" className="form-control" value={testimonialName.ta} onChange={(e) => setTestimonialName({ ...testimonialName, ta: e.target.value })} />
      </div>

      <div className="form-group">
        <label>{t('dashboard.testimonialComment')} (EN)</label>
        <textarea className="form-control" rows="2" value={testimonialComment.en} onChange={(e) => setTestimonialComment({ ...testimonialComment, en: e.target.value })} />
        <label>{t('dashboard.testimonialComment')} (TA)</label>
        <textarea className="form-control" rows="2" value={testimonialComment.ta} onChange={(e) => setTestimonialComment({ ...testimonialComment, ta: e.target.value })} />
      </div>

      <button className="btn btn-secondary" onClick={handleUploadTestimonial}>{t('dashboard.uploadTestimonial')}</button>

      <div className="testimonials-list">
        {testimonials.length === 0 ? <p>{t('dashboard.noTestimonials')}</p> : testimonials.map((item, index) => (
          <div key={index} className="testimonial-card">
            <strong>{item.name[i18n.language]}</strong>
            <p>{item.comment[i18n.language]}</p>
            <small>{new Date(item.timestamp).toLocaleString()}</small>
            <button onClick={() => handleDeleteTestimonial(index)}>{t('dashboard.delete')}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
