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

// Mock API response handler
const handleMockApiResponse = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data,
        status: 200
      });
    }, 300);
  });
};

// Dashboard API functions
export const dashboardApi = {
  // Get dashboard data
  getDashboardData: () => handleMockApiResponse(apiData.dashboard),

  // Get analytics data
  getAnalyticsData: () => handleMockApiResponse(apiData.analytics),

  // Get cloud usage data
  getCloudUsageData: () => handleMockApiResponse(apiData.cloudUsage),

  // Get settings data
  getSettingsData: () => handleMockApiResponse(apiData.settings),

  // Approve budget request
  approveBudgetRequest: (requestId) => handleMockApiResponse({ id: requestId, status: 'approved' }),

  // Reject budget request
  rejectBudgetRequest: (requestId) => handleMockApiResponse({ id: requestId, status: 'rejected' }),

  // Get budget requests
  getBudgetRequests: () => handleMockApiResponse(apiData.budgetRequests),

  // Create budget request
  createBudgetRequest: (requestData) => handleMockApiResponse({
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString()
    })
};

// User API functions
export const userApi = {
  // Get all users
  getUsers: () => handleMockApiResponse(apiData.users),

  // Get user by ID
  getUser: (userId) => handleMockApiResponse(
    apiData.users.find(user => user.id === userId)
  ),

  // Create new user
  createUser: (userData) => handleMockApiResponse({
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      avatar: null
    }),

  // Update user
  updateUser: (userId, userData) => handleMockApiResponse({
    ...apiData.users.find(user => user.id === userId),
    ...userData
  }),

  // Delete user
  deleteUser: (userId) => handleMockApiResponse(
    { message: 'User deleted successfully' }
  ),

  // Change password
  changePassword: (passwordData) => handleMockApiResponse(
    { success: true, message: 'Password changed successfully' }
  ),

  // Update user profile
  updateProfile: (profileData) => handleMockApiResponse({
      ...profileData,
      updatedAt: new Date().toISOString()
    })
};

// Department API functions
export const departmentApi = {
  // Get all departments
  getDepartments: () => handleMockApiResponse(apiData.departments),

  // Get department by ID
  getDepartment: (deptId) => handleMockApiResponse(
    apiData.departments.find(dept => dept.id === deptId)
  ),

  // Create new department
  createDepartment: (deptData) => handleMockApiResponse({
    ...deptData,
    id: Date.now().toString()
  }),

  // Update department
  updateDepartment: (deptId, deptData) => handleMockApiResponse({
    ...apiData.departments.find(dept => dept.id === deptId),
    ...deptData
  }),

  // Delete department
  deleteDepartment: (deptId) => handleMockApiResponse(
    { message: 'Department deleted successfully' }
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

// Department Usage API functions
export const departmentUsageApi = {
  // Get department daily usage for a specific date
  getDepartmentDailyUsage: (date) => {
    return handleApiResponse(
      apiClient.get('/departmentDailyUsage', {
        params: { date }
      })
    );
  },

  // Get department usage for a date range
  getDepartmentUsageRange: (startDate, endDate) => {
    return handleApiResponse(
      apiClient.get('/departmentDailyUsage', {
        params: { 
          date_gte: startDate,
          date_lte: endDate
        }
      })
    );
  },

  // Get all department usage
  getAllDepartmentUsage: () => handleApiResponse(
    apiClient.get('/departmentDailyUsage')
  ),

  // Get usage by department ID and date
  getDepartmentUsageById: (departmentId, date) => {
    return handleApiResponse(
      apiClient.get('/departmentDailyUsage', {
        params: { departmentId, date }
      })
    );
  },

  // Get department usage summary (by department, aggregated)
  getDepartmentUsageSummary: async () => {
    try {
      const result = await handleApiResponse(
        apiClient.get('/departmentDailyUsage')
      );
      
      if (!result.success) return result;
      
      const summary = {};
      result.data.forEach(usage => {
        if (!summary[usage.departmentId]) {
          summary[usage.departmentId] = {
            departmentId: usage.departmentId,
            departmentName: usage.departmentName,
            totalCost: 0,
            totalHours: 0,
            cloudProvidersCost: {}
          };
        }
        summary[usage.departmentId].totalCost += usage.totalCost;
        summary[usage.departmentId].totalHours += usage.totalHours;
        
        Object.entries(usage.cloudProviders).forEach(([provider, data]) => {
          if (!summary[usage.departmentId].cloudProvidersCost[provider]) {
            summary[usage.departmentId].cloudProvidersCost[provider] = 0;
          }
          summary[usage.departmentId].cloudProvidersCost[provider] += data.cost;
        });
      });
      return {
        success: true,
        data: Object.values(summary),
        status: 200
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get department summary',
        status: 0
      };
    }
  }
};

// Employee Usage API functions
export const employeeUsageApi = {
  // Get employee usage for a specific date
  getEmployeeDailyUsage: (date) => {
    return handleApiResponse(
      apiClient.get('/employeeUsageTracking', {
        params: { date }
      })
    );
  },

  // Get employee usage for a date range
  getEmployeeUsageRange: (startDate, endDate) => {
    return handleApiResponse(
      apiClient.get('/employeeUsageTracking', {
        params: { 
          date_gte: startDate,
          date_lte: endDate
        }
      })
    );
  },

  // Get all employee usage
  getAllEmployeeUsage: () => handleApiResponse(
    apiClient.get('/employeeUsageTracking')
  ),

  // Get usage by employee ID and date
  getEmployeeUsageById: (employeeId, date) => {
    return handleApiResponse(
      apiClient.get('/employeeUsageTracking', {
        params: { employeeId, date }
      })
    );
  },

  // Get usage by employee ID (all dates)
  getEmployeeUsageHistory: (employeeId) => {
    return handleApiResponse(
      apiClient.get('/employeeUsageTracking', {
        params: { employeeId }
      })
    );
  },

  // Get employee usage summary (by employee, aggregated)
  getEmployeeUsageSummary: async () => {
    try {
      const result = await handleApiResponse(
        apiClient.get('/employeeUsageTracking')
      );
      
      if (!result.success) return result;
      
      const summary = {};
      result.data.forEach(usage => {
        if (!summary[usage.employeeId]) {
          summary[usage.employeeId] = {
            employeeId: usage.employeeId,
            employeeName: usage.employeeName,
            department: usage.department,
            totalCost: 0,
            totalHours: 0,
            cloudProvidersCost: {}
          };
        }
        summary[usage.employeeId].totalCost += usage.totalCost;
        summary[usage.employeeId].totalHours += usage.totalHours;
        
        Object.entries(usage.cloudProviders).forEach(([provider, data]) => {
          if (!summary[usage.employeeId].cloudProvidersCost[provider]) {
            summary[usage.employeeId].cloudProvidersCost[provider] = 0;
          }
          summary[usage.employeeId].cloudProvidersCost[provider] += data.cost;
        });
      });
      return {
        success: true,
        data: Object.values(summary),
        status: 200
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get employee summary',
        status: 0
      };
    }
  },

  // Get usage by department
  getUsageByDepartment: (department) => {
    return handleApiResponse(
      apiClient.get('/employeeUsageTracking', {
        params: { department }
      })
    );
  }
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
  activity: activityApi,
  departmentUsage: departmentUsageApi,
  employeeUsage: employeeUsageApi,
  activity: activityApi
};

export default api;
