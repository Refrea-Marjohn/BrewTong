import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const profileRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('brewtong-cart') || '[]');
      setCartCount(cart.length);
    };

    updateCartCount();
    
    // Listen for storage changes (when cart is updated from other tabs)
    window.addEventListener('storage', updateCartCount);
    
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark coffee-primary fixed-top">
      <div className="container">
        <Link 
          className="navbar-brand fw-bold" 
          to="/"
          onClick={handleLogoClick}
        >
          <i className="fas fa-coffee me-2"></i>
          BrewTong
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`} 
                to="/about"
              >
                <i className="fas fa-info-circle me-1"></i>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/menu') ? 'active' : ''}`} 
                to="/menu"
              >
                <i className="fas fa-utensils me-1"></i>
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/gallery') ? 'active' : ''}`} 
                to="/gallery"
              >
                <i className="fas fa-images me-1"></i>
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`} 
                to="/contact"
              >
                <i className="fas fa-envelope me-1"></i>
                Contact
              </Link>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} 
                    to="/dashboard"
                  >
                    <i className="fas fa-shopping-cart me-1"></i>
                    Cart
                    {cartCount > 0 && (
                      <span className="badge bg-warning text-dark ms-1">{cartCount}</span>
                    )}
                  </Link>
                </li>
                <li className="nav-item profile-dropdown" ref={profileRef}>
                  <button 
                    className="nav-link btn btn-link text-light p-0 d-flex align-items-center"
                    onClick={toggleProfileMenu}
                  >
                    <i className="fas fa-user-circle fa-lg me-2"></i>
                    <span className="d-none d-md-inline">{currentUser.email?.split('@')[0]}</span>
                    <i className="fas fa-chevron-down ms-1"></i>
                  </button>
                  
                  {showProfileMenu && (
                    <div className="profile-menu">
                      <div className="profile-menu-item">
                        <i className="fas fa-user me-2"></i>
                        Profile
                      </div>
                      <div className="profile-menu-item">
                        <i className="fas fa-cog me-2"></i>
                        Settings
                      </div>
                      <div className="profile-menu-item logout" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </div>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link 
                  className="nav-link"
                  to="/"
                >
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
