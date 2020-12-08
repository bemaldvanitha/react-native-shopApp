import {ADD_ORDER,FETCH_ORDERS} from '../actions/ordersAction';
import Order from '../../models/order';

const initialState = {
  orders: []
};

const orderReducer = (state = initialState,action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(action.payload.id,action.payload.items,action.payload.amount,action.payload.date);
         return {
             ...state,
             orders: state.orders.concat(newOrder)
         }
        case FETCH_ORDERS:
            return {
                orders: action.payload
            }
    }
    return state;
};

export default orderReducer;