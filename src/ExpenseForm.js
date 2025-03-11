import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({ title: "", amount: "", date: "" });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...expense, id: Date.now() });
    setExpense({ title: "", amount: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="title"
        placeholder="Expense Title"
        value={expense.title}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={expense.amount}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>
        Add Expense
      </button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", background: "blue", color: "white", border: "none", cursor: "pointer" },
};

export default ExpenseForm;