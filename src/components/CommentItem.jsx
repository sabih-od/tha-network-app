import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import moment from "moment";

const CommentItem = (props) => {
    const { item } = props;
    return <View style={{ padding: 15, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View style={{ width: 35, height: 35, borderRadius: 40, marginRight: 12, overflow: 'hidden' }}>
                <Image source={item?.user?.image} style={{ resizeMode: 'cover', width: 35, height: 35 }} />
            </View>
            <View style={{ width: '86%' }}>
                <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 14, marginBottom: -2 }}>{item?.user?.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: '#333' }}>{item?.user?.username}</Text>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: colors.grey, marginTop: 3 }}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY hh:mm")}</Text>
                </View>
            </View>
        </View>
        <Text style={{ fontFamily: fonts.primary, fontSize: 13, backgroundColor: '#f7f7f7', color: '#333', padding: 10, marginTop: 10, borderRadius: 10, marginLeft: 47 }}>{item?.content}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 50 }}>
            <TouchableOpacity style={{}}>
                <Text style={{ color: '#333', fontFamily: fonts.primary, fontSize: 12 }}>Like{item?.likes && item?.likes != 0 && ` (${item?.likes})`}</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: 10, backgroundColor: colors.grey, marginHorizontal: 10 }} />
            <TouchableOpacity style={{}}>
                <Text style={{ color: '#333', fontFamily: fonts.primary, fontSize: 12 }}>Reply</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: 10, backgroundColor: colors.grey, marginHorizontal: 10 }} />
            {item.id == '9dad4f7c-9165-44b8-9f55-0039a4c1f1e1' && <TouchableOpacity style={{}}>
                <Text style={{ color: '#f00', fontFamily: fonts.primary, fontSize: 12 }}>Delete</Text>
            </TouchableOpacity>}
        </View>
    </View>
}

export default CommentItem;