import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './firebase/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './App.css';

function AppRoutes() {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={currentUser ? <Home /> : <Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu/*" element={<Menu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/auth" element={<Auth />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isAuthPage = location.pathname === '/auth' || (location.pathname === '/' && !currentUser);
  
  return (
    <div className="App">
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? 'auth-main' : ''}>
        <AppRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
