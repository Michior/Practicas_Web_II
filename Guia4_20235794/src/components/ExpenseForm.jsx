import React, { useContext, useEffect, useMemo, useState } from 'react' 
import { categories } from '../data/categories' 
import DatePicker from 'react-date-picker' 
import 'react-date-picker/dist/DatePicker.css' 
import 'react-calendar/dist/Calendar.css' 
import ErrorMessage from './ErrorMessage'
import { BudgetDistpatchContext, BudgetStateContext } from '../context/BudgetContext'
import { BudgetTracker } from './BudgetTracker'

export const ExpenseForm = () => {
    const[expense, setExpense] = useState({
        expenseName: "",
        amount: 0,
        category: "",
        date: new Date(),
    });

    const [error, setError] = useState('')
    const distpatch = useContext(BudgetDistpatchContext);
    const state = useContext(BudgetStateContext);


    useEffect(() =>{
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense =>currentExpense.id===state.editingId)[0]
            setExpense(editingExpense)
        }
    }, [state.editingId])

    const handleChange = (e) => {
        const {name, value } = e.target;
        const isAmountField = ["amount"].includes(name); //amount es un array con un solo valor y .includes devuelve true si name es amout
        setExpense({
            ...expense, 
            //name es una clave calculada que representa el nombre del campo que se esta actualizando
            [name]: isAmountField ? Number(value) : value,
        })
    }

    //funcio para recuperar y escribir la fecha en el state+
    const handleChangeDate = (value) => {
        setExpense({
            ...expense, 
            date: value
        })
    }

    //validacion formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        //validacion 
        if(Object.values(expense).includes('')){
            setError('Todos los campos son Obligatorios')
            return
        }
        const totalExpenses = state.expenses.reduce((total, exp) => exp.amount + total, 0) + expense.amount;
        if(totalExpenses > state.budget){
            setError("Alerta: tus gastos han exedido tu presupuesto");
            return;
        }
        if (state.editingId){
            distpatch({type: "update-expense", payload: {expense: {id: state.editingId, ...expense}}})
        }
        else {
            distpatch({type: 'add-expense', payload: {expense}})
        }
        //reiniciar el state/form
        setExpense({
            expenseName: "",
            amount: 0,
            category: "",
            date: new Date(),
        })
    }

    return(
        <form className='space-y-5' onSubmit={handleSubmit}>
            <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
                {expense.id? "Guardar cambios" : "Nuevo Gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className='flex flex-col gap-2'>
                <label htmlFor="expenseName" className='text-xl'>
                    Nombre Gasto:
                </label>
                <input 
                    type="text" 
                    id = "expenseName"
                    placeholder='Añade el nombre del gasto'
                    className='bg-slate-100 p-2'
                    name='expenseName'
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="amount" className='text-xl'>
                    Cantidad:
                </label>
                <input 
                    type="number"
                    id='amount'
                    placeholder='Añade la cantidad del gasto: ej. 300'
                    className='bg-slate-100 p-2'
                    name='amount'
                    value={expense.amount}
                    onChange={handleChange} 
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="category" className='text-xl'>
                    Categoría:
                </label>
                <select 
                    id='category'
                    className='bg-slate-100 p-2'
                    name='category'
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option > -- Seleccione --</option>
                    {categories.map((category) =>(
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="amount" className='text-xl'>
                    Fecha Gasto:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0" value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input 
                type="submit"
                className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
                value=  { expense.id? "Guardar Cambios" : "Registrar Gasto" }
            />
        </form>
    )
}
