// src/pages/Success.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessCancel.css'; // Reuse same style for both pages

const Success = () => {
  return (
    <div className="success-cancel-page">
      <h1>🎉 Registration Successful!</h1>
      <p>Thank you for registering. A confirmation email has been sent to your inbox.</p>
      <Link to="/events" className="back-button">Back to Events</Link>
    </div>
  );
};

export default Success;
