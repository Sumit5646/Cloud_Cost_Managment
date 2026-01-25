// CloudDashboard.jsx - Admin Dashboard with cloud cost tracking
// CloudDashboard.jsx - Admin Dashboard with full CRUD operations using Axios
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, XCircle, CheckCircle, Edit, Save, Plus, TrendingUp, TrendingDown, AlertTriangle, Users, Filter } from "lucide-react";
import {
  AreaChart, Area, CartesianGrid, Tooltip, XAxis, ResponsiveContainer, BarChart, Bar, YAxis, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

// Import components and hooks
import Sidebar from '../components/Sidebar';
import { useAuth } from "../context/AuthContext";
import RoleBasedUI, { useRoleAccess } from "../components/RoleBasedUI";
import { departmentUsageApi, employeeUsageApi } from "../services/apiService";
import { dashboardApi, userApi, departmentApi } from "../services/apiService";

// StatCard Component
const StatCard = ({ label, value, change, green, darkMode, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-5 rounded-2xl shadow-xl border transition ${
      darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm opacity-70">{label}</p>
      {icon && <div className="text-cyan-400">{icon}</div>}
    </div>
    <h2 className="text-3xl font-bold text-cyan-400 mt-1">{value}</h2>
    <p className={`mt-1 text-sm ${green ? "text-green-400" : "text-red-400"}`}>
      {change}
    </p>
  </motion.div>
);

// GlassCard Component
const GlassCard = ({ title, children, darkMode, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-6 rounded-2xl shadow-xl border transition ${
      darkMode ? "bg-white/10 backdrop-blur-lg border-white/20" : "bg-white border-gray-200"
    } ${className}`}
  >
    <h2 className="font-semibold mb-4">{title}</h2>
    {children}
  </motion.div>
);

const CloudDashboard = () => {
  const { user } = useAuth();
  const { isAdmin } = useRoleAccess();

  // State management
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [departmentData, setDepartmentData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2025-07-01");
  const [availableDates, setAvailableDates] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userFilter, setUserFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data based on selected section
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get all department and employee usage data
        const [deptResult, empResult] = await Promise.all([
          departmentUsageApi.getAllDepartmentUsage(),
          employeeUsageApi.getAllEmployeeUsage()
        ]);

        if (deptResult.success && empResult.success) {
          setDepartmentData(deptResult.data);
          setEmployeeData(empResult.data);
          
          // Extract unique dates
          const uniqueDates = [...new Set(deptResult.data.map(d => d.date))].sort().reverse();
          setAvailableDates(uniqueDates);
          
          if (uniqueDates.length > 0) {
            setSelectedDate(uniqueDates[0]);
          }
        } else {
          setError("Failed to load cloud usage data");
        }
        let result;

        switch (selectedSection) {
          case "dashboard":
            result = await dashboardApi.getDashboardData();
            break;
          case "analytics":
            result = await dashboardApi.getAnalyticsData();
            break;
          case "cloudUsage":
            result = await dashboardApi.getCloudUsageData();
            break;
          case "settings":
            result = await dashboardApi.getSettingsData();
            break;
          case "users":
            // Load both users and departments for users section
            const [usersResult, deptsResult] = await Promise.all([
              userApi.getUsers(),
              departmentApi.getDepartments()
            ]);
            setUsers(usersResult.success ? usersResult.data : []);
            setDepartments(deptsResult.success ? deptsResult.data : []);
            result = await dashboardApi.getDashboardData(); // For department data
            if (result.success && deptsResult.success) {
              result.data.departments = deptsResult.data;
            }
            break;
          default:
            result = await dashboardApi.getDashboardData();
        }

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "Failed to load data");
        }
      } catch (err) {
        setError("Network error occurred");
        console.error("Data loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle budget request approval/rejection (mock function)
  const handleDepartmentBudgetAction = async (departmentName, action) => {
    console.log(`${action} budget for ${departmentName}`);
    alert(`Budget request for ${departmentName} has been ${action}ed`);
  };

  // Handle budget request approval/rejection
  const handleBudgetAction = async (requestId, action) => {
    try {
      const result = action === 'approve'
        ? await dashboardApi.approveBudgetRequest(requestId)
        : await dashboardApi.rejectBudgetRequest(requestId);

      if (result.success) {
        // Refresh data
        const refreshResult = await dashboardApi.getDashboardData();
        if (refreshResult.success) {
          setData(refreshResult.data);
        }
      } else {
        setError(`Failed to ${action} budget request`);
      }
    } catch (err) {
      setError("Failed to process budget request");
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white" : "bg-gray-100 text-gray-900"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-xl">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white" : "bg-gray-100 text-gray-900"
      }`}>
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate stats based on selected date
  const departmentsByDate = selectedDate 
    ? departmentData.filter(d => d.date === selectedDate) 
    : departmentData;
  
  const employeesByDate = selectedDate 
    ? employeeData.filter(e => e.date === selectedDate) 
    : employeeData;

  // Calculate dashboard stats from department data
  const dashboardStats = {
    totalSpend: departmentData.reduce((sum, d) => sum + d.totalCost, 0),
    aws: departmentData.reduce((sum, d) => sum + (d.cloudProviders?.AWS?.cost || 0), 0),
    azure: departmentData.reduce((sum, d) => sum + (d.cloudProviders?.Azure?.cost || 0), 0),
    googleCloud: departmentData.reduce((sum, d) => sum + (d.cloudProviders?.GoogleCloud?.cost || 0), 0)
  };

  // Create spending timeline data
  const timelineData = availableDates.map(date => {
    const spend = departmentData
      .filter(d => d.date === date)
      .reduce((sum, d) => sum + d.totalCost, 0);
    return {
      date: date.substring(5),
      spend: parseFloat(spend.toFixed(2))
    };
  });

  // Dashboard view
  const dashboardView = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Cloud Spend (6 months)"
          value={`$${dashboardStats.totalSpend.toFixed(0)}`}
          change="+15% YoY"
          green
          darkMode={darkMode}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          label="AWS Cost"
          value={`$${dashboardStats.aws.toFixed(0)}`}
          change="+12%"
          green
          darkMode={darkMode}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          label="Azure Cost"
          value={`$${dashboardStats.azure.toFixed(0)}`}
          change="-5%"
          darkMode={darkMode}
          icon={<TrendingDown size={20} />}
        />
        <StatCard
          label="Google Cloud Cost"
          value={`$${dashboardStats.googleCloud.toFixed(0)}`}
          change="+10%"
          green
          darkMode={darkMode}
          icon={<TrendingUp size={20} />}
        />
      </div>

      <div className="mt-8 mb-6">
        <label className="text-sm font-semibold mb-2 block">Select Date:</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={`p-3 rounded-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          {availableDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>

      <GlassCard title="6-Month Cloud Spend Trend" darkMode={darkMode} className="mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#ffffff22" : "#00000022"} />
            <XAxis dataKey="date" stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip contentStyle={{ background: darkMode ? "#1e293b" : "#fff", border: "none" }} />
            <Area type="monotone" dataKey="spend" stroke="#38bdf8" fill="#0ea5e9" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <GlassCard title="Departments by Cloud Spend" darkMode={darkMode}>
          <div className="space-y-4">
            {departmentsByDate
              .filter((d) => d.departmentName?.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => b.totalCost - a.totalCost)
              .map((d) => (
                <div key={d.departmentId} className="flex justify-between items-center">
                  <span className="font-medium">{d.departmentName}</span>
                  <span className="font-semibold text-cyan-400">${d.totalCost.toFixed(0)}</span>
                </div>
              ))}
          </div>
        </GlassCard>


        <GlassCard title="Top Employees by Cost" darkMode={darkMode}>
          <div className="space-y-4">
            {employeesByDate
              .sort((a, b) => b.totalCost - a.totalCost)
              .slice(0, 5)
              .map((e) => (
                <div key={e.employeeId} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{e.employeeName}</p>
                    <p className="text-xs opacity-60">{e.department}</p>
                  </div>
                  <span className="font-semibold text-cyan-400">${e.totalCost.toFixed(0)}</span>
                </div>
              ))}
          </div>
        </GlassCard>

        <RoleBasedUI allowedRoles={['admin', 'manager']}>
          <GlassCard title="Department Budget Status" darkMode={darkMode}>
            <div className="space-y-4">
              {departmentsByDate
                .slice(0, 3)
                .map((d) => (
                  <div key={d.departmentId} className="flex justify-between items-center p-3 rounded-lg bg-slate-700/30">
                    <div>
                      <p className="font-semibold text-sm">{d.departmentName}</p>
                      <p className="text-xs opacity-70">${d.totalCost.toFixed(0)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDepartmentBudgetAction(d.departmentName, 'approve')}
                        className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition"
                        title="Approve"
                      >
                        <CheckCircle size={16} className="text-green-400" />
                      </button>
                      <button
                        onClick={() => handleDepartmentBudgetAction(d.departmentName, 'reject')}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
                        title="Reject"
                      >
                        <XCircle size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </GlassCard>
        </RoleBasedUI>

        
      </div>
    </>
  );

  // Analytics view
  const analyticsView = (
    <>
      <h2 className="text-2xl font-semibold mb-6">Cloud Cost Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="Cloud Provider Comparison" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "AWS", cost: dashboardStats.aws },
                { name: "Azure", cost: dashboardStats.azure },
                { name: "Google Cloud", cost: dashboardStats.googleCloud }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#ffffff22" : "#00000022"} />
              <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
              <YAxis stroke={darkMode ? "#fff" : "#000"} />
              <Tooltip contentStyle={{ background: darkMode ? "#1e293b" : "#fff", border: "none" }} />
              <Bar dataKey="cost" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard title="Department Cost Summary" darkMode={darkMode}>
          <div className="space-y-4">
            {departmentsByDate
              .sort((a, b) => b.totalCost - a.totalCost)
              .map((d) => (
                <div key={d.departmentId} className="flex justify-between py-2 border-b border-gray-700 pb-2">
                  <div>
                    <p className="font-semibold">{d.departmentName}</p>
                    <p className="text-xs opacity-60">{d.totalHours}h used</p>
                  </div>
                  <span className="font-semibold text-cyan-400">${d.totalCost.toFixed(0)}</span>
                </div>
              ))}
          </div>
        </GlassCard>
      </div>

      
    </>
  );

  // Cloud Usage view
  const cloudUsageView = (
    <>
      <h2 className="text-2xl font-semibold mb-6">Cloud Services Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard title="AWS Services" darkMode={darkMode}>
          <div className="space-y-3">
            {Array.from(new Set(departmentData.flatMap(d => d.cloudProviders?.AWS?.services || []))).map((service, idx) => (
              <div key={idx} className="flex justify-between text-sm py-2 border-b border-gray-700">
                <span>{service}</span>
                <span className="text-cyan-400">In use</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Azure Services" darkMode={darkMode}>
          <div className="space-y-3">
            {Array.from(new Set(departmentData.flatMap(d => d.cloudProviders?.Azure?.services || []))).map((service, idx) => (
              <div key={idx} className="flex justify-between text-sm py-2 border-b border-gray-700">
                <span>{service}</span>
                <span className="text-cyan-400">In use</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Google Cloud Services" darkMode={darkMode}>
          <div className="space-y-3">
            {Array.from(new Set(departmentData.flatMap(d => d.cloudProviders?.GoogleCloud?.services || []))).map((service, idx) => (
              <div key={idx} className="flex justify-between text-sm py-2 border-b border-gray-700">
                <span>{service}</span>
                <span className="text-cyan-400">In use</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );

  // Settings view
  const settingsView = (
    <>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Settings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="Data Settings" darkMode={darkMode}>
          <div className="space-y-4">
            <div className="flex justify-between py-2">
              <span>Data Period</span>
              <span className="font-semibold text-cyan-400">Jul 2025 - Dec 2025</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Total Departments</span>
              <span className="font-semibold text-cyan-400">{new Set(departmentData.map(d => d.departmentId)).size}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Total Employees</span>
              <span className="font-semibold text-cyan-400">{new Set(employeeData.map(e => e.employeeId)).size}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Cloud Providers</span>
              <span className="font-semibold text-cyan-400">3</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Theme Settings" darkMode={darkMode}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition ${
                  darkMode ? "bg-cyan-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition transform ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  );

  // Users view
  const usersView = (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Employee & Department Overview</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-4 py-2 rounded-xl border backdrop-blur-lg ${
              darkMode ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-300 text-black"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="Employees" darkMode={darkMode}>
          <div className="space-y-3">
            {employeesByDate
              .filter(e => e.employeeName.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => b.totalCost - a.totalCost)
              .slice(0, 10)
              .map((e) => (
                <div key={e.employeeId} className="flex justify-between items-center p-3 rounded-lg bg-slate-700/30">
                  <div>
                    <p className="font-semibold text-sm">{e.employeeName}</p>
                    <p className="text-xs opacity-60">{e.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-cyan-400">${e.totalCost.toFixed(0)}</p>
                    <p className="text-xs opacity-60">{e.totalHours}h</p>
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>

        <GlassCard title="Department Summary" darkMode={darkMode}>
          <div className="space-y-3">
            {departmentsByDate
              .sort((a, b) => b.totalCost - a.totalCost)
              .map((d) => (
                <div key={d.departmentId} className="flex justify-between items-center p-3 rounded-lg bg-slate-700/30">
                  <div>
                    <p className="font-semibold text-sm">{d.departmentName}</p>
                    <p className="text-xs opacity-60">{d.totalHours}h / day</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-cyan-400">${d.totalCost.toFixed(0)}</p>
                    <p className="text-xs opacity-60">Total</p>
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard title="Detailed Employee Cost Breakdown" darkMode={darkMode} className="mt-6">
        <div className="overflow-x-auto">
          <table className={`w-full text-sm ${darkMode ? "text-white" : "text-black"}`}>
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">Department</th>
                <th className="text-left p-3 font-semibold">Cost</th>
                <th className="text-left p-3 font-semibold">Hours</th>
              </tr>
            </thead>
            <tbody>
              {employeesByDate
                .filter(e => e.employeeName.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => b.totalCost - a.totalCost)
                .map((e) => (
                  <tr key={e.employeeId} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-300"} hover:bg-slate-700/20`}>
                    <td className="p-3">{e.employeeName}</td>
                    <td className="p-3">{e.department}</td>
                    <td className="p-3 text-cyan-400 font-semibold">${e.totalCost.toFixed(0)}</td>
                    <td className="p-3">{e.totalHours}h</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );

  return (
    <div className={`min-h-screen flex transition-all pl-64 ${
      darkMode ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <Sidebar
        darkMode={darkMode}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold tracking-wide">
            🚀 Cloud Cost Intelligence - Admin
          </h1>
          <div className="flex items-center gap-4">
            {(selectedSection === "dashboard" || selectedSection === "cloudUsage") && (
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`px-4 py-2 rounded-xl w-72 border backdrop-blur-lg ${
                  darkMode ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-300 text-black"
                }`}
              />
            )}
            <button
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>

        {selectedSection === "dashboard" && dashboardView}
        {selectedSection === "analytics" && analyticsView}
        {selectedSection === "cloudUsage" && cloudUsageView}
        {selectedSection === "settings" && settingsView}
        {selectedSection === "users" && usersView}
      </main>
    </div>
  );
};

export default CloudDashboard;
