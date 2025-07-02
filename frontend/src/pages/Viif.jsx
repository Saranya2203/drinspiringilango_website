import React from 'react';
import { useTranslation } from 'react-i18next';
import './VIIF.css';

const VIIF = () => {
  const { t } = useTranslation();

  return (
    <div className="viif-container">
      <section className="intro">
        <h1>{t('viif.heading1')}</h1>
        <h2>{t('viif.heading2')}</h2>
        <h3>{t('viif.heading3')}</h3>
      </section>

      <section className="about">
        <h2>{t('viif.aboutTitle')}</h2>
        <p>{t('viif.aboutDescription')}</p>
      </section>

      <section className="vision-mission">
        <h2>{t('viif.visionTitle')}</h2>
        <p>{t('viif.visionDescription')}</p>

        <h2>{t('viif.missionTitle')}</h2>
        <p>{t('viif.missionDescription')}</p>
      </section>

      <section className="why-now">
        <h2>{t('viif.whyNowTitle')}</h2>
        <p>{t('viif.globalStats')}</p>
        <p>{t('viif.indiaStats')}</p>
        <p>{t('viif.economicToll')}</p>
        <p>{t('viif.professionalShortage')}</p>
      </section>

      <section className="initiatives">
        <h2>{t('viif.initiativesTitle')}</h2>
        <ul>
          {Array.from({ length: 15 }).map((_, index) => (
            <li key={index}>
              <strong>{t(`viif.initiative${index + 1}.title`)}</strong>: {t(`viif.initiative${index + 1}.description`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="founders">
        <h2>{t('viif.foundersTitle')}</h2>
        <div className="founder">
          <h3>{t('viif.founder1.name')}</h3>
          <p>{t('viif.founder1.bio')}</p>
        </div>
        <div className="founder">
          <h3>{t('viif.founder2.name')}</h3>
          <p>{t('viif.founder2.bio')}</p>
        </div>
      </section>

      <section className="support">
        <h2>{t('viif.supportTitle')}</h2>
        <p>{t('viif.supportDescription')}</p>
      </section>

      <section className="donation">
        <h2>{t('viif.donationTitle')}</h2>
        <div className="bank-details">
          <h4>ICICI BANK</h4>
          <p>{t('viif.donation.icici')}</p>
          <h4>AXIS BANK</h4>
          <p>{t('viif.donation.axis')}</p>
        </div>
      </section>

      <section className="contact">
        <h2>{t('viif.contactTitle')}</h2>
        <p>{t('viif.contactInfo')}</p>
      </section>
    </div>
  );
};

export default VIIF;