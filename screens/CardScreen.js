import React from 'react';
import {View,Text,StyleSheet,FlatList,Button} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../contants/Colors";
import CartItem from "../components/CartItem";
import {removeFromCart} from '../store/actions/cartAction';
import {addOrder} from '../store/actions/ordersAction';

const CardScreen = (props) => {
    const total = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a,b) => a.productId> b.productId ? 1 :-1 );
    });

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Amount: </Text>
                <Text style={styles.amount}>{total.toFixed(2)}</Text>
                <Button title='Order Now' color={Colors.accent} onPress={() => {dispatch(addOrder(cartItems,total))}}/>
            </View>
            <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={(itemData) => {
                return(
                    <CartItem deletable={true} quantity={itemData.item.quantity} title={itemData.item.productTitle} amount={itemData.item.sum} onRemove={() => {dispatch(removeFromCart(itemData.item.productId))}}/>
                )
            }}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0,height: 2},
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
});

export default CardScreen;