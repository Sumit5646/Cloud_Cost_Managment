# Cloud Cost Management - Quick Reference

## What's New

### 1. ✅ Enhanced Data Structure
Your `jsondata/api.json` now includes:
- **departmentDailyUsage**: Daily cloud service usage tracked by department
- **employeeUsageTracking**: Daily cloud service usage tracked by employee

### 2. ✅ New API Functions
Added to `src/services/apiService.js`:

**Department Usage API:**
```javascript
departmentUsageApi.getDepartmentDailyUsage(date)
departmentUsageApi.getDepartmentUsageRange(startDate, endDate)
departmentUsageApi.getDepartmentUsageById(departmentId, date)
departmentUsageApi.getDepartmentUsageSummary()
departmentUsageApi.getAllDepartmentUsage()
```

**Employee Usage API:**
```javascript
employeeUsageApi.getEmployeeDailyUsage(date)
employeeUsageApi.getEmployeeUsageRange(startDate, endDate)
employeeUsageApi.getEmployeeUsageById(employeeId, date)
employeeUsageApi.getEmployeeUsageHistory(employeeId)
employeeUsageApi.getEmployeeUsageSummary()
employeeUsageApi.getUsageByDepartment(department)
```

### 3. ✅ New Pages Created

**DepartmentUsageTracker** (`/department-usage`)
- View department cloud service usage by date
- Filter by specific department
- See cost breakdown by service
- Visual charts (bar chart, pie chart)
- Detailed table with metrics

**EmployeeUsageTracker** (`/employee-usage`)
- View employee cloud service usage by date
- Search for specific employees
- View top 10 employees by cost
- Click to see individual employee cost trends
- Detailed table with employee metrics

### 4. ✅ Navigation Routes Added
Updated `src/App.jsx` with new routes:
- `/department-usage` - Department Usage Tracker page
- `/employee-usage` - Employee Usage Tracker page

---

## How to Use

### View Department Usage
1. Navigate to `/department-usage`
2. Select a date from the dropdown
3. Optionally filter by department
4. See:
   - Total cost breakdown
   - Services used
   - Hours consumed
   - Visual charts
   - Detailed metrics table

### View Employee Usage
1. Navigate to `/employee-usage`
2. Select a date and department (optional)
3. Search for an employee (optional)
4. Click on any bar in the chart to see that employee's cost trend
5. See detailed usage table with all employees

---

## Data Structure Example

### Department Daily Usage
```json
{
  "date": "2025-12-10",
  "departmentId": 1,
  "departmentName": "DevOps",
  "services": {
    "Compute Engine": {
      "hours": 8,
      "cost": 240,
      "vms": 12
    },
    "VPC Network": {
      "hours": 8,
      "cost": 120,
      "bandwidth": "2.5GB"
    },
    "Cloud Storage": {
      "hours": 6,
      "cost": 80,
      "storage": "150GB"
    }
  },
  "totalCost": 440,
  "totalHours": 8
}
```

### Employee Daily Usage
```json
{
  "date": "2025-12-10",
  "employeeId": "user_002",
  "employeeName": "Manager User",
  "department": "DevOps",
  "services": {
    "Compute Engine": {
      "hours": 4,
      "cost": 120,
      "instances": 3
    },
    "VPC Network": {
      "hours": 4,
      "cost": 60,
      "bandwidth": "1.2GB"
    },
    "Cloud Storage": {
      "hours": 3,
      "cost": 40,
      "storage": "75GB"
    }
  },
  "totalCost": 220,
  "totalHours": 4
}
```

---

## Key Metrics Tracked

### Per Department
- **Total Daily Cost**: Sum of all service costs
- **Total Hours**: Compute hours used
- **Service Breakdown**: Cost and usage per service
- **Department Size**: Number of active employees

### Per Employee
- **Total Daily Cost**: Cost attributed to employee
- **Hours Used**: Compute hours worked
- **Services Used**: List of cloud services accessed
- **Department Assignment**: Which team they belong to

---

## Real-World Integration

### Current: Static JSON
- Data in `jsondata/api.json`
- Mock API responses with simulated delay

### For Production: Connect Real Data Source

**Option 1: JSON Server (for development)**
```bash
npm install -g json-server
json-server --watch jsondata/api.json --port 3000
```

**Option 2: Database + Backend API**
- MongoDB/PostgreSQL database
- Node.js/Express REST API
- Update `BASE_URL` in apiService.js

**Option 3: Cloud Provider Direct Integration**
- AWS Cost Explorer API
- GCP Cloud Billing API
- Azure Cost Management API

See `CLOUD_DATA_FLOW_GUIDE.md` for detailed integration instructions.

---

## File Changes Summary

### New Files Created
- `src/pages/DepartmentUsageTracker.jsx` - Department usage dashboard
- `src/pages/EmployeeUsageTracker.jsx` - Employee usage dashboard
- `CLOUD_DATA_FLOW_GUIDE.md` - Comprehensive architecture guide

### Files Modified
- `jsondata/api.json` - Added departmentDailyUsage and employeeUsageTracking
- `src/services/apiService.js` - Added departmentUsageApi and employeeUsageApi
- `src/App.jsx` - Added routes for new pages

---

## Next Steps

### Short Term
1. Test the new pages by navigating to `/department-usage` and `/employee-usage`
2. Add navigation links in your Sidebar component to these new pages
3. Customize the dashboard colors and layout to match your brand

### Medium Term
1. Add date range filters (currently shows single date)
2. Add export functionality (CSV/PDF reports)
3. Add cost alerting when usage exceeds thresholds
4. Create department budgets and track actual vs budgeted

### Long Term
1. Integrate with real cloud provider APIs
2. Implement automated daily data sync
3. Add cost forecasting and trend analysis
4. Add chargeback/billing reports for departments
5. Implement role-based access (admins see all, managers see only their department)

---

## FAQ

**Q: How do I add more employees/departments?**
A: Update the `jsondata/api.json` file with new entries in the `departmentDailyUsage` and `employeeUsageTracking` arrays.

**Q: Can I track usage for multiple days?**
A: Yes! Use `getDepartmentUsageRange()` or `getEmployeeUsageRange()` APIs to get data for date ranges.

**Q: How do I connect to a real database?**
A: Replace the mock API functions with actual API calls. See `CLOUD_DATA_FLOW_GUIDE.md` for examples.

**Q: How is cost calculated?**
A: Cost = (service usage × hourly rate) + platform fees. Configure rates in your database/cloud provider settings.

---

## Support & Documentation

- **Architecture Guide**: See `CLOUD_DATA_FLOW_GUIDE.md`
- **API Reference**: Check `src/services/apiService.js` for all available functions
- **Component Code**: Review `src/pages/DepartmentUsageTracker.jsx` and `EmployeeUsageTracker.jsx`

---

Last Updated: January 10, 2026
