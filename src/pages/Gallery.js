import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();

  const galleryImages = [
    {
      id: 1,
      title: 'Fresh Coffee Beans',
      description: 'Premium coffee beans from around the world',
      category: 'coffee',
      image: `${process.env.PUBLIC_URL}/images/gallery/coffee-beans.jpg`
    },
    {
      id: 2,
      title: 'Barista at Work',
      description: 'Our skilled barista crafting the perfect cup of coffee',
      category: 'barista',
      image: `${process.env.PUBLIC_URL}/images/gallery/barista-working.jpg`
    },
    {
      id: 3,
      title: 'Cozy Interior',
      description: 'Our warm and welcoming coffee shop atmosphere',
      category: 'interior',
      image: `${process.env.PUBLIC_URL}/images/gallery/interior.jpg`
    },
    {
      id: 4,
      title: 'Latte Art',
      description: 'Beautiful latte art created by our talented baristas',
      category: 'art',
      image: `${process.env.PUBLIC_URL}/images/gallery/latte-art.jpg`
    },
    {
      id: 5,
      title: 'Fresh Pastries',
      description: 'Delicious pastries baked fresh daily',
      category: 'pastries',
      image: `${process.env.PUBLIC_URL}/images/gallery/pastries.jpg`
    },
    {
      id: 6,
      title: 'Coffee Equipment',
      description: 'Professional-grade coffee brewing equipment',
      category: 'equipment',
      image: `${process.env.PUBLIC_URL}/images/gallery/equipment.jpg`
    },
    {
      id: 7,
      title: 'Outdoor Seating',
      description: 'Enjoy your coffee in our beautiful outdoor seating',
      category: 'outdoor',
      image: `${process.env.PUBLIC_URL}/images/gallery/outdoor-seating.jpg`
    },
    {
      id: 8,
      title: 'Coffee Roasting',
      description: 'We roast our beans in-house for the freshest taste',
      category: 'roasting',
      image: `${process.env.PUBLIC_URL}/images/gallery/roasting.jpg`
    },
    {
      id: 9,
      title: 'Happy Customers',
      description: 'Our customers enjoying their coffee experience',
      category: 'customers',
      image: `${process.env.PUBLIC_URL}/images/gallery/happy-customers.jpg`
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'fas fa-th' },
    { id: 'coffee', name: 'Coffee', icon: 'fas fa-coffee' },
    { id: 'barista', name: 'Barista', icon: 'fas fa-user-tie' },
    { id: 'interior', name: 'Interior', icon: 'fas fa-home' },
    { id: 'art', name: 'Latte Art', icon: 'fas fa-palette' },
    { id: 'pastries', name: 'Pastries', icon: 'fas fa-cookie-bite' },
    { id: 'equipment', name: 'Equipment', icon: 'fas fa-cogs' },
    { id: 'outdoor', name: 'Outdoor', icon: 'fas fa-tree' },
    { id: 'roasting', name: 'Roasting', icon: 'fas fa-fire' },
    { id: 'customers', name: 'Customers', icon: 'fas fa-users' }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return galleryImages;
    }
    return galleryImages.filter(image => image.category === selectedCategory);
  };

  const handleVisitUs = () => {
    navigate('/contact');
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold text-coffee mb-3">BrewTong Gallery</h1>
            <p className="lead">Take a visual journey through our coffee shop experience</p>
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

        {/* Gallery Grid */}
        <div className="row">
          {getFilteredImages().map(image => (
            <div key={image.id} className="col-lg-4 col-md-6 mb-4">
              <div className="gallery-item">
                <div className="card border-0 shadow-sm h-100 d-flex flex-column">
                  <img 
                    src={image.image} 
                    alt={image.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-coffee mb-2">{image.title}</h5>
                    <p className="card-text text-muted mb-3 flex-grow-1">{image.description}</p>
                    <span className="badge bg-coffee-secondary text-white align-self-start">
                      {categories.find(cat => cat.id === image.category)?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="bg-coffee-light p-4 rounded">
              <h3 className="fw-bold text-coffee mb-3">Experience It Yourself</h3>
              <p className="mb-3">
                These photos capture just a glimpse of what awaits you at our coffee shop. 
                Come visit us to experience the full atmosphere!
              </p>
              <button 
                className="btn btn-coffee btn-lg px-4"
                onClick={handleVisitUs}
              >
                <i className="fas fa-map-marker-alt me-2"></i>
                Visit Us Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
