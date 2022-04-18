import React, { useState, useEffect, useCallback, useReducer, useMemo } from 'react'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/useHttp';


const ingredientsReducer = (initialIngredientsState, action) => {
    // dispatch by type, action: {type: 'TYPE'};
    switch (action.type) {
        case 'SET': //used for filter
            return action.ingredient // expect to get the ingredient obj

        case 'ADD':
            return [...initialIngredientsState, action.ingredient];

        case 'DELETE':
            return initialIngredientsState.filter((ing) => ing.id !== action.ingredientId);

        default:
            throw new Error('IDK')
    }
}



const Ingredients = () => {
    console.log('RENDERING');
    const {
        isLoading,
        data,
        error,
        sendRequest,
        reqExtra,
        reqIdentifier,
        clear,
    } = useHttp();
    const [ingredients, dispatchIngredients] = useReducer(ingredientsReducer, []);

    // const [ingredients, setIngredients] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();

    // Moved this initial getData to Search (basically the inital fetch happens in Search component);
    // send the request using sendRequest function from customHook and handle the response using this effect
    useEffect(() => {
        console.log('reqIdentifier in effect', reqIdentifier);
        console.log('data in effect', data);
        if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
            console.log('reqIdentifier remove')
            dispatchIngredients({ type: 'DELETE', ingredientId: reqExtra });
        } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
            console.log('reqIdentifier add')
            dispatchIngredients({
                type: 'ADD',
                ingredient: { id: data.name, ...reqExtra }
            });
        }
    }, [data, reqExtra, reqIdentifier, isLoading, error]);

    // we can also handle the response from sendRequest by changing the logic from the custom hook and 
    // make this function to return a promise (return fetch....) and handle the response without useEffect.

    const addIngredientHandler = useCallback(ingredient => {
        // moved all the logic to custom hook
        // const sendRequest = async () => {
        // setIsLoading(true);
        // dispatchHttp({ type: 'SEND' });
        // const response = await fetch('https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
        //     method: 'POST',
        //     body: JSON.stringify(ing),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        // if (!response.ok) {
        //     throw new Error('Can\'t send data to server');
        // }

        // // setIsLoading(false);
        // dispatchHttp({ type: 'RESPONSE' })
        // const data = await response.json();
        // console.log(data);

        // setIngredients((prevState) => {
        //     return [...ingredients, {
        //         id: data.name,
        //         title: ing.title,
        //         amount: ing.amount
        //     }];
        // })

        // dispatchIngredients({
        //     type: 'ADD',
        //     ingredient: {
        //         id: data.name,
        //         // title: ing.title,
        //         // amonut: ing.amount,
        //         ...ing
        //     }
        // })
        // }
        sendRequest(
            'https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
            'POST',
            JSON.stringify(ingredient),
            ingredient,
            'ADD_INGREDIENT'
        );

    }, [sendRequest]);


    const removeIngredientHandler = useCallback(ingredientId => {
        sendRequest(
            `https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,
            'DELETE',
            null,
            ingredientId,
            'REMOVE_INGREDIENT'
        )
    }, [sendRequest])

    // const clearError = useCallback(() => {
    //     // setError(null)
    //     // dispatchHttp({ type: 'CLEAR' });
    // }, []);

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        console.log('a rulat filteredIngredientsHandler');
        dispatchIngredients({ type: 'SET', ingredient: filteredIngredients });
    }, []);


    // ingredients list
    const ingredientsList = useMemo(() => {
        return (
            <IngredientList
                ingredients={ingredients}
                onRemoveIngredintById={removeIngredientHandler}
            />
        )
    }, [ingredients, removeIngredientHandler]);

    return (
        <div className='App'>
            {/* {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>} */}
            {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

            <IngredientForm
                onAddIngredient={addIngredientHandler}
                onRemoveIngredient={removeIngredientHandler}
                isLoading={isLoading}
            />

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler} />
                {ingredientsList}
            </section>

        </div>
    )
}

export default Ingredients