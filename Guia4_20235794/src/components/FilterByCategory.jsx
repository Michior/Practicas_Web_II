import React, { useContext } from 'react'
import { categories } from '../data/categories'
import { BudgetDistpatchContext } from '../context/BudgetContext'

export const FilterByCategory = () => {
    const distpatch = useContext(BudgetDistpatchContext)

    const handleChange = (e) =>{
        distpatch({type:"add-filter-category", payload:{categoryId:e.target.value}})
    }
  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
        <form>
            <div className='flex flex-col md:flex-row md:items-center gap-5'>
                <label htmlFor="category">Filtrar Gastos</label>
                <select id="category" className='bg-slate-100 p-3 flex-l rounded' onChange={handleChange}>
                    <option value="">--- Todas las categorias ---</option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}
