import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Home = () => {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isTamil = i18n.language === 'ta';

  const rolesData = [
    {
      image: '/assets/Public_speaker.jpg',
      title: t('roles.motivationalSpeaker.title'),
      description: t('roles.motivationalSpeaker.description')
    },
    {
      image: '/assets/Voiceover_artist.png',
      title: t('roles.voiceoverArtist.title'),
      description: t('roles.voiceoverArtist.description')
    },
    {
      image: '/assets/entreprenuer.jpg',
      title: t('roles.entrepreneur.title'),
      description: t('roles.entrepreneur.description')
    },
    {
      image: '/assets/Life_couch.jpg',
      title: t('roles.lifeCoach.title'),
      description: t('roles.lifeCoach.description')
    }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [i18n.language]);

  useEffect(() => {
    if (!document.querySelector('script[src*="tawk.to"]')) {
      const s = document.createElement('script');
      s.src = 'https://embed.tawk.to/6023c45b918aa261273d8a4b/1eu5re1ng';
      s.async = true;
      s.charset = 'UTF-8';
      s.setAttribute('crossorigin', '*');
      document.body.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const s2 = document.createElement('script');
    s2.src = 'https://assets.calendly.com/assets/external/widget.js';
    s2.async = true;
    document.body.appendChild(s2);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) videoRef.current?.play();
    }, { threshold: 0.5 });
    if (videoRef.current) obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <meta charSet="utf-8" />
        <title>Inspiring Ilango – Ethical Humane Emotional Intelligence Speaker India</title>
        <meta
          name="description"
          content="Inspiring Ilango – the world’s only visually challenged ethical humane emotional intelligence consultant. Book global keynotes, projects & more."
        />
      </Helmet>

      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        {t('accessibility.skipToContent', 'Skip to main content')}
      </a>

      <main id="main-content" className="home">
        {/* HERO SECTION */}
        <section className="hero" aria-label="Global Hero Section">
          <div className="hero-inner">
            <div className="hero-image">
            <img src={process.env.PUBLIC_URL + "/assets/Ilango.jpg"} alt="Dr. Inspiring Ilango" />            </div>
            <div className="hero-content">
              <h1 tabIndex="0">{t('hero.title')}</h1>
              <p tabIndex="0">{t('hero.description')}</p>
              <a
                href="https://calendly.com/inspiringilango/30min"
                className="cta-button"
                role="button"
                aria-label={t('hero.cta')}
              >
                {t('hero.cta')}
              </a>
            </div>
          </div>
        </section>

        {/* INTRO VIDEO */}
        <section className="video-intro" aria-label={t('videoIntro.aria')}>
          <h2>{t('videoIntro.heading')}</h2>
          <p id="video-desc">{t('videoIntro.description')}</p>
          <video
            ref={videoRef}
            muted
            playsInline
            controls
            preload="none"
            aria-describedby="video-desc"
            aria-label={t('videoIntro.videoLabel')}
          >
            <source
              src={
                isTamil
                  ? '/assets/InspiringIlango_Intro_Tamil.mp4'
                  : '/assets/InspiringIlango_Introduction_English.mp4'
              }
              type="video/mp4"
            />
            <track
              kind="captions"
              src="/assets/captions.vtt"
              srclang="en"
              label={t('videoIntro.captionLabel')}
              default
            />
            {t('videoIntro.noSupport')}
          </video>
        </section>

        {/* ROLES / CAROUSEL */}
        <section className="carousel" aria-label="Who Is Dr. Inspiring Ilango?">
          <h2>{t('roles.heading')}</h2>
          <div className="carousel-container" role="list">
            {rolesData.map((r, i) => (
              <div
                className="carousel-card"
                key={i}
                role="group"
                aria-labelledby={`role-title-${i}`}
                tabIndex="0"
              >
                <img src={r.image} alt={r.title} className="role-image" />
                <h3 id={`role-title-${i}`}>{r.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: r.description }} />
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery" aria-label="Event Gallery">
          <h2>{t('gallery.heading')}</h2>
          <div className="gallery-scroll" role="list">
            {[...Array(8)].map((_, i) => (
              <img
                key={i}
                src={`/assets/Event ${i + 1}.jpeg`}
                alt={`Dr. Inspiring Ilango at event ${i + 1}`}
                loading="lazy"
                role="listitem"
              />
            ))}
          </div>
        </section>

        {/* VIIF SECTION */}
        <section className="Viif-section" aria-label="VIIF Fundraising Video">
          <h2>{t('Viif.heading')}</h2>
          <p id="viif-desc">{t('Viif.description')}</p>

          <video
            className="viif-video"
            muted
            autoPlay
            playsInline
            loop
            preload="auto"
            poster="/assets/video-poster.jpg"
            aria-describedby="viif-desc"
            aria-label={t('home.videoLabel', 'VIIF Fundraising Video')}
          >
            <source src="/assets/Be_the_Hope_Save_a_Life.mp4" type="video/mp4" />
            <p>{t('videoIntro.noSupport')}</p>
          </video>

          <div className="donate-buttons" aria-live="polite">
  <button
    onClick={() =>
      window.open('https://rzp.io/rzp/auUdXfw', '_blank')
    }
  >
    {t('Viif.donate.razorpay')}
  </button>
</div>

        </section>

        {/* BECOME A PATRON */}
        <section className="become-patron" aria-label="Support and Downloads">
          <h2>{t('patron.heading')}</h2>
          <p>{t('patron.description')}</p>
          <div className="patron-downloads">
            <a
              href="/assets/VIIF_Media_Kit_and_Patron_Benefits.pdf"
              className="patron-btn"
              download
            >
              {t('patron.mediaKit')}
            </a>
            <a
              href="/assets/VIIF_Complete_Patron_Benefits_Kit.pdf"
              className="patron-btn"
              download
            >
              {t('patron.benefits')}
            </a>
          </div>
          <a href="/contact" className="cta-button">
            {t('patron.partner')}
          </a>
        </section>

        {/* NEWSLETTER FORM */}
        <section className="newsletter-section" aria-label="Newsletter Subscription">
          <h2>{t('newsletter.heading')}</h2>
          <p>{t('newsletter.description')}</p>

          <form
            className="newsletter-form"
            action="https://inspiringilango.us6.list-manage.com/subscribe/post?u=8cd8c788be313786951a27cae&id=1389ade986"
            method="POST"
            target="_blank"
            noValidate
            aria-label="Subscribe to newsletter"
          >
            <label htmlFor="newsletter-email">{t('newsletter.emailLabel', 'Email')}</label>
            <input
              id="newsletter-email"
              name="EMAIL"
              type="email"
              placeholder={t('newsletter.emailPlaceholder')}
              required
            />
            <button type="submit">{t('newsletter.subscribe')}</button>
          </form>
        </section>

        {/* SOCIAL LINKS */}
        <section className="social" aria-label="Follow Dr. Ilango">
          <h2>{t('social.heading')}</h2>
          <div className="social-icons">
            <a href="https://www.youtube.com/IITVInspiringIlango" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/inspiringilango/" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>

            {/* Accessible Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                aria-controls="facebook-dropdown"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <i className="fab fa-facebook-f"></i>
                <span className="sr-only">Facebook Pages</span>
              </button>

              {isDropdownOpen && (
                <div id="facebook-dropdown" className="dropdown-menu">
                  <a
                    href="https://www.facebook.com/motivationalspeakers.inspiringilango"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inspiring Ilango
                  </a>
                  <a
                    href="https://www.facebook.com/inspiringilango"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inspiring Ilango_Visionary
                  </a>
                  <a
                    href="https://www.facebook.com/viifindia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VIIF
                  </a>
                </div>
              )}
            </div>

            <a
              href="https://www.linkedin.com/in/inspiring-ilango-40514935/"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </section>

        {/* CONTACT PROMPT */}
        <section className="contact-prompt" aria-label="Contact Section">
          <h2>{t('contact.heading')}</h2>
          <p>{t('contact.description')}</p>
          <a href="/contact" className="cta-button">
            {t('contact.cta')}
          </a>
        </section>
      </main>
    </>
  );
};

export default Home;
