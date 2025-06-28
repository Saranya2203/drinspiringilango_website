import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

function Services() {
  const { t } = useTranslation();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      console.log('Calendly loaded');
    };
    document.body.appendChild(script);
  }, []);

  const openCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/inspiringilango/30min',
      });
    } else {
      window.location.href = 'https://calendly.com/inspiringilango/30min';
    }
    return false;
  };

  const handlePayment = (url) => {
    window.open(url, '_blank');
  };

  const serviceItems = t('services.items', { returnObjects: true }) || [];

  return (
    <main className="services-container" role="main">
      <header>
        <h1 className="services-title">{t('services.title')}</h1>
        <p className="services-intro">{t('services.intro')}</p>
      </header>

      <section className="services-grid">
        {Array.isArray(serviceItems) &&
          serviceItems.map((service, index) => (
            <div key={index} className="service-card" tabIndex="0" aria-label={service.title}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <div className="service-buttons">
                <button onClick={openCalendlyPopup} aria-label={`Book ${service.title}`}>
                  {t('services.buttons.bookNow')}
                </button>
                <button
                  onClick={() =>
                    handlePayment('https://buy.stripe.com/test_00w9AV3Bjclu8uh5GcbAs00')
                  }
                  className="pay-btn"
                  aria-label={`Pay for ${service.title}`}
                >
                  {t('services.buttons.pay')}
                </button>
              </div>
            </div>
          ))}

        <div className="service-card" tabIndex="0" aria-label={t('services.book.title')}>
          <h2>{t('services.book.title')}</h2>
          <img
            src="/assets/Book.jpg"
            alt={t('services.book.alt')}
            className="book-image"
          />
          <p className="book-price">{t('services.book.price')}</p>
          <p>{t('services.book.description')}</p>
          <div className="service-buttons">
            <button
              onClick={() =>
                handlePayment('https://buy.stripe.com/your_real_book_link_here')
              }
              className="pay-btn"
              aria-label={t('services.book.buyButton')}
            >
              {t('services.book.buyButton')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;
