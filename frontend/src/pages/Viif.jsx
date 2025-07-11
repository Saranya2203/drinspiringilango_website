import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "./VIIF.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VIIF = () => {
  const { t } = useTranslation();

  const initiatives = t("viif.initiatives.list", { returnObjects: true });
  const accounts = t("viif.donation.accounts", { returnObjects: true });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  const sliderContents = [
    "Vision Inspiring Ilango Foundation empowers rural youth through leadership and life skills.",
    "Our mission is to create self-reliant and socially responsible individuals.",
    "Join us in building a better tomorrow through education, innovation, and compassion.",
  ];

  return (
    <div className="viif-container">
      {/* Logo */}
      <div className="viif-logo">
        <img src="/assets/viif_logo.png" alt="VIIF Logo" className="viif-logo-img" />
      </div>

      {/* Text Slider */}
      <div className="viif-text-slider">
        <Slider {...sliderSettings}>
          {sliderContents.map((text, index) => (
            <div key={index} className="text-slide">
              <p>{text}</p>
            </div>
          ))}
        </Slider>
      </div>

      <section className="viif-header">
        <h1>{t("viif.title")}</h1>
        <h2>{t("viif.subtitle1")}</h2>
        <h3>{t("viif.subtitle2")}</h3>
      </section>

      <section className="viif-about">
        <h2>{t("viif.about.heading")}</h2>
        <p>{t("viif.about.description")}</p>
      </section>

      <section className="viif-vision-mission">
        <div>
          <h2>{t("viif.vision.heading")}</h2>
          <p>{t("viif.vision.text")}</p>
        </div>
        <div>
          <h2>{t("viif.mission.heading")}</h2>
          <p>{t("viif.mission.text")}</p>
        </div>
      </section>

      <section className="viif-why-now">
        <h2>{t("viif.why_now.heading")}</h2>
        <ul>
          <li>{t("viif.why_now.global")}</li>
          <li>{t("viif.why_now.india")}</li>
          <li>{t("viif.why_now.economic")}</li>
        </ul>
      </section>

      <section className="viif-shortage">
        <h2>{t("viif.shortage.heading")}</h2>
        <p>{t("viif.shortage.text")}</p>
      </section>

      <section className="viif-initiatives">
        <h2>{t("viif.initiatives.heading")}</h2>
        <ul>
          {initiatives.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="viif-founders">
        <h2>{t("viif.founders.heading")}</h2>
        <div className="founder-card">
          <h3>{t("viif.founders.ilango.name")}</h3>
          <p><strong>{t("viif.founders.ilango.role")}</strong></p>
          <p>{t("viif.founders.ilango.bio")}</p>
        </div>
        <div className="founder-card">
          <h3>{t("viif.founders.srilatha.name")}</h3>
          <p><strong>{t("viif.founders.srilatha.role")}</strong></p>
          <p>{t("viif.founders.srilatha.bio")}</p>
        </div>
      </section>

      <section className="viif-donation">
        <h2>{t("viif.donation.heading")}</h2>
        <p>{t("viif.donation.text")}</p>
        {accounts.map((acc, index) => (
          <div key={index} className="bank-card">
            <p><strong>{acc.bank}</strong></p>
            <p>{t("viif.donation.account_name") || acc.account_name}</p>
            <p>{t("viif.donation.account_no_label") || "Account No"}: {acc.account_no}</p>
            <p>IFSC: {acc.ifsc}</p>
            <p>{t("viif.donation.branch_label") || "Branch"}: {acc.branch}</p>
            <p>SWIFT: {acc.swift}</p>
          </div>
        ))}
      </section>

      <section className="viif-contacts">
        <h2>{t("viif.contacts.heading")}</h2>
        <p>📞 {t("viif.contacts.phone1")}</p>
        <p>📞 {t("viif.contacts.phone2")}</p>
        <p>📧 {t("viif.contacts.email")}</p>
        <p>📍 {t("viif.contacts.address")}</p>
      </section>

      <section className="viif-cta">
        <h3>{t("viif.call_to_action")}</h3>
      </section>
    </div>
  );
};

export default VIIF;
