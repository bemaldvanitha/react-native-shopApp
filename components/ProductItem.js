import React from 'react';
import {useDispatch} from 'react-redux';
import {View,StyleSheet,Text,Image,Button,Dimensions,TouchableOpacity,TouchableNativeFeedback,Platform,Alert} from 'react-native';
import Colors from "../contants/Colors";

import {addToCart} from '../store/actions/cartAction';
import {deleteProduct} from '../store/actions/productAction';

const ProductItem = (props) => {
    const dispatch = useDispatch();

    let TouchableCom = TouchableOpacity;
    if(Platform.OS ==='android'){
        TouchableCom = TouchableNativeFeedback;
    }

    const onDelete = () => {
        Alert.alert('delete product','are you sure',[
            {text: 'yes',onPress: () => {dispatch(deleteProduct(props.product.id))}},
            {text: 'no',style: 'default'}
        ]);
    };

    return(
        <TouchableCom onPress={props.toSelect}>
            <View style={styles.products}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: props.product.imageUrl}} style={styles.image}/>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.title}>{props.product.title}</Text>
                    <Text style={styles.price}>${props.product.price.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {props.allProd && <Button title="view detail" color={Colors.primary} onPress={props.toSelect}/>}
                    {props.allProd && <Button title="add to cart" color={Colors.primary} onPress={() => {
                        dispatch(addToCart(props.product))
                    }}/>}
                    {!props.allProd && <Button title='edit' color={Colors.primary} onPress={() => {props.editProduct()}}/>}
                    {!props.allProd && <Button title='delete' color={Colors.primary} onPress={() => {onDelete()}}/>}
                </View>
            </View>
        </TouchableCom>
    )
};

const styles = StyleSheet.create({
    products: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 10,
        backgroundColor: 'white',
        height: Dimensions.get('screen').height * 0.4,
        margin: 20
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    detail: {
        alignItems: 'center',
        height: '17%',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    }
});

export default ProductItem;