import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Upload from './pages/Upload';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
  };

  const appStyle = {
    backgroundColor: darkMode ? '#0e0e0e' : '#fafafa',
    color: darkMode ? '#ffffff' : '#000000',
    minHeight: '100vh',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    transition: 'all 0.3s ease',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
    backgroundColor: darkMode ? 'rgba(20,20,20,0.8)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    margin: '24px auto',
    maxWidth: '95%',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };

  const linkStyle = {
    color: darkMode ? '#fff' : '#000',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  };

  const toggleStyle = {
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: darkMode ? '#333' : '#e0e0e0',
    color: darkMode ? '#fff' : '#000',
    border: 'none',
    fontWeight: '500',
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    fontSize: '15px',
    backgroundColor: darkMode ? '#1a1a1a' : '#f1f1f1',
    marginTop: '40px',
    borderTop: '1px solid #ccc',
  };

  return (
    <Router>
      <div style={appStyle}>
        {/* Navbar */}
        <motion.nav
          style={navStyle}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.h2
            style={{ margin: 0, fontWeight: '700', fontSize: '22px' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            📸 PhotoPortfolio
          </motion.h2>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                {["Home", "Gallery", "Upload", "Contact", "Testimonials"].map((text, index) => (
                  <motion.div
                    key={text}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to={`/${text.toLowerCase() === "home" ? "" : text.toLowerCase()}`}
                      style={{
                        ...linkStyle,
                        backgroundColor: 'transparent',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = darkMode ? '#2a2a2a' : '#eaeaea';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      {text}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  onClick={handleLogout}
                  style={{
                    ...toggleStyle,
                    backgroundColor: darkMode ? '#333' : '#e0e0e0',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    style={{
                      ...linkStyle,
                      backgroundColor: 'transparent',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = darkMode ? '#2a2a2a' : '#eaeaea';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/signup"
                    style={{
                      ...linkStyle,
                      backgroundColor: 'transparent',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = darkMode ? '#2a2a2a' : '#eaeaea';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Signup
                  </Link>
                </motion.div>
              </>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              style={toggleStyle}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              {darkMode ? '🌞 Light' : '🌙 Dark'}
            </motion.button>
          </div>
        </motion.nav>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} darkMode={darkMode} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} darkMode={darkMode} />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home darkMode={darkMode} />
            </ProtectedRoute>
          } />
          <Route path="/gallery" element={
            <ProtectedRoute>
              <Gallery darkMode={darkMode} />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <Upload darkMode={darkMode} />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact darkMode={darkMode} />
            </ProtectedRoute>
          } />
          <Route path="/testimonials" element={
            <ProtectedRoute>
              <Testimonials darkMode={darkMode} />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin darkMode={darkMode} />
            </ProtectedRoute>
          } />
        </Routes>

        {/* Footer */}
        <footer style={footerStyle}>
          <p>
            📍 Navigate:{" "}
            <Link to="/" style={linkStyle}>Home</Link> |{" "}
            <Link to="/gallery" style={linkStyle}>Gallery</Link> |{" "}
            <Link to="/upload" style={linkStyle}>Upload</Link> |{" "}
            <Link to="/contact" style={linkStyle}>Contact</Link> |{" "}
            <Link to="/testimonials" style={linkStyle}>Testimonials</Link>
          </p>
          <p style={{ fontSize: '13px', opacity: 0.6 }}>© 2025 PhotoPortfolio. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
