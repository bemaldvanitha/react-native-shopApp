import React,{useEffect} from 'react';
import {View,StyleSheet,Text,ScrollView,Button,Image} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../contants/Colors";
import {addToCart} from '../store/actions/cartAction';

const ProductDetail = (props) => {
    const id = props.navigation.getParam('id');
    const product = useSelector(state => state.products.availableProducts).find(prod => prod.id === id);
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setParams({'title': product.title})
    },[product]);

  return(
      <ScrollView>
          <Image source={{uri: product.imageUrl}} style={styles.image}/>
          <View style={styles.buttonContainer}>
            <Button title="add to cart" color={Colors.primary} onPress={() => {
                dispatch(addToCart(product))
            }}/>
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.detail}>{product.description}</Text>
      </ScrollView>
  )
};

ProductDetail.navigationOptions = navigrationData => {
    const title = navigrationData.navigation.getParam('title');
    return{
        headerTitle: title
    }
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 25,
        fontFamily: 'open-sans-bold'
    },
    detail: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 20,
        marginVertical: 10
    }
});

export default ProductDetail;