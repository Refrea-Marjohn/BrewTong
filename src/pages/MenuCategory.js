import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';

const MenuCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const menuItems = {
    coffee: [
      { name: 'Espresso', price: '$3.50', description: 'Rich, full-bodied shot of pure coffee', details: 'Made with our premium Arabica beans, roasted to perfection.', image: `${process.env.PUBLIC_URL}/images/coffee/espresso.jpg` },
      { name: 'Americano', price: '$4.00', description: 'Espresso with hot water for a smooth taste', details: 'Perfect balance of strength and smoothness.', image: `${process.env.PUBLIC_URL}/images/coffee/americano.jpg` },
      { name: 'Cappuccino', price: '$4.50', description: 'Espresso with steamed milk and foam', details: 'Classic Italian coffee with perfect foam art.', image: `${process.env.PUBLIC_URL}/images/coffee/cappuccino.jpg` },
      { name: 'Latte', price: '$5.00', description: 'Espresso with steamed milk and light foam', details: 'Creamy and smooth with beautiful latte art.', image: `${process.env.PUBLIC_URL}/images/coffee/latte.jpg` },
      { name: 'Mocha', price: '$5.50', description: 'Espresso with chocolate and steamed milk', details: 'Rich chocolate flavor with premium espresso.', image: `${process.env.PUBLIC_URL}/images/coffee/mocha.jpg` },
      { name: 'Cold Brew', price: '$4.25', description: 'Smooth, cold-brewed coffee served over ice', details: 'Slow-steeped for 12 hours for maximum smoothness.', image: `${process.env.PUBLIC_URL}/images/coffee/coldbrew.jpg` }
    ],
    tea: [
      { name: 'Green Tea', price: '$3.00', description: 'Fresh, aromatic green tea leaves', details: 'High-quality Japanese Sencha green tea.', image: '/images/coffee/greentea.jpg' },
      { name: 'Black Tea', price: '$3.00', description: 'Classic English breakfast tea', details: 'Traditional English breakfast blend.', image: '/images/coffee/blacktea.jpg' },
      { name: 'Chai Latte', price: '$4.50', description: 'Spiced tea with steamed milk', details: 'Authentic Indian spices with steamed milk.', image: '/images/coffee/chailatte.jpg' },
      { name: 'Herbal Tea', price: '$3.25', description: 'Selection of caffeine-free herbal blends', details: 'Chamomile, peppermint, and other herbal options.', image: '/images/coffee/herbaltea.jpg' }
    ],
    pastries: [
      { name: 'Croissant', price: '$3.50', description: 'Buttery, flaky French pastry', details: 'Made fresh daily with European butter.', image: '/images/coffee/croissant.jpg' },
      { name: 'Muffin', price: '$3.25', description: 'Fresh baked muffin of the day', details: 'Rotating selection of seasonal flavors.', image: '/images/coffee/muffin.jpg' },
      { name: 'Danish', price: '$4.00', description: 'Sweet pastry with fruit filling', details: 'Hand-made with seasonal fruit fillings.', image: '/images/coffee/danish.jpg' },
      { name: 'Bagel', price: '$2.75', description: 'Fresh bagel with cream cheese', details: 'New York style bagels with premium cream cheese.', image: '/images/coffee/bagel.jpg' }
    ],
    specials: [
      { name: 'Coffee Flight', price: '$12.00', description: 'Taste three different coffee varieties', details: 'Sample our signature blends side by side.', image: '/images/coffee/coffeeflight.jpg' },
      { name: 'Affogato', price: '$6.00', description: 'Espresso poured over vanilla gelato', details: 'Italian dessert with premium gelato.', image: '/images/coffee/affogato.jpg' },
      { name: 'Iced Matcha Latte', price: '$5.25', description: 'Refreshing matcha with milk and ice', details: 'Ceremonial grade matcha powder.', image: '/images/coffee/matchalatte.jpg' }
    ]
  };

  const categoryNames = {
    coffee: 'Coffee',
    tea: 'Tea',
    pastries: 'Pastries',
    specials: 'Specials'
  };

  const items = menuItems[categoryId] || [];
  const categoryName = categoryNames[categoryId] || 'Unknown Category';

  const handleBackToMenu = () => {
    navigate('/menu');
  };

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

  const handleOrderItem = (itemName) => {
    navigate('/contact', { state: { orderItem: itemName } });
  };

  if (!menuItems[categoryId]) {
    return (
      <div className="text-center py-5">
        <h2 className="text-coffee">Category Not Found</h2>
        <p>This category doesn't exist in our menu.</p>
        <button className="btn btn-coffee" onClick={handleBackToMenu}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-coffee">{categoryName} Menu</h2>
        <button className="btn btn-outline-coffee" onClick={handleBackToMenu}>
          <i className="fas fa-arrow-left me-1"></i>
          Back to Full Menu
        </button>
      </div>

      <div className="row">
        {items.map((item, index) => (
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
                <p className="card-text text-muted mb-2">{item.description}</p>
                <p className="card-text small text-coffee mb-3 flex-grow-1">{item.details}</p>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-coffee btn-sm flex-grow-1"
                    onClick={() => addToCart(item)}
                  >
                    <i className="fas fa-shopping-cart me-1"></i>
                    Add to Cart
                  </button>
                  <button 
                    className="btn btn-outline-coffee btn-sm flex-grow-1"
                    onClick={() => handleOrderItem(item.name)}
                  >
                    <i className="fas fa-phone me-1"></i>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-coffee">No items available in this category</h4>
          <p>Check back later for new additions!</p>
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
