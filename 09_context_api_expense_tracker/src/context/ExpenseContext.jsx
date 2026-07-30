import { createContext, use, useEffect, useState } from "react";

// creating context
export const ExpenseContext = createContext({
  expenseList: [],
  addExpense: () => { },
  deleteExpense: () => { },
  handleExpenseEdit: () => { },
  editValue: null,
  balance: 0,
  credit: 0,
  debit: 0
});

// context provider
const ExpenseContextProvider = ({ children }) => {
  const initialState = [
    {
      id: 1,
      title: "food",
      description: "pizza",
      category: "food",
      amount: 1000,
      date: "2026-07-30",
      type: "debit",
    },
  ];

  const [expenseList, setExpenseList] = useState(() => {
    const saved = localStorage.getItem("expenses");

    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }, [expenseList]);

  const [editValue, setEditValue] = useState(null);

  const addExpense = (input) => {
    if (!input) {
      alert("fill all the detail");
    } else if (editValue) {
      setExpenseList((prev) =>
        prev.map((d) =>
          d.id === editValue.id
            ? {
              ...d,
              title: input.title,
              description: input.description,
              category: input.category,
              amount: input.amount,
              date: input.date,
              type: input.type,
            }
            : d,
        ),
      );

      setEditValue(null);
    } else {
      const newExpense = {
        id: new Date().getTime(),
        title: input.title,
        description: input.description,
        category: input.category,
        amount: input.amount,
        date: input.date,
        type: input.type,
      };

      setExpenseList((prev) => [...prev, newExpense]);
    }
  };

  const deleteExpense = (id) => {
    const remainExpenseList = expenseList.filter(
      (expense) => expense.id !== id,
    );

    setExpenseList(remainExpenseList);

    alert("expense deleted successfully");
  };

  const handleExpenseEdit = (id) => {
    const editExpense = expenseList.find((expense) => expense.id === id);

    setEditValue(editExpense);
  };

  const credit = expenseList
    .filter((l) => l.type === "credit")
    .reduce((acc, curr) => {
      return (acc += Number(curr.amount));
    }, 0);

  const debit = expenseList
    .filter((l) => l.type === "debit")
    .reduce((acc, curr) => {
      return (acc += Number(curr.amount));
    }, 0);

  console.log("credit", credit);

  console.log("debit", debit);

  const balance = credit - debit

  console.log("balance", balance);

  const values = {
    expenseList,
    addExpense,
    deleteExpense,
    handleExpenseEdit,
    editValue,
    balance,
    credit,
    debit,
  };

  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
