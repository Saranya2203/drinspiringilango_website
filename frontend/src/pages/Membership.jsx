import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Membership.css';

// JSONBin API config
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/685e88048561e97a502cbd91';
const JSONBIN_API_KEY = '$2a$10$LR0UoKdp73g6ex3pWvL2V.u0WWX0OVFbpHoIGNRVPiTnpLKA8SyTu';

function Membership() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials from JSONBin (used by dashboard)
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(JSONBIN_URL, {
          headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        const data = res.data.record;
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const membershipPlans = [
    {
      title: t('membership.basic.title'),
      price: t('membership.basic.price'),
      features: t('membership.basic.features', { returnObjects: true }),
    },
    {
      title: t('membership.premium.title'),
      price: t('membership.premium.price'),
      features: t('membership.premium.features', { returnObjects: true }),
      highlight: true,
    },
    {
      title: t('membership.elite.title'),
      price: t('membership.elite.price'),
      features: t('membership.elite.features', { returnObjects: true }),
    },
  ];

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
  ];

  return (
    <main className="membership-container" role="main">
      {/* Header */}
      <header className="membership-header">
        <h1>{t('membership.title')}</h1>
        <p>{t('membership.subtitle')}</p>
      </header>

      {/* Why Join */}
      <section className="why-join-section">
        <h2>{t('membership.whyJoin.title')}</h2>
        <ul>
          {t('membership.whyJoin.points', { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Membership Plans */}
      <section className="membership-plans">
        {membershipPlans.map((plan, index) => (
          <div
            key={index}
            className={`membership-card ${plan.highlight ? 'highlight' : ''}`}
            tabIndex="0"
            aria-label={`${plan.title} plan`}
          >
            <h2>{plan.title}</h2>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className="join-btn"
              onClick={() => navigate('/contact')}
              aria-label={`Join ${plan.title}`}
            >
              {t('membership.joinButton')}
            </button>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>{t('testimonials.title')}</h2>
        <div className="testimonials-grid">
          {testimonials.length === 0 ? (
            <p>{t('testimonials.none')}</p>
          ) : (
            testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-comment">"{testimonial.comment}"</p>
                <p className="testimonial-name">— {testimonial.name}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>{t('faq.title')}</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <footer className="membership-footer-cta">
        <h2>{t('membership.cta.title')}</h2>
        <p>{t('membership.cta.subtitle')}</p>
        <button
          className="join-btn"
          onClick={() => navigate('/contact')}
          aria-label="Join Now"
        >
          {t('membership.cta.button')}
        </button>
      </footer>
    </main>
  );
}

export default Membership;
