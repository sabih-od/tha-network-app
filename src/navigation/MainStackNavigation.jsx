import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, useColorScheme, StyleSheet, Keyboard, StatusBar, Image } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Feather';
import { isDarkMode, colors, fontcolor, fonts, height, width } from "../theme";
import { createDrawerNavigator, useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";

/* Screens */
import Home from "../screens/Home";
import Contact from "../screens/Contact";
// import About from "../screens/About";
import Notifications from "../screens/Notifications";
// import PrayList from "../screens/PrayList";
// import GoalList from "../screens/GoalsList";
// import StartFreeWeek from "../screens/FreeWeek";
import Profile from "../screens/Profile/Profile";
import PersonalInformation from "../screens/Profile/PersonalInformation";
import Settings from "../screens/Profile/Settings";

import DrawerIcon from "../components/header/DrawerIcon";
import NotificationIcon from "../components/header/NotificationIcon";
import GoBackIcon from "../components/header/GoBackIcon";

import globalstyle from "../theme/style";
import PeopleInNetwork from "../screens/PeopleInNetwork";
import WeeklyGoals from "../screens/WeeklyGoals";
import Friends from "../screens/Friends";
import ChatMessages from "../screens/ChatMessages/ChatMessages";
import ChatChannels from "../screens/ChatMessages/ChatChannels";
import BlockList from "../screens/BlockList";
import NewMembersInNetwork from "../screens/NewMembersInNetwork";
// import QuestionAnswer from "../screens/QuestionAnswer";
// import Audio from "../screens/Audio";
// import Social from "../screens/Lectures/Social";
// import BibleStudy from "../screens/Lectures/BibleStudy";
// import WellBeing from "../screens/Lectures/WellBeing";
// import News from "../screens/News";
// // import Homily from "../screens/FavouriteList";
// import PostsList from "../screens/PostsList";
// import PostDetail from "../screens/Detail/PostDetail";
// import VideoDetail from "../screens/Detail/VideoDetail";
// import ImageDetail from "../screens/Detail/ImageDetail";
// import PdfView from "../screens/PdfView";
// import FavouriteList from "../screens/FavouriteList";
// // import strings from "../localization/translation";
// import HistoryList from "../screens/HistoryList";
// import Downloads from "../screens/Downloads";
// import CDsList from "../screens/CDsList";
// import AudioPlayer from "../screens/AudioPlayer";
// import SearchPost from "../screens/SearchPost";
// import Posts from "../screens/Posts";


const Stack = createStackNavigator();
const MainStackNavigation = ({ navigation, style, notificationBadge }) => {

    const drawerProgress = useDrawerProgress();
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8], {
            extrapolateRight: Extrapolate.CLAMP,
        });
        const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 15], {
            extrapolateRight: Extrapolate.CLAMP,
        });
        return {
            overflow: 'hidden',
            transform: [{ scale }],
            borderRadius,
        };
    });

    const isDrawerOpen = useDrawerStatus() === 'open';

    useEffect(() => {
        // Change the StatusBar style to light when the drawer is open
        // StatusBar.setBarStyle(isDrawerOpen ? 'light-content' : 'dark-content');
    }, [isDrawerOpen]);

    return <Animated.View style={[styles.stack, animatedStyle]}>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    // headerTransparent: true,
                    headerTitle: '',
                    headerTitleAlign: 'left',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerRight: () => <NotificationIcon navigation={navigation} />,
                    // headerRight: () => <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    //     <NotificationIcon navigation={navigation} />
                    //     <View style={{ width: 30, height: 30, borderRadius: 30, marginRight: 12 }}>
                    //         <Image source={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 30, height: 30 }} />
                    //     </View>
                    // </View>
                    // headerTransparent: true,
                    // headerStyle: { height: 120 },
                    // headerTitle: () => <SearchHeader />,
                    // headerLeft: () => <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10 }} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }} activeOpacity={0.8}>
                    //     <Icon name={'align-right'} size={22} color={colors.white} />
                    // </TouchableOpacity>,
                    // headerRight: () => (<TouchableOpacity>
                    //     <Icon name={'bell'} size={18} color={colors.white} />
                    // </TouchableOpacity>)
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerTitle: 'Notifications',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerRight: () => <NotificationIcon navigation={navigation} />
                    headerRight: () => <TouchableOpacity
                        onPress={() => { props.navigation.navigate('Profile') }}
                        style={{ width: 33, height: 33, borderRadius: 33, overflow: 'hidden', marginRight: 12 }}>
                        <Image
                            // source={typeof userInfo?.profile_image === 'string' ? { uri: userInfo?.profile_image } : userInfo?.profile_image}
                            source={{ uri: 'https://service.demowebsitelinks.com/tha-network/public/storage/303/male-avatar.png' }}
                            defaultSource={require('./../../assets/images/dummy-profile-image.png')}
                            style={{ resizeMode: 'cover', width: 33, height: 33, borderRadius: 33, }} />
                    </TouchableOpacity>
                }}
            />
            <Stack.Screen
                name="PeopleInNetwork"
                component={PeopleInNetwork}
                options={{
                    headerTitle: 'People In My Network',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Friends"
                component={Friends}
                options={{
                    headerTitle: 'Friends',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="WeeklyGoals"
                component={WeeklyGoals}
                options={{
                    headerTitle: 'Weekly Goals',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    cardStyle: { backgroundColor: '#fff' },
                    headerTitle: 'Settings',
                    // headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformation}
                options={{
                    headerTitle: 'Personal Information',
                    // headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,                    
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: '',
                    // headerTransparent: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="ChatChannels"
                component={ChatChannels}
                options={{
                    headerTitle: 'Tha Network',
                    // headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,                    
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="ChatMessages"
                component={ChatMessages}
                options={{
                    headerTitle: '',
                    // headerTransparent: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,                    
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />

            {/* <Stack.Screen
                name="About"
                component={About}
                options={{
                    headerTitle: 'About',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            /> */}
            <Stack.Screen
                name="Contact"
                component={Contact}
                // options={{
                //     headerLeft: () => <GoBackIcon navigation={navigation} />,
                //     headerTitle: '',
                //     headerTransparent: true
                // }}
                options={{
                    headerTransparent: true,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: '',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="BlockList"
                component={BlockList}
                options={{
                    headerTitle: 'BLocked Users',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="NewMembersInNetwork"
                component={NewMembersInNetwork}
                options={{
                    headerTitle: 'New Members This Week',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />

            {/* <Stack.Screen
                name="ImageDetail"
                component={ImageDetail}
                options={{
                    // headerShown: false,
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerTransparent: true,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PDFView"
                component={PdfView}
                options={{
                    headerTitle: 'Book Detail',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            
            <Stack.Screen
                name="PrayList"
                component={PrayList}
                options={{
                    headerTitle: 'Pray',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont, textTransform: 'capitalize' },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} screen={'Books'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PostsList"
                component={PostsList}
                options={{
                    headerTitle: 'PostsList',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Posts"
                component={Posts}
                options={{
                    headerTitle: 'Posts',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Audio"
                component={Audio}
                options={{
                    headerTitle: 'Audio',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />

            <Stack.Screen
                name="GoalList"
                component={GoalList}
                options={{
                    headerTitle: 'Goals',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="StartFreeWeek"
                component={StartFreeWeek}
                options={{
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerTransparent: true,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} screen={'ChatChannels'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="QuestionAnswer"
                component={QuestionAnswer}
                options={{
                    headerTitle: strings.AskAQuestion,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} screen={'ChatChannels'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />


            <Stack.Screen
                name="FavouriteList"
                component={FavouriteList}
                options={{
                    headerTitle: strings.Favourites,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Downloads"
                component={Downloads}
                options={{
                    headerTitle: strings.Downloads,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="HistoryList"
                component={HistoryList}
                options={{
                    headerTitle: strings.History,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="CDsList"
                component={CDsList}
                options={{
                    headerTitle: 'CDs',
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none' }],
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PostDetail"
                component={PostDetail}
                options={{
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none' }],
                    // headerTransparent: true,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="SearchPost"
                component={SearchPost}
                options={{
                    headerTitle: strings.Search,
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none' }],
                    // headerTransparent: true,
                    headerStyle: {
                        backgroundColor: colors.orange,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="AudioPlayer"
                component={AudioPlayer}
                options={{
                    // headerShown: false,
                    headerTitle: strings.NowPlaying,
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none', fontSize: 14 }],
                    headerTransparent: true,
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.white} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            /> */}

        </Stack.Navigator>
    </Animated.View>
}
export default MainStackNavigation;

const styles = StyleSheet.create({
    stack: { flex: 1 },
    drawerStyles: { flex: 1, width: '70%' },
    badge: { backgroundColor: colors.orange, color: colors.white, position: 'absolute', width: 11, height: 11, top: 5, right: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
    notibadge: { position: 'relative', width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', },
});