import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect to auth page if user is not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  const handleOrderNow = () => {
    navigate('/menu');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section text-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(139, 69, 19, 0.8) 0%, rgba(210, 105, 30, 0.8) 100%), url('${process.env.PUBLIC_URL}/images/hero/coffee-shop-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to BrewTong
              </h1>
              <p className="lead mb-4">
                Experience the finest coffee blends crafted with passion and precision. 
                From bean to cup, we bring you the perfect coffee experience.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button 
                  className="btn btn-light btn-lg px-4"
                  onClick={handleOrderNow}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Order Now
                </button>
                <button 
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={handleLearnMore}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="fw-bold text-coffee">Why Choose Us?</h2>
              <p className="lead">We're passionate about delivering the best coffee experience</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm card-hover">
                <div className="card-body text-center p-4">
                  <i className="fas fa-coffee fa-3x text-coffee mb-3"></i>
                  <h5 className="card-title">Premium Quality</h5>
                  <p className="card-text">
                    We source only the finest coffee beans from around the world, 
                    ensuring exceptional quality in every cup.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm card-hover">
                <div className="card-body text-center p-4">
                  <i className="fas fa-clock fa-3x text-coffee mb-3"></i>
                  <h5 className="card-title">Fresh Daily</h5>
                  <p className="card-text">
                    Our coffee is roasted fresh daily and brewed to perfection, 
                    guaranteeing the best taste and aroma.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm card-hover">
                <div className="card-body text-center p-4">
                  <i className="fas fa-heart fa-3x text-coffee mb-3"></i>
                  <h5 className="card-title">Made with Love</h5>
                  <p className="card-text">
                    Every cup is crafted with care and passion by our skilled baristas 
                    who love what they do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-coffee-light">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h3 className="fw-bold text-coffee mb-3">Ready to Experience Great Coffee?</h3>
              <p className="mb-4">
                Visit us today or browse our menu to discover our amazing coffee selection.
              </p>
              <button 
                className="btn btn-coffee btn-lg px-4"
                onClick={() => navigate('/contact')}
              >
                <i className="fas fa-map-marker-alt me-2"></i>
                Visit Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
