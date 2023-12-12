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

const InvitationCode = (props) => {

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
        props.navigation.navigate('PaymentCard');
        // props.LoginApiCall(data);
        // isLoading(true);
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
                        <ScrollView style={isIPad && globalstyle.authscreencontainer}>
                            {/* <View style={{ alignItems: 'center', }}>
                                <Image source={require('./../../../assets/images/logo.png')} style={{ width: 170, height: 150, resizeMode: 'contain' }} />
                            </View> */}
                            <View>
                                <Text style={globalstyle.authheading}>Invitation Code</Text>
                                <Text style={globalstyle.authdescription}>Have fun and build your network</Text>
                            </View>
                            <View>
                                <View style={globalstyle.inputbox}>
                                    <Icon color={colors.blue} name={'mail'} size={18} />
                                    <TextInput
                                        style={globalstyle.inputfield}
                                        placeholder="Enter Your Invitation Code..."
                                        // {...register('invitation_code', {
                                        //     value: '',
                                        //     // value: 'johnmartin@mailinator.com',
                                        //     required: 'Invitation code is required',
                                        //     pattern: {
                                        //         value: /[0-9+]$/i,
                                        //         message: "Please provide valid number"
                                        //     },
                                        // })}
                                        defaultValue={''}
                                        // defaultValue={'johnmartin@mailinator.com'}
                                        placeholderTextColor={colors.placeholdercolor}
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={(value) => setValue('invitation_code', value)}
                                        // ref={input01}
                                        // returnKeyType="next"
                                        // onSubmitEditing={() => input02.current.focus()}
                                    />
                                </View>
                                {errors.invitation_code && <Text style={globalstyle.errorField}>{errors.invitation_code.message}</Text>}



                                <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)} style={globalstyle.authSubmitButton}>
                                    <Text style={globalstyle.authSubmitButtonText}>Submit</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={globalstyle.alreadysignin}>
                                <Text style={globalstyle.alreadyaccount}>Already have an account? </Text>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { props.navigation.navigate('Login') }}>
                                    <Text style={globalstyle.actionauthtext}>Login</Text>
                                </TouchableOpacity>
                            </View>
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

export default connect(setStateToProps, mapDispatchToProps)(InvitationCode);
// export default Login;


const styles = StyleSheet.create({
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: isDarkMode ? colors.white : colors.black, fontFamily: fonts.primaryMedium, fontSize: fontSize - 1 },
    notes: { fontSize: 13, fontFamily: fonts.primary, marginBottom: 6, color: colors.grey },
})