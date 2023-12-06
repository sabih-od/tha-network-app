import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, I18nManager } from "react-native";
// import { fonts } from "../../theme";
import { useForm } from 'react-hook-form';
import { IOS, colorScheme, colors, fontSize, fonts, isIPad, } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";
import TermsAndConditionsModal from "../../components/modal/TermsAndConditionsModal";
import Loader from "../../components/Loader";
import { connect } from "react-redux";
import { SetIsLogin, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { RegisterApiCall } from "../../redux/reducers/AuthReducer";
import { bindActionCreators } from "redux";
import { showToast } from "../../helpers/toastConfig";


const Register = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    const prevResgisterResponseRef = useRef(props.registerResponse);

    useEffect(() => {
        if (props.registerResponse !== prevResgisterResponseRef.current && props.registerResponse?.success && props.registerResponse?.data) {
            prevResgisterResponseRef.current = props.registerResponse;
            props.SetUserInfo(props.registerResponse?.data);
            console.log('props.registerResponse => ', props.registerResponse);
            props.SetIsLogin(true);
            // props.navigation.reset({ index: 0, routes: [{ name: 'Screens' }] })
        }
        isLoading(false);
    }, [props.registerResponse])

    const onSubmit = (data) => {
        if (isChecked) {
            console.log('data => ', data)
            props.RegisterApiCall(data)
            isLoading(true);
        } else {
            showToast('success', 'Please read and agree with terms and conditions')
        }
    }

    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();

    const [showTermsModal, setShowTermsModal] = useState(false);

    return <SafeAreaView style={{ flex: 1 }}>
        <Loader isLoading={loading} />
        <TermsAndConditionsModal visible={showTermsModal} setVisible={setShowTermsModal} />
        <View
            style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}
        >
            <KeyboardAvoidingView behavior={IOS ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={isIPad && globalstyle.authscreencontainer}>
                        <View>
                            <Text style={globalstyle.authheading}>Sign Up</Text>
                            <Text style={globalstyle.authdescription}>Have fun and build your network</Text>
                        </View>
                        <View>
                            <View style={globalstyle.inputbox}>
                                <Icon style={globalstyle.authlefticon} name={'user'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="First Name"
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('first_name', {
                                        // value: 'John',
                                        value: '',
                                        required: 'First name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='John'
                                    onChangeText={(value) => setValue('first_name', value)}
                                    ref={input01}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input02.current.focus()}
                                />
                            </View>
                            {errors.first_name && <Text style={globalstyle.errorField}>{errors.first_name.message}</Text>}
                            <View style={globalstyle.inputbox}>
                                <Icon style={globalstyle.authlefticon} name={'user'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Last Name"
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('last_name', {
                                        // value: 'Martin',
                                        value: '',
                                        required: 'Last name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='Martin'
                                    onChangeText={(value) => setValue('last_name', value)}
                                    ref={input01}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input02.current.focus()}
                                />
                            </View>
                            {errors.last_name && <Text style={globalstyle.errorField}>{errors.last_name.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon style={globalstyle.authlefticon} name={'mail'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Email Address"
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('email', {
                                        // value: 'johnmartin@mailinator.com',
                                        value: '',
                                        required: 'Email Address is required',
                                        pattern: {
                                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            message: "Please provide valid email"
                                        },
                                    })}
                                    defaultValue={''}
                                    // defaultValue={'johnmartin@mailinator.com'}
                                    onChangeText={(value) => setValue('email', value)}
                                    autoCapitalize='none'
                                    ref={input02}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input03.current.focus()}
                                />
                            </View>
                            {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon style={globalstyle.authlefticon} name={'phone'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Phone Number (Optional)"
                                    placeholderTextColor={colors.placeholdercolor}
                                    // keyboardType='phone-pad'
                                    keyboardType='numeric'
                                    {...register('phone', {
                                        // value: '+8134234123123',
                                        value: '',
                                        // required: 'Phone number is required',
                                        pattern: {
                                            value: /[0-9+]$/i,
                                            message: "Please provide valid phone number"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='+8134234123123'
                                    onChangeText={(value) => setValue('phone', value)}
                                    ref={input03}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            {errors.phone && <Text style={globalstyle.errorField}>{errors.phone.message}</Text>}


                            <View style={globalstyle.inputbox}>
                                <Icon style={globalstyle.authlefticon} name={'shield'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Social Security Numbers"
                                    placeholderTextColor={colors.placeholdercolor}
                                    // keyboardType='phone-pad'
                                    keyboardType='numeric'
                                    {...register('social_security', {
                                        // value: '+8134234123123',
                                        value: '',
                                        // required: 'Phone number is required',
                                        pattern: {
                                            value: /[0-9+]$/i,
                                            message: "Please provide valid phone number"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='+8134234123123'
                                    onChangeText={(value) => setValue('social_security', value)}
                                    ref={input03}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            {errors.social_security && <Text style={globalstyle.errorField}>{errors.social_security.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon style={globalstyle.authlefticon} name={'target'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Set Weekly Goal"
                                    placeholderTextColor={colors.placeholdercolor}
                                    // keyboardType='phone-pad'
                                    keyboardType='numeric'
                                    {...register('weekly_goal', {
                                        // value: '+8134234123123',
                                        value: '',
                                        // required: 'Phone number is required',
                                        pattern: {
                                            value: /[0-9+]$/i,
                                            message: "Please provide valid phone number"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='+8134234123123'
                                    onChangeText={(value) => setValue('weekly_goal', value)}
                                    ref={input03}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            {errors.weekly_goal && <Text style={globalstyle.errorField}>{errors.weekly_goal.message}</Text>}

                            <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon style={globalstyle.authlefticon} name={'lock'} size={18} />
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
                                        ref={input04}
                                    // returnKeyType="next"
                                    // onSubmitEditing={() => input05.current.focus()}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowPassword(!showPassword) }}>
                                    <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}

                            <View style={{ marginTop: 15, marginBottom: 15 }}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setChecked(!isChecked)}
                                    style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        // justifyContent: 'center' 
                                    }}>
                                    <Icon
                                        name={isChecked ? "check-circle" : "circle"}
                                        style={{ fontSize: isIPad ? 20 : fontSize, marginRight: 8, color: colors.orange }}
                                    />
                                    <Text style={styles.termstext}>Yes, I agree with</Text>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setShowTermsModal(true)}>
                                        <Text style={styles.termstextbold}>{' '} Terms and Conditions</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)}
                                style={globalstyle.authSubmitButton}>
                                <Text style={globalstyle.authSubmitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={globalstyle.alreadysignin}>
                            <Text style={globalstyle.alreadyaccount}>Already have an account? </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { props.navigation.navigate('Login') }}>
                                <Text style={globalstyle.actionauthtext}> Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: 30 }} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    </SafeAreaView>
}


const setStateToProps = (state) => ({
    registerResponse: state.authstate.registerResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        RegisterApiCall: bindActionCreators(RegisterApiCall, dispatch),
        SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Register);


const styles = StyleSheet.create({
    termstext: { fontFamily: fonts.primary, fontSize: isIPad ? 18 : fontSize, color: colors.black },
    termstextbold: { fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 18 : fontSize, color: colors.black }
})