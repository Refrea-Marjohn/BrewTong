import React, { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      
      if (isLogin) {
        await login(email, password);
        navigate('/');
      } else {
        await signup(email, password);
        // After signup, show success message and switch to login
        setError('');
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
        alert('Account created successfully! Please log in.');
      }
    } catch (error) {
      setError('Failed to ' + (isLogin ? 'log in' : 'create account'));
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-overlay"></div>
      </div>
      
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Side - Branding */}
          <div className="col-lg-6 d-none d-lg-flex auth-branding">
            <div className="auth-brand-content">
              <div className="brand-logo">
                <i className="fas fa-coffee fa-4x text-white mb-4"></i>
                <h1 className="display-3 fw-bold text-white mb-3">BrewTong</h1>
                <p className="lead text-white-50 mb-4">
                  Experience the finest coffee blends crafted with passion and precision. 
                  From bean to cup, we bring you the perfect coffee experience.
                </p>
                <div className="brand-features">
                  <div className="feature-item">
                    <i className="fas fa-coffee text-white me-3"></i>
                    <span className="text-white">Premium Quality Coffee</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-clock text-white me-3"></i>
                    <span className="text-white">Fresh Daily Brewing</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-heart text-white me-3"></i>
                    <span className="text-white">Made with Love</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="auth-form-container">
              <div className="auth-form-card">
                <div className="auth-header text-center mb-4">
                  <div className="auth-icon">
                    <i className="fas fa-coffee fa-2x text-coffee"></i>
                  </div>
                  <h2 className="fw-bold text-coffee mb-2">
                    {isLogin ? 'Welcome Back!' : 'Join BrewTong'}
                  </h2>
                  <p className="text-muted">
                    {isLogin ? 'Sign in to your account' : 'Create your account to start ordering'}
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger auth-alert" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label fw-bold text-coffee">
                      <i className="fas fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control auth-input"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label fw-bold text-coffee">
                      <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control auth-input"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="form-group mb-4">
                      <label htmlFor="confirmPassword" className="form-label fw-bold text-coffee">
                        <i className="fas fa-lock me-2"></i>Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control auth-input"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  )}

                  <div className="d-grid mb-4">
                    <button 
                      type="submit" 
                      className="btn btn-coffee auth-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          {isLogin ? 'Signing In...' : 'Creating Account...'}
                        </>
                      ) : (
                        <>
                          <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2`}></i>
                          {isLogin ? 'Sign In' : 'Create Account'}
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="auth-switch text-center">
                  <p className="mb-0 text-muted">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      className="btn btn-link p-0 text-coffee fw-bold auth-switch-btn"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                      }}
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>

                <div className="auth-divider">
                  <hr className="my-4" />
                  <div className="text-center">
                    <small className="text-muted bg-white px-3">
                      <i className="fas fa-coffee me-1"></i>
                      BrewTong Coffee Experience
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
