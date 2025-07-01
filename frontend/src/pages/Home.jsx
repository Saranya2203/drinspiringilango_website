import React, { useEffect, useRef } from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Home = () => {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);
  const isTamil = i18n.language === 'ta'; // default is 'en'

  const rolesData = [
    {
      icon: 'fas fa-bullhorn',
      title: t('roles.motivationalSpeaker.title'),
      description: t('roles.motivationalSpeaker.description')
    },
    {
      icon: 'fas fa-headphones',
      title: t('roles.voiceoverArtist.title'),
      description: t('roles.voiceoverArtist.description')
    },
    {
      icon: 'fas fa-rocket',
      title: t('roles.entrepreneur.title'),
      description: t('roles.entrepreneur.description')
    },
    {
      icon: 'fas fa-user-tie',
      title: t('roles.lifeCoach.title'),
      description: t('roles.lifeCoach.description')
    }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // reload video on language switch
    }
  }, [i18n.language]);

  useEffect(() => {
  if (!document.querySelector('script[src*="tawk.to"]')) {
    const s = document.createElement('script');
    s.src = 'https://embed.tawk.to/683198990ff9cf190abe81e0/1is0ro68f';
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
        <meta charSet="utf-8" />
        <title>Inspiring Ilango – Emotional Intelligence Speaker India</title>
        <meta
          name="description"
          content="Inspiring Ilango – the world’s only visually challenged emotional intelligence consultant. Book global keynotes, projects & more."
        />
      </Helmet>

      <main className="home">
        <section className="hero" aria-label="Global Hero Section">
          <div className="hero-inner">
            <div className="hero-image">
              <img src="/assets/Ilango.jpg" alt="Dr. Inspiring Ilango" />
            </div>
            <div className="hero-content">
              <h1 tabIndex="0">{t('hero.title')}</h1>
              <p tabIndex="0">{t('hero.description')}</p>
              <a href="https://calendly.com/inspiringilango/30min" className="cta-button" role="button" aria-label={t('hero.cta')}>
                {t('hero.cta')}
              </a>
            </div>
          </div>
        </section>

        <section className="video-intro" aria-label={t('videoIntro.aria')}>
          <h2>{t('videoIntro.heading')}</h2>
          <p>{t('videoIntro.description')}</p>
          <video
            ref={videoRef}
            muted
            playsInline
            controls
            preload="none"
            aria-label={t('videoIntro.videoLabel')}
          >
            <source
              src={
                isTamil
                  ? '/assets/InspiringIlango_Intro_Tamil.mp4'
                  : '/assets/InspiringIlango_Intro_English.mp4'
              }
              type="video/mp4"
            />
            <track
              kind="captions"
              src="/assets/captions.vtt"
              srclang="en"
              label={t('videoIntro.captionLabel')}
            />
            {t('videoIntro.noSupport')}
          </video>
        </section>

        <section className="carousel" aria-label="Who Is Dr. Ilango?">
          <h2>{t('roles.heading')}</h2>
          <div className="carousel-container">
            {rolesData.map((r, i) => (
              <div className="carousel-card" key={i} tabIndex="0" aria-labelledby={`role-title-${i}`}>
                <i className={r.icon} aria-hidden="true"></i>
                <h3 id={`role-title-${i}`}>{r.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: r.description }} />
              </div>
            ))}
          </div>
        </section>

        <section className="gallery">
          <h2>{t('gallery.heading')}</h2>
          <div className="gallery-scroll">
            {[...Array(6)].map((_, i) => (
              <img
                key={i}
                src={`/assets/Gallery ${i + 1}.jpg`}
                alt={`Dr. Ilango at event ${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </section>

        <section className="viif-section">
  <h2>{t('viif.heading')}</h2>
  <p>{t('viif.description')}</p>

  <video
    className="viif-video"
    muted
    autoPlay
    playsInline
    loop
    preload="auto"
    controls
    aria-label="VIIF Fundraising Video"
  >
    <source src="/assets/Be_the_Hope_Save_a_Life.mp4" type="video/mp4" />
    {t('videoIntro.noSupport')}
  </video>

  <div className="donate-buttons">
    <button onClick={() => window.open('https://buy.stripe.com/test_xxx', '_blank')}>
      {t('viif.donate.stripe')}
    </button>
    <button onClick={() => window.open('https://paypal.me/inspiringilango', '_blank')}>
      {t('viif.donate.paypal')}
    </button>
    <button onClick={() => window.open('https://rzp.io/l/inspiringilango', '_blank')}>
      {t('viif.donate.razorpay')}
    </button>
  </div>
</section>


        <section className="become-patron" aria-label="Support and Downloads">
          <h2>{t('patron.heading')}</h2>
          <p>{t('patron.description')}</p>
          <div className="patron-downloads">
            <a href="/assets/VIIF_Media_Kit_and_Patron_Benefits.pdf" className="patron-btn" download>
              {t('patron.mediaKit')}
            </a>
            <a href="/assets/VIIF_Complete_Patron_Benefits_Kit.pdf" className="patron-btn" download>
              {t('patron.benefits')}
            </a>
          </div>
          <a href="/contact" className="cta-button">{t('patron.partner')}</a>
        </section>

        <section className="newsletter-section">
          <h2>{t('newsletter.heading')}</h2>
          <p>{t('newsletter.description')}</p>

          <form
            className="newsletter-form"
            action="https://YOUR_USERNAME.usX.list-manage.com/subscribe/post?u=YOUR_U_ID&amp;id=YOUR_LIST_ID"
            method="POST"
            target="_blank"
            noValidate
            aria-label="Subscribe to newsletter"
          >
            <label htmlFor="newsletter-email">Email</label>
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

        <section className="social" aria-label="Follow Dr. Ilango">
          <h2>{t('social.heading')}</h2>
          <div className="social-icons">
            <a href="https://www.youtube.com/@InspiringIlango" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="https://www.instagram.com/inspiringilango?igsh=YXFzNHpyZmRiZzls" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/InspiringIlango" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.linkedin.com/in/inspiringilango" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </section>

        <section className="contact-prompt">
          <h2>{t('contact.heading')}</h2>
          <p>{t('contact.description')}</p>
          <a href="/contact" className="cta-button">{t('contact.cta')}</a>
        </section>
      </main>
    </>
  );
};

export default Home;
