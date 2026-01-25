# How to Use Your Cloud Usage Tracking System

## Quick Start - 3 Steps

### Step 1: Access the Dashboard Pages
Your application now has two new pages:

**Department Usage Tracker**
- URL: `http://localhost:5173/department-usage` (or your dev server)
- Shows usage by department
- Helps you see which team is using most cloud resources

**Employee Usage Tracker**
- URL: `http://localhost:5173/employee-usage`
- Shows usage by individual employee
- Helps you identify high-cost users

### Step 2: Choose a Date & Filter
Both pages allow you to:
1. Select any date with available data (defaults to 2025-12-10)
2. Filter by department (optional)
3. Search for employees (optional)

### Step 3: Analyze the Data
Charts and tables show:
- Total costs
- Hours consumed
- Service breakdown
- Individual metrics

---

## Detailed Usage Guide

## DepartmentUsageTracker

### What It Does
Shows cloud service usage aggregated at the **department level** for any given day.

### How to Use

1. **Select a Date**
   ```
   Dropdown: Select Date
   - 2025-12-10 (latest data)
   - 2025-12-09
   ```

2. **Filter by Department** (optional)
   ```
   Dropdown: Filter Department
   - All Departments (default)
   - DevOps
   - AI Team
   - Frontend
   - Marketing
   ```

3. **View Results**
   You'll see:
   - **Stats Cards**: 
     - Total Cost Today: $1,310 (all departments for selected date)
     - Departments Active: 4 (number of departments using services)
     - Avg Hours Used: 7.8h per department
   
   - **Cost by Department Chart**: Bar chart showing which department spent most
   
   - **Cost Distribution Chart**: Pie chart showing cost percentage split
   
   - **Detailed Table**: Service-by-service breakdown
     ```
     Department | Service         | Hours | Cost   | Details
     DevOps     | Compute Engine  | 8     | $240   | vms: 12
     DevOps     | VPC Network     | 8     | $120   | bandwidth: 2.5GB
     DevOps     | Cloud Storage   | 6     | $80    | storage: 150GB
     ...
     ```

### Example Queries

**"Which department used the most compute resources today?"**
1. Go to Department Usage Tracker
2. Look at the "Cost by Department" bar chart
3. AI Team has highest bar = highest compute cost

**"How much did DevOps spend on storage today?"**
1. Go to Department Usage Tracker
2. Filter by DevOps department
3. Look at Cloud Storage row in the table
4. Cost shown: $80

**"How many hours did each department use cloud services?"**
1. Look at "Avg Hours Used" stat card
2. Check table for each department's total hours

---

## EmployeeUsageTracker

### What It Does
Shows cloud service usage at the **employee level**, tracking individual consumption.

### How to Use

1. **Select a Date**
   ```
   Dropdown: Select Date (same as DepartmentUsageTracker)
   ```

2. **Filter by Department** (optional)
   ```
   Dropdown: Department
   - All Departments (default)
   - DevOps
   - AI Team
   - Frontend
   - Marketing
   ```

3. **Search for Employee** (optional)
   ```
   Text Box: Search Employee
   - Type name: "John", "Jane", "Manager"
   - Type ID: "user_002", "user_004"
   ```

4. **View Results**
   You'll see:
   - **Stats Cards**: 
     - Employees Active: 3
     - Total Cost: $830
     - Avg Hours: 4.7h per employee
     - Max Cost: $410 (highest individual user)
   
   - **Top 10 by Cost Chart**: Bar chart of highest-cost employees
     - Click on any bar to see that employee's history trend
   
   - **Employee History Chart** (appears after clicking): 
     - Line chart showing that employee's cost over multiple days
   
   - **Detailed Table**: Employee-by-employee breakdown
     ```
     Employee Name | Department | Hours | Cost  | Services Used
     John Doe      | AI Team    | 6     | $410  | Compute Engine, BigQuery, Databases
     Manager User  | DevOps     | 4     | $220  | Compute Engine, VPC Network, Cloud Storage
     Regular User  | Frontend   | 4     | $120  | Cloud Storage, Databases
     ```

### Example Queries

**"Who is the highest-cost cloud user today?"**
1. Go to Employee Usage Tracker
2. Look at "Max Cost" stat card = $410
3. Find highest bar in "Top 10 by Cost" chart = John Doe
4. Or sort the table by Cost column (highest first)

**"How much is each DevOps team member spending?"**
1. Go to Employee Usage Tracker
2. Filter by "DevOps" department
3. See all DevOps employees in the table
4. See individual costs next to each name

**"What's John Doe's usage trend over time?"**
1. Go to Employee Usage Tracker
2. Click on John Doe's bar in the "Top 10 by Cost" chart
3. A line chart appears showing his cost trend
4. Can see if he's using more or less over time

**"How many hours is each employee working with cloud services?"**
1. Look at "Avg Hours" stat card for average per employee
2. Check "Hours Used" column in the table for each person

---

## Real-World Scenarios

### Scenario 1: Cost Overrun Analysis
**Situation**: Your AWS bill jumped to $1,310 today (December 10)

**Solution**:
1. Go to DepartmentUsageTracker
2. See which department caused it
3. You find AI Team spent $680 (highest)
4. Click filter to view only AI Team
5. See that BigQuery queries cost $220
6. Drill down: See John Doe (AI Team) spent $410 total
7. Understand: John's BigQuery work is expensive

### Scenario 2: Department Budget Check
**Situation**: DevOps department has $400/day budget

**Solution**:
1. Go to DepartmentUsageTracker
2. Filter by DevOps
3. See total cost: $440 (over budget!)
4. Check which service is most expensive
5. Compute Engine: $240 (60% of cost)
6. Recommendation: Optimize VM instances

### Scenario 3: Fair Cost Allocation
**Situation**: Need to charge department for cloud costs

**Solution**:
1. Go to EmployeeUsageTracker
2. Filter by department you want to bill
3. Note each employee's usage
4. Use data to allocate costs fairly:
   - Manager User ($220) + Regular User ($X) = Team cost
5. Bill department based on actual usage

### Scenario 4: Identify Inefficiencies
**Situation**: Some employees might be wasting resources

**Solution**:
1. Go to EmployeeUsageTracker
2. Sort by cost (highest first)
3. Find outliers (unusually high users)
4. Click on their name to see history
5. If cost is stable: expected
6. If cost spikes: might be inefficiency
7. Contact employee to optimize usage

---

## Data Interpretation

### What Each Metric Means

**Hours Used**: How long the resource was active
- Example: Compute Engine 8 hours = VM ran for 8 hours

**Cost**: Dollar amount charged for that service
- Calculated as: Usage × Hourly Rate
- Example: 8 hours VM × $30/hour = $240

**Total Cost**: Sum of all services for department/employee
- Example: DevOps: $240 (compute) + $120 (network) + $80 (storage) = $440

**Average Hours**: Mean hours per department or employee
- Example: 4 departments used avg 7.8 hours each

---

## Adding More Data

Your data currently covers:
- December 9, 2025: Previous day usage
- December 10, 2025: Current day usage

### To Add More Historical Data
Edit `jsondata/api.json`:

1. Find `departmentDailyUsage` array
2. Add new entry:
```json
{
  "date": "2025-12-11",
  "departmentId": 1,
  "departmentName": "DevOps",
  "services": {
    "Compute Engine": { "hours": 7, "cost": 210, "vms": 10 },
    "VPC Network": { "hours": 7, "cost": 105, "bandwidth": "2.2GB" },
    "Cloud Storage": { "hours": 5, "cost": 70, "storage": "140GB" }
  },
  "totalCost": 385,
  "totalHours": 7
}
```

3. Also add corresponding employee data in `employeeUsageTracking`

---

## Tips & Tricks

### Tip 1: Use Filters Effectively
- Filter by date → see daily breakdown
- Filter by department → focus on one team
- Use employee search → find specific person

### Tip 2: Click Interactive Charts
- DepartmentUsageTracker: Click bars to select department
- EmployeeUsageTracker: Click bars to see individual trends

### Tip 3: Read the Tables
- Tables show detailed service breakdown
- Useful for understanding WHERE the cost comes from

### Tip 4: Compare Metrics
- Compare "Hours Used" vs "Cost"
- If hours are high but cost is low → cheap service
- If hours are low but cost is high → expensive service

### Tip 5: Date Range Analysis
- Check different dates in dropdown
- See if costs increase/decrease over time
- Identify trends (e.g., Friday spike, Monday dip)

---

## Common Questions

**Q: Where do I navigate to these pages?**
A: In your browser:
- `http://localhost:5173/department-usage`
- `http://localhost:5173/employee-usage`
(Replace localhost:5173 with your actual dev server URL)

**Q: Can I see data for dates other than Dec 9-10?**
A: Currently only those dates are in the data. To add more:
1. Edit `jsondata/api.json`
2. Add entries with new dates
3. New dates appear in the dropdown

**Q: Why is Employee ABC not showing any usage?**
A: They either:
1. Didn't use any cloud services that day
2. Haven't been added to `employeeUsageTracking` yet
3. Are on a different department (check filters)

**Q: How accurate is the cost data?**
A: Currently using sample/mock data. When you connect to:
- Real database: As accurate as your input data
- Cloud provider API: Real billing data from provider
- JSON Server: As accurate as you update the JSON

**Q: Can I export this data?**
A: Not built-in yet, but you can:
- Screenshot the tables
- Use browser dev tools to copy table data
- Plan to add CSV export feature later

---

## Next Steps

### Once You're Comfortable with Current Data:
1. ✅ Test both pages with current data
2. ✅ Understand the dashboard layouts
3. ✅ Practice filtering and searching
4. 📋 Connect real cloud data (AWS/GCP/Azure)
5. 📋 Set up automated daily syncing
6. 📋 Create billing reports for teams

### To Connect Real Data:
See `CLOUD_DATA_FLOW_GUIDE.md` for detailed instructions on integrating:
- AWS Cost Explorer
- GCP Cloud Billing
- Azure Cost Management
- Or your custom database

---

## Support

- **Quick Questions**: See `USAGE_TRACKING_QUICKSTART.md`
- **Architecture Questions**: See `CLOUD_DATA_FLOW_GUIDE.md`
- **Code Questions**: Check comments in:
  - `src/pages/DepartmentUsageTracker.jsx`
  - `src/pages/EmployeeUsageTracker.jsx`
  - `src/services/apiService.js`

---

Happy analyzing! 📊
