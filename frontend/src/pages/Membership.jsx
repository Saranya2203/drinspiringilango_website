// Membership.jsx
import React, { useEffect } from 'react';
import './Membership.css';
import { useTranslation } from 'react-i18next';

const Membership = () => {
  const { t } = useTranslation();

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
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
  };

  const handlePayment = (url) => {
    window.open(url, '_blank');
  };

  const plans = [
    { id: 'basic', isPopular: false },
    { id: 'premium', isPopular: true },
    { id: 'elite', isPopular: false },
  ];

  const benefits = t('membership.benefits', { returnObjects: true });
  const faqItems = t('membership.faq', { returnObjects: true });
  const testimonials = t('membership.testimonials', { returnObjects: true });
  const products = t('products.items', { returnObjects: true });

  return (
    <main className="membership-container" role="main">
      <header>
        <h1 className="membership-title" tabIndex="0">{t('membership.title')}</h1>
        <p className="membership-subtitle" tabIndex="0">{t('membership.subtitle')}</p>
      </header>

      {/* Membership Plans */}
      <section aria-labelledby="plans-heading">
        <h2 id="plans-heading">{t('membership.comparisonTitle')}</h2>
        <div className="membership-cards">
          {plans.map((plan, index) => {
            const features = t(`membership.plans.${plan.id}.features`, { returnObjects: true });
            const price = t(`membership.plans.${plan.id}.price`);
            return (
              <article
                className={`membership-card ${plan.isPopular ? 'popular' : ''}`}
                key={index}
                aria-label={`${t(`membership.plans.${plan.id}.title`)} membership plan`}
              >
                <h3>{t(`membership.plans.${plan.id}.title`)}</h3>
                <p className="price">{price}</p>
                <ul>
                  {Array.isArray(features) && features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button
                  className="btn"
                  onClick={openCalendlyPopup}
                  aria-label={`Join ${t(`membership.plans.${plan.id}.title`)}`}
                >
                  {t('membership.plans.button')}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="membership-benefits" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading">{t('membership.benefitsTitle')}</h2>
        <ul>
          {benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
        </ul>
      </section>

      {/* Comparison Table */}
      <section className="comparison-table" aria-labelledby="compare-heading">
        <h2 id="compare-heading">{t('membership.comparisonTitle')}</h2>
        <table>
          <thead>
            <tr>
              <th>{t('membership.comparison.features')}</th>
              <th>{t('membership.plans.basic.title')}</th>
              <th>{t('membership.plans.premium.title')}</th>
              <th>{t('membership.plans.elite.title')}</th>
            </tr>
          </thead>
          <tbody>
            {['weeklyWebinars', 'coaching', 'ebooks', 'support'].map((key) => (
              <tr key={key}>
                <td>{t(`membership.comparison.${key}`)}</td>
                <td>{t(`membership.comparison.${key}_basic`)}</td>
                <td>{t(`membership.comparison.${key}_premium`)}</td>
                <td>{t(`membership.comparison.${key}_elite`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Testimonials */}
      <section className="membership-testimonials" aria-labelledby="testimonial-heading">
        <h2 id="testimonial-heading">{t('membership.testimonialsTitle')}</h2>
        {testimonials.map((item, index) => (
          <blockquote key={index}>
            “{item.quote}”
            <footer><cite>{item.author}</cite></footer>
          </blockquote>
        ))}
      </section>

      {/* Related Products (Reused from Services) */}
      <section className="products-grid">
        <h2 className="products-title">{t('products.title')}</h2>
        <div className="services-grid">
          {products.map((product, index) => (
            <div key={index} className="service-card" tabIndex="0">
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

      {/* FAQ */}
      <section className="membership-faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">{t('membership.faqTitle')}</h2>
        {faqItems.map((item, index) => (
          <div className="faq-item" key={index}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      {/* CTA Banner */}
      <section className="membership-cta-banner" aria-label="Call to action">
        <h2>{t('membership.cta.title')}</h2>
        <p>{t('membership.cta.text')}</p>
        <button onClick={openCalendlyPopup} className="btn" aria-label={t('membership.cta.button')}>
          {t('membership.cta.button')}
        </button>
      </section>
    </main>
  );
};

export default Membership;
