import { createContext, useReducer } from "react";
import { budgetReducer, initialState } from "../reducers/budget-reducer";



export const BudgetStateContext = createContext()
export const BudgetDistpatchContext = createContext()

export const BudgetProvider = ({children})=>{
    const [state, distpatch] = useReducer(budgetReducer, initialState);

    return(
        <BudgetStateContext.Provider value={state}>
            <BudgetDistpatchContext.Provider value={distpatch}>
                {children}
            </BudgetDistpatchContext.Provider>
        </BudgetStateContext.Provider>
    )
}