import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ListExpense = () => {
  const { expenseList, deleteExpense, handleExpenseEdit } =
    useContext(ExpenseContext);

  const [expenseQuery, setExpenseQuery] = useState({
    title: "",
    type: "all",
    category: "all",
    sort: "",
  });

  const handleChange = (field, e) => {
    setExpenseQuery((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const filterList = expenseList.filter((l) =>
    l.title.toLowerCase().includes(expenseQuery.title.toLowerCase()),
  );

  return (
    <>
      <form>
        <label htmlFor="">Title </label>
        <input
          type="text"
          placeholder="enter title"
          value={expenseQuery.title}
          onChange={(e) => handleChange("title", e)}
        />

        <select
          name="Expense Type"
          id="type"
          value={expenseQuery.type}
          onChange={(e) => handleChange("type", e)}
        >
          <option value="all" selected>
            Expense Type
          </option>
          <option value="credit">credit</option>
          <option value="debit">debit</option>
        </select>

        <select
          name="category"
          id="category"
          value={expenseQuery.category}
          onChange={(e) => handleChange("category", e)}
        >
          <option value="all" selected>
            Expense category
          </option>
          <option value="Money Transfer">Money Transfer</option>
          <option value="Cash Withdrawal">Cash Withdrawal</option>
          <option value="General Expense">General Expense</option>
          <option value="Food&Dining">Food&Dining</option>
          <option value="HealthCare">HealthCare</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
        </select>

        <select
          name="sort"
          id="sort"
          value={expenseQuery.sort}
          onChange={(e) => handleChange("sort", e)}
        >
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
          <option value="moneyAsc">Money Ascending</option>
          <option value="moneyDsc">Money Descending</option>
        </select>
      </form>
      <br />
      <br />

      <table border={2}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Expense Type</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterList.length > 0 ? (
            filterList.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.amount}</td>
                  <td>{data.date}</td>
                  <td>{data.category}</td>
                  <td>{data.type}</td>
                  <td>
                    <button onClick={() => handleExpenseEdit(data.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteExpense(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h1>No data found</h1>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ListExpense;
