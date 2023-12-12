import React, { useCallback, useEffect, useRef, useState } from "react";
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


const Home = (props) => {
    const { userInfo } = props;
    console.log('userInfo => ', userInfo);

    useEffect(() => {
        connectPusher();
        props.navigation.setOptions({
            headerTitle: 'Hello, Michelle', //`Hello, ${userInfo?.first_name}`,
            headerRight: () => <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <NotificationIcon navigation={props.navigation} />
                <TouchableOpacity
                    onPress={() => { props.navigation.navigate('Profile') }}
                    style={{ width: 33, height: 33, borderRadius: 33, overflow: 'hidden', marginRight: 12 }}>
                    <Image
                        // source={typeof userInfo?.profile_image === 'string' ? { uri: userInfo?.profile_image } : userInfo?.profile_image}
                        source={{ uri: 'https://service.demowebsitelinks.com/tha-network/public/storage/303/male-avatar.png' }}
                        defaultSource={require('./../../assets/images/dummy-profile-image.png')}
                        style={{ resizeMode: 'cover', width: 33, height: 33, borderRadius: 33, }} />
                </TouchableOpacity>
            </View>
        });
        // const pusher = getPusher();
        // console.log('getPusher => ', pusher);
    }, [])

    // const [imagePath, setImagePath] = useState(null)

    // useEffect(() => {
    //     console.log('ReactNativeBlobUtil')
    // }, [])

    // useEffect(() => {
    //     // initialHit()
    // }, [])

    // useEffect(() => {
    //     // console.log('biblical => ', biblical)
    // }, [biblical])
    // useEffect(() => {
    //     // console.log('audio => ', audio)
    // }, [audio])

    // const [biblical, setBiblical] = useState([]);
    // const [spiritual, setSpiritual] = useState([]);
    // const [audio, setAudio] = useState([]);
    // const [featuredList, setFeaturedList] = useState([]);
    // const [dailies, setDailies] = useState([]);
    // const [news, setNews] = useState([]);

    // function initialHit() {
    //     props.GetHomeBiblicalData();
    //     props.GetFeaturedList();
    //     props.GetDailiesList();
    //     props.GetHomeNewsList();
    //     props.GetHomeSpiritualData();
    //     props.GetHomeAudioData();
    // }

    // const prevBibleStudyResRef = useRef(props.getHomeBiblicalDataResponse);
    // useEffect(() => {
    //     if (props.getHomeBiblicalDataResponse !== prevBibleStudyResRef.current && props.getHomeBiblicalDataResponse?.success && props.getHomeBiblicalDataResponse?.data) {
    //         prevBibleStudyResRef.current = props.getHomeBiblicalDataResponse;
    //         // console.log('props.getHomeBiblicalDataResponse => ', props.getHomeBiblicalDataResponse)
    //         setBiblical(props.getHomeBiblicalDataResponse?.data?.data)
    //     }
    // }, [props.getHomeBiblicalDataResponse])

    // const prevSpiritualResRef = useRef(props.getHomeSpiritualDataResponse);
    // useEffect(() => {
    //     if (props.getHomeSpiritualDataResponse !== prevSpiritualResRef.current && props.getHomeSpiritualDataResponse?.success && props.getHomeSpiritualDataResponse?.data) {
    //         prevSpiritualResRef.current = props.getHomeSpiritualDataResponse;
    //         // console.log('props.getHomeSpiritualDataResponse => ', props.getHomeSpiritualDataResponse)
    //         setSpiritual(props.getHomeSpiritualDataResponse?.data?.data)
    //     }
    // }, [props.getHomeSpiritualDataResponse])


    // // const homeAudio = useHomeAudio(props.getHomeAudioNoDataResponse);
    // // console.log('eventList Home => ', eventList);

    // const prevHomeAudioResRef = useRef(props.getHomeAudioNoDataResponse);
    // useEffect(() => {
    //     console.log('props.getHomeAudioNoDataResponse => ', props.getHomeAudioNoDataResponse)
    //     if (props.getHomeAudioNoDataResponse !== prevHomeAudioResRef.current && props.getHomeAudioNoDataResponse?.success && props.getHomeAudioNoDataResponse?.data) {
    //         prevHomeAudioResRef.current = props.getHomeAudioNoDataResponse;
    //         console.log('props.getHomeAudioNoDataResponse => ', props.getHomeAudioNoDataResponse)
    //         setAudio(props.getHomeAudioNoDataResponse?.data)
    //     }
    // }, [props.getHomeAudioNoDataResponse])

    // const prevFeaturedListResRef = useRef(props.getToFeaturedListResponse);
    // useEffect(() => {
    //     if (props.getToFeaturedListResponse !== prevFeaturedListResRef.current && props.getToFeaturedListResponse?.success && props.getToFeaturedListResponse?.data) {
    //         prevFeaturedListResRef.current = props.getToFeaturedListResponse;
    //         // console.log('props.getToFeaturedListResponse => ', props.getToFeaturedListResponse)
    //         setFeaturedList(props.getToFeaturedListResponse?.data)
    //     }
    // }, [props.getToFeaturedListResponse])

    // const prevDailiesResRef = useRef(props.getToFeaturedListResponse);
    // useEffect(() => {
    //     if (props.getDailiesListResponse !== prevDailiesResRef.current && props.getDailiesListResponse?.success && props.getDailiesListResponse?.data) {
    //         prevDailiesResRef.current = props.getDailiesListResponse;
    //         // console.log('props.getDailiesListResponse => ', props.getDailiesListResponse)
    //         if (props.getDailiesListResponse?.data.length > 0) {
    //             setDailies(props.getDailiesListResponse?.data[0])
    //         }
    //     }
    // }, [props.getDailiesListResponse])

    // const prevHomeNewsListResRef = useRef(props.getToFeaturedListResponse);
    // useEffect(() => {
    //     if (props.getHomeNewsListResponse !== prevHomeNewsListResRef.current && props.getHomeNewsListResponse?.success && props.getHomeNewsListResponse?.data) {
    //         prevHomeNewsListResRef.current = props.getHomeNewsListResponse;
    //         // console.log('props.getHomeNewsListResponse => ', props.getHomeNewsListResponse)
    //         if (props.getHomeNewsListResponse?.data.length > 0) {
    //             setNews(props.getHomeNewsListResponse?.data)
    //         }
    //     }
    // }, [props.getHomeNewsListResponse])



    // const [categories, setCategories] = useState([])
    // const menuRef = useRef(props.drawerMenu)
    // useEffect(() => {
    //     if (props.drawerMenu != menuRef.current && props.drawerMenu?.success && props.drawerMenu?.data && props.drawerMenu?.data.length > 0) {
    //         // console.log('props.drawerMenu?.data => ', props.drawerMenu?.data)
    //         setCategories(props.drawerMenu?.data) //.reverse()
    //     }
    // }, [props.drawerMenu])

    // const [refreshing, setRefreshing] = useState(false);
    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);

    //     initialHit()

    //     // props.GetEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
    //     // // props.GetUpcomingEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
    //     // props.GetPostsList({ pageno: 1, limit: PAGINATION_LIMIT });
    //     // props.GetSermonsList({ pageno: 1, limit: PAGINATION_LIMIT });
    //     // props.GetOurSpeakerList({ pageno: 1, limit: PAGINATION_LIMIT });
    //     // props.GetOurStaffList({ pageno: 1, limit: PAGINATION_LIMIT });
    //     // props.GetHomeBanner();

    //     // props.GetSermonsDetailApiCall(item.id)
    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 2000);
    // }, []);

    const { handleSubmit, formState: { errors }, register, setValue } = useForm();


    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();

    const _handleRefPaymentOpt = (data) => {
        console.log('data => ', data)
        setVisible(data);
    }

    const [visible, setVisible] = useState(false);

    return <SafeAreaView style={globalstyle.fullview}>
        <AlertForReferralPaymentOption visible={visible} setVisible={setVisible} handleRefPaymentOpt={_handleRefPaymentOpt} />
        <ChatIcon navigation={props.navigation} />
        <ScrollView
            style={[styles.homescollview, { paddingTop: 0, }]}
        // showsVerticalScrollIndicator={false}
        // refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >

            <View style={{ backgroundColor: colors.orange, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
            {/* <View style={{ padding: 15, paddingVertical: 20 }}>
                <Text style={{ fontFamily: fonts.primaryMedium, color: colors.black, fontSize: 18, lineHeight: 22, marginBottom: -20 }}>Earn
                    <Text style={{ color: colors.orange, }}> $10 </Text>For Every Friends You Refer</Text>
            </View> */}

            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10, margin: 15, backgroundColor: colors.white, marginBottom: 0 }}>
                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.black, fontSize: 18, }}>Total Referal</Text>
                <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.orange, fontSize: 24, }}>50</Text>
            </View> */}

            <View style={{ padding: 15, marginBottom: 30 }}>
                <CreatePost user={props.userInfo} />
                {postslist.map((item, index) => {
                    return (
                        <PostItem key={index} item={item} user={props.userInfo} />
                    )
                })}
            </View>


            {/* <View style={{ backgroundColor: colors.white, padding: 13, marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 13, marginBottom: 10, }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, textTransform: 'capitalize' }}>People in my network</Text>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 14, color: colors.orange }}>See All</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', paddingHorizontal: 13, borderRadius: 10 }}>
                    <Icon name="search" style={{ color: '#888', fontSize: 18 }} />
                    <TextInput
                        placeholder="Search Here..."
                        placeholderTextColor={'#999'}
                        style={{ fontFamily: fonts.primary, paddingHorizontal: 15, paddingVertical: 12, width: '89%', }}
                    />
                    <TouchableOpacity>
                        <Icon name="sliders" style={{ color: '#888', fontSize: 18 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 12 }}>
                        <Image source={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
                    </View>
                    <View style={{ width: '82%' }}>
                        <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16 }}>Sarah Johnson</Text>
                        <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333', marginTop: -2 }}>@sarahjohnson</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, }}>
                    <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 12 }}>
                        <Image source={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
                    </View>
                    <View style={{ width: '82%' }}>
                        <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16 }}>Mechelle Morgan</Text>
                        <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333', marginTop: -2 }}>@zynwigodor</Text>
                    </View>
                </View>
                <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#333', textAlign: 'center', marginTop: 20, marginBottom: 10 }}>No user in my network</Text>
            </View> */}






        </ScrollView>
    </SafeAreaView >
}


const setStateToProps = state => ({
    // getHomeBiblicalDataResponse: state.listingstate.getHomeBiblicalDataResponse,
    // getHomeSpiritualDataResponse: state.listingstate.getHomeSpiritualDataResponse,
    // getHomeAudioNoDataResponse: state.listingstate.getHomeAudioNoDataResponse,

    // getToFeaturedListResponse: state.listingstate.getToFeaturedListResponse,
    // getDailiesListResponse: state.listingstate.getDailiesListResponse,
    // getHomeNewsListResponse: state.listingstate.getHomeNewsListResponse,
    // drawerMenu: state.listingstate.drawerMenu,
    userInfo: state.appstate.userInfo
})

const mapDispatchToProps = dispatch => {
    return {
        // GetFeaturedList: bindActionCreators(GetFeaturedList, dispatch),
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