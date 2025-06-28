
import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessCancel.css';

const Cancel = () => {
  return (
    <div className="success-cancel-page">
      <h1>❌ Payment Cancelled</h1>
      <p>You have cancelled the registration. No payment has been made.</p>
      <Link to="/events" className="back-button">Try Again</Link>
    </div>
  );
};

export default Cancel;
