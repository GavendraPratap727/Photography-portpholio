import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Home = ({ darkMode }) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const textColor = darkMode ? '#fff' : '#000';
  const sectionBg = darkMode ? '#1a1a1a' : '#f7f7f7';
  const cardBg = darkMode ? '#2c2c2c' : '#f0f0f0';

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: darkMode ? '#0e0e0e' : '#ffffff',
        color: textColor,
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeIn ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '40px 60px',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 0 40px rgba(0,0,0,0.3)',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              color: '#fff',
              fontSize: '3.5rem',
              fontWeight: 700,
              letterSpacing: '1px',
              margin: 0
            }}
          >
            Welcome to Our Photography World
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* About Our Work */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ padding: '60px 20px', backgroundColor: sectionBg, textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>About Our Work</h2>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '800px',
          margin: 'auto',
          lineHeight: '1.8',
          opacity: 0.9
        }}>
          We’re passionate about turning everyday moments into stunning visuals. Our platform empowers creatives to upload, showcase,
          and explore a world of photographs curated with care. With smart tagging, interactive galleries, fullscreen viewing,
          and community engagement through likes and comments — this is more than just a portfolio, it's an experience.
        </p>
      </motion.div>

      {/* About Us */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ padding: '60px 20px', backgroundColor: darkMode ? '#121212' : '#fff', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>About Us</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
          {[
            { name: "Gavendra Pratap Singh", role: "Frontend Developer" },
            { name: "Agrima Gupta", role: "UX/UI Designer" },
            { name: "Aditya Sharma", role: "React Specialist" },
            { name: "Abhishek Chaudhary", role: "Logic & State Manager" },
            { name: "Abhishek Sharma", role: "Animations & Polish" }
          ].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ rotateY: 15, scale: 1.05 }}
              style={{
                backgroundColor: cardBg,
                borderRadius: '12px',
                padding: '20px',
                width: '220px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s ease',
                color: textColor
              }}
            >
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name.split(" ")[0]}`} alt={member.name}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{member.name}</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;