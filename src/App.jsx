// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";
=======
>>>>>>> d46ff063e79b603d63eb020067bed31b3690854d
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CloudDashboard from "./pages/CloudDashboard";
import Analytics from "./pages/Analytics";
import CloudStorage from "./pages/CloudStorage";
import Settings from "./pages/Settings";
<<<<<<< HEAD
import DepartmentUsageTracker from "./pages/DepartmentUsageTracker";
import EmployeeUsageTracker from "./pages/EmployeeUsageTracker";
=======
>>>>>>> d46ff063e79b603d63eb020067bed31b3690854d

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
<<<<<<< HEAD
          <Route path="/" element={<LandingPage />} />
=======
>>>>>>> d46ff063e79b603d63eb020067bed31b3690854d
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CloudDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cloud-storage"
            element={
              <ProtectedRoute>
                <CloudStorage />
              </ProtectedRoute>
            }
          />
          <Route
<<<<<<< HEAD
            path="/department-usage"
            element={
              <ProtectedRoute>
                <DepartmentUsageTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-usage"
            element={
              <ProtectedRoute>
                <EmployeeUsageTracker />
              </ProtectedRoute>
            }
          />
          <Route
=======
>>>>>>> d46ff063e79b603d63eb020067bed31b3690854d
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
<<<<<<< HEAD
          <Route path="*" element={<Navigate to="/" replace />} />
=======
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
>>>>>>> d46ff063e79b603d63eb020067bed31b3690854d
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
