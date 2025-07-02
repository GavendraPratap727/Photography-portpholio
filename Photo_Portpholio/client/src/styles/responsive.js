// Breakpoints
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px'
};

// Responsive styles for containers
export const containerStyles = (darkMode) => ({
  base: {
    minHeight: '100vh',
    backgroundColor: darkMode ? '#000' : '#f5f5f5',
    color: darkMode ? '#fff' : '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '80px 20px 40px',
    fontFamily: 'Arial, sans-serif',
    '@media (max-width: 768px)': {
      padding: '60px 15px 30px',
    },
    '@media (max-width: 480px)': {
      padding: '40px 10px 20px',
    }
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    background: darkMode ? '#111' : '#fff',
    borderRadius: '14px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(6px)',
    '@media (max-width: 768px)': {
      padding: '25px',
      borderRadius: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '20px',
      borderRadius: '10px',
    }
  },
  form: {
    width: '100%',
    '@media (max-width: 480px)': {
      fontSize: '14px'
    }
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: darkMode ? '1px solid #333' : '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: darkMode ? '#222' : '#fff',
    color: darkMode ? '#fff' : '#000',
    fontSize: '16px',
    '@media (max-width: 768px)': {
      padding: '10px',
      fontSize: '15px',
    },
    '@media (max-width: 480px)': {
      padding: '8px',
      fontSize: '14px',
      marginBottom: '15px',
    }
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '@media (max-width: 768px)': {
      padding: '10px',
      fontSize: '15px',
    },
    '@media (max-width: 480px)': {
      padding: '8px',
      fontSize: '14px',
    }
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
    '@media (max-width: 768px)': {
      fontSize: '22px',
      marginBottom: '25px',
    },
    '@media (max-width: 480px)': {
      fontSize: '20px',
      marginBottom: '20px',
    }
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
    margin: '24px auto',
    backgroundColor: darkMode ? 'rgba(20,20,20,0.8)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    '@media (max-width: 768px)': {
      padding: '12px 20px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    '@media (max-width: 480px)': {
      padding: '10px 15px',
      flexDirection: 'column',
      alignItems: 'stretch',
    }
  },
  navLink: {
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    color: darkMode ? '#fff' : '#000',
    '@media (max-width: 768px)': {
      padding: '6px 12px',
      fontSize: '14px',
    },
    '@media (max-width: 480px)': {
      padding: '8px',
      textAlign: 'center',
    }
  }
});
