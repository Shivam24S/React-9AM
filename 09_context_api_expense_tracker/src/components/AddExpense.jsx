import React, { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

const AddExpense = () => {


    const { expenseList } = useContext(ExpenseContext)

    console.log("expenseList", expenseList)

    return (
        <div>AddExpense</div>
    )
}

export default AddExpense