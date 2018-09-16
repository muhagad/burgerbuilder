import React, { Component } from 'react';
import axios from '../../axios-orders';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHanlder';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.0,
    meat: 1.3
};


class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('https://react-my-burger-4ad9a.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            });
    }

    updatePurchasableState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        // this.setState((prevState, props) => {
        //     return {
        //         totalPrice: newPrice,
        //         ingredients: updatedIngredients
        //     }
        // });
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const currentCount = this.state.ingredients[type];
        let decrementedCount = 0;
        if (currentCount <= 0) {
            return;
        } else {
            decrementedCount = currentCount - 1;
        }

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = decrementedCount;
        const PriceDiscount = INGREDIENTS_PRICE[type];
        const currentPrice = this.state.totalPrice;
        const newPrice = currentPrice - PriceDiscount;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchasableState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert("You continue!");
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customers: {
                name: 'moha gad',
                address: {
                    street: 'naser st',
                    zipcode: '11969',
                    phone: '0121136465464',
                    country: 'Canada'
                },
                email: 'mohagad@name.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice} />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxi>
                <Modal show={this.state.purchasing} ModalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    IngredientAdded={this.addIngredientHandler}
                    IngredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Auxi>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);