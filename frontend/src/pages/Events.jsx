import React, { useState, useEffect } from 'react';
import './Events.css';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Events = () => {
  const { t, i18n } = useTranslation();

  const lang = i18n?.language?.split('-')[0] || 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [brochures, setBrochures] = useState([]);
  const [loadingBrochures, setLoadingBrochures] = useState(true);

  /* =========================
     FORM HANDLERS
  ========================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getISTTime = () => {
    return new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://formspree.io/f/xzzvebnr',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            time: getISTTime(),
          }),
        }
      );

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert('Failed to send. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  /* =========================
     GOOGLE CALENDAR
  ========================= */

  const handleGoogleMeet = () => {
    const gCalLink =
      `https://calendar.google.com/calendar/u/0/r/eventedit?` +
      `text=InspiringIlango+Webinar` +
      `&details=Join+us+for+an+exclusive+event` +
      `&location=Google+Meet` +
      `&dates=20250601T033000Z/20250601T043000Z`;

    window.open(gCalLink, '_blank');
  };

  /* =========================
     FETCH BROCHURES
  ========================= */

  const fetchBrochures = async () => {
    try {
      setLoadingBrochures(true);

      const res = await fetch(`${API_BASE_URL}/api/dashboard`);

      if (!res.ok) {
        throw new Error('Failed to fetch dashboard');
      }

      const data = await res.json();

      setBrochures(
        Array.isArray(data.brochures)
          ? data.brochures
          : []
      );
    } catch (error) {
      console.error('Error loading brochures:', error);
      setBrochures([]);
    } finally {
      setLoadingBrochures(false);
    }
  };

  /* =========================
     FETCH EVENTS
  ========================= */

  const fetchEvents = async () => {
    try {
      const calendarId =
        'your_calendar_id@group.calendar.google.com';

      const apiKey =
        'your_google_calendar_api_key';

      const timeMin = new Date().toISOString();

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&singleEvents=true&orderBy=startTime&key=${apiKey}`
      );

      const data = await response.json();

      setUpcomingEvents(data.items || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    fetchEvents();
    fetchBrochures();

    // Live brochure refresh
    const handleUpdate = () => {
      fetchBrochures();
    };

    window.addEventListener(
      'brochuresUpdated',
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        'brochuresUpdated',
        handleUpdate
      );
    };
  }, []);

  return (
    <div className="event-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="branding">
        <img
          src="/assets/Inspiring_Ilango.png"
          alt="Inspiring Ilango Logo"
          className="brand-logo"
        />

        <h1>{t('events.header.title')}</h1>

        <p className="tagline">
          {t('events.header.tagline')}
        </p>
      </header>

      {/* =========================
          BROCHURE SECTION
      ========================= */}

      <section className="brochure-section">
        <h2>
          {t('Events.brochures') ||
            'Event Brochures'}
        </h2>

        {loadingBrochures ? (
          <p>Loading brochures...</p>
        ) : brochures.length > 0 ? (
          <div className="brochure-list">

            {brochures.map((item, index) => (
              <div
                key={item.timestamp || index}
                className="brochure-item"
              >

                {/* TITLE */}
                <h3>
                  {item.title?.[lang] ||
                    item.title?.en ||
                    'Untitled Brochure'}
                </h3>

                {/* CONTENT */}
                <p>
                  {item.content?.[lang] ||
                    item.content?.en ||
                    ''}
                </p>

                {/* FILE LINK */}
                {item.file?.url ? (
                  <a
                    href={item.file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="brochure-btn"
                  >
                    {item.file?.name ||
                      'View / Download PDF'}
                  </a>
                ) : (
                  <p>No brochure file available</p>
                )}
              </div>
            ))}

          </div>
        ) : (
          <p>
            No brochures available at the moment.
          </p>
        )}
      </section>

      {/* =========================
          REGISTRATION FORM
      ========================= */}

      <section className="event-registration">

        {!formSubmitted ? (

          <form
            className="event-form"
            onSubmit={handleSubmit}
          >

            <label htmlFor="name">
              {t('events.form.name')}*
            </label>

            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">
              {t('events.form.email')}*
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">
              {t('events.form.phone')}*
            </label>

            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="event">
              {t('events.form.selectEvent')}*
            </label>

            <select
              name="event"
              id="event"
              value={formData.event}
              onChange={handleChange}
              required
            >
              <option value="">
                {t('events.form.choose')}
              </option>

              <option value="Inspiration Masterclass">
                {t(
                  'events.form.events.masterclass'
                )}
              </option>

              <option value="One-to-One with Ilango">
                {t(
                  'events.form.events.oneToOne'
                )}
              </option>
            </select>

            <button
              type="submit"
              className="submit-btn"
            >
              {t('events.buttons.book') ||
                'Book Now'}
            </button>

            <div className="google-meet-link">
              <button
                type="button"
                onClick={handleGoogleMeet}
                className="google-btn"
              >
                {t('events.buttons.calendar') ||
                  'Add to Calendar'}
              </button>
            </div>

          </form>

        ) : (

          <div className="confirmation-message">

            <h2>
              {t(
                'events.confirmation.thankYou'
              ) ||
                'Thank you for registering!'}
            </h2>

            <p>
              {t(
                'events.confirmation.details'
              ) ||
                'We’ll contact you with more info soon.'}
            </p>

          </div>

        )}

      </section>

      {/* =========================
          UPCOMING EVENTS
      ========================= */}

      <section className="upcoming-events">

        <h2>
          {t('events.upcoming.title') ||
            'Upcoming Events'}
        </h2>

        {upcomingEvents.length > 0 ? (

          <ul className="events-list">

            {upcomingEvents.map((event) => (

              <li
                key={event.id}
                className="event-item"
              >

                <strong>
                  {event.summary}
                </strong>

                <br />

                <span>
                  {new Date(
                    event.start?.dateTime ||
                      event.start?.date
                  ).toLocaleString()}
                </span>

                <br />

                <a
                  href={event.htmlLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  View in Calendar
                </a>

              </li>

            ))}

          </ul>

        ) : (

          <p>
            {t('events.upcoming.none') ||
              'No upcoming events found.'}
          </p>

        )}

      </section>

    </div>
  );
};

export default Events;