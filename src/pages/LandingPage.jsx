import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BarChart3,
    Users,
    TrendingUp,
    Shield,
    Zap,
    Globe,
    Moon,
    Sun,
    Menu,
    X,
    } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <BarChart3 size={32} />,
      title: "Department Analytics",
      description: "Track cloud spending by department with detailed cost breakdown by service",
    },
    {
      icon: <Users size={32} />,
      title: "Employee Tracking",
      description: "Monitor individual employee cloud usage and identify cost optimization opportunities",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Cost Trends",
      description: "Visualize spending patterns over time with interactive charts and reports",
    },
    {
      icon: <Shield size={32} />,
      title: "Budget Control",
      description: "Set budgets per department and get alerts when costs exceed thresholds",
    },
    {
      icon: <Zap size={32} />,
      title: "Real-time Data",
      description: "Access up-to-date cloud usage metrics and billing information instantly",
    },
    {
      icon: <Globe size={32} />,
      title: "Multi-Cloud Support",
      description: "Consolidate costs from AWS, GCP, Azure and other cloud providers",
    },
  ];

  const benefits = [
    {
      number: "40%",
      title: "Cost Reduction",
      description: "Average savings by identifying unused resources and optimizing usage",
    },
    {
      number: "2x",
      title: "Faster Insights",
      description: "Get cloud cost visibility twice as fast as manual tracking",
    },
    {
      number: "100%",
      title: "Transparency",
      description: "Complete visibility into who is using what and how much it costs",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 backdrop-blur-lg border-b ${
        darkMode ? "bg-gray-900/80 border-gray-700/50" : "bg-white/80 border-gray-200/50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                CloudCost
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-cyan-400 transition">Features</a>
              <a href="#benefits" className="hover:text-cyan-400 transition">Benefits</a>
              <a href="#about" className="hover:text-cyan-400 transition">About</a>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => navigate("/login")}
                  className={`px-4 py-2 rounded-lg transition ${
                    darkMode
                      ? "hover:bg-white/10 text-cyan-400"
                      : "hover:bg-gray-100 text-cyan-600"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:hidden pb-4 border-t ${darkMode ? "border-gray-700/50" : "border-gray-200/50"}`}
            >
              <a href="#features" className="block py-2 hover:text-cyan-400">Features</a>
              <a href="#benefits" className="block py-2 hover:text-cyan-400">Benefits</a>
              <a href="#about" className="block py-2 hover:text-cyan-400">About</a>
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-700/50">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-4 py-2 rounded-lg hover:bg-white/10 text-cyan-400"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-32 pb-20 px-4 ${darkMode ? "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800" : "bg-gradient-to-b from-white via-blue-50 to-white"}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className={`px-6 py-2 rounded-full border ${
                darkMode ? "border-cyan-400/30 bg-cyan-400/10" : "border-cyan-300/50 bg-cyan-100/30"
              }`}>
                <p className="text-cyan-400 font-semibold text-sm">✨ Master Your Cloud Costs</p>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Control Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cloud Spending
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Real-time visibility into your cloud costs. Track spending by department and employee.
              Optimize your infrastructure. Reduce costs up to 40%.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-4 justify-center mb-12"
            >
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold text-lg flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 px-4 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Everything you need to understand and optimize your cloud spending
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-8 rounded-2xl border transition hover:shadow-lg ${
                  darkMode
                    ? "bg-gray-900/50 border-cyan-400/20 hover:border-cyan-400/50"
                    : "bg-white border-cyan-200/30 hover:border-cyan-400/50"
                }`}
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose CloudCost?</h2>
            <p className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Proven results from companies like yours
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-8 rounded-2xl border text-center ${
                  darkMode
                    ? "bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border-cyan-400/30"
                    : "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-300/50"
                }`}
              >
                <p className="text-5xl font-bold text-cyan-400 mb-3">{benefit.number}</p>
                <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About CloudCost</h2>
            <p className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Empowering businesses to optimize their cloud infrastructure costs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-8 rounded-2xl border ${
              darkMode
                ? "bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border-cyan-400/30"
                : "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-300/50"
            }`}
          >
            <div className="text-center">
              <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                CloudCost is dedicated to helping organizations optimize their cloud spending through advanced analytics and real-time monitoring. Our platform provides comprehensive visibility into cloud costs, enabling businesses to make informed decisions and reduce unnecessary expenses.
              </p>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                With a team of cloud experts and a passion for efficiency, we empower companies to take control of their infrastructure costs and focus on what matters most - growing their business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${darkMode ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-t border-cyan-400/30" : "bg-gradient-to-r from-cyan-100 to-blue-100 border-t border-cyan-300"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Control Your Cloud Costs?</h2>
            <p className={`text-xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Join hundreds of companies managing their cloud infrastructure efficiently
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="px-10 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold text-lg text-white flex items-center justify-center gap-2 group mx-auto"
            >
              Start Your Free Trial
              <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? "border-gray-700/50 bg-gray-900/50" : "border-gray-200"} py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-cyan-400 transition">Features</a></li>
                <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-cyan-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Support</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-cyan-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className={`border-t ${darkMode ? "border-gray-700/50" : "border-gray-200"} pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              © 2026 CloudCost. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition">LinkedIn</a>
              <a href="#" className="hover:text-cyan-400 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
