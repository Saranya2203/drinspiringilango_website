import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t  } = useTranslation();

  // Arrays pulled with returnObjects: true
  const awards = t('about.awards.list', { returnObjects: true }) || [];
  const facts = t('about.facts.items', { returnObjects: true }) || [];

  return (
    <main id="main-content" role="main">
      <Helmet>
        <html lang="en" />
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
        <meta name="keywords" content={t('about.meta.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:title" content={t('about.meta.title')} />
        <meta property="og:description" content={t('about.meta.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/Logo.jpg" />
        <meta property="og:url" content="https://www.inspiringilango.com/about" />
        <link rel="canonical" href="https://www.inspiringilango.com/about" />
      </Helmet>

      <section className="about-container">
        <header>
          <h1 tabIndex="0">{t('about.title')}</h1>
        </header>

        <div className="profile-section">
          <img
            src="/assets/Inspiring_Ilango.png"
            alt={t('about.altText', 'Dr. Inspiring Ilango')}
            className="profile-image"
          />
          <video
            controls
            aria-label={t('about.videoLabel', 'Introduction video of Dr. Ilango')}
            className="intro-video"
          >
            <source src="/assets/About_InspiringIlango.mp4" type="video/mp4" />
            <track
              src="/videos/intro-captions.vtt"
              kind="captions"
              srcLang="en"
              label="English captions"
              default
            />
            {t('about.videoFallback', 'Your browser does not support the video tag.')}
          </video>
        </div>

        <article className="about-content">
          <section aria-labelledby="bio">
            <h2 id="bio" tabIndex="0">{t('about.biography.heading')}</h2>
            <p tabIndex="0">{t('about.biography.paragraph1')}</p>
            <p tabIndex="0">{t('about.biography.paragraph2')}</p>
          </section>

          <section aria-labelledby="mission">
            <h2 id="mission" tabIndex="0">{t('about.mission.heading')}</h2>
            <p tabIndex="0">{t('about.mission.text')}</p>
          </section>

          <section aria-labelledby="vision">
            <h2 id="vision" tabIndex="0">{t('about.vision.heading')}</h2>
            <p tabIndex="0">{t('about.vision.text')}</p>
          </section>

          {Array.isArray(awards) && awards.length > 0 && (
            <section aria-labelledby="awards">
              <h2 id="awards" tabIndex="0">{t('about.awards.heading')}</h2>
              <ul>
                {awards.map((award, idx) => (
                  <li key={idx} tabIndex="0">{award}</li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {Array.isArray(facts) && facts.length > 0 && (
          <section aria-labelledby="facts">
            <h2 id="facts" tabIndex="0">{t('about.facts.heading')}</h2>
            <div className="facts-grid">
              {facts.map((fact, idx) => (
                <div className="fact-card" key={idx} tabIndex="0">
                  {fact}
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default About;
