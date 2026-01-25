# Quick Reference - Updated Cloud Dashboard

## What's New?

### 📊 Dashboard Features

**Department Usage Tracker**
- Filter by date (July 2025 - December 2025)
- See which cloud provider (AWS, Azure, Google Cloud) each department uses
- Compare costs across providers
- View detailed breakdown in table

**Employee Usage Tracker**
- Search employees and filter by department
- View top 10 spenders
- Click employee to see:
  - 6-month cloud provider cost distribution
  - Monthly cost trend
  - Individual cloud spending patterns

---

## Data Overview

### 6 Months of Data
- **Start**: July 1, 2025
- **End**: December 1, 2025
- **Updated**: Daily snapshot at month start

### 4 Departments
1. **DevOps** - Infrastructure ($1K-$1.5K/month)
2. **AI Team** - Machine Learning ($1.5K-$2.2K/month)
3. **Frontend** - Web Apps ($530-$910/month)
4. **Marketing** - Analytics ($370-$750/month)

### 4 Key Employees
- John Doe (DevOps)
- Sarah Smith (AI Team)
- Mike Johnson (Frontend)
- Emma Wilson (Marketing)

### 3 Cloud Providers
- **AWS** - Compute, Storage, Databases
- **Azure** - VMs, SQL, App Services
- **Google Cloud** - Compute, Cloud Storage, BigQuery

---

## How to Use

### 1️⃣ View Department Costs
```
Department Usage Tracker
  ↓
Select Date (e.g., 2025-07-01)
  ↓
Choose Department (or All)
  ↓
See Charts:
  - Cost by Department (bar)
  - Cost Distribution (pie)
  - Cost by Provider (bar)
  ↓
View detailed table breakdown
```

### 2️⃣ View Employee Costs
```
Employee Usage Tracker
  ↓
Select Date (e.g., 2025-07-01)
  ↓
Filter by Department (optional)
  ↓
Search Employee (optional)
  ↓
See Top 10 employees by cost
  ↓
Click employee bar to expand
  ↓
View:
  - Provider cost distribution
  - 6-month trend line
```

---

## Key Metrics

### Total 6-Month Spend (All Departments)

| Department | AWS | Azure | Google Cloud | Total |
|-----------|-----|-------|--------------|-------|
| DevOps | $3,370 | $1,970 | $2,400 | $7,740 |
| AI Team | $4,650 | $3,200 | $3,950 | $11,800 |
| Frontend | $1,570 | $1,180 | $1,315 | $4,065 |
| Marketing | $1,225 | $910 | $1,095 | $3,230 |
| **TOTAL** | **$11,815** | **$7,260** | **$8,760** | **$27,835** |

---

## Sample Queries

### "How much did AI Team spend on AWS in September?"
→ Department Usage Tracker → Select 2025-09-01 → Filter AI Team → View AWS cost: $700

### "Which employee uses the most Google Cloud?"
→ Employee Usage Tracker → Filter employees → Look at GoogleCloud cost in table

### "Show me 6-month trend for Sarah Smith"
→ Employee Usage Tracker → Search "Sarah Smith" → Click her bar → View trend line chart

### "Compare AWS vs Azure spending across all departments"
→ Department Usage Tracker → View "Cost by Cloud Provider" chart → See AWS bar taller than Azure

---

## File Structure

```
jsondata/
  └── api.json (UPDATED)
      ├── departmentDailyUsage (24 records)
      ├── employeeUsageTracking (24 records)
      └── users (3 records)

src/pages/
  ├── DepartmentUsageTracker.jsx (UPDATED)
  │   └── Shows cloud provider costs by department
  ├── EmployeeUsageTracker.jsx (UPDATED)
  │   └── Shows cloud provider costs by employee
  └── ...other pages...
```

---

## Color Coding

- **AWS**: Primary colors
- **Azure**: Blue tones
- **GoogleCloud**: Cyan/turquoise accents
- **Cost**: Green text ($)
- **Totals**: Bold cyan/blue

---

## Tips & Tricks

✅ **Multi-month analysis**: Select different dates to see trends
✅ **Department focus**: Use department filter to isolate costs
✅ **Employee accountability**: Track individual cloud spending
✅ **Cost comparison**: View which provider is most expensive
✅ **Usage patterns**: See 6-month trends for planning

---

## What Data Is Tracked?

Per Department (per date):
- Cloud provider breakdown (AWS/Azure/Google Cloud)
- Cost per provider
- Services used
- Usage metrics (instances, storage, etc.)

Per Employee (per date):
- Cloud provider breakdown
- Cost per provider
- Total hours used
- Department assignment

---

## Integration Ready

The data structure is designed for easy integration with:
- AWS Cost Explorer API
- Azure Cost Management API
- Google Cloud Billing API
- Any custom billing system

Simply replace the mock data fetch with real API calls!

---

**Version**: 2.0 (Cloud Provider Edition)
**Last Updated**: January 10, 2026
**Data Period**: July 2025 - December 2025
