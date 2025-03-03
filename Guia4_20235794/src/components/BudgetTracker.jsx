import React, { useContext, useMemo } from 'react'
import { AmountDisplay } from './AmountDisplay'
import { BudgetDistpatchContext, BudgetStateContext } from '../context/BudgetContext'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

export const BudgetTracker = () => {
  const state = useContext(BudgetStateContext);
  const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0)
  const remainingBudget = state.budget-totalExpenses 
  const percentage = ((totalExpenses/state.budget)*100).toFixed(2)

  const distpatch = useContext(BudgetDistpatchContext)

  const handleReset = () => {
    if (window.confirm("¿Seguro que quieres resetear la aplicación?")) {
      distpatch({ type: "reset-app" }); 
    }
  };

  return (
    <div className='grid grid-cols-l md:grid-cols-2 gap-5'>
        <div className='flex justify-center'>
            <CircularProgressbar
              value={percentage} //valor del progreso
              text={`${percentage}%`}
              styles={buildStyles({
                pathColor : (percentage < 100) ? '#3b82f6' : '#dc2626',
                trailColor: '#F5F5F5'
              })}
            />
        </div>
        <div className='flex flex-col justify-center items-center gap-8'>
            <button
                className='bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg' onClick={handleReset}
                >
                    Resetear app
            </button>

            <AmountDisplay amount={state.budget} label="Presupuesto" />
            <AmountDisplay amount={remainingBudget} label="Disponible" />
            <AmountDisplay amount={totalExpenses} label="Gastado" />
        </div>
    </div>
  )
}
