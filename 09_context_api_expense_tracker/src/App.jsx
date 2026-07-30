import React from "react";
import AddExpense from "./components/AddExpense";
import ListExpense from "./components/ListExpense";
import ExpenseData from "./components/ExpenseData";

const App = () => {
  return (
    <>
      <AddExpense />
      <br />
      <br />

      <ExpenseData />

      <br />
      <br />
      <br />

      <ListExpense />
    </>
  );
};

export default App;
