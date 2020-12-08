import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Text,FlatList,Platform,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import ProductItem from "../components/ProductItem";
import Colors from "../contants/Colors";
import {fetchProduct} from '../store/actions/productAction';

const ProductOverview = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

   /* useEffect(() => {
        const willFocus=props.navigation.addListener('willFocus',() => {
            dispatch(fetchProduct());
        });
        return() => {
            willFocus.remove();
        }
    },[dispatch]);*/

    const products = useSelector(state => state.products.availableProducts);

    if(products.length === 0){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary}/>
                <Text>No Product found or data is loading</Text>
            </View>
        )
    }

    return(
        <View>
            <FlatList data={products} keyExtractor={item => item.id} renderItem={itemData => {
                return(
                    <ProductItem editProduct={() => {}} allProd={true} product={itemData.item} toSelect={() => {
                        props.navigation.navigate({routeName: 'ProductDetail',params: {id: itemData.item.id}})
                    }} />
                )
            }}/>
        </View>
    )
};

ProductOverview.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <Ionicons name='md-cart' size={24} color={Platform.OS === 'android' ? 'white' : Colors.primary}
                      onPress={() => {
                            navData.navigation.navigate({routeName: 'Cart'})
                      }}/>
        ),
        headerLeft: () => (
            <Ionicons size={23} name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} color={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
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

export default ProductOverview;