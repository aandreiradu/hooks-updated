import React, { useState } from 'react'
import Card from '../UI/Card';
import classes from './IngredientForm.module.css'
import useInput from '../../hooks/useInput';
import inputValidators from '../../helpers/inputValidators';
import LoadingIndicator from '../UI/LoadingIndicator';


const IngredientForm = React.memo((props) => {
    console.log('RENDERING INGREDIENTFORM')
    const { isLoading } = props;
    const {
        value: enteredName,
        changeHandler: nameInputChangeHandler,
        blurHandler: nameInputBlurHandler,
        isValid: nameInputIsValid,
        hasError: nameInputHasError,
        reset: nameInputReset
    } = useInput(value => inputValidators().nameValidator(value));

    const {
        value: enteredAmount,
        changeHandler: amountInputChangeHandler,
        blurHandler: amountInputBlurHandler,
        isValid: amountInputIsValid,
        hasError: amountInputHasError,
        reset: amountInputReset
    } = useInput(value => inputValidators().amountValidator(value));

    let formIsValid = false;

    if (nameInputIsValid && amountInputIsValid) {
        formIsValid = true;
    }

    const submitFormHandler = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }
        nameInputReset();
        amountInputReset();

        props.onAddIngredient({
            title: enteredName,
            amount: enteredAmount
        });

    }

    const nameInputClasses = nameInputHasError ? `${classes['form-control']} ${classes['inputError']}` : `${classes['form-control']}`
    const amountInputClasses = amountInputHasError ? `${classes['form-control']} ${classes['inputError']}` : `${classes['form-control']}`


    return (
        <section className={classes['ingredient-form']}>
            <Card>
                <form onSubmit={submitFormHandler}>
                    <div className={nameInputClasses}>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            type='text'
                            value={enteredName}
                            onChange={nameInputChangeHandler}
                            onBlur={nameInputBlurHandler}
                        />
                        {nameInputHasError && <span className={classes.errorText}>This field should be at least 3 characters long</span>}
                    </div>
                    <div className={amountInputClasses}>
                        <label htmlFor='amount'>Amount</label>
                        <input
                            id='amount'
                            type='number'
                            value={enteredAmount}
                            onChange={amountInputChangeHandler}
                            onBlur={amountInputBlurHandler}
                        />
                    </div>
                    <div className={classes['ingredient-form__actions']}>
                        <button disabled={!formIsValid}>Add Ingredients</button>
                        {isLoading && <LoadingIndicator />}
                    </div>
                </form>
            </Card>
        </section>
    )
});

export default IngredientForm