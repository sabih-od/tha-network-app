import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    TextInput,
    Platform,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';


// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';
// import database from '@react-native-firebase/database';

import { useForm } from 'react-hook-form';
import globalstyle from '../theme/style';
import { IOS, colors, fonts, height, isIPad } from '../theme';
import { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EditProfileApiCall, UpdateProfilePicApiCall } from '../redux/reducers/UserStateReducer';
import { SetUserInfo } from '../redux/reducers/AppStateReducer';
import { showToast } from '../helpers/toastConfig';
import Loader from "../components/Loader";
// import strings from '../localization/translation';

const PaymentCard = props => {
    const [showModal, setShowModal] = useState(false);
    const [filePath, setFilePath] = useState(null);


    const [isEditable, setIsEditable] = useState(true);
    const [user, setUser] = useState(props.userInfo);

    useEffect(() => {
        console.log('Profile props.userInfo => ', props.userInfo);
        setUser(props.userInfo);
    }, [props.userInfo])

    const [loading, isLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    // const [showConfPassword, setShowConfPassword] = useState(false);

    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();

    const prevUpdateProfilePicResRef = useRef(props.updateProfilePicResponse);
    const prevEditProfileResRef = useRef(props.editProfileResponse);
    const prevFilePathRef = useRef(filePath);

    const { handleSubmit, formState: { errors }, register, setValue, } = useForm();

    useEffect(() => {
        console.log('filePath => ', filePath);
        if (filePath != null && filePath != prevFilePathRef.current) {
            const formData = new FormData();
            formData.append('profile_picture', {
                name: filePath.fileName,
                type: filePath.type,
                uri: Platform.OS === 'android' ? filePath.uri : filePath.uri.replace('file://', '')
            });
            props.UpdateProfilePicApiCall(formData);
            isLoading(true);
        }
    }, [filePath]);

    useEffect(() => {
        // console.log('props.updateProfilePicResponse => ', props.updateProfilePicResponse);
        if (props.updateProfilePicResponse !== prevUpdateProfilePicResRef.current && props.updateProfilePicResponse?.success && props.updateProfilePicResponse?.data) {
            prevUpdateProfilePicResRef.current = props.updateProfilePicResponse;
            console.log('updateProfilePicResponse => ', props.updateProfilePicResponse,);
            if (props.updateProfilePicResponse?.data?.profile_picture) {
                console.log('set user profile pic => ', props.updateProfilePicResponse);
                props.SetUserInfo({ ...props.userInfo, profile_picture: props.updateProfilePicResponse?.data?.profile_picture, });
                showToast('success', 'Your profile picture updated successfully');
            }
        }
        isLoading(false);
    }, [props.updateProfilePicResponse]);

    const prevUpdateProfilePicErrorRef = useRef(props.updateProfilePicError);
    useEffect(() => {
        if (props.updateProfilePicError !== prevUpdateProfilePicErrorRef.current) {
            prevUpdateProfilePicErrorRef.current = props.updateProfilePicError;
            console.log('updateProfilePicError => ', props.updateProfilePicError);
            showToast('error', props.updateProfilePicError.message);
        }
        isLoading(false);
    }, [props.updateProfilePicError]);

    useEffect(() => {
        console.log('user => ', user);
    }, [user]);

    useEffect(() => {
        if (props.editProfileResponse !== prevEditProfileResRef.current && props.editProfileResponse?.success && props.editProfileResponse?.data) {
            prevEditProfileResRef.current = props.editProfileResponse?.data;
            console.log('props.editProfileResponse => ', props.editProfileResponse);
            props.SetUserInfo({
                ...props.userInfo,
                email: props.editProfileResponse?.data?.email,
                first_name: props.editProfileResponse?.data?.first_name,
                last_name: props.editProfileResponse?.data?.last_name,
                phone: props.editProfileResponse?.data?.phone,
            });
            showToast('success', 'Your profile updated successfully');
            isLoading(false);
            // if (props.editProfileResponse?.data?.profile_picture) {
            //   console.log('set user profile pic => ', props.editProfileResponse);
            //   // props.SetUserInfo({ ...props.userInfo, profile_picture: props.editProfileResponse?.data });
            // }
        }
    }, [props.editProfileResponse])

    const onSubmit = data => {
        if (data.password == undefined) {
            delete data.password
        }
        console.log('data => ', data);
        props.navigation.navigate('Register');
        // props.EditProfileApiCall(user.id, data);
        // isLoading(true);
    };


    return (
        <>

            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={colors.white}
            />
            <Loader isLoading={loading} />
            <SafeAreaView style={globalstyle.fullview}>
                <Loader isLoading={loading} />
                <View style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]} >
                    <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <>

                                <ScrollView style={isIPad && globalstyle.authscreencontainer} showsVerticalScrollIndicator={false}>
                                    {/* <View style={{ backgroundColor: colors.black, height: 400, width: '100%', top: 0, position: 'absolute', }}></View> */}
                                    <View style={[{ paddingVertical: 20 }, isIPad && globalstyle.authscreencontainer]}>


                                    <View>
                                <Text style={globalstyle.authheading}>Payment Method</Text>
                                <Text style={globalstyle.authdescription}>In order to receive Referral Payments you must include your Stripe Account</Text>
                            </View>
                                        {/* <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 24, marginBottom: 0, color: colors.black }}>Payment Method</Text> */}
                                        {/* <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: colors.grey }}>In order to receive Referral Payments you must include your Stripe Account</Text> */}

                                        <View style={globalstyle.inputbox}>
                                            <Icon style={globalstyle.authlefticon} name={'credit-card'} size={18} />
                                            <TextInput
                                                style={globalstyle.inputfield}
                                                placeholder="Card Number"
                                                placeholderTextColor={colors.placeholdercolor}
                                                {...register('card_number', {
                                                    // value: 'John',
                                                    value: '',
                                                    // required: 'Card number is required',
                                                    // pattern: {
                                                    //     value: /^[A-Za-z\s]+$/i,
                                                    //     message: "Please provide a valid card number"
                                                    // },
                                                })}
                                                defaultValue=''
                                                // defaultValue='John'
                                                keyboardType="numeric"
                                                onChangeText={(value) => setValue('card_number', value)}
                                                ref={input01}
                                                returnKeyType="next"
                                                onSubmitEditing={() => input02.current.focus()}
                                            />
                                        </View>
                                        {errors.card_number && <Text style={globalstyle.errorField}>{errors.card_number.message}</Text>}


                                        <View style={globalstyle.inputbox}>
                                            <Icon style={globalstyle.authlefticon} name={'calendar'} size={18} />
                                            <TextInput
                                                style={globalstyle.inputfield}
                                                placeholder="Expiration Month"
                                                placeholderTextColor={colors.placeholdercolor}
                                                {...register('expiration_month', {
                                                    // value: 'John',
                                                    value: '',
                                                    // required: 'Expiration month is required',
                                                    // pattern: {
                                                    //     value: /^[A-Za-z\s]+$/i,
                                                    //     message: "Please provide a valid expiration month"
                                                    // },
                                                })}
                                                defaultValue=''
                                                // defaultValue='John'
                                                keyboardType="numeric"
                                                onChangeText={(value) => setValue('expiration_month', value)}
                                                ref={input02}
                                                returnKeyType="next"
                                                onSubmitEditing={() => input03.current.focus()}
                                            />
                                        </View>
                                        {errors.expiration_month && <Text style={globalstyle.errorField}>{errors.expiration_month.message}</Text>}

                                        <View style={globalstyle.inputbox}>
                                            <Icon style={globalstyle.authlefticon} name={'calendar'} size={18} />
                                            <TextInput
                                                style={globalstyle.inputfield}
                                                placeholder="Expiration Year"
                                                placeholderTextColor={colors.placeholdercolor}
                                                {...register('expiration_year', {
                                                    // value: 'John',
                                                    value: '',
                                                    // required: 'Expiration year is required',
                                                    // pattern: {
                                                    //     value: /^[A-Za-z\s]+$/i,
                                                    //     message: "Please provide a valid expiration year"
                                                    // },
                                                })}
                                                defaultValue=''
                                                // defaultValue='John'
                                                keyboardType="numeric"
                                                onChangeText={(value) => setValue('expiration_year', value)}
                                                ref={input03}
                                                returnKeyType="next"
                                                onSubmitEditing={() => input04.current.focus()}
                                            />
                                        </View>
                                        {errors.expiration_year && <Text style={globalstyle.errorField}>{errors.expiration_year.message}</Text>}

                                        <View style={globalstyle.inputbox}>
                                            <Icon style={globalstyle.authlefticon} name={'calendar'} size={18} />
                                            <TextInput
                                                style={globalstyle.inputfield}
                                                placeholder="CVV Code"
                                                placeholderTextColor={colors.placeholdercolor}
                                                {...register('cvv_code', {
                                                    // value: 'John',
                                                    value: '',
                                                    // required: 'Expiration year is required',
                                                    // pattern: {
                                                    //     value: /^[A-Za-z\s]+$/i,
                                                    //     message: "Please provide a valid expiration year"
                                                    // },
                                                })}
                                                defaultValue=''
                                                // defaultValue='John'
                                                keyboardType="numeric"
                                                onChangeText={(value) => setValue('cvv_code', value)}
                                                ref={input04}
                                            />
                                        </View>
                                        {errors.cvv_code && <Text style={globalstyle.errorField}>{errors.cvv_code.message}</Text>}





                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, marginTop: 5 }}>
                            <Text style={[styles.labelinput, { marginRight: 55 }]}>Gender</Text>
                            <View style={{ flexDirection: 'row' }}><TouchableOpacity activeOpacity={0.6} style={[styles.checkboxtick]}
                                onPress={() => { setGender(1) }}>
                                <Icon name={gender == 1 ? 'check-circle' : 'circle'} size={18} color={colors.blue} />
                                <Text style={[styles.labelinput, { marginLeft: 6, }]}>Male</Text>
                            </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6} style={[styles.checkboxtick, { marginRight: 0 }]}
                                    onPress={() => { setGender(2) }}>
                                    <Icon name={gender == 2 ? 'check-circle' : 'circle'} size={18} color={colors.blue} />
                                    <Text style={[styles.labelinput, { marginLeft: 6, }]}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[globalstyle.inputbox, { width: '48.5%' }]}>
                                <TextInput
                                    style={globalstyle.inputfield}
                                    editable={isEditable}
                                    placeholder="Country Here..."
                                    {...register('country', {
                                        value: user?.country,
                                        required: 'Country is required',
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message: "Please provide valid country"
                                        },
                                    })}
                                    // defaultValue={''}
                                    defaultValue={user?.country}
                                    onChangeText={(value) => setValue('country', value)}
                                // inputRef={country.ref}
                                // value={country.value}
                                />
                                {errors.country && <Text style={styles.errorField}>{errors.country.message}</Text>}
                            </View>
                            <View style={[globalstyle.inputbox, { width: '48.5%' }]}>
                                <TextInput
                                    style={globalstyle.inputfield}
                                    editable={isEditable}
                                    placeholder="City Here..."
                                    {...register('city', {
                                        value: user?.city,
                                        required: 'City is required',
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message: "Please provide valid city"
                                        },
                                    })}
                                    defaultValue={user?.city}
                                    // defaultValue={''}
                                    onChangeText={(value) => setValue('city', value)}
                                // inputRef={city.ref}
                                // value={city.value}
                                />
                                {errors.city && <Text style={styles.errorField}>{errors.city.message}</Text>}
                            </View>
                        </View> */}

                                        {isEditable && (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={handleSubmit(onSubmit)}
                                                style={globalstyle.authSubmitButton}>
                                                <Text style={globalstyle.authSubmitButtonText}>Confirm Payment</Text>
                                            </TouchableOpacity>
                                        )}
                                        <Text style={{ fontFamily: fonts.primary, color: colors.grey, fontSize: 13, marginTop: 15 }}>This payment information will be used for recurring payments every month. If you would like to cancel recurring payments fo to your edit profile page to stop recurring payment</Text>
                                    </View>
                                </ScrollView>
                            </>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    fullview: { flex: 1 },
    container: { flex: 1 },
    checkboxtick: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
    labelinput: { fontFamily: fonts.primary, fontSize: 13, color: '#000' },
});

const setStateToProps = state => ({
    userInfo: state.appstate.userInfo,
    editProfileResponse: state.userstate.editProfileResponse,
    updateProfilePicResponse: state.userstate.updateProfilePicResponse,
    updateProfilePicError: state.userstate.updateProfilePicError,
});

const mapDispatchToProps = dispatch => {
    return {
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
        // EditProfileApiCall: bindActionCreators(EditProfileApiCall, dispatch),
        // UpdateProfilePicApiCall: bindActionCreators(UpdateProfilePicApiCall, dispatch),
    };
};

export default connect(setStateToProps, mapDispatchToProps)(PaymentCard);
