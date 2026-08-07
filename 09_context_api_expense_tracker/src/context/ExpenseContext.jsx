// import { createContext, use, useEffect, useState } from "react";

// // creating context
// export const ExpenseContext = createContext({
// expenseList: [],
// addExpense: () => { },
// deleteExpense: () => { },
// handleExpenseEdit: () => { },
// editValue: null,
// balance: 0,
// credit: 0,
// debit: 0
// });

// // context provider
// const ExpenseContextProvider = ({ children }) => {
//   const initialState = [
//     {
//       id: 1,
//       title: "food",
//       description: "pizza",
//       category: "food",
//       amount: 1000,
//       date: "2026-07-30",
//       type: "debit",
//     },
//   ];

//   const [expenseList, setExpenseList] = useState(() => {
//     const saved = localStorage.getItem("expenses");

//     return saved ? JSON.parse(saved) : initialState;
//   });

//   useEffect(() => {
//     localStorage.setItem("expenses", JSON.stringify(expenseList));
//   }, [expenseList]);

//   const [editValue, setEditValue] = useState(null);

//   const addExpense = (input) => {
//     if (!input) {
//       alert("fill all the detail");
//     } else if (editValue) {
//       setExpenseList((prev) =>
//         prev.map((d) =>
//           d.id === editValue.id
//             ? {
//               ...d,
//               title: input.title,
//               description: input.description,
//               category: input.category,
//               amount: input.amount,
//               date: input.date,
//               type: input.type,
//             }
//             : d,
//         ),
//       );

//       setEditValue(null);
//     } else {
//       const newExpense = {
//         id: new Date().getTime(),
//         title: input.title,
//         description: input.description,
//         category: input.category,
//         amount: input.amount,
//         date: input.date,
//         type: input.type,
//       };

//       setExpenseList((prev) => [...prev, newExpense]);
//     }
//   };

//   const deleteExpense = (id) => {
//     const remainExpenseList = expenseList.filter(
//       (expense) => expense.id !== id,
//     );

//     setExpenseList(remainExpenseList);

//     alert("expense deleted successfully");
//   };

//   const handleExpenseEdit = (id) => {
//     const editExpense = expenseList.find((expense) => expense.id === id);

//     setEditValue(editExpense);
//   };

//   const credit = expenseList
//     .filter((l) => l.type === "credit")
//     .reduce((acc, curr) => {
//       return (acc += Number(curr.amount));
//     }, 0);

//   const debit = expenseList
//     .filter((l) => l.type === "debit")
//     .reduce((acc, curr) => {
//       return (acc += Number(curr.amount));
//     }, 0);

//   console.log("credit", credit);

//   console.log("debit", debit);

//   const balance = credit - debit

//   console.log("balance", balance);

//   const values = {
//     expenseList,
//     addExpense,
//     deleteExpense,
//     handleExpenseEdit,
//     editValue,
//     balance,
//     credit,
//     debit,
//   };

//   return (
//     <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
//   );
// };

// export default ExpenseContextProvider;

import { createContext, useState, useReducer, useEffect } from "react";

export const ExpenseContext = createContext({
  expenseList: [],
  addExpense: () => {},
  deleteExpense: () => {},
  handleExpenseEdit: () => {},
  editValue: null,
  balance: 0,
  credit: 0,
  debit: 0,
});

const initialValues = {
  expenseList: [
    {
      id: 1,
      title: "food",
      description: "pizza",
      category: "food",
      amount: 1000,
      date: "2026-07-30",
      type: "debit",
    },
  ],

  editValue: null,
};

const init = () => {
  try {
    const saved = localStorage.getItem("expense");

    console.log("saved", saved);

    return saved
      ? { ...initialValues, expenseList: JSON.parse(saved) }
      : initialValues;
  } catch (error) {
    console.log(error);
    return initialValues;
  }
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const input = action.payload;

      if (state.editValue !== null) {
        const updatedList = state.expenseList.map((list) =>
          list.id === state.editValue.id ? { ...list, ...input } : list,
        );

        console.log("updated", updatedList);

        return {
          ...state,
          expenseList: updatedList,
          editValue: null,
        };
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

        return {
          ...state,
          expenseList: [...state.expenseList, newExpense],
        };
      }
    }

    case "edit": {
      const value = action.payload;

      return {
        ...state,
        editValue: value,
      };
    }

    case "delete": {
      const id = action.payload;

      const remainList = state.expenseList.filter((l) => l.id !== id);

      return {
        ...state,
        expenseList: remainList,
      };
    }
  }
};

const ExpenseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialValues, init);

  useEffect(() => {
    const data = localStorage.setItem(
      "expense",
      JSON.stringify(state.expenseList),
    );

    console.log(localStorage.getItem("expense"));
  }, [state.expenseList]);

  const addExpense = (input) => {
    if (!input) {
      alert("all field is required");
    }

    dispatch({
      type: "add",
      payload: input,
    });
  };

  const handleExpenseEdit = (id) => {
    const editExpense = state.expenseList.find((l) => l.id === id);

    dispatch({
      type: "edit",
      payload: editExpense,
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: "delete",
      payload: id,
    });
  };

  const credit = state.expenseList
    .filter((l) => l.type === "credit")
    .reduce((acc, curr) => {
      return (acc += Number(curr.amount));
    }, 0);

  const debit = state.expenseList
    .filter((l) => l.type === "debit")
    .reduce((acc, curr) => {
      return (acc += Number(curr.amount));
    }, 0);

  const balance = credit - debit;

  const value = {
    expenseList: state.expenseList,
    addExpense,
    handleExpenseEdit,
    editValue: state.editValue,
    deleteExpense,
    credit,
    debit,
    balance,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
