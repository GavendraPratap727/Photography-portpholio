import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = ({ darkMode }) => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (!uploadedFile.type.startsWith('image/')) {
      alert("Please upload a valid image file.");
      return;
    }

    if (uploadedFile.size > 5 * 1024 * 1024) {
      setShowPopup(true);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setFile(uploadedFile);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !user || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newPhoto = {
      id: uuidv4(),
      title,
      user,
      image,
      tags: tagsInput.split(',').map(tag => tag.trim().toLowerCase())
    };

    const savedRequests = JSON.parse(localStorage.getItem('photoRequests')) || [];
    const updatedRequests = [...savedRequests, newPhoto];
    localStorage.setItem('photoRequests', JSON.stringify(updatedRequests));

    setTitle('');
    setUser('');
    setImage('');
    setTagsInput('');
    setFile(null);
    alert("Photo request submitted!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: '100vh',
        background: darkMode
          ? '#000000'
          : 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '80px 20px 20px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        transition: 'background 0.3s ease'
      }}
    >
      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
              color: '#333',
              position: 'relative',
            }}>
              <h3 style={{ marginBottom: '15px' }}>File Too Large</h3>
              <p>Please upload an image smaller than 5MB.</p>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#333'
                }}
              >
                ❌
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Form */}
      <div style={{
        maxWidth: '500px',
        width: '100%',
        padding: '30px',
        borderRadius: '16px',
        background: darkMode ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: darkMode ? '#f0f0f0' : '#333',
        transition: 'all 0.3s ease'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📤 Submit a Photo</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Photo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none'
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none'
            }}
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                marginTop: '10px',
                border: '1px solid #ddd'
              }}
            />
          )}

          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#ff6f61',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Submit Photo
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Upload;
