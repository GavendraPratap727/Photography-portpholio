import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Testimonials = ({ darkMode }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("testimonials");
    if (saved) {
      setTestimonials(JSON.parse(saved));
    }
  }, []);

  const getRandomEmoji = () => {
    const emojis = ["😊", "📸", "🌟", "🔥", "👍", "❤️", "🤩", "🎉", "🙌", "💬"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry = {
      name: name.trim() + " " + getRandomEmoji(),
      message: message.trim(),
    };

    const updatedTestimonials = [newEntry, ...testimonials].slice(0, 10);
    setTestimonials(updatedTestimonials);
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));

    setName("");
    setMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f1f1f1",
        color: darkMode ? "#fff" : "#000",
        padding: "40px 20px",
        display: "flex",
        gap: "40px",
        fontFamily: "Arial, sans-serif",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Feedback Form */}
      <div
        style={{
          background: darkMode ? "#1e1e1e" : "#fff",
          padding: "25px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>📋</span> Leave Feedback
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "none",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Testimonials List */}
      <div style={{ flex: 1, maxWidth: "700px" }}>
        <h2 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>💬</span> Testimonials
        </h2>
        {testimonials.length === 0 ? (
          <p>No feedback yet. Be the first! ✨</p>
        ) : (
          testimonials.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={{
                background: darkMode ? "#222" : "#fff",
                padding: "16px",
                borderRadius: "10px",
                marginBottom: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <strong>{entry.name}</strong>
              <p style={{ marginTop: "6px" }}>{entry.message}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Testimonials;
