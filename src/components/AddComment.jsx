import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";

const AddComment = (props) => {
    const { handleComment, user } = props;
    const commentRef = useRef(null);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <View style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', marginRight: 12 }}>
                <Image source={user?.profile_image && typeof user?.profile_image === 'string' ? { uri: user?.profile_image } : user?.profile_image}
                    defaultSource={require('./../../assets/images/dummy-profile-image.png')}
                    style={{ resizeMode: 'cover', width: 40, height: 40 }}
                />
            </View>
            <TextInput
                placeholder="Write a comment"
                placeholderTextColor={'#999'}
                ref={commentRef}
                onChangeText={(value) => {
                    // console.log('value => ', value)
                    commentRef.current.value = value;
                }}
                multiline={true}
                // value={''}
                style={{ fontSize: 13, fontFamily: fonts.primary, backgroundColor: '#f7f7f7', paddingHorizontal: 15, paddingBottom: 12, paddingTop: 12, width: '66%', borderRadius: 10 }}
            />
            <TouchableOpacity
                onPress={() => {
                    if (commentRef.current.value) {
                        console.log('commentRef => ', commentRef.current.value)
                        const obj = {
                            id: Math.floor(Math.random() * (9900) + 100),
                            user: {
                                id: '9dad4f7c-9165-44b8-9f55-0039a4c1f1e1',
                                name: `${user?.first_name} ${user?.last_name}`,
                                username: user?.username,
                                image: user?.profile_image,
                            },
                            content: commentRef.current.value,
                            created_at: Date.now()
                        }
                        handleComment(obj)
                        commentRef.current.clear();
                    }
                }}
                style={{ width: 45, height: 45, marginLeft: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderRadius: 10 }}>
                <Icon name="send" style={{ fontSize: 22, color: colors.white }} />
            </TouchableOpacity>
        </View>
    )
}

export default AddComment;