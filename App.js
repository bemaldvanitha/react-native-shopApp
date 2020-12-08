import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import ReduxThunk from 'redux-thunk';

import productReducer from "./store/reducers/products";
import cartReducer from './store/reducers/cart';
import orderReducer from "./store/reducers/orders";
import authReducer from './store/reducers/auth';
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
    auth: authReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const loadFont = () => {
  return  Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};



export default function App() {
  const [isLoaded,setFontLoaded] = useState(false);
  if(!isLoaded){
      return <AppLoading startAsync={loadFont} onFinish={() => {setFontLoaded(true)}}/>
  }
  return (
      <Provider store={store}>
        <ShopNavigator/>
      </Provider>
  );
}

