# Cloud Cost Management System - Architecture & Data Flow Guide

## Overview
This guide explains how cloud data flows from your company to the admin dashboard and how to track department/employee cloud service usage.

---

## 1. Data Flow Architecture

### High-Level Flow Diagram

```
Company Cloud Provider (AWS/GCP/Azure)
        ↓
Cloud Billing API / Export System
        ↓
ETL Process (Extract, Transform, Load)
        ↓
JSON Data Store (jsondata/api.json)
        ↓
API Service Layer (apiService.js)
        ↓
React Components & Pages
        ↓
Admin Dashboard / Usage Trackers
```

---

## 2. Step-by-Step Data Flow Explanation

### Step 1: Data Collection from Cloud Provider
Your company's cloud provider (AWS, GCP, Azure) generates billing and usage data:
- **Compute instances** (VMs running, CPU hours)
- **Storage usage** (GB stored per day)
- **Network bandwidth** (data transferred)
- **Database connections and queries**
- **Service-specific metrics** (BigQuery datasets, VPC network usage)

### Step 2: Extract & Transform (ETL)
Data is collected from the cloud provider through:
- **Cloud Billing APIs** - Real-time usage data
- **CSV/JSON exports** - Batch exports from billing dashboard
- **Webhook integrations** - Real-time events

This raw data is transformed into a standardized format.

### Step 3: Data Storage
Currently, your system uses **static JSON data** in `jsondata/api.json`:

```json
{
  "departmentDailyUsage": [
    {
      "date": "2025-12-10",
      "departmentId": 1,
      "departmentName": "DevOps",
      "services": {
        "Compute Engine": { "hours": 8, "cost": 240, "vms": 12 },
        "VPC Network": { "hours": 8, "cost": 120, "bandwidth": "2.5GB" },
        "Cloud Storage": { "hours": 6, "cost": 80, "storage": "150GB" }
      },
      "totalCost": 440,
      "totalHours": 8
    }
  ],
  "employeeUsageTracking": [
    {
      "date": "2025-12-10",
      "employeeId": "user_002",
      "employeeName": "Manager User",
      "department": "DevOps",
      "services": { /* service details */ },
      "totalCost": 220,
      "totalHours": 4
    }
  ]
}
```

### Step 4: API Service Layer
The `apiService.js` provides methods to query and retrieve data:

```javascript
// Get department usage for a specific date
await departmentUsageApi.getDepartmentDailyUsage("2025-12-10");

// Get employee usage summary
await employeeUsageApi.getEmployeeUsageSummary();

// Get usage by department ID
await departmentUsageApi.getDepartmentUsageById(1, "2025-12-10");
```

### Step 5: React Components Display Data
Components consume API data and display it:
- **DepartmentUsageTracker** - Shows usage by department
- **EmployeeUsageTracker** - Shows usage by employee
- **CloudDashboard** - Overall cost overview
- **Analytics** - Trends and patterns

---

## 3. Tracking Department Cloud Service Usage

### Data Structure for Department Usage

Each department's daily usage includes:
- **date**: Day of usage (YYYY-MM-DD)
- **departmentId**: Department identifier
- **departmentName**: Department name
- **services**: Breakdown by service type
  - **Compute Engine**: VM hours and instance count
  - **Cloud Storage**: Storage amount and cost
  - **BigQuery**: Query count and cost
  - **VPC Network**: Bandwidth and cost
  - **Databases**: Connection count and cost
- **totalCost**: Total daily cost for department
- **totalHours**: Total compute hours used

### Query Examples

**Get daily usage for DevOps department:**
```javascript
const result = await departmentUsageApi.getDepartmentDailyUsage("2025-12-10");
// Returns all departments' usage for 2025-12-10
```

**Get usage summary (aggregated across all dates):**
```javascript
const summary = await departmentUsageApi.getDepartmentUsageSummary();
// Returns:
// [
//   { departmentId: 1, departmentName: "DevOps", totalCost: 825, ... },
//   { departmentId: 2, departmentName: "AI Team", totalCost: 1290, ... }
// ]
```

**Get usage for date range:**
```javascript
const range = await departmentUsageApi.getDepartmentUsageRange("2025-12-09", "2025-12-10");
```

---

## 4. Tracking Employee Cloud Service Usage

### Data Structure for Employee Usage

Each employee's daily usage includes:
- **date**: Day of usage
- **employeeId**: Unique employee identifier
- **employeeName**: Employee name
- **department**: Department assignment
- **services**: Breakdown by service
  - Cost per service
  - Hours used
  - Specific metrics (instances, storage, queries, etc.)
- **totalCost**: Total daily cost attributed to employee
- **totalHours**: Total hours worked with cloud services

### Query Examples

**Get all employees' usage for a day:**
```javascript
const result = await employeeUsageApi.getEmployeeDailyUsage("2025-12-10");
```

**Get single employee's usage history:**
```javascript
const history = await employeeUsageApi.getEmployeeUsageHistory("user_002");
// Returns all days of usage for this employee
```

**Get employee summary (aggregated):**
```javascript
const summary = await employeeUsageApi.getEmployeeUsageSummary();
// Returns total cost per employee across all dates
```

**Filter by department:**
```javascript
const devOpsUsage = await employeeUsageApi.getUsageByDepartment("DevOps");
```

---

## 5. Dashboard Features

### DepartmentUsageTracker Page
Location: `src/pages/DepartmentUsageTracker.jsx`

**Features:**
- ✅ Select date to view department usage for that day
- ✅ Filter by specific department
- ✅ View cost breakdown by department
- ✅ See service-wise cost distribution
- ✅ Detailed table with service-level metrics
- ✅ Visual charts (bar chart, pie chart)

**Key Metrics Displayed:**
- Total cost for selected day/department
- Number of active departments
- Average hours used per department
- Cost by service type

### EmployeeUsageTracker Page
Location: `src/pages/EmployeeUsageTracker.jsx`

**Features:**
- ✅ Select date and filter by department
- ✅ Search for specific employees
- ✅ View top 10 employees by cost
- ✅ Click on employee to see their usage trend
- ✅ Detailed table with employee-level usage

**Key Metrics Displayed:**
- Active employees count
- Total cost for selected filters
- Average hours per employee
- Maximum cost (highest user)
- Employee usage history (cost trend over time)

---

## 6. Implementation: Real-World Data Integration

### Current State (Static JSON)
Your system currently uses **static JSON files**. For real-world usage:

### Option 1: Use JSON Server (For Development)
```bash
npm install -g json-server

# Serve the JSON file
json-server --watch jsondata/api.json --port 3000
```

Then update `apiService.js` to use the actual API:
```javascript
const BASE_URL = 'http://localhost:3000';

export const departmentUsageApi = {
  getDepartmentDailyUsage: (date) => 
    apiClient.get(`/departmentDailyUsage?date=${date}`)
};
```

### Option 2: Connect to Real Database (MongoDB/PostgreSQL)
1. Create a **Node.js/Express backend**
2. Connect to your database
3. Implement endpoints that match your API structure
4. Update `BASE_URL` in `apiService.js`

Example endpoint:
```
GET /api/department-usage?date=2025-12-10
GET /api/employee-usage?department=DevOps&date=2025-12-10
POST /api/usage/sync (to sync data from cloud provider)
```

### Option 3: Connect to Cloud Provider API Directly

**For AWS:**
```javascript
import AWS from 'aws-sdk';

const costExplorer = new AWS.CostExplorer();
const params = {
  TimePeriod: { Start: '2025-12-10', End: '2025-12-10' },
  Granularity: 'DAILY',
  Metrics: ['UnblendedCost']
};

const data = await costExplorer.getCostAndUsage(params).promise();
```

**For GCP:**
```javascript
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const query = `
  SELECT date, service.description, sum(cost) as daily_cost
  FROM \`project.dataset.gcp_billing_export_v1_*\`
  WHERE DATE(_TABLE_SUFFIX) = '2025-12-10'
  GROUP BY date, service.description
`;

const [rows] = await bigquery.query({query});
```

---

## 7. Data Update Strategy

### Automated Daily Sync
Create a backend job that runs daily:

```javascript
// backend/jobs/syncCloudData.js
const cron = require('node-cron');
const { syncAWSData } = require('../services/awsService');
const { saveToDatabase } = require('../db/repository');

// Run every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Starting cloud data sync...');
  
  try {
    const awsUsage = await syncAWSData();
    const gcpUsage = await syncGCPData();
    
    // Transform and aggregate by department/employee
    const aggregatedData = await aggregateUsageData(awsUsage, gcpUsage);
    
    // Save to database
    await saveToDatabase(aggregatedData);
    
    console.log('Cloud data sync completed');
  } catch (error) {
    console.error('Sync failed:', error);
  }
});
```

---

## 8. Key Concepts

### Cost Attribution Models

1. **Direct Assignment**: Cost assigned directly to user (based on API key/role)
   ```json
   {
     "employeeId": "user_002",
     "service": "Compute Engine",
     "cost": 120
   }
   ```

2. **Department-Level Sharing**: Cost split equally among department members
   ```javascript
   departmentCost = totalCost / departmentEmployeeCount
   ```

3. **Resource-Based Allocation**: Cost based on resource ownership
   ```javascript
   employeeCost = (employeeResources / totalResources) * serviceCost
   ```

### Daily Aggregation

Data is aggregated at multiple levels:
- **By Service**: What services cost how much
- **By Department**: Which department spent what
- **By Employee**: Which employee consumed what
- **By Date**: Daily, weekly, monthly breakdown

---

## 9. API Reference

### Department Usage API

| Method | Purpose |
|--------|---------|
| `getDepartmentDailyUsage(date)` | Get all departments' usage for a specific date |
| `getDepartmentUsageRange(start, end)` | Get usage for a date range |
| `getDepartmentUsageById(deptId, date)` | Get specific department's usage |
| `getDepartmentUsageSummary()` | Get aggregated usage per department |
| `getAllDepartmentUsage()` | Get all department usage data |

### Employee Usage API

| Method | Purpose |
|--------|---------|
| `getEmployeeDailyUsage(date)` | Get all employees' usage for a date |
| `getEmployeeUsageRange(start, end)` | Get usage for date range |
| `getEmployeeUsageById(empId, date)` | Get specific employee's usage |
| `getEmployeeUsageHistory(empId)` | Get employee's usage across all dates |
| `getEmployeeUsageSummary()` | Get aggregated usage per employee |
| `getUsageByDepartment(deptName)` | Get all employees in a department |

---

## 10. Next Steps

### For Development:
1. ✅ Data structure is set up
2. ✅ API functions are implemented
3. ✅ UI components are created
4. 📋 Next: Add routing to new pages in App.jsx

### For Production:
1. Replace mock API with real database
2. Integrate with cloud provider APIs
3. Set up automated daily sync jobs
4. Implement cost allocation rules
5. Add real-time alerting for cost anomalies
6. Create reports and export functionality

---

## 11. File Structure

```
src/
├── pages/
│   ├── DepartmentUsageTracker.jsx   (NEW) - Department-level analytics
│   ├── EmployeeUsageTracker.jsx     (NEW) - Employee-level analytics
│   └── CloudDashboard.jsx           - Overall dashboard
├── services/
│   └── apiService.js                (UPDATED) - Added usage APIs
└── context/
    └── AuthContext.jsx              - User authentication

jsondata/
└── api.json                         (UPDATED) - Added usage data
```

---

## 12. Cost Calculation Examples

### Example: DevOps Department - Dec 10, 2025

| Service | Hours | VMs/Storage | Cost |
|---------|-------|-------------|------|
| Compute Engine | 8 | 12 VMs | $240 |
| VPC Network | 8 | 2.5GB | $120 |
| Cloud Storage | 6 | 150GB | $80 |
| **Total** | **8h** | - | **$440** |

**Attribution to Employee (John, 50% of workload):**
- Compute: $240 × 50% = $120
- VPC: $120 × 50% = $60
- Storage: $80 × 50% = $40
- **Total: $220**

---

## Summary

Your cloud cost management system now has:
1. **Structured data** for department and employee usage tracking
2. **API layer** for querying usage data
3. **UI dashboards** for visualizing usage patterns
4. **Date-based filtering** to track daily usage
5. **Service-level breakdown** to see cost by service type

The system is ready to scale from static JSON to a production database with real cloud provider integrations!
