import React from 'react';

import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, i) => {
                return <BurgerIngredients key={igkey + i} type={igkey} />;
            });
        }).reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue);
        }, []);


    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients!</p>;
    }

    console.log(transformedIngredients);

    /* 
        transformedIngredients = transformedIngredients.length === 0 &&
         <p>please add ingredients!</p>; true && expression = expression but gave me a bad result 
    */

    console.log('from burgerjs '+transformedIngredients);


    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;