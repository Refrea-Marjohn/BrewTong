import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold text-coffee mb-3">About BrewTong</h1>
            <p className="lead">Discover our story and passion for exceptional coffee</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="row mb-5">
          <div className="col-lg-6">
            <h2 className="fw-bold text-coffee mb-4">Our Story</h2>
            <p className="mb-3">
              Founded in 2015, BrewTong began as a small family business with a simple mission: 
              to serve the finest coffee in town. What started as a passion project has grown into 
              a beloved community gathering place.
            </p>
            <p className="mb-3">
              Our founders, John and Sarah, traveled the world to learn about different coffee cultures 
              and brewing techniques. They brought back not just beans, but stories, traditions, and 
              a deep respect for the craft of coffee making.
            </p>
            <p>
              Today, we continue to honor those traditions while embracing innovation, always striving 
              to provide our customers with an exceptional coffee experience.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="bg-coffee-light p-4 rounded">
              <h4 className="fw-bold text-coffee mb-3">Our Mission</h4>
              <p className="mb-3">
                To create a warm, welcoming environment where coffee lovers can enjoy 
                premium-quality beverages made with care and expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="fw-bold text-coffee text-center mb-4">Our Values</h2>
          </div>
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <i className="fas fa-leaf fa-3x text-coffee mb-3"></i>
              <h5 className="fw-bold">Sustainability</h5>
              <p>
                We're committed to sustainable practices, from sourcing ethically grown beans 
                to using eco-friendly packaging.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <i className="fas fa-users fa-3x text-coffee mb-3"></i>
              <h5 className="fw-bold">Community</h5>
              <p>
                We believe in building strong community connections and supporting local 
                farmers and suppliers.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <i className="fas fa-star fa-3x text-coffee mb-3"></i>
              <h5 className="fw-bold">Excellence</h5>
              <p>
                We never compromise on quality, ensuring every cup meets our high standards 
                for taste and presentation.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="fw-bold text-coffee text-center mb-4">Meet Our Team</h2>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold text-coffee">John Smith - Founder & Head Barista</h5>
                <p className="card-text">
                  With over 10 years of experience in specialty coffee, John leads our team 
                  in creating exceptional coffee experiences. He's a certified Q Grader and 
                  has trained baristas worldwide.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold text-coffee">Sarah Johnson - Co-Founder & Operations Manager</h5>
                <p className="card-text">
                  Sarah ensures our operations run smoothly while maintaining our commitment 
                  to quality and customer service. Her background in hospitality brings 
                  warmth to every interaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="bg-coffee-light p-4 rounded">
              <h3 className="fw-bold text-coffee mb-3">Ready to Experience Our Coffee?</h3>
              <p className="mb-3">
                Visit us today and taste the difference that passion and expertise make.
              </p>
              <button 
                className="btn btn-coffee btn-lg px-4"
                onClick={handleViewMenu}
              >
                <i className="fas fa-utensils me-2"></i>
                View Our Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
