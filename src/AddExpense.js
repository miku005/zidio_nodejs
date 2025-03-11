import React, { useState } from "react";

const AddExpense = ({ addExpense }) => {
  const [formData, setFormData] = useState({ description: "", amount: "", category: "", date: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert("Please fill all fields");
      return;
    }
    addExpense(formData);
    setFormData({ description: "", amount: "", category: "", date: "" });
  };

  return (
    <div style={styles.container}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} style={styles.input} required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} style={styles.input} required />
        <select name="category" value={formData.category} onChange={handleChange} style={styles.input} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Add Expense</button>
      </form>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", background: "green", color: "white", border: "none", cursor: "pointer" }
};

export default AddExpense;
