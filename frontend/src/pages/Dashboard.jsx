import React, { useState, useEffect,} from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Dashboard.css";

/* ---------- Backend API Base URL ---------- */
const API_BASE_URL = process.env.REACT_APP_API_URL;

/* ---------- Constants ---------- */
const CATEGORY_OPTIONS = [
  { key: "team", en: "Team", ta: "அணி" },
  { key: "adventure_fitness", en: "Adventure and Fitness", ta: "சாகசம் மற்றும் உடற்பயிற்சி" },
  { key: "audience_honoured", en: "Audience and Honoured", ta: "பார்வையாளர்கள் மற்றும் பாராட்டுகள்" },
  { key: "lighting_lamp", en: "Lighting Lamp", ta: "விளக்கேற்றுதல்" },
  { key: "audience_podium", en: "Audience and Podium", ta: "பார்வையாளர்கள் மற்றும் மேடை" },
  { key: "chief_guest", en: "Received as the Chief Guest", ta: "முக்கிய விருந்தினராக வரவேற்பு" },
  { key: "author", en: "Author", ta: "எழுத்தாளர்" },
  { key: "autographs_selfies", en: "Autographs & Selfies", ta: "கையொப்பங்கள் மற்றும் செல்ஃபிகள்" },
  { key: "award_receiving", en: "Award Receiving", ta: "விருது பெற்றல்" },
  { key: "award_giving", en: "Award Giving", ta: "விருது வழங்கல்" },
  { key: "banners", en: "Banners", ta: "பேனர்கள்" },
  { key: "inspiration_day", en: "Inspiration Day", ta: "ஊக்கம் வழங்கும் நாள்" },
  { key: "brand_ambassador", en: "Brand Ambassador", ta: "தூதர்" },
  { key: "childhood", en: "Childhood", ta: "குழந்தைப் பருவம்" },
  { key: "collages", en: "Collages", ta: "கலாச்சித்திரங்கள்" },
  { key: "doctorate", en: "Doctorate", ta: "பட்டமளிப்பு" },
  { key: "personal_family", en: "Personal Family", ta: "தனிப்பட்ட குடும்பம்" },
  { key: "profile_documents", en: "Profile Documents", ta: "சுயவிவர ஆவணங்கள்" },
  { key: "paper_clips", en: "Paper Clips and Testimonies", ta: "காகிதக் கிளிப்புகள் மற்றும் சாட்சியங்கள்" },
  { key: "personalities", en: "Personalities", ta: "நட்புறவுகள்" },
  { key: "voice_artiste", en: "Voice Artiste", ta: "குரல் கலைஞர்" },
  { key: "inspiring_ilango", en: "Inspiring Ilango", ta: "ஊக்கமளிக்கும் இளங்கோ" },
];

const MATERIAL_CATEGORIES = [
  { key: "audios", en: "Audios", ta: "ஆடியோக்கள்" },
  { key: "videos", en: "Videos", ta: "வீடியோக்கள்" },
  { key: "exam_papers", en: "Competitive Exam Papers", ta: "போட்டி தேர்வு கேள்வித்தாள்கள்" },
  { key: "books", en: "Course Books", ta: "பாடநூல்கள்" },
  { key: "english_refs", en: "English Reference Materials", ta: "ஆங்கில குறிப்புப் பொருட்கள்" },
];

/* ---------- Dashboard Component ---------- */
const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n?.language?.split("-")[0] || "en";

  /* ---------- State ---------- */
  const [blogTitle, setBlogTitle] = useState({ en: "", ta: "" });
  const [blogContent, setBlogContent] = useState({ en: "", ta: "" });
  const [imageFile, setImageFile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [scheduledDate, setScheduledDate] = useState(""); // YYYY-MM-DD
const [scheduledTime, setScheduledTime] = useState(""); // HH:MM
  const [editingIndex, setEditingIndex] = useState(null);
  const [blogStatus, setBlogStatus] = useState("");

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [manualCategory, setManualCategory] = useState(""); // new
  const [galleryEditingIndex, setGalleryEditingIndex] = useState(null);
  const [galleryStatus, setGalleryStatus] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const [testimonials, setTestimonials] = useState([]);
  const [testimonialName, setTestimonialName] = useState({ en: "", ta: "" });
  const [testimonialComment, setTestimonialComment] = useState({ en: "", ta: "" });
  const [testimonialEditingIndex, setTestimonialEditingIndex] = useState(null);
  const [testimonialStatus, setTestimonialStatus] = useState("");

  const [materials, setMaterials] = useState([]);
  const [materialTitle, setMaterialTitle] = useState({ en: "", ta: "" });
  const [materialFiles, setMaterialFiles] = useState([]);
  const [materialEditingIndex, setMaterialEditingIndex] = useState(null);
  const [materialStatus, setMaterialStatus] = useState("");
  const [selectedMaterialCategory, setSelectedMaterialCategory] = useState("");
  const [expandedMaterialCategories, setExpandedMaterialCategories] = useState({});

  // Password states (manual + validity)
  const [batchPassword, setBatchPassword] = useState("");
  const [passwordExpiry, setPasswordExpiry] = useState(""); // ISO string
  const [manualPassword, setManualPassword] = useState("");
  const [validityDays, setValidityDays] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  /* ---------- Upload progress states ---------- */
  const [uploading, setUploading] = useState(false); // boolean to indicate any upload running
  const [uploadProgress, setUploadProgress] = useState(0); // overall percent 0-100
  const [uploadSpeedKb, setUploadSpeedKb] = useState(0); // instantaneous speed kb/s
  const [timeRemainingSec, setTimeRemainingSec] = useState(null); // seconds
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [totalFilesToUpload, setTotalFilesToUpload] = useState(0);
  const [uploadStatusLabel, setUploadStatusLabel] = useState(""); // textual status during uploads

  const [brochures, setBrochures] = useState([]);
const [brochureTitle, setBrochureTitle] = useState({ en: "", ta: "" });
const [brochureContent, setBrochureContent] = useState({ en: "", ta: "" });
const [brochureFile, setBrochureFile] = useState(null);
const [brochureEditingIndex, setBrochureEditingIndex] = useState(null);
const [brochureStatus, setBrochureStatus] = useState("");

  /* ---------- Effects ---------- */
  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


  const daysRemaining = (isoExpiry) => {
    if (!isoExpiry) return null;
    const now = new Date();
    const exp = new Date(isoExpiry);
    const diffMs = exp - now;
    if (isNaN(diffMs)) return null;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toDateString();
  };

  const getScheduledTimestamp = () => {
  if (scheduledDate && scheduledTime) {
    const dt = new Date(`${scheduledDate}T${scheduledTime}:00`);
    return dt.toISOString();
  }
  return new Date().toISOString(); // instant post
};

  /* ---------- API Calls ---------- */
  const fetchDashboard = async () => {
    try {

const res = await axios.get(`${API_BASE_URL}/api/dashboard`, {
  headers: { ...getAuthHeaders() },
  timeout: 60000,
});


      const data = res.data || {};
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      setGalleryImages(Array.isArray(data.gallery) ? data.gallery : []);
      setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : []);
      setMaterials(Array.isArray(data.materials) ? data.materials : []);
      setBrochures(Array.isArray(data.brochures) ? data.brochures : []);
      setBatchPassword(data.batchPassword || "");
      setPasswordExpiry(data.passwordExpiry || data.passwordExpiry === "" ? data.passwordExpiry : "");
      setManualPassword(data.batchPassword || "");
      setValidityDays("");
    } catch (err) {
      console.error("Failed to fetch dashboard:", err?.message || err);
      setBlogStatus("❌ Failed to fetch dashboard data");
    }
  };

  const updateDashboard = async (payload) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/dashboard`, payload, {
  headers: { ...getAuthHeaders() },
  timeout: 60000,
});


      return res.data || payload;
    } catch (err) {
      console.error("Failed to update dashboard:", err.response?.data || err.message || err);
      throw err;
    }
  };

  /* ---------- UPLOAD UTILITIES (multi-file aware) ---------- */

  // Factory that creates a per-file onUploadProgress handler.
  // Defined outside the loop to avoid ESLint no-loop-func.
  const makeOnUploadProgress = (initialUploadedBytes, fileSize) => {
    let fileStartTime = Date.now();
    let lastLoaded = 0;
    return (e) => {
      const now = Date.now();
      const elapsedSec = Math.max((now - fileStartTime) / 1000, 0.001); // sec
      const loadedThisFile = e.loaded || 0;
      const totalThisFile = e.total || fileSize || 0;

      // compute overall loaded (uses initialUploadedBytes captured)
      const overallLoaded = initialUploadedBytes + loadedThisFile;
      const denom = (fileSize && initialUploadedBytes + fileSize) ? (fileSize + initialUploadedBytes) : Math.max(1, overallLoaded);

      const overallPercent = Math.min(100, Math.round((overallLoaded / denom) * 100));
      setUploadProgress(overallPercent);

      // instantaneous speed for this file (bytes/sec), derive kb/s
      const bytesSinceLast = loadedThisFile - lastLoaded;
      const speedThisFileBps = bytesSinceLast / Math.max(elapsedSec, 0.001);
      const speedKbNow = (loadedThisFile / Math.max((now - fileStartTime) / 1000, 0.001)) / 1024;
      setUploadSpeedKb(Number.isFinite(speedKbNow) ? speedKbNow : 0);

      // estimate time remaining (seconds)
      const remainingBytes = (fileSize > 0) ? Math.max((denom - overallLoaded), 0) : Math.max(totalThisFile - loadedThisFile, 0);
      const estimatedSec = speedThisFileBps > 0 ? Math.ceil(remainingBytes / speedThisFileBps) : null;
      setTimeRemainingSec(estimatedSec);

      lastLoaded = loadedThisFile;
      fileStartTime = Date.now();
    };
  };

  // Upload multiple File objects and return an array of uploaded URLs (or null on failure)
  // This function updates global upload progress state (uploading, uploadProgress, uploadSpeedKb, timeRemainingSec).
  const uploadMultipleFiles = async (files = []) => {
    if (!files || files.length === 0) return [];

    setUploading(true);
    setUploadProgress(0);
    setUploadSpeedKb(0);
    setTimeRemainingSec(null);
    setCurrentFileIndex(0);
    setTotalFilesToUpload(files.length);
    setUploadStatusLabel("Preparing upload...");

    // compute total bytes (some File objects may not have size; fallback)
    let totalBytes = 0;
    for (const f of files) {
      totalBytes += (f?.size) ? f.size : 0;
    }
    // If totalBytes is 0 (we couldn't get sizes), we will just show per-file progress as fallback
    const urls = [];
    let uploadedBytesSoFar = 0;

    try {
      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];
        setCurrentFileIndex(idx + 1);
        setUploadStatusLabel(`Uploading file ${idx + 1} of ${files.length} (${file.name || "file"})`);

        const formData = new FormData();
        formData.append("file", file);

        // create per-file onUploadProgress using factory (captures uploadedBytesSoFar & file size)
        // create per-file onUploadProgress using factory (captures uploadedBytesSoFar & file size)
const onUploadProgress = makeOnUploadProgress(uploadedBytesSoFar, file?.size || 0);

const res = await axios.post(`${API_BASE_URL}/api/dashboard/upload`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    ...getAuthHeaders(), // <-- use centralized helper
  },
  onUploadProgress,
  timeout: 0, // allow longer for large files
});

        // after successful upload for this file
        if (res?.data?.files?.length > 0) {
          urls.push(res.data.files[0].url);
        } else {
          // if server returns a single url in other shape
          if (res?.data?.url) urls.push(res.data.url);
          else urls.push(null);
        }

        // update counters
        uploadedBytesSoFar += (file?.size) ? file.size : 0;

        // small delay to let UI show 100% for file
        setUploadProgress((totalBytes > 0) ? Math.min(100, Math.round((uploadedBytesSoFar / totalBytes) * 100)) : Math.round(((idx + 1) / files.length) * 100));
        setUploadSpeedKb(0);
        setTimeRemainingSec(null);
      }

      setUploadStatusLabel("Finalizing...");
      // brief pause before clearing so users can notice completion
      setTimeout(() => {
        setUploading(false);
        setCurrentFileIndex(0);
        setTotalFilesToUpload(0);
        setUploadProgress(0);
        setUploadSpeedKb(0);
        setTimeRemainingSec(null);
        setUploadStatusLabel("");
      }, 1500);

      return urls;
    } catch (err) {
      console.error("Multi-file upload failed:", err);
      setUploadStatusLabel("❌ Upload failed");
      setUploading(false);
      // keep the progress visible so admin can see partial state
      return null;
    }
  };

  // Backwards-compatible single-file uploader that uses uploadMultipleFiles
  const handleFileUpload = async (file) => {
    if (!file) return null;
    const urls = await uploadMultipleFiles([file]);
    if (!urls || urls.length === 0) return null;
    return urls[0];
  };

  /* ---------- Password Handlers (manual + validity) ---------- */

  // Save manual password with computed expiry
  const savePasswordWithValidity = async () => {
    setPasswordStatus("");
    if (!manualPassword) return setPasswordStatus("⚠️ Please enter a password");
    if (!validityDays || Number(validityDays) <= 0) return setPasswordStatus("⚠️ Please enter a positive number of days");

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + Number(validityDays));
    const isoExpiry = expiryDate.toISOString();

    try {
      setPasswordStatus("⏳ Saving password...");
      const payload = {
        blogs,
        gallery: galleryImages,
        testimonials,
        materials,
        batchPassword: manualPassword,
        passwordExpiry: isoExpiry,
        lastUpdated: new Date().toISOString(),
      };

      const result = await updateDashboard(payload);

      setBatchPassword(result.batchPassword || manualPassword);
      setPasswordExpiry(result.passwordExpiry || isoExpiry);
      setManualPassword(result.batchPassword || manualPassword);
      setValidityDays("");
      setPasswordStatus(`✅ Password saved — expires on ${formatDate(result.passwordExpiry || isoExpiry)}`);
    } catch (err) {
      console.error("Failed to save password:", err);
      setPasswordStatus("❌ Failed to save password");
    }
  };

  // Generate a random password
  const generateRandomPassword = () => {
    const rand = "ACE-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setManualPassword(rand);
    setPasswordStatus("🔑 Random password generated — click Save to set it");
  };

  // Optional: remove current password (clear)
  const clearPassword = async () => {
    try {
      setPasswordStatus("⏳ Clearing password...");
      const payload = {
        blogs,
        gallery: galleryImages,
        testimonials,
        materials,
        batchPassword: "",
        passwordExpiry: "",
        lastUpdated: new Date().toISOString(),
      };
      const result = await updateDashboard(payload);
      setBatchPassword(result.batchPassword || "");
      setPasswordExpiry(result.passwordExpiry || "");
      setManualPassword("");
      setPasswordStatus("✅ Password cleared");
    } catch (err) {
      console.error("Failed to clear password:", err);
      setPasswordStatus("❌ Failed to clear password");
    }
  };

  /* ---------- BLOG HANDLERS ---------- */
  const handlePostBlog = async () => {
    if (!blogTitle.en && !blogTitle.ta) return setBlogStatus("⚠️ Title required");
    if (!blogContent.en && !blogContent.ta) return setBlogStatus("⚠️ Content required");

    try {
      setBlogStatus("⏳ Saving...");
      let imageUrl = null;

      if (imageFile) {
        setUploadStatusLabel("Uploading blog image...");
        const url = await handleFileUpload(imageFile);
        if (!url) return setBlogStatus("❌ Image upload failed");
        imageUrl = url;
      }

      const newBlog = {
        title: blogTitle,
        content: blogContent,
        image: imageUrl,
        timestamp: getScheduledTimestamp(),

      };

      const updatedBlogs = [newBlog, ...blogs];

      const payload = {
        blogs: updatedBlogs,
        gallery: galleryImages,
        testimonials,
        materials,
        batchPassword,
        passwordExpiry,
        lastUpdated: new Date().toISOString(),
      };

      const result = await updateDashboard(payload);

      setBlogs(Array.isArray(result.blogs) ? result.blogs : updatedBlogs);
      setBlogTitle({ en: "", ta: "" });
      setBlogContent({ en: "", ta: "" });
      setImageFile(null);
      setEditingIndex(null);
      setBlogStatus("✅ Blog saved!");
    } catch (err) {
      console.error(err);
      setBlogStatus("❌ Failed to save blog");
    }
  };

  const handleEditBlog = (index) => {
    const blog = blogs[index];
    if (!blog) return;
    setEditingIndex(index);
    setBlogTitle(blog.title || { en: "", ta: "" });
    setBlogContent(blog.content || { en: "", ta: "" });
    setBlogStatus("✏️ Edit mode");
  };

  const handleUpdateBlog = async () => {
    if (editingIndex === null) return setBlogStatus("⚠️ No blog selected for update");
    if (!blogTitle.en && !blogTitle.ta) return setBlogStatus("⚠️ Title required");
    if (!blogContent.en && !blogContent.ta) return setBlogStatus("⚠️ Content required");

    try {
      setBlogStatus("⏳ Updating...");
      let imageUrl = blogs[editingIndex].image || null;

      if (imageFile) {
        setUploadStatusLabel("Uploading blog image...");
        const url = await handleFileUpload(imageFile);
        if (!url) return setBlogStatus("❌ Image upload failed");
        imageUrl = url;
      }

      const updatedBlog = {
        ...blogs[editingIndex],
        title: blogTitle,
        content: blogContent,
        image: imageUrl,
        timestamp: getScheduledTimestamp(),

      };

      const updatedBlogs = blogs.map((b, i) => (i === editingIndex ? updatedBlog : b));

      const payload = {
        blogs: updatedBlogs,
        gallery: galleryImages,
        testimonials,
        materials,
        batchPassword,
        passwordExpiry,
        lastUpdated: new Date().toISOString(),
      };

      const result = await updateDashboard(payload);

      setBlogs(Array.isArray(result.blogs) ? result.blogs : updatedBlogs);
      setBlogTitle({ en: "", ta: "" });
      setBlogContent({ en: "", ta: "" });
      setImageFile(null);
      setEditingIndex(null);
      setBlogStatus("✅ Blog updated!");
    } catch (err) {
      console.error(err);
      setBlogStatus("❌ Failed to update blog");
    }
  };

  const handleDeleteBlog = async (index) => {
    try {
      const updatedBlogs = blogs.filter((_, i) => i !== index);

      const payload = {
        blogs: updatedBlogs,
        gallery: galleryImages,
        testimonials,
        materials,
        batchPassword,
        passwordExpiry,
        lastUpdated: new Date().toISOString(),
      };

      const result = await updateDashboard(payload);

      setBlogs(Array.isArray(result.blogs) ? result.blogs : updatedBlogs);
      setBlogStatus("🗑️ Blog deleted");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      setBlogStatus("❌ Failed to delete blog");
    }
  };

  /* ---------- TESTIMONIAL HANDLERS ---------- */
  const handleSaveTestimonial = async () => {
    if (!testimonialName.en || !testimonialComment.en) return setTestimonialStatus("⚠️ EN fields required");

    try {
      setTestimonialStatus("⏳ Saving...");
      const newTestimonial = { name: testimonialName, comment: testimonialComment, timestamp: new Date().toISOString() };
      const updated = testimonialEditingIndex !== null ? testimonials.map((t, i) => i === testimonialEditingIndex ? newTestimonial : t) : [newTestimonial, ...testimonials];
      const result = await updateDashboard({ blogs, gallery: galleryImages, testimonials: updated, materials, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() });
      setTestimonials(Array.isArray(result.testimonials) ? result.testimonials : updated);

      setTestimonialName({ en: "", ta: "" });
      setTestimonialComment({ en: "", ta: "" });
      setTestimonialEditingIndex(null);
      setTestimonialStatus("✅ Testimonial saved");
    } catch (err) {
      console.error("Failed to save testimonial:", err);
      setTestimonialStatus("❌ Failed to save testimonial");
    }
  };

  const handleEditTestimonial = (index) => {
    const t = testimonials[index];
    if (!t) return;
    setTestimonialEditingIndex(index);
    setTestimonialName(t.name || { en: "", ta: "" });
    setTestimonialComment(t.comment || { en: "", ta: "" });
    setTestimonialStatus("✏️ Edit mode");
  };

  const handleDeleteTestimonial = async (index) => {
    try {
      const updated = testimonials.filter((_, i) => i !== index);
      const result = await updateDashboard({ blogs, gallery: galleryImages, testimonials: updated, materials, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() });
      setTestimonials(Array.isArray(result.testimonials) ? result.testimonials : updated);
      setTestimonialStatus("🗑️ Testimonial deleted");
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
      setTestimonialStatus("❌ Failed to delete testimonial");
    }
  };

  /* ---------- MATERIAL HANDLERS ---------- */
  const handleUploadMaterial = async () => {
    if (!materialTitle.en || !selectedMaterialCategory) {
      setMaterialStatus("⚠️ Please enter title and choose category");
      return;
    }
    if (!materialFiles.length && materialEditingIndex === null) {
      setMaterialStatus("⚠️ Please select files to upload");
      return;
    }

    try {
      setMaterialStatus("⏳ Uploading files...");

      // if editing and no new files selected, only update metadata
      if (materialEditingIndex !== null && materialFiles.length === 0) {
        const updatedMaterials = materials.map((m, idx) =>
          idx === materialEditingIndex
            ? { ...m, title: materialTitle, category: selectedMaterialCategory, timestamp: new Date().toISOString() }
            : m
        );
        const payload = { blogs, gallery: galleryImages, testimonials, materials: updatedMaterials, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() };
        const result = await updateDashboard(payload);
        setMaterials(Array.isArray(result.materials) ? result.materials : updatedMaterials);
        setMaterialStatus("✅ Material metadata updated (no file changes).");
        setMaterialTitle({ en: "", ta: "" });
        setSelectedMaterialCategory("");
        setMaterialEditingIndex(null);
        return;
      }

      // Upload selected files and collect URLs
      setMaterialStatus("⏳ Uploading files to server...");
      const uploadedFiles = [];

      const urls = await uploadMultipleFiles(materialFiles);
      if (!urls) return setMaterialStatus("❌ One or more file uploads failed. Aborting.");

      // create file objects with url + name
      for (let i = 0; i < urls.length; i++) {
        uploadedFiles.push({ url: urls[i], name: materialFiles[i]?.name || `file-${i}` });
      }

      const newMaterial = { title: materialTitle, files: uploadedFiles, category: selectedMaterialCategory, timestamp: new Date().toISOString() };
      const updatedMaterials = materialEditingIndex !== null ? materials.map((m, idx) => idx === materialEditingIndex ? newMaterial : m) : [newMaterial, ...materials];
      const payload = { blogs, gallery: galleryImages, testimonials, materials: updatedMaterials, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() };
      const result = await updateDashboard(payload);
      setMaterials(Array.isArray(result.materials) ? result.materials : updatedMaterials);

      setMaterialTitle({ en: "", ta: "" });
      setMaterialFiles([]);
      setSelectedMaterialCategory("");
      setMaterialEditingIndex(null);
      setMaterialStatus("✅ Materials uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload materials:", err);
      setMaterialStatus("❌ Failed to upload materials. Try again.");
    }
  };

  const handleEditMaterial = (globalIndex) => {
    const material = materials[globalIndex];
    if (!material) return;
    setMaterialEditingIndex(globalIndex);
    setMaterialTitle(material.title || { en: "", ta: "" });
    setSelectedMaterialCategory(material.category || "");
    setMaterialFiles([]);
    setMaterialStatus("✏️ Edit mode enabled — upload new files to replace folder contents");
  };

  const handleDeleteMaterial = async (globalIndex) => {
    try {
      const updated = materials.filter((_, i) => i !== globalIndex);
      const payload = { blogs, gallery: galleryImages, testimonials, materials: updated, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() };
      const result = await updateDashboard(payload);
      setMaterials(Array.isArray(result.materials) ? result.materials : updated);
      setMaterialStatus("🗑️ Folder deleted successfully");
    } catch (err) {
      console.error("Failed to delete material", err);
      setMaterialStatus("❌ Failed to delete material");
    }
  };

  /* ---------- GALLERY HANDLERS ---------- */
  const handleUploadGalleryImage = async () => {
  if (!galleryImageFiles.length && galleryEditingIndex === null) return setGalleryStatus("⚠️ Please select image(s) to upload");

  if (!selectedCategory) return setGalleryStatus("⚠️ Please select a category");

  try {
    setGalleryStatus("⏳ Uploading image(s)...");
    const uploadedImages = [];

    const urls = await uploadMultipleFiles(galleryImageFiles);
    if (!urls) return setGalleryStatus("❌ Upload failed");

    for (let i = 0; i < urls.length; i++) {
      uploadedImages.push({ url: urls[i], category: selectedCategory, timestamp: new Date().toISOString() });
    }

    let updatedGallery = [...galleryImages];
    if (galleryEditingIndex !== null) updatedGallery[galleryEditingIndex] = uploadedImages[0];
    else updatedGallery = [...uploadedImages, ...updatedGallery];

    const payload = { blogs, gallery: updatedGallery, testimonials, materials, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() };
    const result = await updateDashboard(payload);
    setGalleryImages(Array.isArray(result.gallery) ? result.gallery : updatedGallery);

    setGalleryImageFiles([]);
    setSelectedCategory("");
    setManualCategory(""); // clear manual input
    setGalleryEditingIndex(null);
    setGalleryStatus("✅ Gallery updated successfully!");
  } catch (err) {
    console.error("Failed to upload gallery image(s):", err);
    setGalleryStatus("❌ Failed to upload image(s). Try again.");
  }
};


  const handleEditGalleryImage = (globalIndex) => {
    const img = galleryImages[globalIndex];
    if (!img) return;
    setSelectedCategory(img.category || "");
    setGalleryEditingIndex(globalIndex);
    setGalleryStatus("✏️ Editing mode");
  };

  const handleDeleteGalleryImage = async (globalIndex) => {
    try {
      const updated = galleryImages.filter((_, i) => i !== globalIndex);
      const payload = { blogs, gallery: updated, testimonials, materials, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() };
      const result = await updateDashboard(payload);
      setGalleryImages(Array.isArray(result.gallery) ? result.gallery : updated);
      setGalleryStatus("🗑️ Image deleted");
    } catch (err) {
      console.error("Failed to delete gallery image:", err);
      setGalleryStatus("❌ Failed to delete image");
    }
  };

const handleUploadBrochure = async () => {
  if (!brochureTitle.en && !brochureTitle.ta) return setBrochureStatus("⚠️ Title required");
  if (!brochureContent.en && !brochureContent.ta) return setBrochureStatus("⚠️ Content required");
  if (!brochureFile && brochureEditingIndex === null) return setBrochureStatus("⚠️ Please select a file");

  try {
    setBrochureStatus("⏳ Uploading...");

    let fileUrl = null;
    if (brochureFile) {
      const urls = await uploadMultipleFiles([brochureFile]);
      if (!urls || !urls[0]) return setBrochureStatus("❌ File upload failed");
      fileUrl = urls[0];
    }

    const newBrochure = {
      title: brochureTitle,
      content: brochureContent,
      file: brochureFile ? { url: fileUrl, name: brochureFile.name } : brochures[brochureEditingIndex]?.file,
      timestamp: new Date().toISOString(),
    };

    const updatedBrochures = brochureEditingIndex !== null
      ? brochures.map((b, i) => i === brochureEditingIndex ? newBrochure : b)
      : [newBrochure, ...brochures];

    const payload = { blogs, gallery: galleryImages, testimonials, materials, brochures: updatedBrochures, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() };
    const result = await updateDashboard(payload);

    setBrochures(result.brochures || updatedBrochures);
    setBrochureTitle({ en: "", ta: "" });
    setBrochureContent({ en: "", ta: "" });
    setBrochureFile(null);
    setBrochureEditingIndex(null);
    setBrochureStatus("✅ Brochure uploaded successfully!");
  } catch (err) {
    console.error(err);
    setBrochureStatus("❌ Failed to upload brochure");
  }
};

const handleEditBrochure = (index) => {
  const b = brochures[index];
  if (!b) return;
  setBrochureEditingIndex(index);
  setBrochureTitle(b.title);
  setBrochureContent(b.content);
  setBrochureFile(null); // new file can replace old
  setBrochureStatus("✏️ Edit mode");
};

const handleDeleteBrochure = async (index) => {
  try {
    const updated = brochures.filter((_, i) => i !== index);
    const payload = { blogs, gallery: galleryImages, testimonials, materials, brochures: updated, batchPassword, passwordExpiry, lastUpdated: new Date().toISOString() };
    const result = await updateDashboard(payload);
    setBrochures(result.brochures || updated);
    setBrochureStatus("🗑️ Brochure deleted");
  } catch (err) {
    console.error(err);
    setBrochureStatus("❌ Failed to delete brochure");
  }
};

  /* ---------- RENDER ---------- */

  // helper for human-friendly ETA
  const formatETA = (sec) => {
    if (sec === null || sec === undefined) return "—";
    if (sec <= 0) return "0s";
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href = "/"; }}>
            {t("dashboard.logout") || "Logout"}
          </button>
        </div>
      </div>

      {/* UPLOAD PROGRESS BOX */}
      {uploading && (
        <div className="upload-progress-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <strong>{uploadStatusLabel || "Uploading..."}</strong>
              <div style={{ fontSize: 13, marginTop: 6 }}>
                {totalFilesToUpload > 0 && <span>File {currentFileIndex}/{totalFilesToUpload} • </span>}
                <span>{uploadProgress}%</span>
                {uploadSpeedKb > 0 && <span> • {uploadSpeedKb.toFixed(1)} KB/s</span>}
                {timeRemainingSec !== null && <span> • ETA: {formatETA(timeRemainingSec)}</span>}
              </div>
            </div>
            <div>
              <button style={{ padding: "6px 10px" }} onClick={() => {
                // cancel behavior: quick reset UI only (we do not implement axios cancel tokens across all requests here)
                setUploading(false);
                setUploadProgress(0);
                setUploadSpeedKb(0);
                setTimeRemainingSec(null);
                setUploadStatusLabel("Upload canceled by user");
              }}>Cancel</button>
            </div>
          </div>

          <div className="progress-bar" style={{ marginTop: 10 }}>
            <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}

      {/* Password Section */}
      <hr />
      <h3>Course Material Access Password</h3>

      <div style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>Current Password:</strong>{" "}
          <span>{batchPassword ? batchPassword : <em>No password set</em>}</span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Expiry:</strong>{" "}
          <span>{passwordExpiry ? formatDate(passwordExpiry) : <em>Not set</em>}</span>
          {passwordExpiry && (
            <span style={{ marginLeft: 10, color: daysRemaining(passwordExpiry) <= 3 ? "crimson" : "inherit" }}>
              ({daysRemaining(passwordExpiry)} day{daysRemaining(passwordExpiry) === 1 ? "" : "s"} remaining)
            </span>
          )}
        </div>

        {/* Manual password input */}
        <input
          type="text"
          placeholder="Enter password manually"
          value={manualPassword}
          onChange={(e) => setManualPassword(e.target.value)}
          style={{ width: "60%", padding: "8px", marginRight: 8 }}
        />

        {/* Validity in days */}
        <input
          type="number"
          placeholder="Validity (days)"
          value={validityDays}
          onChange={(e) => setValidityDays(e.target.value)}
          style={{ width: "20%", padding: "8px", marginRight: 8 }}
          min={1}
        />

        <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
          <button
            className="btn btn-success"
            onClick={savePasswordWithValidity}
            style={{ padding: "8px 12px" }}
          >
            Save Password
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={generateRandomPassword}
            style={{ padding: "8px 12px" }}
          >
            Generate Random Password
          </button>

          <button
            className="btn btn-danger"
            onClick={clearPassword}
            style={{ padding: "8px 12px" }}
          >
            Clear Password
          </button>
        </div>

        {passwordStatus && <p style={{ marginTop: 8 }}>{passwordStatus}</p>}
      </div>

      {/* BLOG Section */}
      <hr />
      <h3>{t("dashboard.postBlog") || "Post Blog"}</h3>
      <input type="text" placeholder="Title (EN)" value={blogTitle.en} onChange={(e) => setBlogTitle({...blogTitle, en: e.target.value})} />
      <input type="text" placeholder="Title (TA)" value={blogTitle.ta} onChange={(e) => setBlogTitle({...blogTitle, ta: e.target.value})} />
      <textarea placeholder="Content (EN)" value={blogContent.en} onChange={(e) => setBlogContent({...blogContent, en: e.target.value})} />
      <textarea placeholder="Content (TA)" value={blogContent.ta} onChange={(e) => setBlogContent({...blogContent, ta: e.target.value})} />
        <div style={{ marginTop: 8 }}>
  <label>
    Schedule Date (optional):
    <input 
      type="date" 
      value={scheduledDate} 
      onChange={(e) => setScheduledDate(e.target.value)} 
      style={{ marginLeft: 6 }}
    />
  </label>
  <label style={{ marginLeft: 12 }}>
    Schedule Time (optional):
    <input 
      type="time" 
      value={scheduledTime} 
      onChange={(e) => setScheduledTime(e.target.value)} 
      style={{ marginLeft: 6 }}
    />
  </label>
</div>
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
      <button onClick={editingIndex !== null ? handleUpdateBlog : handlePostBlog}>
        {editingIndex !== null ? "Update Blog" : "Post Blog"}
      </button>

      <p>{blogStatus}</p>

      {blogs.map((b, i) => (
        <div key={b.timestamp || i} style={{ borderBottom: "1px solid #eee", padding: "8px 0" }}>
          <h4>{b.title?.[lang] || b.title?.en}</h4>
          <p>{b.content?.[lang] || b.content?.en}</p>
          {b.image && <img src={b.image} alt="blog" width="200" />}
          <div>
            <button onClick={() => handleEditBlog(i)}>Edit</button>
            <button onClick={() => handleDeleteBlog(i)}>Delete</button>
          </div>
        </div>
      ))}

      {/* GALLERY */}
<hr />
<h3>{t("dashboard.gallery") || "Gallery"}</h3>

{/* Select category or enter new */}
<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="">{t("dashboard.chooseCategory") || "Choose Category"}</option>
  {(manualCategory
    ? [{ key: manualCategory, en: manualCategory, ta: manualCategory }, ...CATEGORY_OPTIONS]
    : CATEGORY_OPTIONS
  ).map((c) => (
    <option key={c.key} value={c.key}>
      {c?.[lang] || c?.en}
    </option>
  ))}
</select>

{/* Input for manual category */}
<input
  type="text"
  placeholder="Or create new category"
  value={manualCategory}
  onChange={(e) => setManualCategory(e.target.value)}
  style={{ marginTop: 6, width: "60%", padding: 6 }}
/>

{/* Image file input */}
<input
  type="file"
  multiple
  onChange={(e) => setGalleryImageFiles(Array.from(e.target.files))}
/>

{/* Upload / Update button */}
<button onClick={handleUploadGalleryImage}>
  {galleryEditingIndex !== null ? "Update Image" : "Upload Image"}
</button>

<p>{galleryStatus}</p>


      <div className="gallery-section">
        {CATEGORY_OPTIONS.map((category) => {
          const imagesInCategory = (galleryImages || []).filter(
            (g) => g.category === category.key
          );
          if (imagesInCategory.length === 0) return null;

          const showMore = expandedCategories[category.key] || false;
          const imagesToShow = showMore ? imagesInCategory : imagesInCategory.slice(0, 4);

          return (
            <div key={category.key} className="gallery-category">
              <h4>{category?.[lang] || category?.en}</h4>

              <div className="gallery-row">
                {imagesToShow.map((g) => {
                  const globalIndex = galleryImages.findIndex(
                    (img) => img.url === g.url && img.timestamp === g.timestamp
                  );
                  return (
                    <div key={g.url + (g.timestamp || "")} className="gallery-item">
                      <img src={g.url} alt={g.category} />
                      <div>
                        <button onClick={() => handleEditGalleryImage(globalIndex)}>Edit</button>
                        <button onClick={() => handleDeleteGalleryImage(globalIndex)}>Delete</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {imagesInCategory.length > 4 && (
                <button
                  className="show-toggle"
                  onClick={() =>
                    setExpandedCategories((prev) => ({
                      ...prev,
                      [category.key]: !showMore,
                    }))
                  }
                >
                  {showMore ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* TESTIMONIALS */}
      <hr />
      <h3>{t("dashboard.testimonials") || "Testimonials"}</h3>
      <input
        type="text"
        placeholder="Name (EN)"
        value={testimonialName.en}
        onChange={(e) =>
          setTestimonialName({ ...testimonialName, en: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Name (TA)"
        value={testimonialName.ta}
        onChange={(e) =>
          setTestimonialName({ ...testimonialName, ta: e.target.value })
        }
      />
      <textarea
        placeholder="Comment (EN)"
        value={testimonialComment.en}
        onChange={(e) =>
          setTestimonialComment({ ...testimonialComment, en: e.target.value })
        }
      />
      <textarea
        placeholder="Comment (TA)"
        value={testimonialComment.ta}
        onChange={(e) =>
          setTestimonialComment({ ...testimonialComment, ta: e.target.value })
        }
      />
      <button onClick={handleSaveTestimonial}>
        {testimonialEditingIndex !== null ? "Update Testimonial" : "Upload Testimonial"}
      </button>
      <p>{testimonialStatus}</p>

      {(testimonials || []).map((tst, i) => (
        <div key={tst.timestamp || i} style={{ borderBottom: "1px solid #eee", padding: "6px 0" }}>
          <strong>{tst.name?.[lang] || tst.name?.en}</strong>
          <p>{tst.comment?.[lang] || tst.comment?.en}</p>
          <button onClick={() => handleEditTestimonial(i)}>Edit</button>{" "}
          <button onClick={() => handleDeleteTestimonial(i)}>Delete</button>
        </div>
      ))}

      {/* ---------- COURSE MATERIALS ---------- */}
<hr />
<h3>{t("dashboard.courseMaterials") || "Course Materials"}</h3>

{/* Select category */}
<select
  value={selectedMaterialCategory}
  onChange={(e) => setSelectedMaterialCategory(e.target.value)}
>
  <option value="">{t("dashboard.chooseCategory") || "Choose Category"}</option>
  {MATERIAL_CATEGORIES.map((c) => (
    <option key={c.key} value={c.key}>
      {c?.[lang] || c.en}
    </option>
  ))}
</select>

{/* Material title */}
<input
  type="text"
  placeholder="Material Title (EN)"
  value={materialTitle.en}
  onChange={(e) => setMaterialTitle({ ...materialTitle, en: e.target.value })}
/>
<input
  type="text"
  placeholder="Material Title (TA)"
  value={materialTitle.ta}
  onChange={(e) => setMaterialTitle({ ...materialTitle, ta: e.target.value })}
/>

{/* Single file input */}
<input
  type="file"
  accept=".pdf,.mp3,.mp4,.docx,.jpg,.png" // adjust types as needed
  onChange={(e) => setMaterialFiles(e.target.files[0] ? [e.target.files[0]] : [])}
/>

{/* Upload / Update button */}
<button onClick={handleUploadMaterial}>
  {materialEditingIndex !== null ? "Update Material" : "Upload Material"}
</button>
<p>{materialStatus}</p>

{/* Display materials with Show More / Less */}
<div className="materials-section">
  {MATERIAL_CATEGORIES.map((cat) => {
    const items = (materials || []).filter((m) => m.category === cat.key);
    if (!items.length) return null;

    const showMore = expandedMaterialCategories[cat.key] || false;
    const itemsToShow = showMore ? items : items.slice(0, 4);

    return (
      <div key={cat.key} className="material-category">
        <h4>{cat?.[lang] || cat.en}</h4>

        {itemsToShow.map((m) => {
          const globalIndex = materials.findIndex(
            (mat) => mat.timestamp === m.timestamp && (mat.title?.en === m.title?.en)
          );
          const file = m.files?.[0]; // single file per material
          return (
            <div key={m.timestamp || (m.title?.en + Math.random())} className="material-folder">
              <strong>{m.title?.[lang] || m.title?.en}</strong>
              {file ? (
                <div style={{ marginTop: 4 }}>
                  <a href={file.url} target="_blank" rel="noreferrer">
                    {file.name || "Download File"}
                  </a>
                </div>
              ) : (
                <p>❌ No file</p>
              )}
              <div style={{ marginTop: 4 }}>
                <button onClick={() => handleEditMaterial(globalIndex)}>Edit</button>{" "}
                <button onClick={() => handleDeleteMaterial(globalIndex)}>Delete</button>
              </div>
            </div>
          );
        })}

        {items.length > 4 && (
          <button
            className="show-toggle"
            onClick={() =>
              setExpandedMaterialCategories((prev) => ({
                ...prev,
                [cat.key]: !showMore,
              }))
            }
            style={{ marginTop: 6 }}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    );
  })}
</div>

<hr />
<h3>Brochures</h3>
<input type="text" placeholder="Title (EN)" value={brochureTitle.en} onChange={(e) => setBrochureTitle({...brochureTitle, en: e.target.value})} />
<input type="text" placeholder="Title (TA)" value={brochureTitle.ta} onChange={(e) => setBrochureTitle({...brochureTitle, ta: e.target.value})} />
<textarea placeholder="Content (EN)" value={brochureContent.en} onChange={(e) => setBrochureContent({...brochureContent, en: e.target.value})} />
<textarea placeholder="Content (TA)" value={brochureContent.ta} onChange={(e) => setBrochureContent({...brochureContent, ta: e.target.value})} />
<input type="file" accept="application/pdf" onChange={(e) => setBrochureFile(e.target.files[0])} />
<button onClick={brochureEditingIndex !== null ? handleUploadBrochure : handleUploadBrochure}>
  {brochureEditingIndex !== null ? "Update Brochure" : "Upload Brochure"}
</button>
<p>{brochureStatus}</p>

{brochures.map((b, i) => (
  <div key={b.timestamp || i} style={{ borderBottom: "1px solid #eee", padding: "6px 0" }}>
    <h4>{b.title?.[lang] || b.title?.en}</h4>
    <p>{b.content?.[lang] || b.content?.en}</p>
    {b.file && (
      <a href={b.file.url} target="_blank" rel="noreferrer">{b.file.name || "Download PDF"}</a>
    )}
    <div>
      <button onClick={() => handleEditBrochure(i)}>Edit</button>
      <button onClick={() => handleDeleteBrochure(i)}>Delete</button>
    </div>
  </div>
))}


    </div>
  );
};

export default Dashboard;
