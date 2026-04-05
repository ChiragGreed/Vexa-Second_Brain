import { useState } from 'react';
import '../Style/auth.scss';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const VexaLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <rect width="72" height="72" rx="14" fill="#111116" />
    <polygon points="13,17 27,17 36,44 45,17 59,17 36,57" fill="#e8a930" />
    <polygon points="31,31 36,44 41,31 36,37" fill="#111116" />
    <circle cx="36" cy="57" r="5" fill="#f0eee8" />
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { registerHandler } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerHandler({ ...formData });
    navigate('/app/inbox');

  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <VexaLogo size={28} />
          <span className="auth-logo__name">Vexa</span>
        </div>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Start building your personal knowledge base.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="username">Username</label>
            <input
              className="auth-input"
              id="username"
              name="username"
              type="text"
              placeholder="your_username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              className="auth-input"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            <input
              className="auth-input"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Create account →</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
