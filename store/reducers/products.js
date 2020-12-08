import PRODUCTS from '../../data/dummy-data';
import {DELETE_PRODUCT,UPDATE_PRODUCT,ADD_PRODUCT,SET_PRODUCTS} from '../actions/productAction';
import Product from '../../models/product';

const initialState = {
    availableProducts: [],
    userProduct: []
};

const productReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.payload.loadedProduct,
                userProduct: action.payload.loadedProduct.filter(prod => prod.ownerId === action.payload.userId )
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProduct: state.userProduct.filter(product => product.id !== action.payload),
                availableProducts: state.availableProducts.filter(product => product.id !== action.payload)
            }
        case ADD_PRODUCT:
            const newProduct = new Product(action.payload.id,action.payload.ownerId,action.payload.title,action.payload.imageUrl,action.payload.description,action.payload.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProduct: state.userProduct.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const produIndex = state.userProduct.findIndex(prod => prod.id ===action.payload.id);
            const availaIndex = state.availableProducts.findIndex(prod => prod.id===action.payload.id);
            const updatedProduct = new Product(
                action.payload.id,
                state.userProduct[produIndex].ownerId,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                state.userProduct[produIndex].price
            );
            const updateUserProduct = [...state.userProduct];
            updateUserProduct[produIndex] = updatedProduct;
            const updateAvailableProd = [...state.availableProducts];
            updateAvailableProd[availaIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updateAvailableProd,
                userProduct: updateUserProduct
            }
    }
    return state;
};

export default productReducer;