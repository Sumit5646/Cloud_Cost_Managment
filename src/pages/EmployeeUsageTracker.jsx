import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { employeeUsageApi } from "../services/apiService";
import Sidebar from '../components/Sidebar';
import { Calendar, Filter, User, DollarSign, Clock, Search } from "lucide-react";

const EmployeeUsageTracker = () => {
  const [allUsageData, setAllUsageData] = useState([]);
  const [employeeSummary, setEmployeeSummary] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2025-07-01");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeHistory, setEmployeeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Get all employee usage data
        const usageResult = await employeeUsageApi.getAllEmployeeUsage();
        if (usageResult.success) {
          setAllUsageData(usageResult.data);
        }

        // Get employee summary
        const summaryResult = await employeeUsageApi.getEmployeeUsageSummary();
        if (summaryResult.success) {
          setEmployeeSummary(summaryResult.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter data based on selected date, department, and search
  useEffect(() => {
    let filtered = allUsageData.filter(item => item.date === selectedDate);
    
    if (selectedDepartment) {
      filtered = filtered.filter(item => item.department === selectedDepartment);
    }

    if (searchEmployee) {
      filtered = filtered.filter(item => 
        item.employeeName.toLowerCase().includes(searchEmployee.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(searchEmployee.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedDate, selectedDepartment, searchEmployee, allUsageData]);

  // Load employee history when selected
  useEffect(() => {
    if (selectedEmployee) {
      const history = allUsageData.filter(item => item.employeeId === selectedEmployee);
      setEmployeeHistory(history);
    } else {
      setEmployeeHistory([]);
    }
  }, [selectedEmployee, allUsageData]);

  // Get unique dates
  const uniqueDates = [...new Set(allUsageData.map(item => item.date))].sort().reverse();

  // Get unique departments
  const uniqueDepartments = [...new Set(allUsageData.map(item => item.department))];

  // Prepare data for charts
  const employeeCostData = filteredData
    .sort((a, b) => b.totalCost - a.totalCost)
    .slice(0, 10)
    .map(emp => ({
      name: emp.employeeName.split(' ')[0],
      cost: emp.totalCost,
      id: emp.employeeId,
      department: emp.department
    }));

  // Prepare cloud provider cost data for selected employee
  const employeeCloudData = selectedEmployee && employeeHistory.length > 0 ? [
    {
      name: "AWS",
      cost: employeeHistory.reduce((sum, emp) => sum + (emp.cloudProviders?.AWS?.cost || 0), 0)
    },
    {
      name: "Azure",
      cost: employeeHistory.reduce((sum, emp) => sum + (emp.cloudProviders?.Azure?.cost || 0), 0)
    },
    {
      name: "GoogleCloud",
      cost: employeeHistory.reduce((sum, emp) => sum + (emp.cloudProviders?.GoogleCloud?.cost || 0), 0)
    }
  ] : [];

  // Prepare history data for selected employee
  const historyData = employeeHistory.map(item => ({
    date: item.date,
    cost: item.totalCost,
    hours: item.totalHours
  })).sort((a, b) => a.date.localeCompare(b.date));

  if (loading) {
    return <div className="text-center py-8">Loading employee usage data...</div>;
  }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Sidebar currentPage="employee-usage" darkMode={darkMode} onThemeChange={setDarkMode} />

      <main className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Employee Usage Tracker</h1>
          <p className="opacity-70">Track cloud service usage per employee and monitor trends</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-6 mb-8">
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
              <Filter className="inline mr-2" size={18} /> Department
            </label>
            <select
              value={selectedDepartment || ""}
              onChange={(e) => setSelectedDepartment(e.target.value || null)}
              className={`w-full p-3 rounded-lg border transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              <Search className="inline mr-2" size={18} /> Search Employee
            </label>
            <input
              type="text"
              placeholder="Name or ID..."
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
              className={`w-full p-3 rounded-lg border transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-2 flex items-center">
              <User size={16} className="mr-2" /> Employees Active
            </p>
            <h2 className="text-3xl font-bold text-cyan-400">{filteredData.length}</h2>
            <p className="text-xs opacity-50 mt-2">Using cloud services</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-2 flex items-center">
              <DollarSign size={16} className="mr-2" /> Total Cost
            </p>
            <h2 className="text-3xl font-bold text-green-400">
              ${filteredData.reduce((sum, d) => sum + d.totalCost, 0).toFixed(2)}
            </h2>
            <p className="text-xs opacity-50 mt-2">Today's usage</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-2 flex items-center">
              <Clock size={16} className="mr-2" /> Avg Hours
            </p>
            <h2 className="text-3xl font-bold text-cyan-400">
              {(filteredData.reduce((sum, d) => sum + d.totalHours, 0) / Math.max(filteredData.length, 1)).toFixed(1)}h
            </h2>
            <p className="text-xs opacity-50 mt-2">Per employee</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-2">Max Cost</p>
            <h2 className="text-3xl font-bold text-yellow-400">
              ${Math.max(0, ...filteredData.map(d => d.totalCost)).toFixed(2)}
            </h2>
            <p className="text-xs opacity-50 mt-2">Highest usage</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Top Employees by Cost */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-xl border ${
              darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Top 10 by Cost</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #4b5563" }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Bar 
                  dataKey="cost" 
                  fill="#00eaff" 
                  radius={[8, 8, 0, 0]}
                  onClick={(data) => setSelectedEmployee(data.id)}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs opacity-50 mt-2">Click bar to see employee history</p>
          </motion.div>

          {/* Employee History & Cloud Provider Breakdown */}
          {selectedEmployee && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl shadow-xl border ${
                darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">
                {employeeHistory[0]?.employeeName} - 6-Month Cost Breakdown by Provider
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Cloud Provider Pie */}
                {employeeCloudData.length > 0 && (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={employeeCloudData}>
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
                )}

                {/* History Trend */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #4b5563" }}
                      formatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="cost" stroke="#00eaff" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-sm"
              >
                Clear Selection
              </button>
            </motion.div>
          )}
        </div>

        {/* Cloud Provider Detailed Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl shadow-xl border overflow-x-auto ${
            darkMode ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Cloud Provider Usage by Employee ({selectedDate})</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4">Employee Name</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Cloud Provider</th>
                <th className="text-left py-3 px-4">Cost</th>
                <th className="text-left py-3 px-4">Usage</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .sort((a, b) => b.totalCost - a.totalCost)
                .map((emp, idx) => (
                  <React.Fragment key={idx}>
                    {Object.entries(emp.cloudProviders).map((provider, provIdx) => (
                      <tr 
                        key={`${idx}-${provIdx}`}
                        className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
                        onClick={() => setSelectedEmployee(emp.employeeId)}
                      >
                        <td className="py-3 px-4 font-semibold">
                          {provIdx === 0 && emp.employeeName}
                        </td>
                        <td className="py-3 px-4">
                          {provIdx === 0 && emp.department}
                        </td>
                        <td className="py-3 px-4 font-semibold">{provider[0]}</td>
                        <td className="py-3 px-4 text-green-400 font-semibold">
                          ${provider[1].cost.toFixed(2)}
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
          {filteredData.length === 0 && (
            <p className="text-center py-6 opacity-50">No employees found for selected filters</p>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default EmployeeUsageTracker;
