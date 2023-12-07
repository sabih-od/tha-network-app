import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";


const PostItem = () => {
    return <View style={{ backgroundColor: colors.white }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <View style={{ width: 50, height: 50, borderRadius: 40, marginRight: 12 }}>
                <Image source={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 50, height: 50 }} />
            </View>
            <View style={{ width: '82%' }}>
                <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 17 }}>Mechelle Morgan</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333' }}>@zynwigodor</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: colors.grey, marginTop: 3 }}>12 Dec, 2023 04:38 AM</Text>
                </View>
            </View>
        </View>
        <View style={{ padding: 13 }}>
            <Text style={{ fontFamily: fonts.primary, color: '#333' }}>Location Post Fellers Location Post Fellers Location Post Fellers Location Post Fellers Location Post Fellers Location Post Fellers Post Fellers Post Fellers.</Text>
        </View>
        <Image source={require('./../../assets/images/test-image.jpeg')} style={{ width: '100%', height: 250, resizeMode: 'cover' }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { }} style={{ width: 40 }}>
                    <IonIcon name="heart-outline" style={{ fontSize: 25 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ width: 35 }}>
                    <IonIcon name="chatbubble-outline" style={{ fontSize: 22 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ width: 35 }}>
                    <IonIcon name="share-social-outline" style={{ fontSize: 22 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={{ fontFamily: fonts.primary, color: colors.grey, fontSize: 13, }}>20 Comments</Text>
                </TouchableOpacity>
                <View style={{ width: 1, height: 10, backgroundColor: colors.grey, marginHorizontal: 10 }} />
                <TouchableOpacity onPress={() => { }} style={{}}>
                    <Text style={{ fontFamily: fonts.primary, color: colors.grey, fontSize: 13, }}>2.3K Shares</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee' }}> */}
        <View style={{ margin: 10, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ width: 35, height: 35, borderRadius: 40, marginRight: 12 }}>
                    <Image source={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 35, height: 35 }} />
                </View>
                <View style={{ width: '86%' }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 14, marginBottom: -2 }}>Mechelle Morgan</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: '#333' }}>@zynwigodor</Text>
                        <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: colors.grey, marginTop: 3 }}>12 Dec, 2023 04:38 AM</Text>
                    </View>
                </View>
            </View>
            <Text style={{ fontFamily: fonts.primary, fontSize: 13, backgroundColor: '#f7f7f7', color: '#333', padding: 10, marginTop: 10, borderRadius: 10, marginLeft: 47 }}>It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 50 }}>
                <TouchableOpacity style={{}}>
                    <Text style={{ color: '#333', fontFamily: fonts.primary, fontSize: 12 }}>Like</Text>
                </TouchableOpacity>
                <View style={{ width: 1, height: 10, backgroundColor: colors.grey, marginHorizontal: 10 }} />
                <TouchableOpacity style={{}}>
                    <Text style={{ color: '#333', fontFamily: fonts.primary, fontSize: 12 }}>Reply</Text>
                </TouchableOpacity>
                <View style={{ width: 1, height: 10, backgroundColor: colors.grey, marginHorizontal: 10 }} />
                <TouchableOpacity style={{}}>
                    <Text style={{ color: '#f00', fontFamily: fonts.primary, fontSize: 12 }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 12 }}>
                <Image source={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
            </View>
            <TextInput
                placeholder="Write a comment"
                placeholderTextColor={'#999'}
                style={{ fontFamily: fonts.primary, backgroundColor: '#f7f7f7', paddingHorizontal: 15, paddingVertical: 12, width: width - 128, borderRadius: 10 }}
            />
            <TouchableOpacity style={{ width: 45, height: 45, marginLeft: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderRadius: 10 }}>
                <Icon name="send" style={{ fontSize: 22, color: colors.white }} />
            </TouchableOpacity>
        </View>
    </View>
}

export default PostItem;