import React, { useState, useEffect } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    // Load cart items from localStorage for demo
    const savedCart = JSON.parse(localStorage.getItem('brewtong-cart') || '[]');
    
    // Convert cart items to order format
    const cartOrders = savedCart.map((item, index) => ({
      id: `cart-${item.id}`,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      items: [{ name: item.name, price: item.price, quantity: item.quantity }],
      total: item.price,
      status: 'pending',
      notes: 'Added to cart',
      createdAt: item.addedAt
    }));
    
    // Sort by creation date (newest first)
    cartOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setOrders(cartOrders);
    setLoading(false);
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'bg-warning text-dark',
      'preparing': 'bg-info text-white',
      'ready': 'bg-success text-white',
      'completed': 'bg-secondary text-white',
      'cancelled': 'bg-danger text-white'
    };
    
    return statusClasses[status] || 'bg-secondary text-white';
  };

  if (loading) {
    return (
      <div className="py-5">
        <div className="container text-center">
          <div className="spinner-border text-coffee" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold text-coffee">
                <i className="fas fa-shopping-cart me-2"></i>
                Cart
              </h1>
              <div className="d-flex gap-2">
                <span className="text-muted">Welcome, {currentUser.email}</span>
                <button className="btn btn-outline-coffee" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart fa-4x text-coffee mb-3"></i>
            <h3 className="text-coffee">Your Cart is Empty</h3>
            <p className="text-muted">Add some delicious items to your cart!</p>
            <button 
              className="btn btn-coffee btn-lg"
              onClick={() => navigate('/menu')}
            >
              <i className="fas fa-utensils me-2"></i>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="row">
            {orders.map(order => (
              <div key={order.id} className="col-lg-6 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title fw-bold text-coffee mb-0">
                        Cart Item #{order.id.slice(-6).toUpperCase()}
                      </h5>
                      <span className={`badge ${getStatusBadge(order.status)} fs-6 px-3 py-2`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="fw-bold text-coffee mb-2">Items:</h6>
                      <ul className="list-unstyled">
                        {order.items.map((item, index) => (
                          <li key={index} className="d-flex justify-content-between mb-1">
                            <span>{item.name}</span>
                            <span className="fw-bold text-coffee">{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Total Amount:</small>
                        <div className="fw-bold text-coffee fs-5">{order.total}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Order Date:</small>
                        <div className="fw-bold">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-3">
                        <small className="text-muted">Notes:</small>
                        <p className="mb-0">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
