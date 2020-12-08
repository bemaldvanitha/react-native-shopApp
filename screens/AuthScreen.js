import React,{useState,useEffect} from 'react';
import {View,StyleSheet,ScrollView,Text,TextInput,Dimensions,Button,ActivityIndicator,Alert} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../contants/Colors";
import {signup,login} from '../store/actions/authAction';

const AuthScreen = (props) => {
    //const error = useSelector(state => state.auth.error);
    const [error,setError] = useState();
    const dispatch = useDispatch();
    const [email,setEmail] = useState('');
    const [isValidEmail,setValidEmail] = useState(false);
    const [password,setPassword] = useState('');
    const [isValidPassword,setIsValidPassword] = useState(false);
    const [isSignUp,setIsSignUp] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        console.log(error,'?');
        if(error){
            Alert.alert('an error',error,[{ 'text' : 'ok' }]);
        }
    },[error]);

    const emailHandler = (text) => {
        if(text.length < 5){
            setValidEmail(false);
        }else {
            setValidEmail(true);
        }
        setEmail(text);
    };

    const passWordHandler = (text) => {
        if(text.length < 5){
            setIsValidPassword(false);
        }else {
            setIsValidPassword(true);
        }
        setPassword(text);
    };


    const authHandler =async () => {
        setIsLoading(true);
        setError(null);
        if (isSignUp) {
            try {
                await dispatch(signup(email, password));
                props.navigation.navigate({routeName: 'Shop'})
            }catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        } else {
            try {
                await dispatch(login(email, password));
                props.navigation.navigate({routeName: 'Shop'});
            }catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
    };

    const signUpSignInHandler = () => {
        setIsSignUp(prevState => {
            return !prevState;
        });
    };
  return(
      <ScrollView>
        <View style={styles.screen}>
            {isLoading && <ActivityIndicator size='large' color={Colors.primary}/>}
            <View style={styles.card}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} keyboardType='email-address' value={email} onChangeText={emailHandler}/>
                {!isValidEmail && <Text style={styles.warn}>enter valid email</Text>}
            </View>
            <View>
                <Text style={styles.label}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input} keyboardType='default' value={password} onChangeText={passWordHandler}/>
                {!isValidPassword && <Text style={styles.warn}>enter valid password</Text>}
            </View>
                <View style={styles.button}>
                    <Button color={Colors.primary} title={isSignUp ? 'SignUp': 'SignIn'} onPress={authHandler}/>
                </View>
                <View style={styles.button}>
                    <Button color={Colors.accent} title={isSignUp? 'Switch to SignIn': 'Switch to SignUp'} onPress={signUpSignInHandler}/>
                </View>
            </View>
        </View>
      </ScrollView>
  )
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    card:{
      width: Dimensions.get('screen').width*0.8,
      height: Dimensions.get('screen').height*0.48,
        padding: 20,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOffset: {
          width: 2,height: 2
        },
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: '#ffe3ff',
    },
    formControl: {
        width: '100%',
        padding: 20,
    },
    label: {
        marginVertical: 8,
        fontFamily: 'open-sans-bold'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    warn: {
        color: 'red'
    },
    button: {
        margin: 10
    }
});

export default AuthScreen;