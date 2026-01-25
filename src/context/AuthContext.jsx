// Authentication Context for managing auth state across the app

import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, login as authLogin, logout as authLogout, register as authRegister } from '../utils/auth';

const usersData = [
  {
    "id": "user_001",
    "name": "Admin User",
    "email": "admin@cloudcost.com",
    "password": "admin123",
    "role": "admin",
    "department": "IT",
    "phone": "1234567890",
    "avatar": null,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": "user_002",
    "name": "Manager User",
    "email": "manager@cloudcost.com",
    "password": "manager123",
    "role": "manager",
    "department": "DevOps",
    "phone": "1234567891",
    "avatar": null,
    "createdAt": "2025-01-02T00:00:00.000Z"
  },
  {
    "id": "user_003",
    "name": "Regular User",
    "email": "user@cloudcost.com",
    "password": "user123",
    "role": "user",
    "department": "Frontend",
    "phone": "1234567892",
    "avatar": null,
    "createdAt": "2025-01-03T00:00:00.000Z"
  },
  {
    "id": "user_004",
    "name": "John Doe",
    "email": "john@cloudcost.com",
    "password": "john123",
    "role": "user",
    "department": "AI Team",
    "phone": "1234567893",
    "avatar": null,
    "createdAt": "2024-01-04T00:00:00.000Z"
  },
  {
    "id": "user_005",
    "name": "Jane Smith",
    "email": "jane@cloudcost.com",
    "password": "jane123",
    "role": "manager",
    "department": "Marketing",
    "phone": "1234567894",
    "avatar": null,
    "createdAt": "2024-01-05T00:00:00.000Z"
  }
];

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(usersData);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const result = authLogin(email, password, users);
      
      if (result.success) {
        setUser(result.user);
        return { success: true };
      }
      
      return { success: false, message: result.message };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const result = authRegister(userData, users);
      
      if (result.success) {
        // Add new user to users array
        setUsers([...users, result.newUser]);
        setUser(result.user);
        return { success: true };
      }
      
      return { success: false, message: result.message };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration' };
    }
  };

  // Logout function
  const logout = () => {
    authLogout();
    setUser(null);
  };

  // Update user profile
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update in users array
    setUsers(users.map(u => u.id === updatedUser.id ? { ...u, ...updates } : u));
  };

  const value = {
    user,
    users,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
