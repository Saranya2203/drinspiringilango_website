import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "./AcePanacea.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const AcePanacea = () => {
  const { t } = useTranslation();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="ace-container">
      {/* Logo */}
      <div className="ace-logo">
        <img src="/assets/Ace_Logo.png" alt="Ace Panacea Logo" className="logo-img" />
      </div>

      {/* Banner Slider */}
      <div className="ace-banner-slider">
  <Slider {...sliderSettings}>
    <div><img src="/assets/Ace_banner1.jpg" alt="Banner 1" className="banner-img" /></div>
    <div><img src="/assets/Ace_banner2.png" alt="Banner 2" className="banner-img" /></div>
    <div><img src="/assets/Ace_banner3.jpg" alt="Banner 3" className="banner-img" /></div>
  </Slider>
</div>
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
          {t("ace.recommendation.steps", { returnObjects: true }).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
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
            {t("ace.contact.email1.label")} <a href="mailto:admin09@acea2z.com">admin09@acea2z.com</a>
          </li>
          <li>
            {t("ace.contact.email2.label")} <a href="mailto:inspiringilango@inspiringilango.com">inspiringilango@inspiringilango.com</a>
          </li>
          <li>
            <a href="https://www.inspiringilango.com" target="_blank" rel="noopener noreferrer">
              www.inspiringilango.com
            </a>
          </li>
          <li>
            <a href="https://www.acea2z.com" target="_blank" rel="noopener noreferrer">
              www.acea2z.com
            </a>
          </li>
          <li>
            <a href="https://www.viif.in" target="_blank" rel="noopener noreferrer">
              www.viif.in
            </a>
          </li>
          <li>{t("ace.contact.address")}</li>
        </ul>
      </section>
    </div>
  );
};

export default AcePanacea;
