import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Check if there's an order item from the menu
  const orderItem = location.state?.orderItem;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (orderItem) {
        // Create order in localStorage for demo
        const orderData = {
          userId: currentUser?.uid || 'guest',
          userEmail: formData.email,
          userName: formData.name,
          userPhone: formData.phone,
          items: [{ name: orderItem, price: 'TBD', quantity: 1 }],
          total: 'TBD',
          status: 'pending',
          notes: formData.message,
          createdAt: new Date().toISOString()
        };

        // Save to localStorage for demo
        const existingOrders = JSON.parse(localStorage.getItem('brewtong-orders') || '[]');
        existingOrders.push(orderData);
        localStorage.setItem('brewtong-orders', JSON.stringify(existingOrders));
        setSuccess(true);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        // Regular contact form - save to localStorage for demo
        const contactData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          createdAt: new Date().toISOString()
        };

        // Save to localStorage for demo
        const existingContacts = JSON.parse(localStorage.getItem('brewtong-contacts') || '[]');
        existingContacts.push(contactData);
        localStorage.setItem('brewtong-contacts', JSON.stringify(existingContacts));
        
        setSuccess(true);
        
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }

    setLoading(false);
  };

  const handleCallNow = () => {
    window.open('tel:+1234567890');
  };

  const handleEmailUs = () => {
    window.open('mailto:info@coffeeshop.com');
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold text-coffee mb-3">Contact BrewTong</h1>
            <p className="lead">Get in touch with us - we'd love to hear from you!</p>
            {orderItem && (
              <div className="alert alert-success mt-3">
                <i className="fas fa-shopping-cart me-2"></i>
                <strong>Order Request:</strong> You're interested in ordering <strong>{orderItem}</strong>. 
                Please fill out the form below and we'll get back to you with details!
              </div>
            )}
            {success && (
              <div className="alert alert-success mt-3">
                <i className="fas fa-check-circle me-2"></i>
                <strong>Success!</strong> {orderItem ? 'Your order has been submitted!' : 'Your message has been sent!'}
                {orderItem && <div>Redirecting to your dashboard...</div>}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="fw-bold text-coffee mb-4">Get In Touch</h3>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-map-marker-alt fa-2x text-coffee me-3"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Address</h6>
                      <p className="mb-0 text-muted">
                        123 Coffee Street<br />
                        Downtown District<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-phone fa-2x text-coffee me-3"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Phone</h6>
                      <p className="mb-0 text-muted">(123) 456-7890</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-envelope fa-2x text-coffee me-3"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Email</h6>
                      <p className="mb-0 text-muted">info@brewtong.com</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-clock fa-2x text-coffee me-3"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Hours</h6>
                      <p className="mb-0 text-muted">
                        Mon-Fri: 6:00 AM - 8:00 PM<br />
                        Sat-Sun: 7:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-coffee"
                    onClick={handleCallNow}
                  >
                    <i className="fas fa-phone me-2"></i>
                    Call Now
                  </button>
                  <button 
                    className="btn btn-outline-coffee"
                    onClick={handleEmailUs}
                  >
                    <i className="fas fa-envelope me-2"></i>
                    Email Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form">
              <h3 className="fw-bold text-coffee mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label fw-bold">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-bold">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-bold">Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-coffee btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        {orderItem ? 'Submitting Order...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        {orderItem ? 'Submit Order' : 'Send Message'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="bg-coffee-light p-4 text-center">
                  <h4 className="fw-bold text-coffee mb-3">Find Us</h4>
                  <p className="mb-3">
                    We're conveniently located in the heart of downtown. 
                    Come visit us for a great coffee experience!
                  </p>
                  <div className="bg-white p-3 rounded d-inline-block">
                    <i className="fas fa-map fa-3x text-coffee"></i>
                    <p className="mt-2 mb-0 fw-bold">Interactive Map Coming Soon</p>
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

export default Contact;
