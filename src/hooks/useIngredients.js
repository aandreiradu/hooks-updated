import { useReducer, useCallback } from 'react'

const initialIngredientsState = [];


const ingredientsReducer = (currentState, action) => {
    // dispatch by type, action: {type: 'TYPE'};
    switch (action.type) {
        case 'SET': //used for filter
            return action.ingredient // expect to get the ingredient obj

        case 'ADD':
            return [...currentState, action.ingredient];

        case 'DELETE':
            return currentState.filter((ing) => ing.id !== action.ingredientId);

        default:
            throw new Error('IDK')
    }
}


const useIngredients = () => {
    const [ingredients, dispatchIngredients] = useReducer(ingredientsReducer, initialIngredientsState);

    const ingredientsDispatch = (typeAndPayload) => {
        // console.log('typeAndPayload', typeAndPayload);
        dispatchIngredients(typeAndPayload);
    }


    return {
        ingredients: ingredients,
        dispatchIngredients: ingredientsDispatch
    }
}

export default useIngredients;