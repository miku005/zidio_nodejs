import React from "react";

const ExpenseList = ({ expenses, deleteExpense }) => {
  return (
    <div style={styles.container}>
      <h2>Expenses</h2>
      <ul style={styles.list}>
        {expenses.map((expense) => (
          <li key={expense.id} style={styles.listItem}>
            <span>{expense.title}</span>
            <span>${expense.amount}</span>
            <span>{expense.date}</span>
            <button onClick={() => deleteExpense(expense.id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  list: { listStyle: "none", padding: "0" },
  listItem: { display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" },
  deleteButton: { background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" },
};

export default ExpenseList;