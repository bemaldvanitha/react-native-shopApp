import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Platform} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

import Colors from "../contants/Colors";
import ProductOverview from "../screens/ProductOverview";
import ProductDetail from "../screens/ProductDetail";
import CardScreen from "../screens/CardScreen";
import OrderScreen from "../screens/Orders";
import UserProduct from "../screens/UserProduct";
import EditProduct from "../screens/EditProduct";
import AuthScreen from "../screens/AuthScreen";

const ProductsNavigator = createStackNavigator({
    ProductsOverView: ProductOverview,
    ProductDetail: ProductDetail,
    Cart: CardScreen
},{
    navigationOptions: {
      drawerIcon: drawerConfig => {
          return(
              <Ionicons size={23} color={drawerConfig.tintColor} name={Platform.OS === 'android'?'md-cart':'ios-cart'}/>
          )
      }
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        }
    }
});

const OrderNavigator = createStackNavigator({
   orders: OrderScreen,
},{
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return(
                <Ionicons name={Platform.OS === 'android' ? 'md-bookmark':'ios-bookmark'} size={23} color={drawerConfig.tintColor}/>
            )
        }
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

const UserNavigator = createStackNavigator({
   UserProduct: UserProduct,
    EditProduct: EditProduct
},{
    navigationOptions: {
      drawerIcon: drawerConfig => {
          return(
              <Ionicons size={23} color={drawerConfig.tintColor} name={Platform.OS === 'android' ? 'md-create': 'ios-create'}/>
          )
      }
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

const ShopNavigator = createDrawerNavigator({
   products: {
       screen: ProductsNavigator
   },
   orders: {
       screen: OrderNavigator
   },
    admin: {
       screen: UserNavigator
    }
},{
    contentOptions: {
        activeTintColor: Colors.primary,
        labelStyle: {
            fontSize: 24
        }
    }
});

const AuthNavigator = createStackNavigator({
   AuthScreenNav: AuthScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }
});

const  MainNavigator = createSwitchNavigator({
   Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);