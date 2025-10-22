import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            {/* 404 Icon */}
            <div className="mb-4">
              <i className="fas fa-coffee fa-5x text-coffee"></i>
            </div>

            {/* Error Message */}
            <h1 className="display-1 fw-bold text-coffee mb-3">404</h1>
            <h2 className="fw-bold mb-3">Oops! Page Not Found</h2>
            <p className="lead mb-4">
              It looks like this page has gone missing, just like that last sip of coffee! 
              Don't worry, we'll help you find your way back to great coffee.
            </p>

            {/* Action Buttons */}
            <div className="d-flex gap-3 justify-content-center flex-wrap mb-5">
              <button 
                className="btn btn-coffee btn-lg px-4"
                onClick={handleGoHome}
              >
                <i className="fas fa-home me-2"></i>
                Go Home
              </button>
              <button 
                className="btn btn-outline-coffee btn-lg px-4"
                onClick={handleGoBack}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Go Back
              </button>
            </div>

            {/* Helpful Links */}
            <div className="row">
              <div className="col-12">
                <h4 className="fw-bold text-coffee mb-3">Maybe you were looking for:</h4>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button 
                    className="btn btn-outline-coffee"
                    onClick={() => navigate('/menu')}
                  >
                    <i className="fas fa-utensils me-1"></i>
                    Our Menu
                  </button>
                  <button 
                    className="btn btn-outline-coffee"
                    onClick={() => navigate('/about')}
                  >
                    <i className="fas fa-info-circle me-1"></i>
                    About Us
                  </button>
                  <button 
                    className="btn btn-outline-coffee"
                    onClick={() => navigate('/contact')}
                  >
                    <i className="fas fa-envelope me-1"></i>
                    Contact
                  </button>
                  <button 
                    className="btn btn-outline-coffee"
                    onClick={() => navigate('/gallery')}
                  >
                    <i className="fas fa-images me-1"></i>
                    Gallery
                  </button>
                </div>
              </div>
            </div>

            {/* Fun Message */}
            <div className="mt-5">
              <div className="bg-coffee-light p-4 rounded">
                <h5 className="fw-bold text-coffee mb-2">
                  <i className="fas fa-lightbulb me-2"></i>
                  Coffee Tip of the Day
                </h5>
                <p className="mb-0">
                  "The best way to find what you're looking for is to start with a great cup of coffee. 
                  Visit our menu page to discover your new favorite blend!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
