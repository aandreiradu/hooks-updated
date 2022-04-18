import React, { useState, useEffect, useRef } from 'react'
import Card from '../UI/Card';
import classes from './Search.module.css'
import useHttp from '../../hooks/useHttp';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
    const { isLoading, error, data, sendRequest, clear } = useHttp();
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();
    const filterChangeHandler = e => setEnteredFilter(e.target.value);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // entered value it will be the value setted 500 ms ago, so its not the current value;
    //         // the current value is stored in inputRef.current.value;
    //         console.log('inputRef.current.value', inputRef.current.value);
    //         console.log(enteredFilter);
    //         if (enteredFilter === inputRef.current.value) {
    //             // value hasnt change here
    //             const loadFilteredData = async () => {
    //                 const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    //                 const response = await fetch('https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + query);

    //                 if (!response.ok) {
    //                     throw new Error('Can\'t load data from server');
    //                 }

    //                 const data = await response.json();
    //                 if (data) {
    //                     const loadedIngredients = [];
    //                     for (const key in data) {
    //                         loadedIngredients.push({
    //                             id: key,
    //                             title: data[key].title,
    //                             amount: data[key].amount
    //                         });
    //                     }

    //                     console.log('loadedIngredients', loadedIngredients);
    //                     onLoadIngredients(loadedIngredients);
    //                 }
    //             }

    //             loadFilteredData()
    //                 .catch((error) => console.log(error));
    //         }
    //     }, 500);

    //     // cleanup function : clear the timeout;
    //     // this function will run right before this same useEffect function will run the next time
    //     // 1st render: the cleanup will not run
    //     // 1st keystroke: cleanup the old effect and run a new one 
    //     // 2st keystroke: cleanup the old effect and run a new one 
    //     // ...same
    //     return () => {
    //         clearTimeout(timer);
    //     }

    // }, [enteredFilter, onLoadIngredients, inputRef])


    useEffect(() => {
        console.log('a rulat effectul din search care face GET');
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
                sendRequest(
                    'https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + query,
                    'GET'
                );
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, sendRequest]);

    useEffect(() => {
        console.log('a rulat effectul din search care updateaza ingredientele');
        if (!isLoading && !error && data) {
            const loadedIngredients = [];
            for (const key in data) {
                loadedIngredients.push({
                    id: key,
                    title: data[key].title,
                    amount: data[key].amount
                });
            }
            onLoadIngredients(loadedIngredients);
        }
    }, [data, error, isLoading, onLoadIngredients]);



    return (
        <section className={classes.search}>
            {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <Card>
                <div className={classes['search-input']}>
                    <label htmlFor='filter'>Filter by Title</label>
                    {isLoading && <span>Loading...</span>}
                    <input
                        type='text'
                        id='filter'
                        value={enteredFilter}
                        onChange={filterChangeHandler}
                        ref={inputRef}
                    />
                </div>
            </Card>
        </section>
    )
});

export default Search