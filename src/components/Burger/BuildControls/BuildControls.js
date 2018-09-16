import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
];



const buildControls = (props) => (
    
    <div className={classes.BuildControls}>
        <p>current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.IngredientAdded(ctrl.type)}
                removed={() => props.IngredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}

        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>OREDER NOW</button>
    </div>
);

export default buildControls;