import React,{useEffect} from 'react';
import {View,Text,StyleSheet,FlatList,Platform,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import OrderItem from "../components/OrderItem";
import {fetchOrders} from  '../store/actions/ordersAction'
import Colors from "../contants/Colors";

const OrderScreen = (props) => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchOrders());
  },[dispatch]);

  if(orders.length===0){
      return(
          <View style={styles.centered}>
              <Text>No OrdersPlaced</Text>
              <ActivityIndicator size='large' color={Colors.primary}/>
          </View>
      )
  }

  return(
      <FlatList data={orders} keyExtractor={item => item.id} renderItem={(itemData) => {
          return(
              <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items}/>
          )
      }}/>
  )
};

OrderScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Order',
        headerLeft: () => (
            <Ionicons color={Platform.OS === 'android' ? 'white':Colors.primary} size={23} name={Platform.OS ==='android'?'md-menu': 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        )
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default OrderScreen;