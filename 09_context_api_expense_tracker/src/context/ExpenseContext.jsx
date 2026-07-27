import { createContext, useState } from "react";


// creating context
export const ExpenseContext = createContext({
  expenseList: [],
});


// context provider 
const ExpenseContextProvider = ({ children }) => {
  const initialState = [
    {
      category: "food",
      expenseName: "pizza",
      price: 600,
      type: "debit",
    },
  ];

  const [expenseList, setExpenseList] = useState(initialState);

  const values = {
    expenseList,
  };

  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
