import React from 'react';
import {Text,StyleSheet,View,TouchableOpacity,Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const CartItem = props => {
  return(
      <View style={styles.cartItem}>
          <View style={styles.itemData}>
              <Text style={styles.quantity}>
                  {props.quantity}
              </Text>
              <Text style={styles.title}>
                  {props.title}
              </Text>
          </View>
          <View style={styles.itemData}>
              <Text style={styles.amount}>
                  {props.amount}
              </Text>
              {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                  <Ionicons size={23} color='red' name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}/>
              </TouchableOpacity>}
          </View>
      </View>
  )
};

const styles = StyleSheet.create({
    deleteButton:{
        marginLeft: 20,
    },
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    }
});

export default CartItem;