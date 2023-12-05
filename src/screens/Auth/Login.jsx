import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, I18nManager, StatusBar } from "react-native";

import { useForm } from 'react-hook-form';
import { IOS, colorScheme, colors, fontSize, fonts, isDarkMode, isIPad, isRTL, width } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";

import { connect } from "react-redux";
import { SetIsLogin, SetLanguage, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { bindActionCreators } from "redux";
import { LoginApiCall } from "../../redux/reducers/AuthReducer";
import Loader from "../../components/Loader";
import { showToast } from "../../helpers/toastConfig";
import axios from "axios";

// import strings, { changeLang } from "./../../localization/translation";
import SplashScreen from "react-native-splash-screen";
// import RNRestart from 'react-native-restart';

const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const prevLoginResponseRef = useRef(props.loginResponse);
    const prevLoginErrorRef = useRef(props.loginError);

    // useEffect(() => {
    //     if (!IOS) {
    //         // axios.defaults.headers.common['Authorization'] = `Bearer 1656|35uwDzTjVDwexmX0Om94BtA9VPUKPHo2etdpGSUV`
    //         axios.request({ url: 'https://hunterssocial.com/api/settings', method: 'GET' })
    //             .then(function (response) { console.log('response hunter => ', response); })
    //             .catch(function (error) { console.log(error); });
    //     }
    // }, [])

    useEffect(() => {
        // console.log('props.loginResponse => ', props.loginResponse);
        if (props.loginResponse !== prevLoginResponseRef.current && props.loginResponse?.success && props.loginResponse?.data) {
            prevLoginResponseRef.current = props.loginResponse;
            props.SetUserInfo(props.loginResponse?.data);
            console.log('props.loginResponse => ', props.loginResponse);
            // showToast();
            props.SetIsLogin(true);
            // props.navigation.navigate('Screens', { screen: 'Home' })
            // props.navigation.reset({ index: 0, routes: [{ name: 'Screens' }] })
        }

        if (props.loginResponse !== prevLoginResponseRef.current && !props.loginResponse?.success) {
            props.loginResponse?.message && showToast('error', props.loginResponse?.message?.replaceAll(' ', '-').toLowerCase() == 'user-not-found' ? 'Email or Password incorrect' : props.loginResponse?.message)
        }
        isLoading(false);
    }, [props.loginResponse])

    useEffect(() => {
        console.log('props.loginError => ', props.loginError);
        if (props.loginError && props.loginError !== prevLoginErrorRef.current && props.loginError?.message) {
            console.log('props.loginError => ', props.loginError);
            showToast('error', props.loginError?.message)
        }
        isLoading(false);
    }, [props.loginError])

    // const showToast = () => {
    //     Toast.show({
    //         type: 'success', // Can be 'success', 'error', 'info', or 'none'
    //         // text1: 'Success',
    //         text2: 'User logedin successfully..',
    //         position: 'top', // Can be 'top', 'bottom', or 'center'
    //         visibilityTime: 3000, // Duration to show the toast message (in milliseconds)
    //         autoHide: true, // Automatically hide the toast after the duration
    //         topOffset: 30, // Additional offset from the top/bottom (in pixels)
    //         // bottomOffset: 40,
    //     });
    // }

    const onSubmit = (data) => {
        console.log('onSubmit data => ', data)
        props.LoginApiCall(data);
        isLoading(true);
    }

    const input01 = useRef();
    const input02 = useRef();

    useEffect(() => {
        console.log('isRTL 123 => ', isRTL)
        // changeLang(isRTL ? 'ar' : 'en')
    }, [])

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        <View style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]} >
            <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View style={isIPad && globalstyle.authscreencontainer}>

                            <View style={{ alignItems: 'center', }}>
                                <Image source={require('./../../../assets/images/logo.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
                            </View>

                            {/* <View>
                                <Text style={globalstyle.authheading}>Login</Text>
                                <Text style={globalstyle.authdescription}>Have fun and build your network</Text>
                            </View> */}
                            <View>
                                <View style={globalstyle.inputbox}>
                                    <Icon color={colors.blue} name={'mail'} size={18} />
                                    <TextInput
                                        style={globalstyle.inputfield}
                                        placeholder="Username or Email Address"
                                        {...register('email', {
                                            value: '',
                                            // value: 'johnmartin@mailinator.com',
                                            required: 'Email Address is required',
                                            pattern: {
                                                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                                message: "Please provide valid email"
                                            },
                                        })}
                                        defaultValue={''}
                                        // defaultValue={'johnmartin@mailinator.com'}
                                        placeholderTextColor={colors.placeholdercolor}
                                        autoCapitalize='none'
                                        onChangeText={(value) => setValue('email', value)}
                                        ref={input01}
                                        returnKeyType="next"
                                        onSubmitEditing={() => input02.current.focus()}
                                    />
                                </View>
                                {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => props.navigation.navigate('ForgetPassword')}
                                    style={styles.forgetpasslink}>
                                    <Text style={styles.forgetpasstext}>Forgot Password ?</Text>
                                </TouchableOpacity>
                                <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon color={colors.blue} name={'lock'} size={18} />
                                        <TextInput
                                            style={[globalstyle.inputfield, { flex: 0.8 }]}
                                            placeholder="Password"
                                            placeholderTextColor={colors.placeholdercolor}
                                            {...register('password', {
                                                value: '',
                                                // value: '12345678',
                                                required: 'Password is required',
                                                minLength: { value: 8, message: 'Password length must be greater then 8' }
                                            })}
                                            defaultValue={''}
                                            // defaultValue={'12345678'}
                                            // inputRef={password.ref}
                                            onChangeText={(value) => setValue('password', value)}
                                            secureTextEntry={!showPassword ? true : false}
                                            autoCapitalize='none'
                                            ref={input02}
                                        // returnKeyType="next"
                                        // onSubmitEditing={() => input05.current.focus()}
                                        />
                                    </View>
                                    <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowPassword(!showPassword) }}>
                                        <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}


                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.notes}>If you are not a member you will need an invitation code to enter the app.</Text>
                                    <Text style={styles.notes}>If you are visiting the app for the first time and interested in learning more about the app you will need to click here to receive an invitation code.</Text>
                                    <Text style={styles.notes}>If a member referred you and gave you an invitation code, use that code to enter the app.</Text>
                                </View>

                                <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)} style={globalstyle.authSubmitButton}>
                                    <Text style={globalstyle.authSubmitButtonText}>{'Login'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)} style={[globalstyle.authSubmitButton, { backgroundColor: colors.blue }]}>
                                    <Text style={globalstyle.authSubmitButtonText}>{'Invitation Code'}</Text>
                                </TouchableOpacity>

                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                    <Text style={{ fontFamily: fonts.primary }}>Or Sign In With</Text>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                </View> */}
                            <View style={globalstyle.alreadysignin}>
                                <Text style={globalstyle.alreadyaccount}>Don't have account? </Text>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { props.navigation.navigate('Register') }}>
                                    <Text style={globalstyle.actionauthtext}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    loginResponse: state.authstate.loginResponse,
    loginError: state.authstate.loginError,
    language: state.appstate.language,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
        LoginApiCall: bindActionCreators(LoginApiCall, dispatch),
        SetLanguage: bindActionCreators(SetLanguage, dispatch),
    }
};

export default connect(setStateToProps, mapDispatchToProps)(Login);
// export default Login;


const styles = StyleSheet.create({
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: isDarkMode ? colors.white : colors.black, fontFamily: fonts.primaryMedium, fontSize: fontSize - 1 },
    notes: { fontSize: 13, fontFamily: fonts.primary, marginBottom: 4 },
})