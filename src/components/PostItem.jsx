import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import CommentItem from "./CommentItem";
import commentslist from "../data/comments";
import moment from "moment";
import AddComment from "./AddComment";
import Video from "react-native-video";

const PostItem = (props) => {
    const { item, user } = props;
    // console.log('item => ', item)
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    useEffect(() => {
        setComments(commentslist);
    }, []);


    const _handleDelete = (id) => {
        console.log('id => ', id)
        const newlist = comments.filter(x => x.id != id)
        setComments(newlist);
    }

    const _handleComment = (obj) => {
        const newcomment = [...comments, obj];
        setComments(prev => newcomment);
    }


    return <View style={{ backgroundColor: colors.white, marginBottom: 15, borderRadius: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <View style={{ width: 45, height: 45, borderRadius: 10, marginRight: 12, overflow: 'hidden' }}>
                <Image
                    source={typeof item?.user?.image == 'string' ? { uri: item?.user?.image } : item?.user?.image}
                    defaultSource={require('./../../assets/images/dummy-profile-image.png')}
                    style={{ resizeMode: 'cover', width: 45, height: 45 }} />
            </View>
            <View style={{ width: '82%' }}>
                <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 17, color: colors.black, marginBottom: -5 }}>{item?.user?.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: colors.grey, marginTop: IOS ? 4 : -2 }}>{item?.user?.username}</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: colors.grey, marginTop: 3 }}>12 Dec, 2023 04:38 AM</Text>
                </View>
            </View>
        </View>
        <View style={{ padding: 13 }}>
            <Text style={{ fontFamily: fonts.primary, color: '#333' }}>{item?.content}</Text>
        </View>
        {item?.image && <Image source={require('./../../assets/images/test-image.jpeg')} style={{ width: '100%', height: 250, resizeMode: 'cover' }} />}
        {item?.video && <View>
            <Video
                source={typeof item?.video == 'string' ? { uri: item?.video } : item?.video}
                style={{ height: width / 1.8, width: '100%' }}
                resizeMode={"cover"}
                controls={false}
            />
        </View>}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <TouchableOpacity onPress={() => { }}>
                <Text style={{ fontFamily: fonts.primary, color: colors.black, fontSize: 13, }}>{like ? 'You and 23 others liked' : '23 people liked'}</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
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

        <AddComment handleComment={_handleComment} user={user} />
    </View>
}

export default PostItem;