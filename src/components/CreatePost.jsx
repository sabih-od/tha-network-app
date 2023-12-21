import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";

import globalstyle from "../theme/style";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CreatePostHit } from "../redux/reducers/ListingApiStateReducer";

const CreatePost = (props) => {
    const { user } = props;

    const SubmitPost = () => {
        props.CreatePost({
            content: "This is post content.",
            // "files": [
            //     "Example binary file.jpg",
            //     "Example binary file.mp4"
            // ],
            // "post_id": "49209ef9-13b7-483f-9253-6f910d3cd4b4"
        })
    }

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
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 17, color: colors.black, marginBottom: IOS ? 0 : -5 }}>{`${user?.first_name} ${user?.last_name}`}</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: colors.grey, marginTop: -2 }}>{user?.username ? user?.username : user?.email}</Text>
                </View>
            </View>
            <View style={{ fontFamily: fonts.primary, backgroundColor: '#fff', }}>
                <TextInput
                    style={[globalstyle.inputfield, { flex: 1, textAlignVertical: 'top', paddingTop: 17 }]}
                    placeholder={'Want to share a memory?'}
                    placeholderTextColor={colors.placeholdercolor}
                    multiline={true}
                    numberOfLines={Platform.OS === 'ios' ? null : 7}
                    minHeight={(Platform.OS === 'ios' && 7) ? (20 * 7) : null}
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
            <TouchableOpacity activeOpacity={0.8} onPress={SubmitPost} style={[globalstyle.authSubmitButton, { marginTop: -10, paddingVertical: 14 }]}>
                <Text style={globalstyle.authSubmitButtonText}>{'Post Now'}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ backgroundColor: colors.orange, padding: 12, width: '100%', }}>
                <Text style={{ color: colors.white, fontFamily: fonts.primarySemiBold, textTransform: 'uppercase', textAlign: 'center' }}>Post Now</Text>
            </TouchableOpacity> */}
        </View>
    </View>)
}

const setStateToProps = state => ({
    createPostResponse: state.listingstate.createPostResponse,
    userInfo: state.appstate.userInfo
})

const mapDispatchToProps = dispatch => {
    return {
        CreatePost: bindActionCreators(CreatePostHit, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(CreatePost);