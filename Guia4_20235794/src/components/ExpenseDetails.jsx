import React from 'react'
import { categories } from '../data/categories'

export const ExpenseDetails = ({expense}) => {

    const categotyInfo = categories.find(cat => cat.id === expense.category) //recuperando el nombre de la categoria
  return (
    <div>ExpenseDetails</div>
  )
}
