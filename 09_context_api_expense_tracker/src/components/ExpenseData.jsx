import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseData = () => {
  const { balance, credit, debit } = useContext(ExpenseContext);

  return (
    <>
      <h1>Balance :- {balance}</h1>
      <h1>Credit :- {credit}</h1>
      <h1>Debit :- {debit}</h1>
    </>
  );
};

export default ExpenseData;
