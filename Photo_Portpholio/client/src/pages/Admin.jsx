import { useState, useEffect } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState([]);
  const [gallery, setGallery] = useState([]);

  const correctPassword = 'admin123'; // Change if needed

  // Fetch the requests and gallery from localStorage on component mount
  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('photoRequests')) || [];
    const savedGallery = JSON.parse(localStorage.getItem('approvedPhotos')) || [];
    setRequests(savedRequests);
    setGallery(savedGallery);
  }, []);

  // Handle authentication logic
  const handleAuth = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('❌ Wrong password!');
    }
  };

  // Handle approval of photo request
  const approveRequest = (id) => {
    const photo = requests.find((req) => req.id === id);
    if (!photo) return;

    // Check if already approved to avoid duplicates
    const alreadyApproved = gallery.some((img) => img.id === photo.id);
    if (!alreadyApproved) {
      const updatedGallery = [...gallery, photo];
      setGallery(updatedGallery);
      localStorage.setItem('approvedPhotos', JSON.stringify(updatedGallery));
    }

    // Remove from requests
    const updatedRequests = requests.filter((req) => req.id !== id);
    setRequests(updatedRequests);
    localStorage.setItem('photoRequests', JSON.stringify(updatedRequests));
  };

  // Handle deletion of photo request
  const deleteRequest = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo request?");
    if (!confirmDelete) return;

    const updatedRequests = requests.filter((req) => req.id !== id);
    setRequests(updatedRequests);
    localStorage.setItem('photoRequests', JSON.stringify(updatedRequests));
  };

  // Handle deletion of approved photo from the gallery
  const deleteApprovedPhoto = (id) => {
    const confirmDelete = window.confirm("Delete this photo from approved gallery?");
    if (!confirmDelete) return;

    const updatedGallery = gallery.filter((img) => img.id !== id);
    setGallery(updatedGallery);
    localStorage.setItem('approvedPhotos', JSON.stringify(updatedGallery));
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>🔐 Admin Login</h2>
        <form onSubmit={handleAuth}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px' }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  // Main Admin Panel
  return (
    <div style={{ padding: '40px' }}>
      <h1>📥 Pending Photo Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {requests.map((req) => (
            <div key={req.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '200px',
              background: '#f9f9f9'
            }}>
              <img src={req.image} alt={req.title} style={{ width: '100%', borderRadius: '5px' }} />
              <h3>{req.title}</h3>
              {req.user && <p>By: {req.user}</p>}
              <button onClick={() => approveRequest(req.id)} style={{ marginRight: '10px' }}>✅ Approve</button>
              <button onClick={() => deleteRequest(req.id)}>🗑️ Delete</button>
            </div>
          ))}
        </div>
      )}

      <hr style={{ margin: '40px 0' }} />

      <h1>✅ Approved Gallery</h1>
      {gallery.length === 0 ? (
        <p>No approved photos yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {gallery.map((img) => (
            <div key={img.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '200px',
              background: '#e8ffe8'
            }}>
              <img src={img.image} alt={img.title} style={{ width: '100%', borderRadius: '5px' }} />
              <h3>{img.title}</h3>
              {img.user && <p>By: {img.user}</p>}
              <button
                onClick={() => deleteApprovedPhoto(img.id)}
                style={{ marginTop: '8px', background: '#ffdddd' }}
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
