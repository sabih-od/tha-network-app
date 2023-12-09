import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";

import globalstyle from "../theme/style";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";

const CreatePost = (props) => {
    return (<View style={{ marginBottom: 15 }}>
        {/* <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 20, marginLeft: 10, marginBottom: 10 }}>Create Post</Text> */}
        <View style={{ backgroundColor: '#fff', }}>
            {/* margin: 10, borderRadius: 10 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 13, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 12 }}>
                    <Image source={{ uri: props?.user?.profile_image }} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
                </View>
                <View style={{ width: '82%' }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16 }}>{props?.user?.name}</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333', marginTop: -2 }}>{props?.user?.username}</Text>
                </View>
            </View>
            <View style={{ fontFamily: fonts.primary, backgroundColor: '#fff', paddingTop: 10, paddingLeft: 15 }}>
                <TextInput
                    placeholder="Want to share a memory?"
                    placeholderTextColor={'#999'}
                    numberOfLines={50}
                    multiline={true}
                    // value="It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old"
                    style={{ fontFamily: fonts.primary, backgroundColor: '#fff', minHeight: 100 }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 13, justifyContent: 'flex-end', }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="image" style={{ color: colors.grey, fontSize: 18, marginRight: 5 }} />
                        <Text style={{ fontFamily: fonts.primaryMedium, color: colors.grey, fontSize: 13 }}>Photos</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, backgroundColor: colors.grey, height: 10, marginHorizontal: 14 }} />
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="video" style={{ color: colors.grey, fontSize: 18, marginRight: 5 }} />
                        <Text style={{ fontFamily: fonts.primaryMedium, color: colors.grey, fontSize: 13 }}>Videos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View>
            <TouchableOpacity style={{ backgroundColor: colors.orange, padding: 12, width: '100%', }}>
                <Text style={{ color: colors.white, fontFamily: fonts.primarySemiBold, textTransform: 'uppercase', textAlign: 'center' }}>Post Now</Text>
            </TouchableOpacity>
        </View>
    </View>)
}

export default CreatePost;