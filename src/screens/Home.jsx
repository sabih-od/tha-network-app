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


// import { connect } from "react-redux";
// import { GetDailiesList, GetFeaturedList, GetHomeAudioData, GetHomeNewsList, GetHomeSpiritualData, GetHomeBiblicalData } from "../redux/reducers/ListingApiStateReducer";
// import { bindActionCreators } from "redux";
// import strings from "../localization/translation";
// import LinearGradient from "react-native-linear-gradient";
// import TryPlus from "../components/TryPlus";


const Home = (props) => {

    useEffect(() => {
        connectPusher();
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


    const password = register('password', {
        value: '',
        required: 'Password is required',
        minLength: { value: 8, message: 'Min lenght 8' }
    })

    const confirmpass = register('confirmpass', {
        value: '',
        required: 'Confirm Password is required',
        minLength: { value: 8, message: 'Min lenght 8' },
        // validate: value => value === password.current || "Password does not match"
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);


    return <SafeAreaView style={globalstyle.fullview}>
        <ScrollView
            style={styles.homescollview}
        // showsVerticalScrollIndicator={false}
        // refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >

            <PostItem />

            <View style={{ padding: 13 }}>
                <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 18, marginBottom: 5 }}>Referral Payment Options</Text>
                <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: colors.grey }}>In order to receive Referral Payments you must include your Stripe Account information. If you do not have a Stripe Account create one and provide the information below. If this information is not provided, you will not be able to receive your referral payments</Text>

                <View style={{ marginTop: 15 }}>

                    <View style={[globalstyle.inputbox, { justifyContent: 'space-between', borderRadius: 25 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Icon color={colors.blue} name={'message-square'} size={18} style={{ marginTop: 18 }} />
                            <TextInput
                                style={[globalstyle.inputfield, { flex: 1, textAlignVertical: 'top', paddingTop: 17 }]}
                                placeholder={'Enter Bio'}
                                placeholderTextColor={colors.placeholdercolor}
                                {...register('message', {
                                    value: '',
                                    required: 'Message is required',
                                    // minLength: { value: 20, message: 'message length must be greater then 20 characters' }
                                })}
                                multiline={true}
                                numberOfLines={Platform.OS === 'ios' ? null : 8}
                                minHeight={(Platform.OS === 'ios' && 8) ? (20 * 8) : null}
                                // defaultValue={'tabish@123'}
                                // inputRef={message.ref}
                                onChangeText={(value) => setValue('message', value)}
                                ref={input04}
                            // returnKeyType="next"
                            // onSubmitEditing={() => input05.current.focus()}
                            />
                        </View>
                    </View>
                    {errors.message && <Text style={globalstyle.errorField}>{errors.message.message}</Text>}

                    <View style={globalstyle.inputbox}>
                        <Icon style={globalstyle.authlefticon} name={'user'} size={18} />
                        <TextInput
                            style={globalstyle.inputfield}
                            placeholder="Maritial Status"
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
                    <View style={globalstyle.inputbox}>
                        <Icon style={globalstyle.authlefticon} name={'user'} size={18} />
                        <TextInput
                            style={globalstyle.inputfield}
                            placeholder="Gender"
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
                </View>


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

                <View style={[globalstyle.inputbox, { justifyContent: 'space-between', borderRadius: 25 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Icon color={colors.blue} name={'message-square'} size={18} style={{ marginTop: 18 }} />
                        <TextInput
                            style={[globalstyle.inputfield, { flex: 1, textAlignVertical: 'top', paddingTop: 17 }]}
                            placeholder={'Enter Address...'}
                            placeholderTextColor={colors.placeholdercolor}
                            {...register('message', {
                                value: '',
                                required: 'Message is required',
                                // minLength: { value: 20, message: 'message length must be greater then 20 characters' }
                            })}
                            multiline={true}
                            numberOfLines={Platform.OS === 'ios' ? null : 8}
                            minHeight={(Platform.OS === 'ios' && 8) ? (20 * 8) : null}
                            // defaultValue={'tabish@123'}
                            // inputRef={message.ref}
                            onChangeText={(value) => setValue('message', value)}
                            ref={input04}
                        // returnKeyType="next"
                        // onSubmitEditing={() => input05.current.focus()}
                        />
                    </View>
                </View>
                {errors.message && <Text style={globalstyle.errorField}>{errors.message.message}</Text>}

                <View style={globalstyle.inputbox}>
                    <Icon style={globalstyle.authlefticon} name={'phone'} size={18} />
                    <TextInput
                        style={globalstyle.inputfield}
                        placeholder="Postel / Zip Code"
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

                <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon color={colors.blue} name={'lock'} size={18} />
                        <TextInput
                            style={[globalstyle.inputfield, { flex: 0.8 }]}
                            placeholder="Password"
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
                            ref={input01}
                            returnKeyType="next"
                            onSubmitEditing={() => input02.current.focus()}
                        />
                    </View>
                </View>
                {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}

                <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon color={colors.blue} name={'lock'} size={18} />
                        <TextInput
                            style={[globalstyle.inputfield, { flex: 0.8 }]}
                            placeholder="Confirm Password"
                            name={confirmpass.name}
                            inputRef={confirmpass.ref}
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
                            secureTextEntry={!showConfPassword ? true : false}
                            autoCapitalize='none'
                            ref={input02}
                        // returnKeyType="next"
                        // onSubmitEditing={() => input05.current.focus()}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowConfPassword(!showConfPassword) }}>
                        <Icon name={!showConfPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                    </TouchableOpacity>
                </View>
                {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}

            </View>






            <View style={{ backgroundColor: colors.white, padding: 13, marginBottom: 15 }}>
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
            </View>

            <View style={{ backgroundColor: colors.white, padding: 13 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 13, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16 }}>Weekly Goals</Text>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16 }}>25</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Referrals Made</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>0</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, color: colors.black }}>Weekly List</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Monday</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Tuesday</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Wednesday</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Thursday</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Friday</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Saturday</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>Sunday</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#666' }}>-</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3, paddingTop: 13, marginTop: 10, borderTopWidth: 1, borderTopColor: '#ddd' }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 15, color: '#333' }}>Remaining Goals</Text>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 15, color: '#333' }}>1239</Text>
                </View>
            </View>


            <View>
                <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 20, marginLeft: 10, marginVertical: 10 }}>Create Post</Text>
                <View style={{ backgroundColor: '#fff', marginBottom: 15 }}>
                    {/* margin: 10, borderRadius: 10 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 13, }}>
                        <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 12 }}>
                            <Image source={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
                        </View>
                        <View style={{ width: '82%' }}>
                            <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16 }}>Mechelle Morgan</Text>
                            <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333', marginTop: -2 }}>@zynwigodor</Text>
                        </View>
                    </View>
                    <TextInput
                        placeholder="Want to share a memory?"
                        placeholderTextColor={'#999'}
                        numberOfLines={50}
                        multiline={true}
                        // value="It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old"
                        style={{ fontFamily: fonts.primary, backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 12, width: '100%', borderRadius: 10, height: 100 }}
                    />
                    {/* <View>
                        <TouchableOpacity style={{ backgroundColor: colors.orange, padding: 10, width: 120, borderRadius: 10 }}>
                            <Text style={{ color: colors.white, fontFamily: fonts.primarySemiBold, textTransform: 'uppercase', textAlign: 'center' }}>Post Now</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </View>

        </ScrollView>
    </SafeAreaView>
}


// const setStateToProps = state => ({
//     getHomeBiblicalDataResponse: state.listingstate.getHomeBiblicalDataResponse,
//     getHomeSpiritualDataResponse: state.listingstate.getHomeSpiritualDataResponse,
//     getHomeAudioNoDataResponse: state.listingstate.getHomeAudioNoDataResponse,

//     getToFeaturedListResponse: state.listingstate.getToFeaturedListResponse,
//     getDailiesListResponse: state.listingstate.getDailiesListResponse,
//     getHomeNewsListResponse: state.listingstate.getHomeNewsListResponse,
//     drawerMenu: state.listingstate.drawerMenu,
// })

// const mapDispatchToProps = dispatch => {
//     return {
//         GetFeaturedList: bindActionCreators(GetFeaturedList, dispatch),
//         GetDailiesList: bindActionCreators(GetDailiesList, dispatch),
//         GetHomeNewsList: bindActionCreators(GetHomeNewsList, dispatch),
//         GetHomeBiblicalData: bindActionCreators(GetHomeBiblicalData, dispatch),
//         GetHomeSpiritualData: bindActionCreators(GetHomeSpiritualData, dispatch),
//         GetHomeAudioData: bindActionCreators(GetHomeAudioData, dispatch),
//     }
// }

// export default connect(setStateToProps, mapDispatchToProps)(Home);
export default Home;

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