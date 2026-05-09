import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Modal from "react-modal";
import axios from "axios";
import "./AcePanacea.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const AcePanacea = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [activePassword, setActivePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Fetch the current password from your Dashboard API
  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dashboard`);
        const data = res.data;
        setActivePassword(data.batchPassword || "");
      } catch (err) {
        console.error("Failed to fetch password from Dashboard:", err);
      }
    };
    fetchPassword();
  }, []);

  const handleLoginClick = () => setModalOpen(true);

  const handlePasswordSubmit = () => {
    if (password.trim() === activePassword.trim()) {
      setModalOpen(false);
      setPassword("");
      navigate("/user-access");
    } else {
      alert("Invalid password. Please try again.");
    }
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_xxxxxx", // Replace with Razorpay key
      amount: 59900, // ₹599
      currency: "INR",
      name: "Ace Panacea",
      description: "Course Materials Access",
      handler: function () {
        alert("Payment Successful!");
        setModalOpen(false);
        navigate("/user-access");
      },
      prefill: {
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="ace-container">
      {/* Logo */}
      <div className="ace-logo">
        <img
          src="/assets/Ace_Logo.png"
          alt="Ace Panacea Logo"
          className="logo-img"
        />
      </div>

      {/* Course Section */}
      <section className="ace-course-box">
        <h2 className="course-title">
          {t("ace.courseMaterials.title", "Course Materials")}
        </h2>
        <p className="course-subtitle">
          {t("ace.courseMaterials.subtitle", "Audios, Videos, Books")}
        </p>
        <button
          type="button"
          className="login-btn"
          onClick={handleLoginClick}
        >
          {t("ace.courseMaterials.login", "Login")}
        </button>
      </section>

      {/* Banner Slider */}
      {/* Banner Slider */}
<div className="ace-banner-slider">
  <Slider
    dots
    infinite
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay
    autoplaySpeed={4000}
    arrows={false}
  >
    <div>
      <a
        href="https://acea2z.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/Ace_banner1.jpg"
          alt="Banner 1"
          className="banner-img"
          style={{ cursor: "pointer" }}
        />
      </a>
    </div>

    <div>
      <a
        href="https://acea2z.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/Ace_banner2.png"
          alt="Banner 2"
          className="banner-img"
          style={{ cursor: "pointer" }}
        />
      </a>
    </div>

    <div>
      <a
        href="https://acea2z.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/Ace_banner3.jpg"
          alt="Banner 3"
          className="banner-img"
          style={{ cursor: "pointer" }}
        />
      </a>
    </div>
  </Slider>
</div>


      {/* Intro & Other Sections */}
      <h1 className="ace-title">{t("ace.title")}</h1>
      <p className="ace-subtitle">{t("ace.tagline")}</p>

      <section className="ace-section">
        <h2>{t("ace.intro.heading")}</h2>
        <p>{t("ace.intro.description1")}</p>
        <p>{t("ace.intro.description2")}</p>
        <p>{t("ace.intro.description3")}</p>
      </section>

      <section className="ace-section">
        <h2>{t("ace.vision.title")}</h2>
        <p>{t("ace.vision.text")}</p>
        <h2>{t("ace.mission.title")}</h2>
        <p>{t("ace.mission.text")}</p>
      </section>

      <section className="ace-section">
        <h2>{t("ace.about.title")}</h2>
        <p>{t("ace.about.description1")}</p>
        <p>{t("ace.about.description2")}</p>
        <p>{t("ace.about.description3")}</p>
      </section>

      <section className="ace-section ace-leadership">
        <h2>{t("ace.leadership.title")}</h2>
        <h3>{t("ace.leadership.founder.name")}</h3>
        <p>{t("ace.leadership.founder.bio")}</p>
        <h3>{t("ace.leadership.executive.name")}</h3>
        <p>{t("ace.leadership.executive.bio")}</p>
      </section>

      <section className="ace-section">
        <h2>{t("ace.services.title")}</h2>
        {Array.from({ length: 7 }).map((_, index) => (
          <div className="ace-service-item" key={index}>
            <h3>{t(`ace.services.list.${index + 1}.title`)}</h3>
            <p>{t(`ace.services.list.${index + 1}.description`)}</p>
          </div>
        ))}
      </section>

      <section className="ace-section">
        <h2>{t("ace.additional.title")}</h2>
        <ul>
          {t("ace.additional.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="ace-section">
        <h2>{t("ace.custom.title")}</h2>
        <p>{t("ace.custom.description")}</p>
      </section>

      <section className="ace-section">
        <h2>{t("ace.recommendation.title")}</h2>
        <ul>
          {t("ace.recommendation.steps", { returnObjects: true }).map(
            (step, i) => (
              <li key={i}>{step}</li>
            )
          )}
        </ul>
      </section>

      <section className="ace-section">
        <h2>{t("ace.invite.title")}</h2>
        <ul>
          {t("ace.invite.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="ace-section ace-contact">
        <h2>{t("ace.contact.title")}</h2>
        <ul>
          <li>{t("ace.contact.landline")}</li>
          <li>{t("ace.contact.mobile")}</li>
          <li>
            {t("ace.contact.email1.label")}{" "}
            <a href="mailto:admin09@acea2z.com">admin09@acea2z.com</a>
          </li>
          <li>
            {t("ace.contact.email2.label")}{" "}
            <a href="mailto:inspiringilango@inspiringilango.com">
              inspiringilango@inspiringilango.com
            </a>
          </li>
          {/* <li>
            <a
              href="https://www.inspiringilango.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.inspiringilango.com
            </a>
          </li> */}
          {/* <li>
            <a
              href="https://www.acea2z.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.acea2z.com
            </a>
          </li> */}
          {/* <li>
            <a
              href="https://www.viif.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.viif.in
            </a>
          </li> */}
          <li>{t("ace.contact.address")}</li>
        </ul>
      </section>

      {/* Modal for Password / Payment */}
      {/* Modal for Password / Payment */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
      >
        <h3>Secure Access</h3>
        <p>Enter password if you already have access, or make a one-time payment.</p>

        <input
  type={showPassword ? "text" : "password"}
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<div style={{ marginTop: "6px", display: "flex", alignItems: "center" }}>
  <input
    type="checkbox"
    id="showCoursePassword"
    checked={showPassword}
    onChange={() => setShowPassword(!showPassword)}
    style={{ marginRight: "6px" }}
  />
  <label
    htmlFor="showCoursePassword"
    style={{ fontSize: "14px", cursor: "pointer" }}
  >
    Show Password
  </label>
</div>

<button onClick={handlePasswordSubmit}>Submit</button>


        <hr />

        <button onClick={handlePayment}>
          Pay ₹599 with Google Pay / UPI / Card
        </button>
      </Modal>
    </div>
  );
};

export default AcePanacea;
