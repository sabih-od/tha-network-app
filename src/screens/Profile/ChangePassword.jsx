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
import AuthLogo from '../../components/AuthLogo';
// import strings from '../../localization/translation';

const ChangePassword = props => {
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

              <AuthLogo />
              <View>
                <Text style={globalstyle.authheading}>Change Password</Text>
                <Text style={globalstyle.authdescription}>Have fun and build your network</Text>
              </View>

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

              <Text style={{ fontFamily: fonts.primary, color: colors.grey, fontSize: 13, marginTop: 10 }}>The password should be at least 8 characters long with (1 upper case letter, 1 number, 1 special character (!@#$%^&*)</Text>



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

export default connect(setStateToProps, mapDispatchToProps)(ChangePassword);
