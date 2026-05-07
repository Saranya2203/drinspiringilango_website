import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // Require secret key in URL
  const secretKey = "ilango-secret-2024";

  if (!window.location.search.includes(`key=${secretKey}`)) {
    return <h2 style={{textAlign: "center", marginTop: "50px"}}>404 Page Not Found</h2>;
  }

  // Set default admin credentials if not stored already
  if (!localStorage.getItem('adminUsername')) {
    localStorage.setItem('adminUsername', 'InspiringIlango');
    localStorage.setItem('adminPassword', 'inspiringilango@123');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsername = localStorage.getItem('adminUsername');
    const storedPassword = localStorage.getItem('adminPassword');

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Login</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
  <label>Password</label>

  <input
    type={showPassword ? 'text' : 'password'}
    className="form-input"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    required
  />

  {/* Show Password Checkbox */}
  <div style={{ marginTop: "6px", display: "flex", alignItems: "center" }}>
    <input
      type="checkbox"
      id="showPassword"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
      style={{ marginRight: "6px" }}
    />
    <label htmlFor="showPassword" style={{ fontSize: "14px", cursor: "pointer" }}>
      Show Password
    </label>
  </div>
</div>


        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="btn-submit">
          Login
        </button>

        {/* ➤ FORGOT / CHANGE PASSWORD LINK */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/change-password" style={{ color: "#0077cc", fontWeight: "600", textDecoration: "none" }}>
            Forgot / Change Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Admin;
