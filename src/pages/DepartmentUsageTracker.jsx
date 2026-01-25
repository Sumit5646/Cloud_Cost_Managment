import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { departmentUsageApi } from "../services/apiService";
import Sidebar from '../components/Sidebar';
import { Calendar, Filter, TrendingUp, DollarSign } from "lucide-react";

const DepartmentUsageTracker = () => {
  const [allUsageData, setAllUsageData] = useState([]);
  const [departmentSummary, setDepartmentSummary] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2025-07-01");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const COLORS = ["#00eaff", "#0ea5e9", "#06b6d4", "#0891b2", "#088a85"];

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Get all department usage data
        const usageResult = await departmentUsageApi.getAllDepartmentUsage();
        if (usageResult.success) {
          setAllUsageData(usageResult.data);
        }

        // Get department summary
        const summaryResult = await departmentUsageApi.getDepartmentUsageSummary();
        if (summaryResult.success) {
          setDepartmentSummary(summaryResult.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter data based on selected date and department
  useEffect(() => {
    let filtered = allUsageData.filter(item => item.date === selectedDate);
    
    if (selectedDepartment) {
      filtered = filtered.filter(item => item.departmentId === selectedDepartment);
    }

    setFilteredData(filtered);
  }, [selectedDate, selectedDepartment, allUsageData]);

  // Prepare data for visualization by cloud provider
  const cloudProviderData = filteredData.length > 0 ? [
    {
      name: "AWS",
      cost: filteredData.reduce((sum, dept) => sum + (dept.cloudProviders?.AWS?.cost || 0), 0)
    },
    {
      name: "Azure",
      cost: filteredData.reduce((sum, dept) => sum + (dept.cloudProviders?.Azure?.cost || 0), 0)
    },
    {
      name: "GoogleCloud",
      cost: filteredData.reduce((sum, dept) => sum + (dept.cloudProviders?.GoogleCloud?.cost || 0), 0)
    }
  ] : [];

  const departmentCostData = filteredData.map(dept => ({
    name: dept.departmentName,
    cost: dept.totalCost,
    id: dept.departmentId
  }));

  // Get unique dates
  const uniqueDates = [...new Set(allUsageData.map(item => item.date))].sort().reverse();

  // Get unique departments
  const uniqueDepartments = [...new Set(allUsageData.map(item => item.departmentId))];

  if (loading) {
    return <div className="text-center py-8">Loading department usage data...</div>;
  }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Sidebar currentPage="department-usage" darkMode={darkMode} onThemeChange={setDarkMode} />

      <main className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Department Usage Tracker</h1>
          <p className="opacity-70">Monitor cloud service usage by department and day</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">
              <Calendar className="inline mr-2" size={18} /> Select Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`w-full p-3 rounded-lg border transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {uniqueDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              <Filter className="inline mr-2" size={18} /> Filter Department
            </label>
            <select
              value={selectedDepartment || ""}
              onChange={(e) => setSelectedDepartment(e.target.value ? parseInt(e.target.value) : null)}
              className={`w-full p-3 rounded-lg border transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(deptId => {
                const dept = allUsageData.find(d => d.departmentId === deptId);
                return (
                  <option key={deptId} value={deptId}>
                    {dept?.departmentName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-2 flex items-center">
              <DollarSign size={16} className="mr-2" /> Total Cost Today
            </p>
            <h2 className="text-3xl font-bold text-cyan-400">
              ${filteredData.reduce((sum, d) => sum + d.totalCost, 0).toFixed(2)}
            </h2>
            <p className="text-xs opacity-50 mt-2">{filteredData.length} department(s)</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-2 flex items-center">
              <TrendingUp size={16} className="mr-2" /> Departments Active
            </p>
            <h2 className="text-3xl font-bold text-cyan-400">
              {filteredData.length}
            </h2>
            <p className="text-xs opacity-50 mt-2">Using cloud services</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-2">Avg Hours Used</p>
            <h2 className="text-3xl font-bold text-cyan-400">
              {(filteredData.reduce((sum, d) => sum + d.totalHours, 0) / Math.max(filteredData.length, 1)).toFixed(1)}h
            </h2>
            <p className="text-xs opacity-50 mt-2">Per department</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Department Cost Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Cost by Department</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #4b5563" }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Bar dataKey="cost" fill="#00eaff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Cost Distribution Pie */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Cost Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentCostData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, cost }) => `${name}: $${cost}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cost"
                >
                  {departmentCostData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Cloud Provider Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Cost by Cloud Provider</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cloudProviderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #4b5563" }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Bar dataKey="cost" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Detailed Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl shadow-xl border overflow-x-auto ${
            darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Cloud Provider Breakdown by Department</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Cloud Provider</th>
                <th className="text-left py-3 px-4">Cost</th>
                <th className="text-left py-3 px-4">Services</th>
                <th className="text-left py-3 px-4">Usage Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dept, idx) => (
                <React.Fragment key={idx}>
                  {Object.entries(dept.cloudProviders).map((provider, provIdx) => (
                    <tr key={`${idx}-${provIdx}`} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-3 px-4">
                        {provIdx === 0 && dept.departmentName}
                      </td>
                      <td className="py-3 px-4 font-semibold">{provider[0]}</td>
                      <td className="py-3 px-4 text-green-400 font-semibold">
                        ${provider[1].cost.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {provider[1].services.join(", ")}
                      </td>
                      <td className="py-3 px-4 text-xs opacity-70">
                        {provider[1].usage}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
};

export default DepartmentUsageTracker;
