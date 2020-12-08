import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

import axios from 'axios';

export const addOrder = (cartItems,totalAmount) => {
  return (dispatch,getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const date = new Date();
      axios.post(`https://shoplist-d50e1.firebaseio.com/orders/${userId}.json?auth=${token}`,{
            cartItems,
            totalAmount,
          date: date.toISOString()
      }).then((res) => {
          const resData = res.data;
          dispatch({
              type: ADD_ORDER,
              payload: {id: resData.name,items: cartItems,amount: totalAmount,date: date}
          })
      })
  }
};

export const fetchOrders = () => {
  return (dispatch,getState) => {
      const userId = getState().auth.userId;
      axios.get(`https://shoplist-d50e1.firebaseio.com/orders/${userId}.json`).then((res) => {
          const resData = res.data;
          console.log(resData);
          const loadedOrders = [];
          for(const key in resData){
              loadedOrders.push(new Order(key,resData[key].cartItems,resData[key].totalAmount,new Date(resData[key].date)));
          }
          dispatch({
              type: FETCH_ORDERS,
              payload: loadedOrders
          })
      })
  }
};