import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Admin.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate

  const handleChangePassword = (e) => {
    e.preventDefault();

    const storedPassword = localStorage.getItem('adminPassword');

    if (oldPassword !== storedPassword) {
      setMessage('Old password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    localStorage.setItem('adminPassword', newPassword);
    setMessage('Password updated successfully!');
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Change Password</h2>

      <form onSubmit={handleChangePassword} className="admin-form">
        
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            className="form-input"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {message && <div className="error-text">{message}</div>}

        <button type="submit" className="btn-submit">
          Update Password
        </button>
      </form>

      {/* Show "Back to Admin Page" button only if password updated successfully */}
      {message === 'Password updated successfully!' && (
        <button
          className="btn-back"
          onClick={() => navigate('/admin?key=ilango-secret-2024')} // Replace '/admin' with your admin page route
        >
          Back to Admin Page
        </button>
      )}
    </div>
  );
};

export default ChangePassword;
