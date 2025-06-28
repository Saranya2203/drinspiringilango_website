// Viif.jsx - A separate page for the VIIF and Patron sections
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Viif.css';
import { Helmet } from 'react-helmet';

const Viif = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('viif.pageTitle')}</title>
        <meta
          name="description"
          content="Support VIIF – Learn about our mission and how you can contribute through donations and partnerships."
        />
      </Helmet>

      <main className="viif-page">
        <section className="viif-section">
          <h2>{t('viif.heading')}</h2>
          <p>{t('viif.description')}</p>
          <video controls preload="none">
            <source src="/assets/Be_the_Hope_Save_a_Life.mp4" type="video/mp4" />
          </video>
          <div className="donate-buttons">
            <button onClick={() => window.open('https://buy.stripe.com/test_xxx', '_blank')}>{t('viif.donate.stripe')}</button>
            <button onClick={() => window.open('https://paypal.me/inspiringilango', '_blank')}>{t('viif.donate.paypal')}</button>
            <button onClick={() => window.open('https://rzp.io/l/inspiringilango', '_blank')}>{t('viif.donate.razorpay')}</button>
          </div>
        </section>

        <section className="become-patron">
          <h2>{t('patron.heading')}</h2>
          <p>{t('patron.description')}</p>
          <div className="patron-downloads">
            <a href="/assets/VIIF_MediaKit_and_PatronBenefits.pdf" className="patron-btn" download>
              {t('patron.mediaKit')}
            </a>
            <a href="/assets/VIIF_MediaKit_and_PatronBenefits.pdf" className="patron-btn" download>
              {t('patron.benefits')}
            </a>
          </div>
          <a href="/contact" className="cta-button">{t('patron.partner')}</a>
        </section>
      </main>
    </>
  );
};

export default Viif;
