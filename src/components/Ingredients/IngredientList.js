import React from 'react'
import IngredientItem from './IngredientItem';
import classes from './IngredientList.module.css';

const IngredientList = (props) => {
    const { ingredients } = props;

    const removeIngredientById = (ingredientId) => {
        console.log(ingredientId);

        props.onRemoveIngredintById(ingredientId);
    }

    return (
        <section className={classes['ingredient-list']}>
            <h2>Loaded Ingredients</h2>
            <ul>
                {ingredients?.map((ingredient) => (
                    <IngredientItem
                        key={ingredient.id}
                        title={ingredient.title}
                        amount={ingredient.amount}
                        id={ingredient.id}
                        onRemoveIngredientById={removeIngredientById}
                    />
                ))}
            </ul>
        </section>
    )
}

export default IngredientList