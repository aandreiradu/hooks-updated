import React, { useState, useEffect, useCallback, useReducer } from 'react'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'
import ErrorModal from '../UI/ErrorModal';


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

const httpReducer = (currentHttpState, action) => {
    // dispatch by type, action: {type: 'TYPE'};
    switch (action.type) {
        case 'SEND':
            // just manage the state here;
            return {
                loading: true,
                error: null
            }

        case 'RESPONSE':
            return {
                ...currentHttpState,
                loading: false
            }

        case 'ERROR':
            return {
                loading: false,
                error: action.errorMsg
            }

        case 'CLEAR':
            return {
                ...currentHttpState,
                error: null
            }

        default:
            throw new Error('DEFAULT??');
    }
}


const Ingredients = () => {
    const [ingredients, dispatchIngredients] = useReducer(ingredientsReducer, []);
    const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
    // const [ingredients, setIngredients] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();

    // Moved this initial getData
    // useEffect(() => {
    //     const loadData = async () => {
    //         const response = await fetch('https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json');

    //         if (!response.ok) {
    //             throw new Error('Can\'t load data from server');
    //         }

    //         const data = await response.json();
    //         if (data) {
    //             const loadedIngredients = [];
    //             for (const key in data) {
    //                 loadedIngredients.push({
    //                     id: key,
    //                     title: data[key].title,
    //                     amount: data[key].amount
    //                 });
    //             }

    //             setIngredients(loadedIngredients);
    //         }
    //     }

    //     loadData()
    //         .catch((error) => console.log(error));
    // }, []);

    const addIngredientHandler = (ing) => {
        const sendRequest = async () => {
            // setIsLoading(true);
            dispatchHttp({ type: 'SEND' });
            const response = await fetch('https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
                method: 'POST',
                body: JSON.stringify(ing),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Can\'t send data to server');
            }

            // setIsLoading(false);
            dispatchHttp({ type: 'RESPONSE' })
            const data = await response.json();
            console.log(data);

            // setIngredients((prevState) => {
            //     return [...ingredients, {
            //         id: data.name,
            //         title: ing.title,
            //         amount: ing.amount
            //     }];
            // })

            dispatchIngredients({
                type: 'ADD',
                ingredient: {
                    id: data.name,
                    // title: ing.title,
                    // amonut: ing.amount,
                    ...ing
                }

            })

        }

        sendRequest()
            .catch(error => {
                // setError('Something went wrong!');
                // setIsLoading(false);
                dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong' })
            });
    }

    const removeIngredientHandler = (ingredientId) => {
        const sendRequest = async () => {
            dispatchHttp({ type: 'SEND' })
            const response = await fetch(`https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Can\'t send data to server');
            }

            const data = await response.json();
            console.log(data);

            dispatchHttp({ type: 'RESPONSE' })
            // setIngredients((prevState) => {
            //     return prevState.filter((ing) => ing.id !== ingredientId);
            // })
            dispatchIngredients({ type: 'DELETE', ingredientId })

        }

        sendRequest()
            .catch(error => {
                // setError('Something went wrong!');
                // setIsLoading(false);
                dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong!' })
            });
    }

    const clearError = () => {
        // setError(null)
        dispatchHttp({ type: 'CLEAR' });
    };

    const filterIngredientsHandler = useCallback(filteredIngredients => {
        // setIngredients(filteredIngredients);
        dispatchIngredients({ type: 'SET', ingredient: filteredIngredients })
    }, []);

    return (
        <div className='App'>
            {/* {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>} */}
            {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

            <IngredientForm onAddIngredient={addIngredientHandler} onRemoveIngredient={removeIngredientHandler} isLoading={httpState.loading} />
            <section>
                <Search onLoadIngredients={filterIngredientsHandler} />
                <IngredientList ingredients={ingredients} onRemoveIngredintById={removeIngredientHandler} />
            </section>

        </div>
    )
}

export default Ingredients