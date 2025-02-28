import React from 'react'
import { AmountDisplay } from './AmountDisplay'

export const BudgetTracker = () => {
  return (
    <div className='grid grid-cols-l md:grid-cols-2 gap-5'>
        <div className='flex justify-center'>
            <img src="/grafico.jpg" alt="" />
        </div>
        <div className='flex flex-col justify-center items-center gap-8'>
            <button
                className='bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg'
                >
                    Rastrear app
            </button>

            <AmountDisplay amount={300} label="Presupuesto" />
            <AmountDisplay amount={200} label="Disponible" />
            <AmountDisplay amount={100} label="Gastado" />
        </div>
    </div>
  )
}
