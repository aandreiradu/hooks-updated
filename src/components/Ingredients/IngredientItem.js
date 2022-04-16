import React from 'react'

import classes from './IngredientItem.module.css';

const IngredientItem = (props) => {
    const { id, title, amount } = props;

    const removeIngredientById = (ingredientId) => {
        console.log(ingredientId);

        props.onRemoveIngredientById(ingredientId);
    }

    return (
        <li id={id} className={classes.ingredient} key={id} onClick={removeIngredientById.bind(null, props.id)}>
            <span>{title}</span>
            <span>{amount}x</span>
        </li>
    )
}

export default IngredientItem