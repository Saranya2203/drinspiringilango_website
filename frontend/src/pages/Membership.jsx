import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Membership.css';

function Membership() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const plans = t('membership.plans', { returnObjects: true }) || [];
  const faqs = t('membership.faqs', { returnObjects: true }) || [];

  return (
    <div className="membership-container">
      {/* Header */}
      <header className="membership-header">
        <h1>{t('membership.title')}</h1>
        <p>{t('membership.intro')}</p>
      </header>

      {/* Why Join Section */}
      <section className="why-join-section">
        <h2>{t('membership.whyJoin.title')}</h2>
        <ul>
          {t('membership.whyJoin.benefits', { returnObjects: true }).map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>

      {/* Membership Plans */}
      <section className="membership-plans">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`membership-card ${plan.highlight ? 'highlight' : ''}`}
            aria-label={plan.name}
          >
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex}>{feature}</li>
              ))}
            </ul>
            <button className="join-btn" onClick={() => navigate('/contact')}>
              {t('membership.joinButton')}
            </button>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>{t('membership.testimonials.title')}</h2>
        <div className="testimonials-grid">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="testimonial-image-card">
              <img
                src={`/assets/testimonial${num}.jpg`}
                alt={`testimonial ${num}`}
                className="testimonial-image-only"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>{t('membership.faqsTitle')}</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>

      {/* Footer CTA */}
      <section className="membership-footer-cta">
        <h2>{t('membership.footer.title')}</h2>
        <p>{t('membership.footer.description')}</p>
        <button onClick={() => navigate('/contact')}>
          {t('membership.footer.cta')}
        </button>
      </section>
    </div>
  );
}

export default Membership;
