import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";

import globalstyle from "../theme/style";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";

const CreatePost = (props) => {
    const { user } = props;
    return (<View style={{ marginBottom: 15 }}>
        {/* <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 20, marginLeft: 10, marginBottom: 10 }}>Create Post</Text> */}
        <View style={{ backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', }}>
            {/* margin: 10, borderRadius: 10 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 13, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                <View style={{ width: 45, height: 45, borderRadius: 10, marginRight: 12, overflow: 'hidden' }}>
                    <Image
                        source={typeof user?.profile_image == 'string' ? { uri: user?.profile_image } : user?.profile_image}
                        defaultSource={require('./../../assets/images/dummy-profile-image.png')}
                        style={{ resizeMode: 'cover', width: 45, height: 45 }} />
                </View>
                <View style={{ width: '82%' }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 17, color: colors.black, marginBottom: -5 }}>{user?.name}</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: colors.grey, marginTop: -2 }}>{user?.username}</Text>
                </View>
            </View>
            <View style={{ fontFamily: fonts.primary, backgroundColor: '#fff',  }}>
                <TextInput
                    style={[globalstyle.inputfield, { flex: 1, textAlignVertical: 'top', paddingTop: 17 }]}
                    placeholder={'Want to share a memory?'}
                    placeholderTextColor={colors.placeholdercolor}
                    multiline={true}
                    numberOfLines={Platform.OS === 'ios' ? null : 5}
                    minHeight={(Platform.OS === 'ios' && 5) ? (20 * 5) : null}
                />
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', padding: 13, justifyContent: 'flex-end', }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="image" style={{ color: colors.grey, fontSize: 18, marginRight: 5 }} />
                        <Text style={{ fontFamily: fonts.primaryMedium, color: colors.grey, fontSize: 13 }}>Photos</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, backgroundColor: colors.grey, height: 10, marginHorizontal: 14 }} />
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="video" style={{ color: colors.grey, fontSize: 18, marginRight: 5 }} />
                        <Text style={{ fontFamily: fonts.primaryMedium, color: colors.grey, fontSize: 13 }}>Videos</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { }} style={globalstyle.authSubmitButton}>
                <Text style={globalstyle.authSubmitButtonText}>{'Post Now'}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ backgroundColor: colors.orange, padding: 12, width: '100%', }}>
                <Text style={{ color: colors.white, fontFamily: fonts.primarySemiBold, textTransform: 'uppercase', textAlign: 'center' }}>Post Now</Text>
            </TouchableOpacity> */}
        </View>
    </View>)
}

export default CreatePost;