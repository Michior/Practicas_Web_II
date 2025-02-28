export const initialState = {
    budget:0
};

export const budgetReducer = (state, action) => {
    switch(action.type){
        case "add-budget":
            return{...state, budget:action.payload.budget}
        case "show-modal":
            return {...state, modal: true}
        case "close-modal":
            return{...state, modal: false}
        case "add-expense":
            return{...state, expenses:[...state.expenses, action.payload.expenses], modal: false}
        default:
            return state;
    }
}