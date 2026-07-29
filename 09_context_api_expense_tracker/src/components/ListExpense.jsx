import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ListExpense = () => {
  const { expenseList, deleteExpense,handleExpenseEdit } = useContext(ExpenseContext);

  return (
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
        {expenseList.map((data, index) => {
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
                <button onClick={()=>handleExpenseEdit(data.id)} >Edit</button>
              </td>
              <td>
                <button onClick={() => deleteExpense(data.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListExpense;
