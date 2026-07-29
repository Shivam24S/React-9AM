import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const AddExpense = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
    amount: 0,
    date: "",
    type: "debit",
  });

  const { addExpense, editValue } = useContext(ExpenseContext);

  console.log("editValue", editValue);

  useEffect(() => {
    editValue ? setInput(editValue) : null;
  }, [editValue]);

  const handleChange = (field, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense(input);

    setInput({
      title: "",
      description: "",
      category: "",
      amount: 0,
      date: "",
      type: "debit",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={input.title}
          onChange={(e) => handleChange("title", e)}
        />
        <br />
        <br />
        <label htmlFor="description">description</label>
        <input
          type="text"
          placeholder="description"
          name="description"
          value={input.description}
          onChange={(e) => handleChange("description", e)}
        />
        <br />
        <br />
        <label htmlFor="amount">amount</label>
        <input
          type="number"
          placeholder="amount"
          name="amount"
          value={input.amount}
          onChange={(e) => handleChange("amount", e)}
        />

        <br />
        <br />

        <label htmlFor="date">date</label>
        <input
          type="date"
          name="date"
          value={input.date}
          onChange={(e) => handleChange("date", e)}
        />

        <br />
        <br />

        <label htmlFor="category">category</label>
        <select
          name="category"
          value={input.category}
          onChange={(e) => handleChange("category", e)}
        >
          <option value="Money Transfer">Money Transfer</option>
          <option value="Cash Withdrawal">Cash Withdrawal</option>
          <option value="General Expense">General Expense</option>
          <option value="Food&Dining">Food&Dining</option>
          <option value="HealthCare">HealthCare</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
        </select>
        <br />
        <br />

        <label htmlFor="type">Expense type</label>
        <select
          name="type"
          value={input.type}
          onChange={(e) => handleChange("type", e)}
        >
          <option value="credit">credit</option>
          <option value="debit">debit</option>
        </select>

        <br />
        <br />
        <button type="submit">{editValue ? "update" : "add"}</button>
      </form>
    </>
  );
};

export default AddExpense;

// title,
// description,
// category,
// amount,
// type
// date
