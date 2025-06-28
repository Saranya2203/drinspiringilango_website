import React, { useState, useEffect } from 'react';
import './Events.css';
import { loadStripe } from '@stripe/stripe-js';
import PayPalButton from './PayPalButton';
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe('your_stripe_public_key_here');

const Events = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', event: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const session = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData })
    }).then(res => res.json());

    stripe.redirectToCheckout({ sessionId: session.id });
  };

  const handleGoogleMeet = () => {
    const gCalLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=InspiringIlango+Webinar&details=Join+us+for+an+exclusive+event&location=Google+Meet&dates=20250601T090000Z/20250601T100000Z`;
    window.open(gCalLink, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can optionally send the form data to a backend
    setFormSubmitted(true);
  };

  // 📅 Fetch upcoming events from Google Calendar
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const calendarId = 'your_calendar_id@group.calendar.google.com';
        const apiKey = 'your_google_calendar_api_key';
        const timeMin = new Date().toISOString();
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&singleEvents=true&orderBy=startTime&key=${apiKey}`);
        const data = await response.json();
        setUpcomingEvents(data.items || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-page">
      <header className="branding">
        <img src="/assets/Inspiring_Ilango.png" alt="Inspiring Ilango Logo" className="brand-logo" />
        <h1>{t('events.header.title')}</h1>
        <p className="tagline">{t('events.header.tagline')}</p>
      </header>

      <section className="event-registration">
        {!formSubmitted ? (
          <form className="event-form" onSubmit={handleSubmit} aria-label={t('events.form.ariaLabel')}>
            <label htmlFor="name">{t('events.form.name')}*</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">{t('events.form.email')}*</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="phone">{t('events.form.phone')}*</label>
            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />

            <label htmlFor="event">{t('events.form.selectEvent')}*</label>
            <select name="event" id="event" value={formData.event} onChange={handleChange} required>
              <option value="">{t('events.form.choose')}</option>
              <option value="Inspiration Masterclass">{t('events.form.events.masterclass')}</option>
              <option value="One-to-One with Ilango">{t('events.form.events.oneToOne')}</option>
            </select>

            <button type="submit" className="stripe-btn">{t('events.buttons.book') || 'Book Now'}</button>

            <div className="payment-options">
              <button type="button" onClick={handleStripePayment} className="stripe-btn">
                {t('events.buttons.stripe')}
              </button>
              <PayPalButton formData={formData} />
            </div>

            <div className="google-meet-link">
              <button type="button" onClick={handleGoogleMeet} className="google-btn">
                {t('events.buttons.calendar')}
              </button>
            </div>
          </form>
        ) : (
          <div className="confirmation-message">
            <h2>{t('events.confirmation.thankYou') || 'Thank you for registering!'}</h2>
            <p>{t('events.confirmation.details') || 'We’ll contact you with more info soon.'}</p>
          </div>
        )}
      </section>

      <section className="upcoming-events">
        <h2>{t('events.upcoming.title') || 'Upcoming Events'}</h2>
        {upcomingEvents.length > 0 ? (
          <ul className="events-list">
            {upcomingEvents.map(event => (
              <li key={event.id} className="event-item">
                <strong>{event.summary}</strong><br />
                <span>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</span><br />
                <a href={event.htmlLink} target="_blank" rel="noreferrer">View in Calendar</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('events.upcoming.none') || 'No upcoming events found.'}</p>
        )}
      </section>
    </div>
  );
};

export default Events;
