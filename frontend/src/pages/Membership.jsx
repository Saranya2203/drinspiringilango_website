import React from 'react';
import './Membership.css';
import { useTranslation } from 'react-i18next';

const Membership = () => {
  const { t } = useTranslation();

  const plans = [
    {
      id: 'basic',
      isPopular: false
    },
    {
      id: 'premium',
      isPopular: true
    },
    {
      id: 'elite',
      isPopular: false
    }
  ];

  const benefits = t('membership.benefits', { returnObjects: true });
  const faqItems = t('membership.faq', { returnObjects: true });
  const testimonials = t('membership.testimonials', { returnObjects: true });

  return (
    <main className="membership-container" role="main">
      <header>
        <h1 className="membership-title" tabIndex="0">{t('membership.title')}</h1>
        <p className="membership-subtitle" tabIndex="0">{t('membership.subtitle')}</p>
      </header>

      <section aria-labelledby="plans-heading">
        <h2 id="plans-heading" className="visually-hidden">{t('membership.comparisonTitle')}</h2>
        <div className="membership-cards">
          {plans.map((plan, index) => {
            const features = t(`membership.plans.${plan.id}.features`, { returnObjects: true });
            return (
              <article
                className={`membership-card ${plan.isPopular ? 'popular' : ''}`}
                key={index}
                aria-label={`${t(`membership.plans.${plan.id}.title`)} membership plan`}
              >
                <h3>{t(`membership.plans.${plan.id}.title`)}</h3>
                <p className="price" aria-label={`Price: ${t(`membership.plans.${plan.id}.price`)}`}>
                  {t(`membership.plans.${plan.id}.price`)}
                </p>
                <ul>
                  {Array.isArray(features) && features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <a
                  href="https://calendly.com/inspiringilango/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  aria-label={`Join ${t(`membership.plans.${plan.id}.title`)} via Calendly`}
                >
                  {t('membership.plans.button')}
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="membership-benefits" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading">{t('membership.benefitsTitle')}</h2>
        <ul>
          {Array.isArray(benefits) && benefits.map((benefit, i) => (
            <li key={i}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section className="comparison-table" aria-labelledby="compare-heading">
        <h2 id="compare-heading">{t('membership.comparisonTitle')}</h2>
        <table>
          <caption className="visually-hidden">{t('membership.comparisonTitle')}</caption>
          <thead>
            <tr>
              <th scope="col">{t('membership.comparison.features')}</th>
              <th scope="col">{t('membership.plans.basic.title')}</th>
              <th scope="col">{t('membership.plans.premium.title')}</th>
              <th scope="col">{t('membership.plans.elite.title')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('membership.comparison.weeklyWebinars')}</td>
              <td>{t('membership.comparison.yes')}</td>
              <td>{t('membership.comparison.yes')}</td>
              <td>{t('membership.comparison.yes')}</td>
            </tr>
            <tr>
              <td>{t('membership.comparison.coaching')}</td>
              <td>{t('membership.comparison.no')}</td>
              <td>{t('membership.comparison.monthly')}</td>
              <td>{t('membership.comparison.weekly')}</td>
            </tr>
            <tr>
              <td>{t('membership.comparison.ebooks')}</td>
              <td>{t('membership.comparison.no')}</td>
              <td>{t('membership.comparison.yes')}</td>
              <td>{t('membership.comparison.yes')}</td>
            </tr>
            <tr>
              <td>{t('membership.comparison.support')}</td>
              <td>{t('membership.comparison.no')}</td>
              <td>{t('membership.comparison.no')}</td>
              <td>{t('membership.comparison.yes')}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="membership-faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">{t('membership.faqTitle')}</h2>
        {Array.isArray(faqItems) && faqItems.map((item, index) => (
          <div className="faq-item" key={index}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      <section className="membership-testimonials" aria-labelledby="testimonial-heading">
        <h2 id="testimonial-heading">{t('membership.testimonialsTitle')}</h2>
        {Array.isArray(testimonials) && testimonials.map((item, index) => (
          <blockquote key={index}>
            “{item.quote}”
            <footer><cite>{item.author}</cite></footer>
          </blockquote>
        ))}
      </section>

      <section className="membership-cta-banner" aria-label="Call to action">
        <h2>{t('membership.cta.title')}</h2>
        <p>{t('membership.cta.text')}</p>
        <a href="#plans-heading" className="btn" aria-label={t('membership.cta.button')}>
          {t('membership.cta.button')}
        </a>
      </section>
    </main>
  );
};

export default Membership;
