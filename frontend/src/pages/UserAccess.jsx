import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./UserAccess.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const MATERIAL_CATEGORIES = [
  { key: "audios", en: "Audios", ta: "ஆடியோக்கள்" },
  { key: "videos", en: "Videos", ta: "வீடியோக்கள்" },
  { key: "exam_papers", en: "Competitive Exam Papers", ta: "போட்டி தேர்வு கேள்வித்தாள்கள்" },
  { key: "books", en: "Course Books", ta: "பாடநூல்கள்" },
  { key: "english_refs", en: "English Reference Materials", ta: "ஆங்கில குறிப்புப் பொருட்கள்" },
];

const UserAccess = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n?.language?.split("-")[0] || "en";

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMaterialCategories, setExpandedMaterialCategories] = useState({});
  const [activeMaterialFolder, setActiveMaterialFolder] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dashboard`, { timeout: 30000 });
        const data = res.data?.materials || [];
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMaterials(sorted);
      } catch (err) {
        console.error("❌ Failed to fetch materials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  if (loading) return <p>Loading materials...</p>;
  if (!materials.length) return <p>No course materials available.</p>;

  const preventDownload = (e) => e.preventDefault();

  // Universal Material Viewer
  const MaterialViewer = ({ file }) => {
    if (!file?.url) return null;
    const fileUrl = file.url;
    const ext = fileUrl.split(".").pop().toLowerCase();
    const iframeStyle = { width: "100%", height: "80vh", border: "none" };

    // PDFs: always open link
    if (ext === "pdf") {
      return (
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <p>📄 <strong>{file.name}</strong></p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Open / Download PDF
          </a>
        </div>
      );
    }

    // Office files
    if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext)) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
          title={file.name}
          style={iframeStyle}
          onContextMenu={preventDownload}
        />
      );
    }

    // Video
    if (["mp4", "webm", "ogg", "mov"].includes(ext)) {
      return <video src={fileUrl} controls style={{ width: "100%", maxHeight: "80vh" }} />;
    }

    // Audio
    if (["mp3", "wav", "ogg", "m4a"].includes(ext)) {
      return <audio src={fileUrl} controls style={{ width: "100%" }} />;
    }

    // Images
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
      return <img src={fileUrl} alt={file.name} style={{ maxWidth: "100%", display: "block", margin: "0 auto" }} />;
    }

    // Text / CSV / JSON / HTML
    if (["txt", "csv", "json", "html"].includes(ext)) {
      return (
        <iframe
          src={fileUrl}
          title={file.name}
          style={iframeStyle}
          onContextMenu={preventDownload}
        />
      );
    }

    // Fallback
    return (
      <div style={{ textAlign: "center" }}>
        <p>Preview not available for this file type.</p>
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          Open / Download File
        </a>
      </div>
    );
  };

  return (
    <div className="user-access">
      <h1>{t("ace.courseMaterials.title", "Course Materials")}</h1>

      <div className="materials-section">
        {MATERIAL_CATEGORIES.map((cat) => {
          const items = materials.filter((m) => m.category === cat.key);
          if (!items.length) return null;

          const showMore = expandedMaterialCategories[cat.key] || false;
          const itemsToShow = showMore ? items : items.slice(0, 4);

          return (
            <div key={cat.key} className="material-category">
              <h2>{cat?.[lang] || cat.en}</h2>
              <ul>
                {itemsToShow.map((folder, i) => (
                  <li key={i} style={{ marginBottom: "15px" }}>
                    <button
                      className="material-link"
                      onClick={() => setActiveMaterialFolder(folder)}
                    >
                      {folder.title?.[lang] || folder.title?.en} ({folder.files.length} files)
                    </button>{" "}
                    <small>({new Date(folder.timestamp).toLocaleString()})</small>
                  </li>
                ))}
              </ul>

              {items.length > 4 && (
                <button
                  className="show-toggle"
                  onClick={() =>
                    setExpandedMaterialCategories((prev) => ({
                      ...prev,
                      [cat.key]: !showMore,
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

      {/* Folder Viewer Modal */}
      {activeMaterialFolder && (
        <div
          className="viewer-modal"
          onClick={() => setActiveMaterialFolder(null)}
          onContextMenu={preventDownload}
        >
          <div className="viewer-content" onClick={(e) => e.stopPropagation()}>
            <h3>{activeMaterialFolder.title?.[lang] || activeMaterialFolder.title?.en}</h3>
            <p>Total Files: {activeMaterialFolder.files.length}</p>
            <div className="folder-files">
              {activeMaterialFolder.files.map((file, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <strong>{file.name}</strong>
                  <MaterialViewer file={file} />
                </div>
              ))}
            </div>
            <button
              className="close-btn"
              onClick={() => setActiveMaterialFolder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccess;
