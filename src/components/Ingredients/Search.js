import React, { useState, useEffect, useRef } from 'react'
import Card from '../UI/Card';
import classes from './Search.module.css'

const Search = React.memo(props => {
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();
    const filterChangeHandler = e => setEnteredFilter(e.target.value);

    useEffect(() => {
        const timer = setTimeout(() => {
            // entered value it will be the value setted 500 ms ago, so its not the current value;
            // the current value is stored in inputRef.current.value;
            console.log('inputRef.current.value', inputRef.current.value);
            console.log(enteredFilter);
            if (enteredFilter === inputRef.current.value) {
                // value hasnt change here
                const loadFilteredData = async () => {
                    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
                    const response = await fetch('https://react-hooks-updated-5f3e1-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + query);

                    if (!response.ok) {
                        throw new Error('Can\'t load data from server');
                    }

                    const data = await response.json();
                    if (data) {
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
                }

                loadFilteredData()
                    .catch((error) => console.log(error));
            }
        }, 500);

        // cleanup function : clear the timeout;
        // this function will run right before this same useEffect function will run the next time
        // 1st render: the cleanup will not run
        // 1st keystroke: cleanup the old effect and run a new one 
        // 2st keystroke: cleanup the old effect and run a new one 
        // ...same
        return () => {
            clearTimeout(timer);
        }

    }, [enteredFilter, onLoadIngredients, inputRef])

    return (
        <section className={classes.search}>
            <Card>
                <div className={classes['search-input']}>
                    <label htmlFor='filter'>Filter by Title</label>
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