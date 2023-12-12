import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Feather';
import { colors, fontcolor, fonts, height, width } from "./../theme";
import { createDrawerNavigator, useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";

/* Screens */

import { store } from "../redux/store";

import Login from "./../screens/Auth/Login";
import Welcome from "../screens/Welcome";
import Register from "../screens/Auth/Register";
import InvitationCode from "../screens/Auth/InvitationCode";

import SubmitOTP from "../screens/Auth/SubmitOTP";
import ResetPassword from "../screens/Auth/ResetPassword";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import GoBackIcon from "../components/header/GoBackIcon";
import PaymentCard from "../screens/PaymentCard";
import RequestInvitationCode from "../screens/Auth/RequestInvitationCode";

const Stack = createStackNavigator();


const AuthStackNavigation = (props) => {

    console.log('AuthStackNavigation props => ', props);

    // const drawerProgress = useDrawerProgress();
    // const animatedStyle = useAnimatedStyle(() => {
    //     const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8], {
    //         extrapolateRight: Extrapolate.CLAMP,
    //     });
    //     const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 15], {
    //         extrapolateRight: Extrapolate.CLAMP,
    //     });
    //     return {
    //         overflow: 'hidden',
    //         transform: [{ scale }],
    //         borderRadius,
    //     };
    // });

    return <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={({ navigation }) => {
                return {
                    // headerTransparent: true, headerTitle: '',
                    headerShown: false,
                    swipeEnabled: false,
                    gestureEnabled: false,
                    // headerLeft: (props) => <GoBackIcon navigation={navigation}  color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="Login"
            component={Login}
            options={({ navigation }) => {
                return {
                    // headerTransparent: true, headerTitle: '',
                    headerShown: false,
                    swipeEnabled: false,
                    gestureEnabled: false,
                    // cardStyle: { backgroundColor: '#f7f7f7' }
                    // headerLeft: (props) => <GoBackIcon navigation={navigation}  color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={({ navigation }) => {
                return {
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: (props) => <GoBackIcon navigation={navigation} color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="InvitationCode"
            component={InvitationCode}
            options={({ navigation }) => {
                return {
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: (props) => <GoBackIcon navigation={navigation} color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="RequestInvitationCode"
            component={RequestInvitationCode}
            options={({ navigation }) => {
                return {
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: (props) => <GoBackIcon navigation={navigation} color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="PaymentCard"
            component={PaymentCard}
            options={({ navigation }) => {
                return {
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: (props) => <GoBackIcon navigation={navigation} color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={({ navigation }) => {
                return {
                    headerTransparent: true, headerTitle: '',
                    headerLeft: (props) => <GoBackIcon navigation={navigation} color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="SubmitOTP"
            component={SubmitOTP}
            options={({ navigation }) => {
                return {
                    headerTransparent: true, headerTitle: '',
                    headerLeft: (props) => <GoBackIcon navigation={navigation} color={colors.black} />,
                }
            }}
        />
        <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={({ navigation }) => {
                return {
                    headerTransparent: true, headerTitle: '',
                    // headerLeft: (props) => <GoBackIcon navigation={navigation}  color={colors.black} />,
                }
            }}
        />
    </Stack.Navigator>
}

export default AuthStackNavigation;

const styles = StyleSheet.create({
    stack: { flex: 1 },
    drawerStyles: { flex: 1, width: '70%' },
    badge: { backgroundColor: colors.orange, color: colors.white, position: 'absolute', width: 11, height: 11, top: 5, right: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
    notibadge: { position: 'relative', width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', },
});