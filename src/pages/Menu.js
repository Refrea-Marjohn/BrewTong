import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MenuCategory from './MenuCategory';
import { useAuth } from '../firebase/AuthContext';

const Menu = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const menuItems = {
    coffee: [
      { name: 'Espresso', price: '$3.50', description: 'Rich, full-bodied shot of pure coffee', image: `${process.env.PUBLIC_URL}/images/coffee/espresso.jpg` },
      { name: 'Americano', price: '$4.00', description: 'Espresso with hot water for a smooth taste', image: `${process.env.PUBLIC_URL}/images/coffee/americano.jpg` },
      { name: 'Cappuccino', price: '$4.50', description: 'Espresso with steamed milk and foam', image: `${process.env.PUBLIC_URL}/images/coffee/cappuccino.jpg` },
      { name: 'Latte', price: '$5.00', description: 'Espresso with steamed milk and light foam', image: `${process.env.PUBLIC_URL}/images/coffee/latte.jpg` },
      { name: 'Mocha', price: '$5.50', description: 'Espresso with chocolate and steamed milk', image: `${process.env.PUBLIC_URL}/images/coffee/mocha.jpg` },
      { name: 'Cold Brew', price: '$4.25', description: 'Smooth, cold-brewed coffee served over ice', image: `${process.env.PUBLIC_URL}/images/coffee/coldbrew.jpg` }
    ],
    tea: [
      { name: 'Green Tea', price: '$3.00', description: 'Fresh, aromatic green tea leaves', image: `${process.env.PUBLIC_URL}/images/coffee/greentea.jpg` },
      { name: 'Black Tea', price: '$3.00', description: 'Classic English breakfast tea', image: `${process.env.PUBLIC_URL}/images/coffee/blacktea.jpg` },
      { name: 'Chai Latte', price: '$4.50', description: 'Spiced tea with steamed milk', image: `${process.env.PUBLIC_URL}/images/coffee/chailatte.jpg` },
      { name: 'Herbal Tea', price: '$3.25', description: 'Selection of caffeine-free herbal blends', image: `${process.env.PUBLIC_URL}/images/coffee/herbaltea.jpg` }
    ],
    pastries: [
      { name: 'Croissant', price: '$3.50', description: 'Buttery, flaky French pastry', image: `${process.env.PUBLIC_URL}/images/coffee/croissant.jpg` },
      { name: 'Muffin', price: '$3.25', description: 'Fresh baked muffin of the day', image: `${process.env.PUBLIC_URL}/images/coffee/muffin.jpg` },
      { name: 'Danish', price: '$4.00', description: 'Sweet pastry with fruit filling', image: `${process.env.PUBLIC_URL}/images/coffee/danish.jpg` },
      { name: 'Bagel', price: '$2.75', description: 'Fresh bagel with cream cheese', image: `${process.env.PUBLIC_URL}/images/coffee/bagel.jpg` }
    ],
    specials: [
      { name: 'Coffee Flight', price: '$12.00', description: 'Taste three different coffee varieties', image: `${process.env.PUBLIC_URL}/images/coffee/coffeeflight.jpg` },
      { name: 'Affogato', price: '$6.00', description: 'Espresso poured over vanilla gelato', image: `${process.env.PUBLIC_URL}/images/coffee/affogato.jpg` },
      { name: 'Iced Matcha Latte', price: '$5.25', description: 'Refreshing matcha with milk and ice', image: `${process.env.PUBLIC_URL}/images/coffee/matchalatte.jpg` }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Items', icon: 'fas fa-list' },
    { id: 'coffee', name: 'Coffee', icon: 'fas fa-coffee' },
    { id: 'tea', name: 'Tea', icon: 'fas fa-leaf' },
    { id: 'pastries', name: 'Pastries', icon: 'fas fa-cookie-bite' },
    { id: 'specials', name: 'Specials', icon: 'fas fa-star' }
  ];

  const addToCart = (item) => {
    if (!currentUser) {
      alert('Please login to add items to cart');
      navigate('/auth');
      return;
    }
    
    const cartItem = {
      id: Date.now(),
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      quantity: 1,
      addedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingCart = JSON.parse(localStorage.getItem('brewtong-cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('brewtong-cart', JSON.stringify(existingCart));
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    alert(`${item.name} added to cart!`);
  };

  const handleOrderNow = () => {
    navigate('/contact');
  };

  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return Object.values(menuItems).flat();
    }
    return menuItems[selectedCategory] || [];
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold text-coffee mb-3">BrewTong Menu</h1>
            <p className="lead">Discover our carefully crafted selection of beverages and treats</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`btn ${selectedCategory === category.id ? 'btn-coffee' : 'btn-outline-coffee'} btn-sm`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <i className={`${category.icon} me-1`}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Nested Routes for Menu Categories */}
        <Routes>
          <Route path="/" element={
            <div className="row">
              {getFilteredItems().map((item, index) => (
                <div key={index} className="col-lg-3 col-md-6 mb-4">
                  <div className="card border-0 shadow-sm h-100 card-hover">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold text-coffee mb-0">{item.name}</h5>
                        <span className="badge bg-warning text-dark fs-5 fw-bold px-3 py-2">{item.price}</span>
                      </div>
                      <p className="card-text text-muted flex-grow-1">{item.description}</p>
                      <div className="mt-3">
                        <button 
                          className="btn btn-coffee w-100"
                          onClick={() => addToCart(item)}
                        >
                          <i className="fas fa-shopping-cart me-2"></i>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          } />
          <Route path="/category/:categoryId" element={<MenuCategory />} />
        </Routes>

        {/* CTA Section */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="bg-coffee-light p-4 rounded">
              <h3 className="fw-bold text-coffee mb-3">Ready to Order?</h3>
              <p className="mb-3">
                Visit us in person or contact us to place your order. We're here to serve you!
              </p>
              <button 
                className="btn btn-coffee btn-lg px-4"
                onClick={handleOrderNow}
              >
                <i className="fas fa-phone me-2"></i>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;