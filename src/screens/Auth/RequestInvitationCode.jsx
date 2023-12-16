import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, I18nManager, StatusBar } from "react-native";

import { useForm } from 'react-hook-form';
import { IOS, colorScheme, colors, fontSize, fonts, isDarkMode, isIPad, isRTL, width } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";

import { connect } from "react-redux";
import { SetIsLogin, SetLanguage, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { bindActionCreators } from "redux";
import { GetInvitationCodeApiCall, LoginApiCall } from "../../redux/reducers/AuthReducer";
import Loader from "../../components/Loader";
import { showToast } from "../../helpers/toastConfig";
import axios from "axios";

// import strings, { changeLang } from "./../../localization/translation";
import SplashScreen from "react-native-splash-screen";
// import RNRestart from 'react-native-restart';

const RequestInvitationCode = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const prevLoginResponseRef = useRef(props.getInvitationCodeResponse);

    useEffect(() => {
        // console.log('props.getInvitationCodeResponse => ', props.getInvitationCodeResponse);
        if (props.getInvitationCodeResponse !== prevLoginResponseRef.current && props.getInvitationCodeResponse?.success && props.getInvitationCodeResponse?.data) {
            prevLoginResponseRef.current = props.getInvitationCodeResponse;
            console.log('props.getInvitationCodeResponse => ', props.getInvitationCodeResponse);
            props.navigation.navigate('InvitationCode');
        }
        // if (props.getInvitationCodeResponse !== prevLoginResponseRef.current && !props.getInvitationCodeResponse?.success) {
        //     props.getInvitationCodeResponse?.message && showToast('error', props.getInvitationCodeResponse?.message?.replaceAll(' ', '-').toLowerCase() == 'user-not-found' ? 'Email or Password incorrect' : props.getInvitationCodeResponse?.message)
        // }
        isLoading(false);
    }, [props.getInvitationCodeResponse])

    const onSubmit = (data) => {
        console.log('Request Invitation onSubmit data => ', data);
        props.GetInvitationCodeApiCall(data);
        isLoading(true);
    }

    return <SafeAreaView style={globalstyle.fullview}>
        <StatusBar
            barStyle={'dark-content'}
            backgroundColor={colors.white}
        />
        <Loader isLoading={loading} />
        <View style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]} >
            <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView style={isIPad && globalstyle.authscreencontainer}>
                            <View style={{ alignItems: 'center', }}>
                                <Image source={require('./../../../assets/images/logo.png')} style={{ width: 170, height: 150, resizeMode: 'contain' }} />
                            </View>
                            <View>
                                <Text style={globalstyle.authheading}>{`Request\nInvitation Code`}</Text>
                                <Text style={globalstyle.authdescription}>Receive an invitaion code via email</Text>
                            </View>
                            <View>
                                <View style={globalstyle.inputbox}>
                                    <Icon color={colors.blue} name={'mail'} size={18} />
                                    <TextInput
                                        style={globalstyle.inputfield}
                                        placeholder="Enter Email Address..."
                                        {...register('email', {
                                            // value: '',
                                            value: 'michellefrancis@mailinator.com',
                                            // value: 'johnmartin@mailinator.com',
                                            required: 'Invitation code is required',
                                            pattern: {
                                                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                                message: "Please provide valid email"
                                            },
                                        })}
                                        // defaultValue={''}
                                        defaultValue={'michellefrancis@mailinator.com'}
                                        keyboardType="email-address"
                                        // defaultValue={'johnmartin@mailinator.com'}
                                        placeholderTextColor={colors.placeholdercolor}
                                        autoCapitalize='none'
                                        onChangeText={(value) => setValue('email', value)}
                                    />
                                </View>
                                {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}

                                <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)} style={globalstyle.authSubmitButton}>
                                    <Text style={globalstyle.authSubmitButtonText}>Get Invitation Code</Text>
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
    getInvitationCodeResponse: state.authstate.getInvitationCodeResponse,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetInvitationCodeApiCall: bindActionCreators(GetInvitationCodeApiCall, dispatch),
    }
};

export default connect(setStateToProps, mapDispatchToProps)(RequestInvitationCode);
// export default Login;


const styles = StyleSheet.create({
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: isDarkMode ? colors.white : colors.black, fontFamily: fonts.primaryMedium, fontSize: fontSize - 1 },
    notes: { fontSize: 13, fontFamily: fonts.primary, marginBottom: 6, color: colors.grey },
})