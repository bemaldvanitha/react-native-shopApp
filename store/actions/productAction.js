export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

import Product from "../../models/product";

import axios from 'axios';

export const fetchProduct = () => {
  return (dispatch,getState) => {
      const userId = getState().auth.userId;
      axios.get('https://shoplist-d50e1.firebaseio.com/products.json').then(res => {
          const resData = res.data;
          const loadedProduct = [];
          for(const key in resData){
              loadedProduct.push(new Product(key,resData[key].ownerId,resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price))
          }

          dispatch({
              type: SET_PRODUCTS,
              payload: {
                  loadedProduct: loadedProduct,
                  userId: userId
              }
          });
      });
  }
};

export const deleteProduct = (id) => {
    return (dispatch,getState) => {
        const token = getState().auth.token;
        axios.delete(`https://shoplist-d50e1.firebaseio.com/products/${id}.json?auth=${token}`).then(() => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        });
    }
};

export const addProduct = (title,description,imageUrl,price) => {
    return (dispatch,getState) => {
        // any async code write in this place
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        axios.post(`https://shoplist-d50e1.firebaseio.com/products.json?auth=${token}`,{
            title,
            description,
            imageUrl,
            price,
            ownerId: userId
        }).then(res => {
            const resData = res.data;
            dispatch( {
                type: ADD_PRODUCT,
                payload: {
                    id: resData.name,
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    price: price,
                    ownerId: userId
                }
            });
        });

    }
};

export const updateProduct = (id,title,description,imageUrl) => {
    return (dispatch,getState) => {
        const token = getState().auth.token;
        axios.patch(`https://shoplist-d50e1.firebaseio.com/products/${id}.json?auth=${token}`, {
            title,
            description,
            imageUrl,
        }).then(data => {
            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    id: id,
                    title: title,
                    description: description,
                    imageUrl: imageUrl
                }
            })
        });
    }
};