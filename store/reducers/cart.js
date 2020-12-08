import {ADD_TO_CART,REMOVE_FROM_CART} from '../actions/cartAction';
import {ADD_ORDER} from "../actions/ordersAction";
import {DELETE_PRODUCT} from '../actions/productAction';
import CardItem from '../../models/card-item';
import CartItem from "../../components/CartItem";

const initialState ={
    items: {},
    totalAmount: 0
};

const cartReducer = (state=initialState,action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.payload;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                // already have the item in the cart
                updatedOrNewCartItem = new CardItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCartItem = new CardItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.payload];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = { ...state.items, [action.payload]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.payload];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
        case ADD_ORDER: {
            return initialState;
        }
        case DELETE_PRODUCT:
            if(!state.items[action.payload]){
                return state;
            }
            const updatedItems =  {...state.items};
            const itemTotal = state.items[action.payload].sum;
            delete updatedItems[action.payload];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state;
};

export default cartReducer;