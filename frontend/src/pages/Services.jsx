import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

function Services() {
  const { t } = useTranslation();
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      console.log('Calendly loaded');
      setCalendlyLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const openCalendlyPopup = (event) => {
    event.preventDefault();
    if (window.Calendly && calendlyLoaded) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/inspiringilango/30min',
      });
    } else {
      // fallback to Calendly page if widget fails
      window.location.href = 'https://calendly.com/inspiringilango/30min';
    }
  };

  const handlePayment = (url) => {
    window.open(url, '_blank');
  };

  const serviceItems = t('services.items', { returnObjects: true }) || [];
  const productItems = t('products.items', { returnObjects: true }) || [];

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
                <button
                  onClick={openCalendlyPopup}
                  disabled={!calendlyLoaded}
                  aria-label={`Book ${service.title}`}
                >
                  {calendlyLoaded
                    ? t('services.buttons.bookNow')
                    : t('services.buttons.loading')}
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
                handlePayment('https://buy.stripe.com/test_aFa7sNfk199idOBecIbAs02')
              }
              className="pay-btn"
              aria-label={t('services.book.buyButton')}
            >
              {t('services.book.buyButton')}
            </button>
          </div>
        </div>
      </section>

      <section className="brochures-section">
        <h2 className="brochures-title">{t('brochures.title')}</h2>
        <div className="brochures-grid">
          {[1, 2, 3].map((num) => (
            <div key={num} className="brochure-card">
              <img
                src={`/assets/brochure${num}.jpg`}
                alt={t(`brochures.brochure${num}.alt`)}
                className="brochure-image"
              />
              <h3>{t(`brochures.brochure${num}.title`)}</h3>
              <p>{t(`brochures.brochure${num}.description`)}</p>
              <a
                href={`/assets/brochure${num}.pdf`}
                download
                className="download-btn"
                aria-label={t(`brochures.brochure${num}.download`)}
              >
                {t(`brochures.brochure${num}.download`)}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="products-grid">
        <h2 className="products-title">{t('products.title')}</h2>
        <div className="services-grid">
          {productItems.map((product, index) => (
            <div key={index} className="service-card" tabIndex="0" aria-label={product.title}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="product-price">{product.price}</p>
              <button
                onClick={() => handlePayment(product.url)}
                className="pay-btn"
                aria-label={`Buy ${product.title}`}
              >
                {t('services.book.buyButton')}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Services;
