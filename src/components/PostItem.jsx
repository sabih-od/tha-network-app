import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import CommentItem from "./CommentItem";
import commentslist from "../data/comments";
import moment from "moment";

const PostItem = ({ item, user }) => {
    // console.log('item => ', item)
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    useEffect(() => {
        setComments(commentslist);
    }, []);

    const commentRef = useRef(null);

    const _handleDelete = (id) => {
        console.log('id => ', id)
        const newlist = comments.filter(x => x.id != id)
        setComments(newlist);
    }

    return <View style={{ backgroundColor: colors.white, marginBottom: 15, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <View style={{ width: 50, height: 50, borderRadius: 40, marginRight: 12, overflow: 'hidden' }}>
                <Image source={item?.user?.image} style={{ resizeMode: 'cover', width: 50, height: 50 }} />
            </View>
            <View style={{ width: '82%' }}>
                <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 17 }}>{item?.user?.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333' }}>{item?.user?.username}</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: colors.grey, marginTop: 3 }}>12 Dec, 2023 04:38 AM</Text>
                </View>
            </View>
        </View>
        <View style={{ padding: 13 }}>
            <Text style={{ fontFamily: fonts.primary, color: '#333' }}>{item?.content}</Text>
        </View>
        {item?.image && <Image source={require('./../../assets/images/test-image.jpeg')} style={{ width: '100%', height: 250, resizeMode: 'cover' }} />}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <TouchableOpacity onPress={() => { }}>
                <Text style={{ fontFamily: fonts.primary, color: colors.orange, fontSize: 13, }}>{like ? 'You and 23 others liked' : '23 people liked'}</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setLike(prev => !prev) }} style={{ width: 40 }}>
                    <IonIcon name={like ? "heart" : "heart-outline"} style={{ fontSize: 25, color: like ? colors.blue : colors.black }} />
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
                    <Text style={{ fontFamily: fonts.primary, color: colors.grey, fontSize: 12, }}>{item?.commentscount} Comments</Text>
                </TouchableOpacity>
                <View style={{ width: 1, height: 10, backgroundColor: colors.grey, marginHorizontal: 10 }} />
                <TouchableOpacity onPress={() => { }} style={{}}>
                    <Text style={{ fontFamily: fonts.primary, color: colors.grey, fontSize: 12, }}>{item?.sharecount} Shares</Text>
                </TouchableOpacity>
            </View>
        </View>

        {comments.map((item, index) => {
            return (
                <CommentItem key={index} item={item} onDelete={_handleDelete} />
            )
        })}
        <TouchableOpacity activeOpacity={0.8}
            onPress={() => { }}>
            <Text style={{ fontFamily: fonts.primary, fontSize: 13, color: colors.orange, textAlign: 'center', marginTop: 13, marginBottom: 10 }}>Show More Comments</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 12 }}>
                <Image source={{ uri: user?.profile_image }} defaultSource={require('./../../assets/images/dummy-profile-image.png')} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
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
                style={{ fontFamily: fonts.primary, backgroundColor: '#f7f7f7', paddingHorizontal: 15, paddingBottom: 12, paddingTop: 12, width: '69%', borderRadius: 10 }}
            />
            <TouchableOpacity
                onPress={() => {
                    if (commentRef.current.value) {
                        console.log('commentRef => ', commentRef.current.value)
                        console.log('moment(); > ', moment().unix())
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
                        const newcomment = [...comments, obj];
                        setComments(prev => newcomment);
                        commentRef.current.clear();
                    }
                }}
                style={{ width: 45, height: 45, marginLeft: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderRadius: 10 }}>
                <Icon name="send" style={{ fontSize: 22, color: colors.white }} />
            </TouchableOpacity>
        </View>
    </View>
}

export default PostItem;