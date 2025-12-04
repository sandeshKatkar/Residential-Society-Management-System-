import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageOwners from './pages/ManageOwners';
import ManageComplaints from './pages/ManageComplaints';
import ManageNotices from './pages/ManageNotices';
import OwnerDashboard from './pages/OwnerDashboard';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/owner/dashboard'} />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/owners"
        element={
          <PrivateRoute role="admin">
            <ManageOwners />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/complaints"
        element={
          <PrivateRoute role="admin">
            <ManageComplaints />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/notices"
        element={
          <PrivateRoute role="admin">
            <ManageNotices />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/owner/dashboard"
        element={
          <PrivateRoute role="owner">
            <OwnerDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;