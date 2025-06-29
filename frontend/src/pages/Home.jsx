import React, { useEffect, useRef } from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Home = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const videoRef = useRef(null);

  const rolesData = [
    { icon: 'fas fa-bullhorn', title: t('roles.motivationalSpeaker.title'), description: t('roles.motivationalSpeaker.description') },
    { icon: 'fas fa-headphones', title: t('roles.voiceoverArtist.title'), description: t('roles.voiceoverArtist.description') },
    { icon: 'fas fa-rocket', title: t('roles.entrepreneur.title'), description: t('roles.entrepreneur.description') },
    { icon: 'fas fa-user-tie', title: t('roles.lifeCoach.title'), description: t('roles.lifeCoach.description') }
  ];

  useEffect(() => {
    videoRef.current?.load();
  }, [i18n.language]);

  useEffect(() => {
    const loadDeferredScripts = () => {
      const addScript = (src, id = null) => {
        if (id && document.getElementById(id)) return;
        const s = document.createElement('script');
        if (id) s.id = id;
        s.src = src;
        s.async = true;
        document.body.appendChild(s);
      };

      addScript('https://embed.tawk.to/683198990ff9cf190abe81e0/1is0ro68f');
      addScript('https://chimpstatic.com/mcjs-connected/js/users/.../ec81b55b08d31e60e314d50ce.js', 'mcjs');
    };

    window.addEventListener('scroll', loadDeferredScripts, { once: true });

    const calendly = document.createElement('script');
    calendly.src = 'https://assets.calendly.com/assets/external/widget.js';
    calendly.async = true;
    document.body.appendChild(calendly);
  }, []);

  return (
    <>
      <Helmet>
        <title>Inspiring Ilango – Emotional Intelligence Speaker India</title>
        <meta name="description" content="Inspiring Ilango – the world’s only visually challenged emotional intelligence consultant. Book global keynotes, projects & more." />
        <meta property="og:title" content="Inspiring Ilango – Emotional Intelligence Speaker" />
        <meta property="og:description" content="Visually challenged emotional intelligence consultant and motivational speaker." />
        <meta property="og:image" content="/assets/Ilango.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dr. Inspiring Ilango",
            "jobTitle": "Emotional Intelligence Speaker",
            "image": "https://yourdomain.com/assets/Ilango.jpg",
            "sameAs": [
              "https://www.instagram.com/inspiringilango",
              "https://www.youtube.com/@InspiringIlango",
              "https://www.linkedin.com/in/inspiringilango"
            ],
            "url": "https://yourdomain.com"
          })}
        </script>
      </Helmet>

      <main className="home">
        <section className="hero" aria-label="Hero">
          <div className="hero-inner">
            <div className="hero-image">
              <img src="/assets/Ilango.webp" alt="Dr. Inspiring Ilango profile photo" loading="eager" />
            </div>
            <div className="hero-content">
              <h1>{t('hero.title')}</h1>
              <p>{t('hero.description')}</p>
              <a href="https://calendly.com/inspiringilango/30min" className="cta-button" aria-label={t('hero.cta')}>
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
            preload="metadata"
            width="100%"
            poster="/assets/video-thumbnail.jpg"
            aria-label={t('videoIntro.videoLabel')}
          >
            <source src={isTamil ? '/assets/InspiringIlango_Intro_Tamil.mp4' : '/assets/InspiringIlango_Intro_English.mp4'} type="video/mp4" />
            <track kind="captions" src="/assets/captions.vtt" srclang="en" label="English" />
            {t('videoIntro.noSupport')}
          </video>
        </section>

        <section className="carousel" aria-label="Ilango's Roles">
          <h2>{t('roles.heading')}</h2>
          <div className="carousel-container">
            {rolesData.map((r, i) => (
              <div className="carousel-card" key={i} tabIndex="0">
                <i className={r.icon} aria-hidden="true" />
                <h3>{r.title}</h3>
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
                src={`/assets/Gallery ${i + 1}.webp`}
                alt={`Dr. Ilango event ${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </section>

        <section className="viif-section" aria-label="VIIF Fundraising">
          <h2>{t('viif.heading')}</h2>
          <p>{t('viif.description')}</p>
          <video
            muted
            autoPlay
            playsInline
            loop
            preload="auto"
            style={{ width: '100%', maxWidth: '640px' }}
            aria-label="VIIF Campaign Video"
          >
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
            <a href="/assets/VIIF_Media_Kit_and_Patron_Benefits.pdf" download>{t('patron.mediaKit')}</a>
            <a href="/assets/VIIF_Complete_Patron_Benefits_Kit.pdf" download>{t('patron.benefits')}</a>
          </div>
          <a href="/contact" className="cta-button">{t('patron.partner')}</a>
        </section>

        <section className="newsletter-section">
          <h2>{t('newsletter.heading')}</h2>
          <p>{t('newsletter.description')}</p>
          <form
            className="newsletter-form"
            action="https://YOUR_USERNAME.usX.list-manage.com/subscribe/post?u=YOUR_U_ID&id=YOUR_LIST_ID"
            method="POST"
            target="_blank"
            noValidate
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

        <section className="social">
          <h2>{t('social.heading')}</h2>
          <div className="social-icons">
            <a href="https://www.youtube.com/@InspiringIlango" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            <a href="https://www.instagram.com/inspiringilango" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="https://www.facebook.com/InspiringIlango" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="https://www.linkedin.com/in/inspiringilango" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
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
