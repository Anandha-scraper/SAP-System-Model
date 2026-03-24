import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginCardSection from './src/components/ui/login-signup';
import Home from './src/pages/home.jsx';

// Helper function to decode JWT and get user role
const getUserRole = () => {
  try {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role || 'employee';
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const userRole = getUserRole();

  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check user role on mount and when storage changes
    const checkUserRole = () => {
      const role = getUserRole();
      setIsAdmin(role === 'admin');
    };

    // Initial check
    checkUserRole();

    // Listen for storage changes (login/logout)
    window.addEventListener('storage', checkUserRole);

    // Also check on focus (when user returns to tab)
    window.addEventListener('focus', checkUserRole);

    // Set up an interval to periodically check (as a fallback)
    const interval = setInterval(checkUserRole, 1000);

    return () => {
      window.removeEventListener('storage', checkUserRole);
      window.removeEventListener('focus', checkUserRole);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/login" element={<LoginCardSection />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home isAdmin={isAdmin} />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
