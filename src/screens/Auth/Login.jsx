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
// import Logo from './../../assets/images/logo.png';
// import { Svg, Circle } from 'react-native-svg';
import { SvgUri } from 'react-native-svg';

// import strings, { changeLang } from "./../../localization/translation";
import SplashScreen from "react-native-splash-screen";
import AuthLogo from "../../components/AuthLogo";
// import RNRestart from 'react-native-restart';

const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const prevLoginResponseRef = useRef(props.loginResponse);
    const prevLoginErrorRef = useRef(props.loginError);

    useEffect(() => {
        console.log('props.loginResponse => ', props.loginResponse);
        if (props.loginResponse !== prevLoginResponseRef.current && props.loginResponse?.success && props.loginResponse?.data) {
            prevLoginResponseRef.current = props.loginResponse;
            props.SetUserInfo(props.loginResponse?.data);
            console.log('props.loginResponse => ', props.loginResponse);
            // showToast();
            props.SetIsLogin(true);
            // props.navigation.navigate('Screens', { screen: 'Home' })
            // props.navigation.reset({ index: 0, routes: [{ name: 'Screens' }] })
        }

        // if (props.loginResponse !== prevLoginResponseRef.current && !props.loginResponse?.success) {
        //     props.loginResponse?.message && showToast('error', props.loginResponse?.message?.replaceAll(' ', '-').toLowerCase() == 'user-not-found' ? 'Email or Password incorrect' : props.loginResponse?.message)
        // }
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
        // props.SetIsLogin(true);
        // props.SetUserInfo({
        //     "name": 'Michelle Francis',
        //     "email": "michellefrancis@mailinator.com",
        //     "created_at": "2023-12-01T22:15:10.000000Z",
        //     "pwh": "Michelle@123",
        //     "username": "@michellefrancis",
        //     "role_id": 2,
        //     "id": "9dad4f7c-9165-44b8-9f55-0039a4c1f1e1",
        //     "user_id": "13df6929-86bd-4c2f-9217-e8ae9a18197e",
        //     "first_name": "Michelle",
        //     "last_name": "Francis",
        //     "phone": "+14845101357",
        //     "social_security_number": null,
        //     "bio": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        //     "address": 'House No 01, Street No 45',
        //     "country": 'United States',
        //     "city": 'New York',
        //     "postal_code": '54231',
        //     "updated_at": "2023-12-01T22:15:10.000000Z",
        //     "marital_status": 'Single',
        //     "gender": "Female",
        //     "profile_image": "https://service.demowebsitelinks.com/tha-network/public/storage/303/male-avatar.png", // require('./../../../assets/images/user-09.png'), //  
        //     "profile_cover": null,
        //     "has_made_monthly_payment": true,
        //     "stripe_account_id": "acct_1OIf1t4Dh1B210rz",
        //     "paypal_account_details": null,
        //     "stripe_checkout_session_id": "sub_1OIevyKWX6MBBv9PI25Psvyu",
        //     "has_provided_stripe_payout_information": false,
        //     "preferred_payout_method": "stripe",
        //     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zZXJ2aWNlLmRlbW93ZWJzaXRlbGlua3MuY29tOjMwNDVcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE3MDE5NzgzODcsImV4cCI6MTcwMTk4MTk4NywibmJmIjoxNzAxOTc4Mzg3LCJqdGkiOiJPenBwZDRCT21IT0sxSlh4Iiwic3ViIjoiMTNkZjY5MjktODZiZC00YzJmLTkyMTctZThhZTlhMTgxOTdlIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.SeYCOSWKiEMhHx7vr7KQJzifn5o97XwkWS4lvIU8Dlo"
        // });
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
        <StatusBar
            barStyle={'dark-content'}
            backgroundColor={colors.white}
        />
        <Loader isLoading={loading} />
        <View style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 25 }]} >
            <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView style={isIPad && globalstyle.authscreencontainer}>
                            {/* <Logo /> */}

                            <AuthLogo />
                            <View>
                                <Text style={globalstyle.authheading}>Login</Text>
                                <Text style={globalstyle.authdescription}>Have fun and build your network</Text>
                            </View>
                            <View>
                                <View style={globalstyle.inputbox}>
                                    <Icon color={colors.blue} name={'mail'} size={18} />
                                    <TextInput
                                        style={globalstyle.inputfield}
                                        placeholder="Username or Email Address"
                                        {...register('email', {
                                            // value: '',
                                            value: 'johnsmith@mailinator.com',
                                            // value: 'michellefrancis@mailinator.com',
                                            // required: 'Email Address is required',
                                            // pattern: {
                                            //     value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            //     message: "Please provide valid email"
                                            // },
                                        })}
                                        // defaultValue={''}
                                        defaultValue={'johnsmith@mailinator.com'}
                                        // defaultValue={'michellefrancis@mailinator.com'}
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
                                        {/* <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 50 }}><Icon color={colors.blue} name={'lock'} size={18} /></View> */}
                                        <Icon color={colors.blue} name={'lock'} size={18} />
                                        <TextInput
                                            style={[globalstyle.inputfield, { flex: 0.8 }]}
                                            placeholder="Password"
                                            placeholderTextColor={colors.placeholdercolor}
                                            {...register('password', {
                                                // value: '',
                                                value: 'John@123123',
                                                // value: 'michelle@123123',
                                                // required: 'Password is required',
                                                // minLength: { value: 8, message: 'Password length must be greater then 8' }
                                            })}
                                            // defaultValue={''}
                                            defaultValue={'John@123123'}
                                            // defaultValue={'michelle@123123'}
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


                                <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)} style={globalstyle.authSubmitButton}>
                                    <Text style={globalstyle.authSubmitButtonText}>Login</Text>
                                </TouchableOpacity>

                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', width: width - 60, alignItems: 'flex-start', marginBottom: IOS ? 8 : 0 }}>
                                        {/* <View style={{ width: 7, height: 7, marginTop: 5, marginRight: 13, backgroundColor: colors.grey, borderRadius: 10 }} /> */}
                                        <Text style={styles.notes}>1. If you are not a member you will need an invitation code to enter the app.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: width - 60, alignItems: 'flex-start', marginBottom: IOS ? 8 : 0 }}>
                                        {/* <View style={{ width: 7, height: 7, marginTop: 5, marginRight: 13, backgroundColor: colors.grey, borderRadius: 10 }} /> */}
                                        <Text style={styles.notes}>2. If you are visiting the app for the first time and interested in learning more about the app you will need to <Text style={[styles.notes, { color: colors.black, marginTop: 10, fontFamily: fonts.primaryMedium }]} onPress={() => props.navigation.navigate('RequestInvitationCode')}>Click Here</Text> to receive an invitation code.</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: width - 60, alignItems: 'flex-start', marginBottom: IOS ? 8 : 0 }}>
                                        {/* <View style={{ width: 7, height: 7, marginTop: 5, marginRight: 13, backgroundColor: colors.grey, borderRadius: 10 }} /> */}
                                        <Text style={styles.notes}>3. If a member referred you and gave you an invitation code, use that code to enter the app.</Text>
                                    </View>
                                </View>

                                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('InvitationCode')} style={[globalstyle.authSubmitButton, { backgroundColor: colors.blue }]}>
                                    <Text style={globalstyle.authSubmitButtonText}>{'Invitation Code'}</Text>
                                </TouchableOpacity>

                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                    <Text style={{ fontFamily: fonts.primary }}>Or Sign In With</Text>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                </View> */}
                            {/* <View style={globalstyle.alreadysignin}>
                                <Text style={globalstyle.alreadyaccount}>Don't have account? </Text>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { props.navigation.navigate('Register') }}>
                                    <Text style={globalstyle.actionauthtext}>Sign Up</Text>
                                </TouchableOpacity>
                            </View> */}
                        </ScrollView>
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
    forgetpasslink: { marginLeft: 'auto', marginTop: 5, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: colors.black, fontFamily: fonts.primaryMedium, fontSize: fontSize - 1 },
    notes: { fontSize: 13, fontFamily: fonts.primary, color: colors.grey },
})