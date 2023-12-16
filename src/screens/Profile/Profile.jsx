import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Text, Image, TextInput, Platform, ImageBackground, Share, } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import IonIcon from "react-native-vector-icons/Ionicons";
// import CameraModal from '../../components/modal/CameraModal';

// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';
// import database from '@react-native-firebase/database';

// import { useForm } from 'react-hook-form';
import globalstyle from '../../theme/style';
import { IOS, backgroungImage, colors, fontSize, fonts, height, isDarkMode, isIPad, isRTL, width } from '../../theme';
import { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DeleteUserApiCall, EditProfileApiCall, UpdateProfilePicApiCall } from '../../redux/reducers/UserStateReducer';
import { LogOut, SetUserInfo } from '../../redux/reducers/AppStateReducer';
import { showToast, toastConfig } from '../../helpers/toastConfig';
import Loader from "../../components/Loader";
import DeleteProfileConfirmationModal from '../../components/modal/DeleteProfileConfirmationModal';
import NotificationIcon from '../../components/header/NotificationIcon';
import ReferalAndCopyLinkModal from '../../components/modal/ReferalAndCopyLinkModal';
// import strings from '../../localization/translation';
// import BlockedUsers from '../../components/bottom-sheet/BlockedUsers';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import BlockedUsersListModal from '../../components/modal/BlockedUsersListModal';

const Profile = props => {
    const { userInfo } = props;
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [filePath, setFilePath] = useState(null);

    const [user, setUser] = useState(userInfo);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: `Hello, ${userInfo?.first_name}`,
            headerRight: () => <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <NotificationIcon navigation={props.navigation} />
                <TouchableOpacity
                    onPress={() => { props.navigation.navigate('Profile') }}
                    style={{ marginRight: 12 }}>
                    <IonIcon name="qr-code-outline" style={{ color: colors.white, fontSize: 20 }} />
                    {/* <Image
                        source={typeof userInfo?.profile_image === 'string' ? { uri: userInfo?.profile_image } : userInfo?.profile_image}
                        defaultSource={require('./../../assets/images/dummy-profile-image.png')}
                        style={{ resizeMode: 'cover', width: 33, height: 33, borderRadius: 33, }} /> */}
                </TouchableOpacity>
            </View>
        });

        console.log('Profile props.userInfo => ', props.userInfo);
        setUser(props.userInfo);
    }, [props.userInfo])


    const prevFilePathRef = useRef(filePath);
    const prevDeleteUserResRef = useRef(props.deleteUserResponse);

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
        console.log('user => ', user);
    }, [user]);

    useEffect(() => {
        if (props.deleteUserResponse !== prevDeleteUserResRef.current && props.deleteUserResponse?.success && props.deleteUserResponse?.data) {
            prevDeleteUserResRef.current = props.deleteUserResponse;
            console.log('deleteUserResponse => ', props.deleteUserResponse);
            props.LogOut();
            showToast('success', 'User deleted successfully');
        }
        isLoading(false);
    }, [props.deleteUserResponse]);


    // console.log('errors => ', errors);
    const [loading, isLoading] = useState(false);

    function _handleDeleteConfirmValue(value) {
        console.log('value => ', value);
        if (value) {
            isLoading(true);
            props.DeleteUserApiCall({ userid: props?.userInfo?.id })
        }
        setShowConfirmationModal(false)
    }

    const PROFILE_SQUARE = isIPad ? 170 : 140;

    const onShare = async () => {

        let shareOptions = {
            title: `Share Your Profile`,
            url: user?.email,
            message: `Excited to connect! Join my professional network and let's explore opportunities for collaboration and growth together. https://www.thanetwork.com/user/michellefrancis`,
            //subject: 'Subject'
        };

        try {
            const result = await Share.share(shareOptions);
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    // const bottomSheetModalRef = useRef(null);
    // const handleChildReference = (ref) => {
    //   bottomSheetModalRef.current = ref;
    // };

    const [showBlockedUsers, setShowBlockedUsers] = useState(false)
    const [referalModal, setReferalModal] = useState(false);
    _handleReferalValue = (val) => {
        if (val == 'copy') {
            showToast('success', 'Profile Link Copied');
        } else {
            showToast('success', 'Email sent successfully');
        }
        setReferalModal(false);
    }

    return (
        <>
            <DeleteProfileConfirmationModal handleDeleteConfirmValue={_handleDeleteConfirmValue} visible={showConfirmationModal} setVisible={setShowConfirmationModal} />
            <ReferalAndCopyLinkModal handleReferalValue={_handleReferalValue} visible={referalModal} setVisible={setReferalModal} />
            <Loader isLoading={loading} />
            <SafeAreaView style={[globalstyle.fullview]}>
                {/* {!isDarkMode && <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />} */}
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                    {/* <BlockedUsers passReferenceToParent={handleChildReference} /> */}
                    {/* <BlockedUsersListModal visible={showBlockedUsers} setVisible={setShowBlockedUsers} /> */}
                    {/* <View style={{ backgroundColor: colors.black, height: 400, width: '100%', top: 0, position: 'absolute', }}></View> */}
                    <View style={[{ paddingVertical: 20, }, isIPad && globalstyle.authscreencontainer, { marginTop: 'auto', marginBottom: 'auto' }]}>
                        <View style={{ width: PROFILE_SQUARE, height: PROFILE_SQUARE, borderRadius: PROFILE_SQUARE, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20, position: 'relative', backgroundColor: '#ddd', borderColor: colors.white, borderWidth: 2 }}>
                            <Image
                                source={typeof user?.profile_image === 'string'
                                    ? { uri: user?.profile_image }
                                    : user?.profile_image
                                }
                                defaultSource={require('./../../../assets/images/dummy-profile-image.png')}
                                style={{ width: '100%', height: '100%', borderRadius: 120, resizeMode: 'cover', }}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontFamily: fonts.primarySemiBold, color: isDarkMode ? colors.white : colors.black, fontSize: 24, marginBottom: IOS ? 0 : -8 }}>{`${user?.first_name} ${user?.last_name}`}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* <Icon name="mail" style={{ color: colors.orange, fontSize: 18, marginRight: 8 }} /> */}
                                <Text style={[styles.edititemstext, { fontFamily: fonts.primary }]}>{user?.username ? user?.username : user?.email}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { props.navigation.navigate('PersonalInformation') }}
                                activeOpacity={0.8} style={{ backgroundColor: colors.orange, paddingVertical: 6, paddingHorizontal: 18, borderRadius: 7 }}>
                                <Text style={{ color: colors.white, fontFamily: fonts.primary }}>Edit Profile</Text>
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 3 }} />
                            <TouchableOpacity onPress={() => {
                                setReferalModal(true)
                            }} activeOpacity={0.8} style={{ backgroundColor: colors.orange, paddingVertical: 6, paddingHorizontal: 18, borderRadius: 7 }}>
                                <Text style={{ color: colors.white, fontFamily: fonts.primary }}>Make a Refferal</Text>
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 3 }} />
                            <TouchableOpacity onPress={() => { onShare() }} activeOpacity={0.8} style={{ backgroundColor: colors.orange, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}>
                                <Icon name="share-2" style={{ color: colors.white, fontSize: 16 }} />
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{ backgroundColor: colors.orange, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontFamily: fonts.primary, color: colors.white, fontSize: 12, marginBottom: -8 }}>My Balance</Text>
                                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 22, textAlign: 'left' }}><Text style={{ fontFamily: fonts.primaryMedium, fontSize: 14, marginRight: 5 }}>$ </Text>160.00</Text>
                            </View>
                            <View style={{ width: 1, height: 14, backgroundColor: colors.white }} />
                            <View>
                                <Text style={{ fontFamily: fonts.primary, color: colors.white, fontSize: 12, marginBottom: -8 }}>Total Income</Text>
                                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 22, textAlign: 'left' }}><Text style={{ fontFamily: fonts.primaryMedium, fontSize: 14, marginRight: 5 }}>$ </Text>200.00</Text>
                            </View>
                            <View style={{ width: 1, height: 14, backgroundColor: colors.white }} />
                            <View>
                                <Text style={{ fontFamily: fonts.primary, color: colors.white, fontSize: 12, marginBottom: -8 }}>Total Withdrawl</Text>
                                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 22, textAlign: 'left' }}><Text style={{ fontFamily: fonts.primaryMedium, fontSize: 14, marginRight: 5 }}>$ </Text>40.00</Text>
                            </View>
                        </View> */}

                        <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.orange, fontSize: 22, textAlign: 'center' }}>10</Text>
                                <Text style={{ fontFamily: fonts.primary, color: colors.black, fontSize: 12, textAlign: 'center', marginTop: 0 }}>Friends</Text>
                            </View>
                            <View style={{ width: 1, height: 14, backgroundColor: colors.black }} />
                            <View>
                                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.orange, fontSize: 22, textAlign: 'center' }}>225</Text>
                                <Text style={{ fontFamily: fonts.primary, color: colors.black, fontSize: 12, textAlign: 'center', marginTop: 0 }}>People In Network</Text>
                            </View>
                            <View style={{ width: 1, height: 14, backgroundColor: colors.black }} />
                            <View style={{ marginRight: 10 }}>
                                {/* <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.orange, fontSize: 22, textAlign: 'center' }}>Bronze</Text> */}
                                <Image source={{ uri: 'https://service.demowebsitelinks.com/tha-network/public/images/trophies/Bronze.png' }} style={{ width: 30, height: 35, resizeMode: 'contain' }} />
                                <Text style={{ fontFamily: fonts.primary, color: colors.black, fontSize: 12, textAlign: 'center', marginTop: 0 }}>Rank</Text>
                            </View>
                        </View>

                        <View style={{ padding: 15, marginVertical: 10, backgroundColor: '#fff', marginHorizontal: 15, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="clock" style={{ marginRight: 13, color: colors.blue, fontSize: 16 }} />
                                <Text style={{ fontFamily: fonts.primary }}>Joined Dec 2023</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="award" style={{ marginRight: 13, color: colors.blue, fontSize: 16 }} />
                                <Text style={{ fontFamily: fonts.primary }}>Bronze</Text>
                            </View>
                            {userInfo?.city && userInfo?.city && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="map-pin" style={{ marginRight: 13, color: colors.blue, fontSize: 16 }} />
                                <Text style={{ fontFamily: fonts.primary }}>Lives in {userInfo?.city}, {userInfo?.country}</Text>
                            </View>}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="phone" style={{ marginRight: 13, color: colors.blue, fontSize: 16 }} />
                                <Text style={{ fontFamily: fonts.primary }}>{userInfo?.phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="mail" style={{ marginRight: 13, color: colors.blue, fontSize: 16 }} />
                                <Text style={{ fontFamily: fonts.primary }}>{userInfo?.email}</Text>
                            </View>
                            {userInfo?.gender && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="user" style={{ marginRight: 13, color: colors.blue, fontSize: 16 }} />
                                <Text style={{ fontFamily: fonts.primary }}>{userInfo?.gender}</Text>
                            </View>}
                            {userInfo?.marital_status && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Icon name="user" style={{ marginRight: 13, color: colors.blue, fontSize: 16 }} />
                                <Text style={{ fontFamily: fonts.primary }}>{userInfo?.marital_status}</Text>
                            </View>}
                        </View>

                        {userInfo?.bio && <View style={{ padding: 15 }}>
                            <Text style={{ fontFamily: fonts.primary }}>{userInfo.bio}</Text>
                        </View>}

                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    );
};

const styles = StyleSheet.create({
    fullview: { flex: 1 },
    container: { flex: 1 },
    checkboxtick: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
    labelinput: { fontFamily: fonts.latoRegular, fontSize: 13, color: '#000' },
    edititem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, backgroundColor: colors.white, borderBottomColor: '#eee', borderBottomWidth: 1 },
    editicon: { color: colors.orange, fontSize: 18, marginRight: 25 },
    edititemstext: { fontFamily: isRTL ? fonts.arabicMedium : fonts.primary, color: isDarkMode ? colors.white : colors.black },
});

const setStateToProps = state => ({
    userInfo: state.appstate.userInfo,
    deleteUserResponse: state.userstate.deleteUserResponse,
});

const mapDispatchToProps = dispatch => {
    return {
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
        DeleteUserApiCall: bindActionCreators(DeleteUserApiCall, dispatch),
        LogOut: bindActionCreators(LogOut, dispatch),
    };
};

export default connect(setStateToProps, mapDispatchToProps)(Profile);
