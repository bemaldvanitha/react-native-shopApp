import React,{useState,useEffect,useCallback,useReducer} from 'react';
import {View,Text,Button,Platform,StyleSheet,TextInput,ScrollView,Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from "react-redux";

import Colors from "../contants/Colors";
import {addProduct,updateProduct} from '../store/actions/productAction';

const EditProduct = (props) => {
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProduct.find(prod => prod.id === prodId));

    const [title,setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid,setTitleIsValid] = useState(editedProduct ? true : false);
    const [url,setUrl] = useState(editedProduct ? editedProduct.imageUrl: '');
    const [urlIsValid,setUrlIsVaild] = useState(editedProduct ? true : false);
    const [price,setPrice] = useState(editedProduct ? editedProduct.price.toString(): '');
    const [priceIsValid,setPriceIsValid] = useState(editedProduct? true : false);
    const [description,setDescription] = useState(editedProduct? editedProduct.description: '');
    const [desIsValid ,setDesIsValid] = useState(editedProduct? true : false);

    const submitHandler = useCallback( () => {
        if(!titleIsValid || !urlIsValid || !priceIsValid || !desIsValid){
            Alert.alert('wrong input','enter all vaild inputs',[
                {title: 'ok',style: 'default'}
            ]);
            return
        }
        if(editedProduct){
            Alert.alert('updated product','do you want to edit',[
                {text: 'no',style:  'default' },
                {text: 'yes',style: 'default',onPress: () => {
                    dispatch(updateProduct(prodId,title,description,url));
                    props.navigation.goBack();
                }}
            ]);
        }else{
            Alert.alert('add product','do you want to add product',[
                {text: 'no',style: 'default'},
                {text: 'yes',style: 'default',onPress: () => {
                    dispatch(addProduct(title,description,url,+price));
                    props.navigation.goBack();
                }}
            ]);
        }
    },[dispatch,prodId,title,url,price,description]);

    useEffect(() => {
        props.navigation.setParams({'submit': submitHandler})
    },[submitHandler]);

    const titleChangeHandler = (text) => {
        if(text.trim().length < 5){
            setTitleIsValid(false);
        }else{
            setTitleIsValid(true);
        }
        setTitle(text);
    };
    const urlChangeHandler = (text) => {
      if(text.trim().length < 10){
          setUrlIsVaild(false);
      }
      else{
          setUrlIsVaild(true);
      }
      setUrl(text);
    };
    const priceChangeHandler = (text) => {
        if(!isNaN(text) &&  text.trim().length !==0){
            setPriceIsValid(true);
        }else{
            setPriceIsValid(false);
        }
        setPrice(text);
    };
    const descriptionHandler = (text) => {
        if(text.trim().length < 10){
            setDesIsValid(false);
        }
        else{
            setDesIsValid(true);
        }
        setDescription(text);
    };
   return(
       <ScrollView>
           <View style={styles.form}>
               <View style={styles.formControl}>
                   <Text style={styles.label}>Title</Text>
                   <TextInput keyboardType='default' style={styles.input} value={title} onChangeText={titleChangeHandler}/>
               </View>
               {!titleIsValid && <Text style={styles.validText}>enter valid title</Text>}
               <View style={styles.formControl}>
                   <Text style={styles.label}>Image Url</Text>
                   <TextInput style={styles.input} multiline={true} value={url} onChangeText={urlChangeHandler}/>
               </View>
               {!urlIsValid && <Text style={styles.validText}>enter valid url</Text>}
               {prodId ? null: <View style={styles.formControl}>
                   <Text style={styles.label}>Price</Text>
                   <TextInput keyboardType='numeric' style={styles.input} value={price} onChangeText={priceChangeHandler}/>
               </View>}
               {!priceIsValid && <Text style={styles.validText}>enter valid price</Text>}
               <View style={styles.formControl}>
                   <Text style={styles.label}>Description</Text>
                   <TextInput multiline={true} style={styles.input} value={description} onChangeText={descriptionHandler}/>
               </View>
               {!desIsValid && <Text style={styles.validText}>enter valid description</Text>}
           </View>
       </ScrollView>
   )
};

EditProduct.navigationOptions = navData => {
    const submitFun = navData.navigation.getParam('submit');
    return{
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product': 'Add Product',
        headerRight: () => (
            <Ionicons name={Platform.OS === 'android' ? 'md-checkmark':'ios-checkmark'} size={23} color={Platform.OS ==='android'? 'white':Colors.primary}
                    onPress={submitFun}
            />
        )
    }
};

const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    label: {
        marginVertical: 8,
        fontFamily: 'open-sans-bold'
    },
    validText: {
        color: 'red'
    }
});

export default EditProduct;