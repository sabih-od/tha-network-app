import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
// import { TouchableOpacity } from "react-native-gesture-handler";

// import RoutineBox from "../components/RoutineBox";
// import MainBox from "../components/MainBox";
// import Seperator from "../components/Seperator";
// import SectionHeading from "../components/SectionHeading";
// import SectionItem from "../components/SectionItem";
import globalstyle from "../theme/style";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import { useForm } from "react-hook-form";
import { connectPusher, getPusher } from "../helpers/pusher-manager";
import PostItem from "../components/PostItem";
import postslist from "../data/posts";


import { connect } from "react-redux";
// import { GetDailiesList, GetFeaturedList, GetHomeAudioData, GetHomeNewsList, GetHomeSpiritualData, GetHomeBiblicalData } from "../redux/reducers/ListingApiStateReducer";
import { bindActionCreators } from "redux";
import CreatePost from "../components/CreatePost";
import ChatIcon from "../components/ChatIcon";
import AlertForReferralPaymentOption from "../components/modal/AlertForReferralPaymentOption";
import NotificationIcon from "../components/header/NotificationIcon";
// import strings from "../localization/translation";
// import LinearGradient from "react-native-linear-gradient";
// import TryPlus from "../components/TryPlus";

import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from "react-native-blob-util";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';


import {
    BottomSheetModal,
    BottomSheetModalProvider, BottomSheetFlatList, BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import commentslist from "../data/comments";
import CommentItem from "../components/CommentItem";
import { GetPostsList, GetWeeklyGoals } from "../redux/reducers/ListingApiStateReducer";

const Home = (props) => {
    const { userInfo } = props;
    console.log('userInfo => ', userInfo);

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '80%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    // variables
    // const data = useMemo(
    //     () =>
    //         Array(50)
    //             .fill(0)
    //             .map((_, index) => `index-${index}`),
    //     []
    // );

    // // render
    // const renderItem = useCallback(
    //     ({ item }) => (
    //         <View style={styles.itemContainer}>
    //             <Text>{item}</Text>
    //         </View>
    //     ),
    //     []
    // );

    // // callbacks
    // const handleSheetChange = useCallback((index) => {
    //     console.log("handleSheetChange", index);
    // }, []);
    // const handleSnapPress = useCallback((index) => {
    //     sheetRef.current?.snapToIndex(index);
    // }, []);
    // const handleClosePress = useCallback(() => {
    //     sheetRef.current?.close();
    // }, []);

    const _handleDelete = (id) => {
        console.log('id => ', id)
    }

    useEffect(() => {
        // props.GetPostsList();
        // props.GetWeeklyGoals()
    }, [])

    useEffect(() => {
        connectPusher();
        props.navigation.setOptions({
            headerTitle: `Hello, ${userInfo?.first_name}`,
            headerRight: () => <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <NotificationIcon navigation={props.navigation} />
                <TouchableOpacity
                    onPress={() => { props.navigation.navigate('Profile') }}
                    style={{ width: 33, height: 33, borderRadius: 33, overflow: 'hidden', marginRight: 12 }}>
                    <Image
                        source={typeof userInfo?.profile_image === 'string' ? { uri: userInfo?.profile_image } : userInfo?.profile_image}
                        // source={{ uri: 'https://service.demowebsitelinks.com/tha-network/public/storage/303/male-avatar.png' }}
                        defaultSource={require('./../../assets/images/dummy-profile-image.png')}
                        style={{ resizeMode: 'cover', width: 33, height: 33, borderRadius: 33, }} />
                </TouchableOpacity>
            </View>
        });
    }, [])

    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    const _handleRefPaymentOpt = (data) => {
        console.log('data => ', data)
        setVisible(data);
    }

    const [visible, setVisible] = useState(false);

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={1}
                appearsOnIndex={2}
            />
        ),
        []
    );

    const handleImagePicker = () => {
        var options = {
            title: 'Select Profile Picture',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: { skipBackup: true, path: 'images' },
        };
        console.log('handleImagePicker => ');
        launchImageLibrary(options)
        // ImagePicker.openPicker({
        //     multiple: true
        // }).then(images => {
        //     console.log(images);
        // });
    }

    // const filename = Math.round(Math.random() * 10000000)
    // const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    const imageUrl = 'https://socialmediaappserver.vercel.app/public/uploads/2667338-1646912007767-118364782-1661701002232-367452069.jpg';
    // const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
    const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4';
    // const url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
    useEffect(() => {


    }, []);

    function downloadimage() {
        ReactNativeBlobUtil.config({
            fileCache: true,
            indicator: true,
            IOSBackgroundTask: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true
            },
        })
            .fetch('GET', imageUrl, {
                // Additional headers if needed
            }).progress({ interval: 250 }, (received, total) => {
                // console.log('progress', received / total);
                console.log({
                    downloadProgress: (received / total) * 100
                })
            })
            .then((res) => {
                // Get the path of the downloaded image
                const imagePath = res.path();
                console.log('Image downloaded to:', imagePath);

                CameraRoll.save(
                    // 'https://static.scientificamerican.com/sciam/cache/file/EAF12335-B807-4021-9AC95BBA8BEE7C8D_source.jpg', 
                    // 'https://static.scientificamerican.com/sciam/cache/file/62DFCAA9-29A5-4147-847032A7957C7E52_source.gif',
                    imagePath,
                    {
                        // type: 'video', 
                        album: 'Tha Network'
                    })
                    .then(() => {
                        console.log('Image saved to camera roll');
                    })
                    .catch((error) => {
                        console.error('Error saving image to camera roll:', error);
                        Alert.alert('Error', 'Failed to save image to camera roll');
                    });

            })
            .catch((error) => {
                console.error('Error downloading image:', error);
            });
    }
    function downloadVideo() {
        // const { status } = await CameraRoll.requestAuthorization();
        // console.log('status => ', status)
        //     ReactNativeBlobUtil.config({
        //         fileCache: true,
        //         path: path,
        //     }).fetch('GET', url, {})
        //         .then((res) => {
        //             console.log('response => ', res);
        //             console.log('res => ', res.info());
        //             console.log('path => ', path)
        //             setImagePath(path)
        //         }).catch((errorMessage, statusCode) => {
        //             // error handling
        //             console.log('errorMessage => ', errorMessage)
        //             console.log('statusCode => ', statusCode)
        //         })

        ReactNativeBlobUtil.config({
            fileCache: true,
            indicator: true,
            IOSBackgroundTask: true,
            appendExt: 'mp4',
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true
            },
        })
            .fetch('GET', videoUrl, {
                // Additional headers if needed
            }).progress({ interval: 250 }, (received, total) => {
                // console.log('progress', received / total);
                console.log({
                    downloadProgress: (received / total) * 100
                })
            })
            .then((res) => {
                // Get the path of the downloaded image
                const imagePath = res.path();
                console.log('Image downloaded to:', imagePath);

                // CameraRoll.saveToCameraRoll(imagePath, 'photo')
                CameraRoll.save(
                    // 'https://static.scientificamerican.com/sciam/cache/file/EAF12335-B807-4021-9AC95BBA8BEE7C8D_source.jpg', 
                    // 'https://static.scientificamerican.com/sciam/cache/file/62DFCAA9-29A5-4147-847032A7957C7E52_source.gif',
                    imagePath,
                    {
                        // type: 'video', 
                        album: 'Tha Network'
                    })
                    .then(() => {
                        console.log('Image saved to camera roll');
                    })
                    .catch((error) => {
                        console.error('Error saving image to camera roll:', error);
                        Alert.alert('Error', 'Failed to save image to camera roll');
                    });


                // Save the image to the photo library
                // ReactNativeBlobUtil.fs.readFile(imagePath, 'base64').then((data) => {
                //     // console.log('data => ', data)
                //     saveToPhotoLibrary(data);
                // });
            })
            .catch((error) => {
                console.error('Error downloading image:', error);
            });
    }

    // const saveToPhotoLibrary = (base64Data) => {
    //     ImagePicker.saveToCameraRoll(
    //         `data:image/jpeg;base64,${base64Data}`,
    //         'photo',
    //     )
    //         .then(() => {
    //             console.log('Image saved to photo library');
    //         })
    //         .catch((error) => {
    //             console.error('Error saving image to photo library:', error);
    //             Alert.alert('Error', 'Failed to save image to photo library');
    //         });
    // };

    return <SafeAreaView style={globalstyle.fullview}>

        <AlertForReferralPaymentOption visible={visible} setVisible={setVisible} handleRefPaymentOpt={_handleRefPaymentOpt} />
        <ChatIcon navigation={props.navigation} />
        <BottomSheetModalProvider>
            <ScrollView
                style={[styles.homescollview, { paddingTop: 0, }]}
            // showsVerticalScrollIndicator={false}
            // refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            >
                {/* <Button
                    onPress={() => handleImagePicker()}
                    title="Image Picker"
                    color="black"
                />
                <Button
                    onPress={() => downloadimage()}
                    title="Download Image"
                    color="black"
                />
                <Button
                    onPress={() => downloadVideo()}
                    title="Download Video"
                    color="black"
                /> */}

                <View style={{ backgroundColor: colors.orange }}>
                    <View style={{ backgroundColor: colors.orange, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, marginHorizontal: 15 }}>
                        <Text style={{ fontFamily: fonts.primaryMedium, color: colors.black, fontSize: 15, }}>Total Reffereal Income</Text>
                        <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.black, fontSize: 22, textAlign: 'left' }}><Text style={{ fontFamily: fonts.primaryMedium, fontSize: 14, marginRight: 5 }}>$ </Text>200.00</Text>
                    </View>
                </View>

                <View>
                    <View style={{ width: width, height: 100, backgroundColor: colors.orange, position: 'absolute', top: 0 }} />
                    <View style={{ backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', borderRadius: 15, justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 10, margin: 15, marginBottom: 0, }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.black, fontSize: 18, lineHeight: 22, marginBottom: -20 }}>{`Earn `}
                                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.orange, fontSize: 18, lineHeight: 22 }}>{`$10 \n`}</Text>
                            </Text>
                            <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.black, fontSize: 18, lineHeight: 22 }}>{`For Every Friends \nYou Refer`}</Text>
                            <TouchableOpacity onPress={() => { setVisible(true) }} style={{ backgroundColor: colors.blue, width: 100, borderRadius: 10, padding: 7, marginTop: 7 }}
                            >
                                <Text style={{ fontFamily: fonts.primaryMedium, color: colors.white, textTransform: 'uppercase', fontSize: 12, textAlign: 'center' }}>Refer Now</Text>
                            </TouchableOpacity>
                        </View>
                        <Image source={require('./../../assets/images/logo-without-text.png')} style={{ width: 120, height: 120 }} />
                    </View>
                </View>

                <View style={{ padding: 15, marginBottom: 30 }}>
                    <CreatePost user={userInfo} />
                    {postslist.map((item, index) => {
                        return (
                            <PostItem key={index} item={item} user={userInfo} showAllComments={handlePresentModalPress} />
                        )
                    })}
                </View>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backdropComponent={renderBackdrop}
                >
                    <BottomSheetFlatList
                        data={commentslist}
                        keyExtractor={item => String(item.id)}
                        // renderItem={renderItem}
                        renderItem={({ item, index }) => <CommentItem item={item} userInfo={props.userInfo} onDelete={_handleDelete} />}
                        contentContainerStyle={styles.contentContainer}
                    />
                </BottomSheetModal>

            </ScrollView>

        </BottomSheetModalProvider>
    </SafeAreaView >
}


const setStateToProps = state => ({
    getPostsListResponse: state.listingstate.getPostsListResponse,
    // getWeeklyGoalsResponse: state.listingstate.getWeeklyGoalsResponse,
    // getHomeAudioNoDataResponse: state.listingstate.getHomeAudioNoDataResponse,

    // getToFeaturedListResponse: state.listingstate.getToFeaturedListResponse,
    // getDailiesListResponse: state.listingstate.getDailiesListResponse,
    // getHomeNewsListResponse: state.listingstate.getHomeNewsListResponse,
    // drawerMenu: state.listingstate.drawerMenu,
    userInfo: state.appstate.userInfo
})

const mapDispatchToProps = dispatch => {
    return {
        GetPostsList: bindActionCreators(GetPostsList, dispatch),
        // GetWeeklyGoals: bindActionCreators(GetWeeklyGoals, dispatch),
        // GetDailiesList: bindActionCreators(GetDailiesList, dispatch),
        // GetHomeNewsList: bindActionCreators(GetHomeNewsList, dispatch),
        // GetHomeBiblicalData: bindActionCreators(GetHomeBiblicalData, dispatch),
        // GetHomeSpiritualData: bindActionCreators(GetHomeSpiritualData, dispatch),
        // GetHomeAudioData: bindActionCreators(GetHomeAudioData, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Home);
// export default Home;

const styles = StyleSheet.create({
    homebgimage: {
        // paddingTop: IOS ? 45 : 70,
        // paddingTop: IOS ? 100 : 70,
        // paddingHorizontal: 15,
        flex: 1, // justifyContent: 'space-between',
        // ...StyleSheet.absoluteFillObject,
        // height: height, resizeMode: 'cover'
    },
    homescollview: { flex: 1, paddingVertical: 15 }
});