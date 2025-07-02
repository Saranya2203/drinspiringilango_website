import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const sendEmail = (e) => {
    e.preventDefault();

    const formElement = form.current;

    // Send message to admin
    emailjs.sendForm(
      'service_vy7gm98',         // ✅ Your EmailJS service ID
      'template_ya8vpwf',     // ✅ Replace with your Contact template ID
      formElement,
      'PZXnsQj6OrTUPdnTG'          // ✅ Replace with your EmailJS public key
    ).then(
      (result) => {
        console.log('Contact message sent:', result.text);
        setSent(true);
        e.target.reset();

        // Send auto-reply to user
        emailjs.send(
          'service_vy7gm98',       // ✅ Same service ID
          'template_bdudahg',// ✅ Replace with your Auto-Reply template ID
          {
            name: formElement.name.value,
            email: formElement.email.value,
          },
          'PZXnsQj6OrTUPdnTG'
        ).then(
          (res) => console.log('Auto-reply sent:', res.text),
          (err) => console.error('Auto-reply error:', err.text)
        );
      },
      (error) => {
        console.error('Contact message failed:', error.text);
        setSent(false);
      }
    );
  };

  return (
    <div className="contact-container">
      <div className="contact-form-section">
        <h2>{t('contact_us')}</h2>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="input-row">
            <input type="text" name="name" placeholder={t('name')} required />
          </div>
          <input type="email" name="email" placeholder={t('email')} required />
          <input type="tel" name="contact_no" placeholder={t('contact_number')} required />
          <textarea name="message" placeholder={t('your_message')} required></textarea>
          <button type="submit">{t('send')}</button>
          {sent && <p className="success-message">{t('message_sent')}</p>}
        </form>
      </div>

      <div className="contact-info-section">
        <h3>{t('get_in_touch')}</h3>
        <p><strong>{t('address')}:</strong> No: 16 600042, 12, Srinivasa Nagar 2nd St, Ram Nagar, Devi Karumariamman Nagar, Mohanpuri, Velachery, Chennai, Tamil Nadu 600042</p>
        <p><strong>{t('mobile')}:</strong> +91 9551065656</p>
        <p><strong>{t('email_label')}:</strong> inspiringilango@gmail.com</p>

        <div className="social-links">
          <a href="https://www.facebook.com/motivationalspeakers.inspiringilango" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://x.com/inspiringilango" target="_blank" rel="noreferrer"><FaTwitter /></a>
          <a href="https://www.linkedin.com/in/inspiring-ilango-40514935/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          <a href="https://www.instagram.com/inspiringilango/" target="_blank" rel="noreferrer"><FaInstagram /></a>
        </div>

        <div className="map-container">
          <iframe
            title="Ilango Address"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3887.9691591282!2d80.2123071!3d12.9738244!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d93c5a554ed%3A0xea434aee75cfe68b!2sAce%20panacea%20life%20skills%20private%20limited!5e0!3m2!1sen!2sin!4v1751087940509!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
