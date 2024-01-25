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
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import CameraModal from '../../components/modal/CameraModal';

// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';
// import database from '@react-native-firebase/database';

import { useForm } from 'react-hook-form';
import globalstyle from '../../theme/style';
import { IOS, colors, fonts, height, isIPad } from '../../theme';
import { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EditProfileApiCall, UpdateProfilePicApiCall } from '../../redux/reducers/UserStateReducer';
import { SetUserInfo } from '../../redux/reducers/AppStateReducer';
import { showToast } from '../../helpers/toastConfig';
import Loader from "../../components/Loader";
// import strings from '../../localization/translation';

const PersonalInformation = props => {
  const [showModal, setShowModal] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const handleCamera = value => {
    setShowModal(false);
    console.log('value => ', value);
    chooseFile(value);
  };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const chooseFile = async isCamera => {
    var options = {
      title: 'Select Profile Picture',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: { skipBackup: true, path: 'images' },
    };

    // setTimeout(() => {
    //   launchCamera(
    //     options,
    //     // { saveToPhotos: true, mediaType: 'photo', includeBase64: true, maxHeight: 400, maxWidth: 400, },
    //     response => {
    //       // console.log({ response }); 
    //       if (response.didCancel) {
    //         console.log(' Photo picker didCancel');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else {
    //         console.log('ImagePicker: ', response);
    //         // setResponse(response)
    //       }
    //     });
    // }, 200);


    let response = {};
    if (isCamera) {
      console.log('launchCamera');
      await delay(200);
      response = await launchCamera(options);
      // response = setTimeout(() => { launchCamera(options) }, 200);
    } else {
      console.log('launchImageLibrary');
      await delay(200);
      response = await launchImageLibrary(options);
      // response = setTimeout(() => { launchImageLibrary(options) }, 200);
    }

    console.log('response here => ', response);
    if (Object.keys(response).length > 0) {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response: ', response);
        setFilePath(response.assets[0]);
      }
    }
  };

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

  const input00 = useRef();
  const input01 = useRef();
  const input02 = useRef();
  const input03 = useRef();
  const input04 = useRef();
  const input05 = useRef();
  const input06 = useRef();
  const input07 = useRef();
  const input08 = useRef();
  const input09 = useRef();
  const input10 = useRef();
  const input11 = useRef();
  const input12 = useRef();
  const input13 = useRef();
  const input14 = useRef();

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
    showToast('success', 'Your profile updated successfully');
    // props.EditProfileApiCall(user.id, data);
    // isLoading(true);
  };

  // console.log('errors => ', errors);


  const password = register('password', {
    value: '',
    // required: 'Password is required',
    // minLength: { value: 8, message: 'Min lenght 8' }
  })

  const confirmpass = register('password_confirmation', {
    value: '',
    // required: 'Confirm Password is required',
    // minLength: { value: 8, message: 'Min lenght 8' },
    // validate: value => value === password.current || "Password does not match"
  })


  return <SafeAreaView style={{ flex: 1 }}>
    <CameraModal
      handleCamera={handleCamera}
      visible={showModal}
      setVisible={setShowModal}
    />
    <Loader isLoading={loading} />
    <View style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]} >
      <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={isIPad && globalstyle.authscreencontainer} showsVerticalScrollIndicator={false}>
            <View style={[{ paddingVertical: 20, paddingBottom: 150 }, isIPad && globalstyle.authscreencontainer]}>
              <View style={{ width: 140, height: 140, borderRadius: 140, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20, position: 'relative', backgroundColor: '#ddd', borderColor: colors.white, borderWidth: 2 }}>
                <Image
                  source={
                    filePath?.uri
                      ? { uri: filePath?.uri }
                      : user?.profile_image
                        ? { uri: user?.profile_image }
                        : require('./../../../assets/images/dummy-profile-image.png')
                    // { uri: user?.profilepic }
                    // require('./../../assets/images/profile-image.jpg')
                  }
                  defaultSource={require('./../../../assets/images/dummy-profile-image.png')}
                  style={{ width: '100%', height: '100%', borderRadius: 120, resizeMode: 'cover', }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ borderWidth: 0, borderColor: 'rgb(242, 242, 242)', position: 'absolute', right: 5, bottom: 2, zIndex: 1, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: colors.orange, }}
                  onPress={() => {
                    setShowModal(true);
                  }}>
                  <Icon name="camera" size={isIPad ? 20 : 18} color={colors.white} />
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity
                onPress={() => {
                  setIsEditable(!isEditable);
                }}
                style={{ marginLeft: 'auto', marginTop: -60, marginBottom: 15, width: 40, height: 40, borderRadius: 40, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center', }}>
                <Icon name={!isEditable ? 'edit-3' : 'x'} size={20} color={colors.white} />
              </TouchableOpacity> */}

              <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 24, marginBottom: 0, color: colors.black }}>Referral Payment Options</Text>
              <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: colors.grey }}>In order to receive Referral Payments you must include your Stripe Account information. If you do not have a Stripe Account create one and provide the information below. If this information is not provided, you will not be able to receive your referral payments</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, padding: 13, paddingHorizontal: 15, borderRadius: 15, marginTop: 10 }}>
                <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: colors.black }}>Connect Stripe</Text>
                <TouchableOpacity onPress={() => {
                  setReferalModal(true)
                }} activeOpacity={0.8} style={{ backgroundColor: colors.green, paddingVertical: 6, paddingHorizontal: 18, borderRadius: 7 }}>
                  <Text style={{ color: colors.white, fontFamily: fonts.primary }}>Connect</Text>
                </TouchableOpacity>
              </View>


              <Text style={{ color: colors.black, fontFamily: fonts.primarySemiBold, fontSize: 20, marginTop: 15 }}>Personal Information</Text>

              <View style={[globalstyle.inputbox, { justifyContent: 'space-between', borderRadius: 25 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Icon color={colors.blue} name={'message-square'} size={18} style={{ marginTop: 18 }} />
                  <TextInput
                    style={[globalstyle.inputfield, { flex: 1, textAlignVertical: 'top', paddingTop: 17 }]}
                    placeholder={'Enter Bio'}
                    placeholderTextColor={colors.placeholdercolor}
                    {...register('bio', {
                      value: user?.bio,
                      // required: 'bio is required',
                      // minLength: { value: 20, message: 'message length must be greater then 20 characters' }
                    })}
                    multiline={true}
                    numberOfLines={Platform.OS === 'ios' ? null : 8}
                    minHeight={(Platform.OS === 'ios' && 8) ? (20 * 8) : null}
                    defaultValue={user?.bio}
                    // inputRef={message.ref}
                    onChangeText={(value) => setValue('bio', value)}
                    ref={input00}
                    returnKeyType="next"
                    onSubmitEditing={() => input01.current.focus()}
                  />
                </View>
              </View>
              {errors.bio && <Text style={globalstyle.errorField}>{errors.bio.message}</Text>}

              <View style={globalstyle.inputbox}>
                <Icon style={globalstyle.authlefticon} name={'user'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder="Maritial Status"
                  placeholderTextColor={colors.placeholdercolor}
                  {...register('maritial_status', {
                    value: user?.marital_status,
                    // required: 'First name is required',
                    // pattern: {
                    //   value: /^[A-Za-z\s]+$/i,
                    //   message: "Please provide a valid name"
                    // },
                  })}
                  defaultValue={user?.marital_status}
                  onChangeText={(value) => setValue('maritial_status', value)}
                  ref={input01}
                  returnKeyType="next"
                  onSubmitEditing={() => input02.current.focus()}
                />
              </View>
              {errors.maritial_status && <Text style={globalstyle.errorField}>{errors.maritial_status.message}</Text>}

              <View style={globalstyle.inputbox}>
                <Icon style={globalstyle.authlefticon} name={'user'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder="Gender"
                  placeholderTextColor={colors.placeholdercolor}
                  {...register('gender', {
                    value: user?.gender,
                    // required: 'First name is required',
                    // pattern: {
                    //   value: /^[A-Za-z\s]+$/i,
                    //   message: "Please provide a valid name"
                    // },
                  })}
                  defaultValue={user?.gender}
                  // defaultValue='John'
                  onChangeText={(value) => setValue('gender', value)}
                  ref={input02}
                  returnKeyType="next"
                  onSubmitEditing={() => input03.current.focus()}
                />
              </View>
              {errors.gender && <Text style={globalstyle.errorField}>{errors.gender.message}</Text>}

              <Text style={{ color: colors.black, fontFamily: fonts.primarySemiBold, fontSize: 20, marginTop: 15 }}>Public Information</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[globalstyle.inputbox, { width: '48.3%' }]}>
                  <Icon color={colors.blue} name={'user'} size={18} />
                  <TextInput
                    style={globalstyle.inputfield}
                    placeholder="First Name"
                    defaultValue={user?.first_name}
                    editable={isEditable}
                    placeholderTextColor={colors.placeholdercolor}
                    {...register('first_name', {
                      value: user?.first_name,
                      // required: 'First name is required',
                      // pattern: {
                      //   value: /^[A-Za-z\s]+$/i,
                      //   message: 'Please provide a valid name',
                      // },
                    })}
                    onChangeText={value => setValue('first_name', value)}
                    ref={input03}
                    returnKeyType="next"
                    onSubmitEditing={() => input04.current.focus()}
                  />
                </View>
                <View style={[globalstyle.inputbox, { width: '48.3%' }]}>
                  <Icon color={colors.blue} name={'user'} size={18} />
                  <TextInput
                    style={globalstyle.inputfield}
                    placeholder="Last Name"
                    defaultValue={user?.last_name}
                    editable={isEditable}
                    placeholderTextColor={colors.placeholdercolor}
                    {...register('last_name', {
                      value: user?.last_name,
                      // required: 'Last name is required',
                      // pattern: {
                      //   value: /^[A-Za-z\s]+$/i,
                      //   message: 'Please provide a valid name',
                      // },
                    })}
                    onChangeText={value => setValue('last_name', value)}
                    ref={input04}
                    returnKeyType="next"
                    onSubmitEditing={() => input05.current.focus()}
                  />
                </View>
              </View>
              {errors.first_name || errors.last_name && (<Text style={globalstyle.errorField}> {errors.first_name.message || errors.last_name.message} </Text>)}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.blue} name={'mail'} size={18} />
                <TextInput
                  style={[globalstyle.inputfield, { opacity: 0.6 }]}
                  defaultValue={user?.email}
                  editable={false}
                  placeholder="Email Address"
                  placeholderTextColor={colors.placeholdercolor}
                  {...register('email', {
                    value: user?.email,
                    // required: 'Email Address is required',
                    // pattern: {
                    //   value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    //   message: 'Please provide valid email',
                    // },
                  })}
                  // defaultValue={''}
                  onChangeText={value => setValue('email', value)}
                  autoCapitalize="none"
                  ref={input05}
                  returnKeyType="next"
                  onSubmitEditing={() => input06.current.focus()}
                />
              </View>
              {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.blue} name={'key'} size={18} />
                <TextInput
                  style={[globalstyle.inputfield, { opacity: 0.6 }]}
                  defaultValue={user?.username}
                  // editable={false}
                  placeholder="User Name"
                  placeholderTextColor={colors.placeholdercolor}
                  {...register('username', {
                    value: user?.username,
                    // required: 'username Address is required',
                    // pattern: {
                    //   value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    //   message: 'Please provide valid username',
                    // },
                  })}
                  // defaultValue={''}
                  onChangeText={value => setValue('username', value)}
                  autoCapitalize="none"
                  ref={input06}
                  returnKeyType="next"
                  onSubmitEditing={() => input07.current.focus()}
                />
              </View>
              {errors.username && <Text style={globalstyle.errorField}>{errors.username.message}</Text>}


              <View style={globalstyle.inputbox}>
                <Icon color={colors.blue} name={'phone'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder="Phone Number (Optional)"
                  placeholderTextColor={colors.placeholdercolor}
                  defaultValue={user?.phone}
                  editable={isEditable}
                  // keyboardType='phone-pad'
                  keyboardType="phone-pad"
                  {...register('phone', {
                    value: user?.phone,
                    // required: 'Phone number is required',
                    // pattern: {
                    //   value: /[0-9+]$/i,
                    //   message: 'Please provide valid phone number',
                    // },
                  })}
                  onChangeText={value => setValue('phone', value)}
                  ref={input07}
                  returnKeyType="next"
                  onSubmitEditing={() => input08.current.focus()}
                />
              </View>
              {errors.phone && (<Text style={globalstyle.errorField}>{errors.phone.message}</Text>)}


              <View style={[globalstyle.inputbox, { justifyContent: 'space-between', borderRadius: 25 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Icon color={colors.blue} name={'message-square'} size={18} style={{ marginTop: 18 }} />
                  <TextInput
                    style={[globalstyle.inputfield, { flex: 1, textAlignVertical: 'top', paddingTop: 17 }]}
                    placeholder={'Enter Address...'}
                    placeholderTextColor={colors.placeholdercolor}
                    {...register('address', {
                      value: user?.address,
                      // required: 'Address is required',
                      // minLength: { value: 20, message: 'address length must be greater then 20 characters' }
                    })}
                    multiline={true}
                    numberOfLines={Platform.OS === 'ios' ? null : 7}
                    minHeight={(Platform.OS === 'ios' && 7) ? (20 * 7) : null}
                    defaultValue={user?.address}
                    // inputRef={address.ref}
                    onChangeText={(value) => setValue('address', value)}
                    ref={input08}
                    returnKeyType="next"
                    onSubmitEditing={() => input09.current.focus()}
                  />
                </View>
              </View>
              {errors.address && <Text style={globalstyle.errorField}>{errors.address.message}</Text>}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.blue} name={'globe'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder="Country"
                  placeholderTextColor={colors.placeholdercolor}
                  defaultValue={user?.country}
                  // editable={isEditable}
                  // keyboardType='phone-pad'
                  keyboardType="numeric"
                  {...register('country', {
                    value: user?.country,
                    // required: 'Phone number is required',
                    // pattern: {
                    //   value: /[0-9+]$/i,
                    //   message: 'Please provide valid phone number',
                    // },
                  })}
                  onChangeText={value => setValue('country', value)}
                  ref={input09}
                  returnKeyType="next"
                  onSubmitEditing={() => input10.current.focus()}
                />
              </View>
              {errors.country && (<Text style={globalstyle.errorField}>{errors.country.message}</Text>)}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.blue} name={'map-pin'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder="City"
                  placeholderTextColor={colors.placeholdercolor}
                  defaultValue={user?.city}
                  // editable={isEditable}
                  // keyboardType='phone-pad'
                  keyboardType="numeric"
                  {...register('city', {
                    value: user?.city,
                    // required: 'Phone number is required',
                    // pattern: {
                    //   value: /[0-9+]$/i,
                    //   message: 'Please provide valid phone number',
                    // },
                  })}
                  onChangeText={value => setValue('city', value)}
                  ref={input10}
                  returnKeyType="next"
                  onSubmitEditing={() => input11.current.focus()}
                />
              </View>
              {errors.city && (<Text style={globalstyle.errorField}>{errors.city.message}</Text>)}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.blue} name={'credit-card'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder="Postel/Zip Code"
                  placeholderTextColor={colors.placeholdercolor}
                  defaultValue={user?.postal_code}
                  // editable={isEditable}
                  // keyboardType='phone-pad'
                  keyboardType="numeric"
                  {...register('postal_code', {
                    value: user?.postal_code,
                    // required: 'Phone number is required',
                    // pattern: {
                    //   value: /[0-9+]$/i,
                    //   message: 'Please provide valid phone number',
                    // },
                  })}
                  onChangeText={value => setValue('postal_code', value)}
                  ref={input11}
                  returnKeyType="next"
                  onSubmitEditing={() => input12.current.focus()}
                />
              </View>
              {errors.postal_code && (<Text style={globalstyle.errorField}>{errors.postal_code.message}</Text>)}

              {/* <Text style={{ color: colors.black, fontFamily: fonts.primarySemiBold, fontSize: 20, marginTop: 15 }}>Change Password</Text>

              <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon color={colors.blue} name={'lock'} size={18} />
                  <TextInput
                    style={[globalstyle.inputfield, { flex: 0.8 }]}
                    placeholder="Current Password"
                    // name={password.name}
                    // inputRef={password.ref}
                    // value="password123"
                    placeholderTextColor={colors.placeholdercolor}
                    // {...register('password', {
                    //   value: 'John@123123',
                    //   // value: 'password123',
                    //   required: 'Password is required',
                    //   minLength: { value: 8, message: 'Password length must be greater then 8' }
                    // })}
                    defaultValue={'tabish@123'}
                    inputRef={password.ref}
                    onChangeText={(value) => setValue('current_password', value)}
                    secureTextEntry={!showPassword ? true : false}
                    autoCapitalize='none'
                    ref={input12}
                    returnKeyType="next"
                    onSubmitEditing={() => input13.current.focus()}
                  />
                </View>
              </View>
              {errors.current_password && <Text style={globalstyle.errorField}>{errors.current_password.message}</Text>}

              <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon color={colors.blue} name={'lock'} size={18} />
                  <TextInput
                    style={[globalstyle.inputfield, { flex: 0.8 }]}
                    placeholder="New Password"
                    name={password.name}
                    inputRef={password.ref}
                    // value="password123"
                    placeholderTextColor={colors.placeholdercolor}
                    // {...register('password', {
                    //     value: 'password123',
                    //     required: 'Password is required',
                    //     minLength: { value: 8, message: 'Password length must be greater then 8' }
                    // })}
                    // defaultValue={'tabish@123'}
                    // inputRef={password.ref}
                    onChangeText={(value) => setValue('password', value)}
                    secureTextEntry={!showPassword ? true : false}
                    autoCapitalize='none'
                    ref={input13}
                    returnKeyType="next"
                    onSubmitEditing={() => input14.current.focus()}
                  />
                </View>
              </View>
              {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}

              <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon color={colors.blue} name={'lock'} size={18} />
                  <TextInput
                    style={[globalstyle.inputfield, { flex: 0.8 }]}
                    placeholder="Verify Password"
                    name={confirmpass.name}
                    inputRef={confirmpass.ref}
                    // value="password123"
                    placeholderTextColor={colors.placeholdercolor}
                    // {...register('password_confirmation', {
                    //   value: 'password123',
                    //   required: 'Confirm Password is required',
                    //   minLength: { value: 8, message: 'Password length must be greater then 8' }
                    // })}
                    // defaultValue={'tabish@123'}
                    // inputRef={password.ref}
                    onChangeText={(value) => setValue('password', value)}
                    secureTextEntry={!showConfPassword ? true : false}
                    autoCapitalize='none'
                    ref={input14}
                  // returnKeyType="next"
                  // onSubmitEditing={() => input05.current.focus()}
                  />
                </View>
                <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowConfPassword(!showConfPassword) }}>
                  <Icon name={!showConfPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}

              <Text style={{ fontFamily: fonts.primary, color: colors.grey, fontSize: 13, marginTop: 10 }}>The password should be at least 8 characters long with (1 upper case letter, 1 number, 1 special character (!@#$%^&*)</Text> */}



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
                  <Text style={globalstyle.authSubmitButtonText}>Update</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  </SafeAreaView>
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
    EditProfileApiCall: bindActionCreators(EditProfileApiCall, dispatch),
    UpdateProfilePicApiCall: bindActionCreators(UpdateProfilePicApiCall, dispatch),
  };
};

export default connect(setStateToProps, mapDispatchToProps)(PersonalInformation);
