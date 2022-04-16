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


const Ingredients = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
    // const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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
            setIsLoading(true);
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

            setIsLoading(false);
            const data = await response.json();
            console.log(data);

            // setIngredients((prevState) => {
            //     return [...ingredients, {
            //         id: data.name,
            //         title: ing.title,
            //         amount: ing.amount
            //     }];
            // })

            dispatch({
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
                setError('Something went wrong!');
                setIsLoading(false);
            });
    }

    const removeIngredientHandler = (ingredientId) => {
        const sendRequest = async () => {
            setIsLoading(true);
            const response = await fetch(`https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Can\'t send data to server');
            }

            const data = await response.json();
            console.log(data);

            setIsLoading(false);
            // setIngredients((prevState) => {
            //     return prevState.filter((ing) => ing.id !== ingredientId);
            // })
            dispatch({ type: 'DELETE', ingredientId })

        }

        sendRequest()
            .catch(error => {
                setError('Something went wrong!');
                setIsLoading(false);
            });
    }

    const clearError = () => setError(null);

    const filterIngredientsHandler = useCallback(filteredIngredients => {
        // setIngredients(filteredIngredients);
        dispatch({ type: 'SET', ingredient: filteredIngredients })
    }, []);

    return (
        <div className='App'>
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

            <IngredientForm onAddIngredient={addIngredientHandler} onRemoveIngredient={removeIngredientHandler} isLoading={isLoading} />
            <section>
                <Search onLoadIngredients={filterIngredientsHandler} />
                <IngredientList ingredients={ingredients} onRemoveIngredintById={removeIngredientHandler} />
            </section>

        </div>
    )
}

export default Ingredients