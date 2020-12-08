import React,{useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Platform,ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import ProductItem from "../components/ProductItem";
import Colors from "../contants/Colors";

const UserProduct = (props) => {
    const userProduct = useSelector(state => state.products.userProduct);

    if(userProduct.length === 0){
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={Colors.primary} size='large'/>
                <Text>No Product Added or data is loading</Text>
            </View>
        )
    }
    return(
        <FlatList data={userProduct} keyExtractor={item => item.id} renderItem={(itemData) => {
            return(
                <ProductItem allProd={false}  product={itemData.item} toSelect={() => {}} editProduct={() => {
                    props.navigation.navigate({routeName: 'EditProduct',params: {productId: itemData.item.id}})
                }}/>
            )
        }}/>
    )
};

UserProduct.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <Ionicons size={23} name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} color={Platform.OS === 'android' ? 'white' : Colors.primary}
                      onPress={() => {
                          navData.navigation.toggleDrawer();
                      }}
            />
        ),
        headerRight: () => (
            <Ionicons size={23} name={Platform.OS === 'android'?'md-add':'ios-add'} color={Platform.OS === 'android'?'white':Colors.primary}
                    onPress={()=> {
                        navData.navigation.navigate({routeName: 'EditProduct'})
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

export default UserProduct;