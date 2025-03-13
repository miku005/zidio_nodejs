import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  // State for expenses and new expense input
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "", date: "" });
  const [editExpense, setEditExpense] = useState(null); // Track expense being edited
  const [filterCategory, setFilterCategory] = useState("All"); // Filter by category

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle adding a new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.category && newExpense.amount && newExpense.date) {
      const newExpenseItem = {
        id: Date.now(),
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date,
      };
      setExpenses([...expenses, newExpenseItem]);
      setNewExpense({ category: "", amount: "", date: "" }); // Clear the form
    }
  };

  // Handle editing an expense
  const handleEditExpense = (expense) => {
    setEditExpense(expense);
    setNewExpense({ category: expense.category, amount: expense.amount, date: expense.date });
  };

  // Handle updating an expense
  const handleUpdateExpense = (e) => {
    e.preventDefault();
    if (newExpense.category && newExpense.amount && newExpense.date) {
      const updatedExpenses = expenses.map((exp) =>
        exp.id === editExpense.id ? { ...exp, ...newExpense } : exp
      );
      setExpenses(updatedExpenses);
      setEditExpense(null);
      setNewExpense({ category: "", amount: "", date: "" }); // Clear the form
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
  };

  // Handle filtering expenses by category
  const filteredExpenses = filterCategory === "All"
    ? expenses
    : expenses.filter((exp) => exp.category === filterCategory);

  // Calculate total expenses
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Data for PieChart (expenses by category)
  const categoryData = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  // Data for BarChart (expenses over time)
  const barChartData = filteredExpenses.map((expense) => ({
    name: expense.date,
    amount: expense.amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // Predefined categories
  const categories = ["Groceries", "Rent", "Utilities", "Transport", "Entertainment"];

  return (
    <div style={styles.dashboardContainer}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Expense Management Dashboard</h2>

        {/* Summary Cards */}
        <div style={styles.summaryCards}>
          <div style={styles.card}>
            <h3 style={styles.cardHeading}>Total Expenses</h3>
            <p style={styles.cardValue}>${totalExpenses.toFixed(2)}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardHeading}>Transactions</h3>
            <p style={styles.cardValue}>{filteredExpenses.length}</p>
          </div>
        </div>

        {/* Add/Edit Expense Form */}
        <div style={styles.addExpense}>
          <h3 style={styles.formHeading}>
            {editExpense ? "Edit Expense" : "Add New Expense"}
          </h3>
          <form onSubmit={editExpense ? handleUpdateExpense : handleAddExpense} style={styles.form}>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              style={styles.input}
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.addButton}>
              {editExpense ? <FaEdit /> : <FaPlus />} {editExpense ? "Update" : "Add"} Expense
            </button>
          </form>
        </div>

        {/* Filter by Category */}
        <div style={styles.filter}>
          <label style={styles.filterLabel}>Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Charts Section */}
        <div style={styles.charts}>
          {/* PieChart */}
          <div style={styles.chartContainer}>
            <h3 style={styles.chartHeading}>Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BarChart */}
          <div style={styles.chartContainer}>
            <h3 style={styles.chartHeading}>Expenses Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div style={styles.recentTransactions}>
          <h3 style={styles.tableHeading}>Recent Transactions</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Category</th>
                <th style={styles.tableHeader}>Amount</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{expense.category}</td>
                  <td style={styles.tableCell}>${expense.amount.toFixed(2)}</td>
                  <td style={styles.tableCell}>{expense.date}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleEditExpense(expense)}
                      style={styles.actionButton}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      style={{ ...styles.actionButton, color: "red" }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  dashboardContainer: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  summaryCards: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    flex: 1,
    textAlign: "center",
  },
  cardHeading: {
    margin: "0",
    fontSize: "18px",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "10px 0 0",
  },
  addExpense: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  formHeading: {
    margin: "0 0 20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  },
  filter: {
    marginBottom: "20px",
  },
  filterLabel: {
    marginRight: "10px",
  },
  filterSelect: {
    padding: "10px",
    borderRadius: "4px",
  },
  charts: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    flex: 1,
  },
  chartHeading: {
    margin: "0 0 20px",
  },
  recentTransactions: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  tableHeading: {
    margin: "0 0 20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
  },
  actionButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    margin: "0 5px",
  },
};

export default Dashboard;