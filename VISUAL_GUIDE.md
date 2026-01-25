# Visual Guide - Cloud Usage Tracking System

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUD USAGE TRACKING SYSTEM                  │
└─────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ STEP 1: DATA SOURCES                                           │
│                                                                │
│  Cloud Provider (AWS/GCP/Azure)                               │
│         ↓                                                      │
│  Billing APIs & Usage Data                                    │
│         ↓                                                      │
│  Real-time metrics + Historical data                          │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ STEP 2: DATA COLLECTION & TRANSFORMATION                       │
│                                                                │
│  Extract → Transform → Load (ETL)                             │
│  - Format cloud data                                          │
│  - Aggregate by department                                    │
│  - Aggregate by employee                                      │
│  - Calculate costs                                            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ STEP 3: DATA STORAGE                                           │
│                                                                │
│  JSON File (Current)        Database (Production)             │
│  ├─ departmentDailyUsage    ├─ departmentDailyUsage table    │
│  └─ employeeUsageTracking   └─ employeeUsageTracking table   │
│                                                                │
│  jsondata/api.json         ← Real-time synced data →          │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ STEP 4: API SERVICE LAYER                                      │
│                                                                │
│  apiService.js                                                │
│  ├─ departmentUsageApi                                        │
│  │  ├─ getDepartmentDailyUsage()                             │
│  │  ├─ getDepartmentUsageRange()                             │
│  │  └─ getDepartmentUsageSummary()                           │
│  └─ employeeUsageApi                                          │
│     ├─ getEmployeeDailyUsage()                               │
│     ├─ getEmployeeUsageHistory()                             │
│     └─ getEmployeeUsageSummary()                             │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ STEP 5: REACT COMPONENTS                                       │
│                                                                │
│  DepartmentUsageTracker     EmployeeUsageTracker              │
│  /department-usage          /employee-usage                   │
│  ├─ Date selector          ├─ Date selector                   │
│  ├─ Department filter      ├─ Department filter              │
│  ├─ Cost charts            ├─ Cost charts                     │
│  └─ Detailed tables        ├─ Search box                      │
│                            └─ History trend view              │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ STEP 6: ADMIN DASHBOARD                                        │
│                                                                │
│  Admin views:                                                 │
│  ✓ Department costs                                           │
│  ✓ Employee costs                                             │
│  ✓ Service breakdown                                          │
│  ✓ Cost trends                                                │
│  ✓ Anomaly detection                                          │
└────────────────────────────────────────────────────────────────┘
```

---

## Dashboard Layout - Department Usage Tracker

```
┌─────────────────────────────────────────────────────────────────┐
│  Department Usage Tracker     [🌙]                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📊 Filters:                                                    │
│  ┌──────────────────────────┬──────────────────────────────────┐
│  │ 📅 Select Date:          │ 🔍 Filter Department:           │
│  │ ┌──────────────────────┐ │ ┌──────────────────────────────┐│
│  │ │ 2025-12-10          │ │ │ All Departments              ││
│  │ │ 2025-12-09          │ │ │ DevOps                       ││
│  │ └──────────────────────┘ │ │ AI Team                      ││
│  │                          │ │ Frontend                     ││
│  └──────────────────────────┴──────────────────────────────────┘
│
│  📈 Stats Cards:
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  │ 💰 Total Cost│  │ 📊 Depts     │  │ ⏱️ Avg Hours │
│  │ Today        │  │ Active       │  │ Used         │
│  │              │  │              │  │              │
│  │  $1,310      │  │  4           │  │  7.8h        │
│  └──────────────┘  └──────────────┘  └──────────────┘
│
│  📊 Charts:
│  ┌────────────────────────┐  ┌────────────────────────┐
│  │ Cost by Department     │  │ Cost Distribution      │
│  │                        │  │                        │
│  │   AI ████████ $680     │  │    DevOps  ▒  29%      │
│  │   DevOps █████ $440    │  │    AI Team ▓  52%      │
│  │   Marketing ██ $280    │  │    Marketing ▒ 19%    │
│  │   Frontend █ $190      │  │                        │
│  │                        │  │                        │
│  └────────────────────────┘  └────────────────────────┘
│
│  📋 Detailed Usage Table:
│  ┌────────────┬──────────────────┬────────┬─────────┐
│  │ Department │ Service          │ Hours  │ Cost    │
│  ├────────────┼──────────────────┼────────┼─────────┤
│  │ DevOps     │ Compute Engine   │ 8h     │ $240    │
│  │ DevOps     │ VPC Network      │ 8h     │ $120    │
│  │ DevOps     │ Cloud Storage    │ 6h     │ $80     │
│  │ AI Team    │ Compute Engine   │ 10h    │ $300    │
│  │ AI Team    │ BigQuery         │ 9h     │ $220    │
│  │ ...        │ ...              │ ...    │ ...     │
│  └────────────┴──────────────────┴────────┴─────────┘
│
└─────────────────────────────────────────────────────────────────┘
```

---

## Dashboard Layout - Employee Usage Tracker

```
┌─────────────────────────────────────────────────────────────────┐
│  Employee Usage Tracker                [🌙]                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔍 Filters:                                                    │
│  ┌──────────────────────┬──────────────┬──────────────────────┐
│  │ 📅 Date:            │ 🔍 Depart:  │ 🔎 Search Employee:  │
│  │ 2025-12-10         │ All Depts   │ [_____________]        │
│  └──────────────────────┴──────────────┴──────────────────────┘
│
│  📈 Stats Cards:
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐
│  │ 👥 Empl.   │  │ 💰 Total     │  │ ⏱️ Avg Hours│  │ 📈 Max Cost│
│  │ Active      │  │ Cost         │  │              │  │            │
│  │             │  │              │  │              │  │            │
│  │ 3           │  │ $830         │  │ 4.7h         │  │ $410       │
│  └─────────────┘  └──────────────┘  └──────────────┘  └────────────┘
│
│  📊 Top 10 Employees by Cost:
│  ┌────────────────────────────┐  ┌────────────────────────────┐
│  │ Top 10 by Cost             │  │ John Doe - Cost Trend      │
│  │                            │  │ (click bar to see this)    │
│  │  John █████████ $410       │  │                            │
│  │  Manager ████ $220         │  │  Cost $$                   │
│  │  Regular ██ $120           │  │        ╱╲                 │
│  │  (click bar for history)   │  │       ╱  ╲__              │
│  │                            │  │      ╱                     │
│  │                            │  │  Date: 12/9  12/10        │
│  └────────────────────────────┘  └────────────────────────────┘
│
│  📋 Employee Usage Details Table:
│  ┌────────────────┬──────────┬──────┬─────────┬──────────────────┐
│  │ Employee Name  │ Dept     │ Hrs  │ Cost    │ Services Used    │
│  ├────────────────┼──────────┼──────┼─────────┼──────────────────┤
│  │ John Doe       │ AI Team  │ 6h   │ $410    │ Compute, BigQ    │
│  │ Manager User   │ DevOps   │ 4h   │ $220    │ Compute, VPC     │
│  │ Regular User   │ Frontend │ 4h   │ $120    │ Storage, DB      │
│  └────────────────┴──────────┴──────┴─────────┴──────────────────┘
│
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Example

### Example: Tracking DevOps Department Usage on Dec 10

```
STEP 1: Raw Data from Cloud Provider
─────────────────────────────────────
AWS CloudWatch / Billing API sends:
┌─────────────────────────────────┐
│ Service: EC2                     │
│ Instances: 12 running           │
│ Hours: 8                         │
│ Cost: $240                       │
│                                  │
│ Service: VPC                     │
│ Data Transfer: 2.5 GB           │
│ Cost: $120                       │
│                                  │
│ Service: S3                      │
│ Storage: 150 GB                 │
│ Cost: $80                        │
└─────────────────────────────────┘

STEP 2: Transform & Aggregate
──────────────────────────────
Group by: Department, Date
┌─────────────────────────────────┐
│ Department: DevOps              │
│ Date: 2025-12-10                │
│ Services: {                     │
│   "Compute Engine": {           │
│     hours: 8,                   │
│     cost: 240,                  │
│     vms: 12                     │
│   },                            │
│   "VPC Network": {              │
│     hours: 8,                   │
│     cost: 120,                  │
│     bandwidth: "2.5GB"          │
│   },                            │
│   "Cloud Storage": {            │
│     hours: 6,                   │
│     cost: 80,                   │
│     storage: "150GB"            │
│   }                             │
│ }                               │
│ totalCost: 440                  │
│ totalHours: 8                   │
└─────────────────────────────────┘

STEP 3: Store in JSON
─────────────────────
jsondata/api.json - departmentDailyUsage array
[
  {
    date: "2025-12-10",
    departmentId: 1,
    departmentName: "DevOps",
    services: { /* as above */ },
    totalCost: 440,
    totalHours: 8
  }
]

STEP 4: API Service Provides Access
────────────────────────────────────
const result = await departmentUsageApi.getDepartmentDailyUsage("2025-12-10");
// Returns: [{ DevOps: {...}, AI Team: {...}, ... }]

STEP 5: UI Displays Results
───────────────────────────
┌─────────────────────────────┐
│ DevOps Department - Dec 10   │
│                             │
│ Cost: $440                  │
│ Hours: 8h                   │
│                             │
│ Breakdown:                  │
│ Compute: $240 (8 VMs)      │
│ Network: $120 (2.5GB)      │
│ Storage: $80 (150GB)       │
└─────────────────────────────┘
```

---

## User Interaction Flow

### Department Usage Workflow

```
User Opens App
     ↓
Logs In
     ↓
Clicks on "Department Usage Tracker" (or navigates to /department-usage)
     ↓
Page Loads and Fetches Data
     ↓
DEFAULT STATE:
├─ All dates: Shows 2025-12-10 data (most recent)
├─ All departments: Shows all 4 departments
└─ Stats visible: $1,310 total, 4 departments, 7.8h avg
     ↓
USER INTERACTIONS:
├─ Changes Date Dropdown
│  └─ Page re-renders with new date's data
│
├─ Changes Department Filter
│  └─ Page filters to show only that department
│
└─ Scrolls to See Different Charts
   └─ Bar chart, Pie chart, Detailed table all visible
```

### Employee Usage Workflow

```
User Opens App
     ↓
Logs In
     ↓
Clicks on "Employee Usage Tracker" (or navigates to /employee-usage)
     ↓
Page Loads and Fetches Data
     ↓
DEFAULT STATE:
├─ Date: 2025-12-10 (most recent)
├─ Department: All departments
├─ Search: Empty
└─ Stats visible: 3 employees, $830 total
     ↓
USER INTERACTIONS:
├─ Changes Date
│  └─ Data updates for that date
│
├─ Selects Department Filter
│  └─ Only shows employees from that department
│
├─ Types in Search Box
│  └─ Filters employees by name/ID match
│
├─ Clicks on Employee Name in Table
│  └─ Shows that employee's cost history chart
│
└─ Clicks on Bar in Top 10 Chart
   └─ Shows that employee's cost history chart
```

---

## Data Structure Hierarchy

```
Company
├── Cloud Provider Data
│   ├── Daily Metrics
│   │   ├── Service Usage (CPU, Memory, Storage)
│   │   ├── Service Costs
│   │   └── Service Instances/Resources
│   └── Billing Data
│
├── Aggregated by Department (departmentDailyUsage)
│   ├── Date
│   ├── Department Info
│   │   ├── Department ID
│   │   └── Department Name
│   ├── Services Breakdown
│   │   ├── Service 1: {hours, cost, metrics}
│   │   ├── Service 2: {hours, cost, metrics}
│   │   └── Service N: {hours, cost, metrics}
│   ├── Total Cost for Day
│   └── Total Hours for Day
│
└── Aggregated by Employee (employeeUsageTracking)
    ├── Date
    ├── Employee Info
    │   ├── Employee ID
    │   ├── Employee Name
    │   └── Department
    ├── Services Breakdown
    │   ├── Service 1: {hours, cost, metrics}
    │   ├── Service 2: {hours, cost, metrics}
    │   └── Service N: {hours, cost, metrics}
    ├── Total Cost for Day
    └── Total Hours for Day
```

---

## Key Metrics at a Glance

| Metric | What It Means | Example |
|--------|---------------|---------|
| **Total Cost** | Sum of all cloud service costs | $440 for DevOps on Dec 10 |
| **Hours Used** | How long resources were active | 8 hours of compute time |
| **Avg Hours** | Average usage across departments | 7.8 hours per department |
| **Max Cost** | Highest individual cost | $410 (highest employee) |
| **Service Cost** | Cost for specific service type | $240 for Compute |
| **Resource Count** | Number of active resources | 12 VMs running |
| **Cost per Hour** | Cost efficiency metric | $240 ÷ 8h = $30/hour |

---

## Filter & Search Logic

```
Department Usage Tracker:
─────────────────────────
1. Start with ALL data from api.json/database
   └─ All departments × All dates

2. Apply DATE filter
   └─ Keep only entries matching selected date

3. Apply DEPARTMENT filter
   └─ Keep only entries matching department (if selected)

4. Display filtered results
   └─ Charts, stats, table update


Employee Usage Tracker:
──────────────────────
1. Start with ALL employee data
   └─ All employees × All dates

2. Apply DATE filter
   └─ Keep only entries matching selected date

3. Apply DEPARTMENT filter
   └─ Keep only employees from selected dept (if selected)

4. Apply SEARCH filter
   └─ Keep only employees matching search text (if entered)

5. Display filtered results + Sort by cost
   └─ Charts, stats, table update
```

---

## Cost Calculation Examples

### Example 1: DevOps Compute Service
```
Raw Data:
- 12 VMs running
- 8 hours
- AWS pricing: $30/hour per VM

Calculation:
Cost = 12 VMs × 8 hours × $30/hour = $2,880

In System:
{ "Compute Engine": { hours: 8, cost: 240, vms: 12 } }
(Cost is aggregated across all resource types)
```

### Example 2: Storage Service
```
Raw Data:
- 150 GB stored
- AWS pricing: $0.023 per GB
- Running 6 hours (for calculation)

Calculation:
Cost = 150 GB × $0.023 = $3.45 (hourly equivalent displayed as $80 daily aggregate)

In System:
{ "Cloud Storage": { hours: 6, cost: 80, storage: "150GB" } }
```

---

## Color Coding & Visual Indicators

```
Dashboard Colors:
─────────────────
Dark Theme:
├─ Background: Dark gray (#111827)
├─ Cards: Semi-transparent white (#ffffff, 10% opacity)
├─ Text: White (main), light gray (secondary)
├─ Accents: Cyan (#00eaff)
├─ Positive: Green (#10b981)
├─ Negative: Red (#ef4444)
└─ Neutral: Gray (opacity varies)

Chart Colors:
─────────────
├─ Primary: Cyan (#00eaff)
├─ Alternative 1: Light blue (#0ea5e9)
├─ Alternative 2: Teal (#06b6d4)
├─ Alternative 3: Dark teal (#0891b2)
├─ Alternative 4: Forest (#088a85)
└─ Used in Pie chart for department differentiation

Table Styling:
──────────────
├─ Hover effect: Light background on row
├─ Headers: Bold, slightly larger
├─ Costs: Green text for positive identification
├─ Borders: Subtle white lines (opacity 0.05-0.1)
└─ Alignment: Left for names, center/right for numbers
```

---

This visual guide provides a complete picture of how your cloud cost tracking system works!
