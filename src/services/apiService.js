// apiService.js - Consolidated API service using JSON Server
import axios from 'axios';
import apiData from '../../jsondata/api.json';

// Base URL for JSON Server (adjust port as needed)
const BASE_URL = 'http://localhost:3000';

// Axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic API response handler
const handleApiResponse = async (request) => {
  try {
    const response = await request;
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Network error',
      status: error.response?.status || 0
    };
  }
};

// Dashboard API functions
export const dashboardApi = {
  // Get dashboard data
  getDashboardData: () => handleApiResponse(apiClient.get('/dashboard')),

  // Get analytics data
  getAnalyticsData: () => handleApiResponse(apiClient.get('/analytics')),

  // Get cloud usage data
  getCloudUsageData: () => handleApiResponse(apiClient.get('/cloudUsage')),

  // Get settings data
  getSettingsData: () => handleApiResponse(apiClient.get('/settings')),

  // Approve budget request
  approveBudgetRequest: (requestId) => handleApiResponse(
    apiClient.put(`/budgetRequests/${requestId}`, { status: 'approved' })
  ),

  // Reject budget request
  rejectBudgetRequest: (requestId) => handleApiResponse(
    apiClient.put(`/budgetRequests/${requestId}`, { status: 'rejected' })
  ),

  // Get budget requests
  getBudgetRequests: () => handleApiResponse(apiClient.get('/budgetRequests')),

  // Create budget request
  createBudgetRequest: (requestData) => handleApiResponse(
    apiClient.post('/budgetRequests', {
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString()
    })
  )
};

// User API functions
export const userApi = {
  // Get all users
  getUsers: () => handleApiResponse(apiClient.get('/users')),

  // Get user by ID
  getUser: (userId) => handleApiResponse(apiClient.get(`/users/${userId}`)),

  // Create new user
  createUser: (userData) => handleApiResponse(
    apiClient.post('/users', {
      ...userData,
      createdAt: new Date().toISOString(),
      avatar: null
    })
  ),

  // Update user
  updateUser: (userId, userData) => handleApiResponse(
    apiClient.put(`/users/${userId}`, userData)
  ),

  // Delete user
  deleteUser: (userId) => handleApiResponse(
    apiClient.delete(`/users/${userId}`)
  ),

  // Change password
  changePassword: (passwordData) => handleApiResponse(
    apiClient.post('/auth/change-password', passwordData)
  ),

  // Update user profile
  updateProfile: (profileData) => handleApiResponse(
    apiClient.put('/profile', {
      ...profileData,
      updatedAt: new Date().toISOString()
    })
  )
};

// Department API functions
export const departmentApi = {
  // Get all departments
  getDepartments: () => handleApiResponse(apiClient.get('/departments')),

  // Get department by ID
  getDepartment: (deptId) => handleApiResponse(apiClient.get(`/departments/${deptId}`)),

  // Create new department
  createDepartment: (deptData) => handleApiResponse(
    apiClient.post('/departments', deptData)
  ),

  // Update department
  updateDepartment: (deptId, deptData) => handleApiResponse(
    apiClient.put(`/departments/${deptId}`, deptData)
  ),

  // Delete department
  deleteDepartment: (deptId) => handleApiResponse(
    apiClient.delete(`/departments/${deptId}`)
  )
};

// Budget API functions
export const budgetApi = {
  // Get all budgets
  getBudgets: () => handleMockApiResponse(apiData.budgets),

  // Get budget by ID
  getBudget: (budgetId) => handleMockApiResponse(
    apiData.budgets.find(budget => budget.id === budgetId)
  ),

  // Create new budget
  createBudget: (budgetData) => handleMockApiResponse({
    ...budgetData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }),

  // Update budget
  updateBudget: (budgetId, budgetData) => handleMockApiResponse({
    ...apiData.budgets.find(budget => budget.id === budgetId),
    ...budgetData
  }),

  // Delete budget
  deleteBudget: (budgetId) => handleMockApiResponse(
    { message: 'Budget deleted successfully' }
  )
};

// Alert API functions
export const alertApi = {
  // Get all alerts
  getAlerts: () => handleMockApiResponse(apiData.alerts),

  // Create new alert
  createAlert: (alertData) => handleMockApiResponse({
    ...alertData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }),

  // Update alert
  updateAlert: (alertId, alertData) => handleMockApiResponse({
    ...apiData.alerts.find(alert => alert.id === alertId),
    ...alertData
  }),

  // Delete alert
  deleteAlert: (alertId) => handleMockApiResponse(
    { message: 'Alert deleted successfully' }
  ),

  // Mark alert as read
  markAlertAsRead: (alertId) => handleMockApiResponse(
    { message: 'Alert marked as read' }
  )
};

// Resource API functions
export const resourceApi = {
  // Get all resources
  getResources: () => handleMockApiResponse(apiData.resources),

  // Get resource by ID
  getResource: (resourceId) => handleMockApiResponse(
    apiData.resources.find(resource => resource.id === resourceId)
  ),

  // Create new resource
  createResource: (resourceData) => handleMockApiResponse({
    ...resourceData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }),

  // Update resource
  updateResource: (resourceId, resourceData) => handleMockApiResponse({
    ...apiData.resources.find(resource => resource.id === resourceId),
    ...resourceData
  }),

  // Delete resource
  deleteResource: (resourceId) => handleMockApiResponse(
    { message: 'Resource deleted successfully' }
  )
};

// Activity Log API functions
export const activityApi = {
  // Get activity logs
  getActivityLogs: (params = {}) => handleMockApiResponse(apiData.activityLogs),

  // Create activity log entry
  createActivityLog: (activityData) => handleMockApiResponse({
    ...activityData,
    id: Date.now(),
    timestamp: new Date().toISOString()
  })
};

// Export all APIs as a single object
export const api = {
  dashboard: dashboardApi,
  users: userApi,
  departments: departmentApi,
  budgets: budgetApi,
  alerts: alertApi,
  resources: resourceApi,
  activity: activityApi
};

export default api;
