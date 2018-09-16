import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate(){
        console.log('[ordersummay] willUpdate');
    }

    render() {

        const OrderSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return (
                <li key={igkey}>
                    <span style={{ textTransform: 'capitalize' }}>{igkey}</span>
                    : {this.props.ingredients[igkey]}
                </li>
            );
        });

        return (
            <Auxi>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {OrderSummary}
                </ul>
                
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Auxi>
            );
    }

}

export default OrderSummary;