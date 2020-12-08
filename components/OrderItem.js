import React,{useState} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';

import CartItem from "./CartItem";
import Colors from "../contants/Colors";

const OrderItem = (props) => {
    const [showDetail,setShowDetail] = useState(false);
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={showDetail? 'hide detail' : 'show detail'} color={Colors.primary} onPress={() => {
                setShowDetail(prevState => {
                    return !prevState
                })
            }}/>
            {showDetail && <View>
                {props.items.map(item => {
                    return(
                        <CartItem key={item.productId} deletable={false} quantity={item.quantity} amount={item.sum} title={item.productTitle}/>
                    )
                })}
            </View>}
        </View>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.26,
        elevation: 6,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 15,
        color: '#888'
    }
});

export default OrderItem;