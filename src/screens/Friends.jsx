import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
import globalstyle from "../theme/style";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import peoplelist from "../data/people";


const Friends = props => {

    const [people, setPeople] = useState(peoplelist);
    useEffect(() => {

    }, []);
    return (
        <SafeAreaView style={[globalstyle.fullview, { backgroundColor: colors.white }]}>
            <View style={{ backgroundColor: colors.white, padding: 13, marginBottom: 15 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 13, marginBottom: 10, }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, textTransform: 'capitalize' }}>People in my network</Text>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 14, color: colors.orange }}>See All</Text>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', paddingHorizontal: 13, borderRadius: 10 }}>
                    <Icon name="search" style={{ color: '#888', fontSize: 18 }} />
                    <TextInput
                        placeholder="Search Here..."
                        placeholderTextColor={'#999'}
                        style={{ fontFamily: fonts.primary, paddingHorizontal: 15, paddingVertical: 12, width: '89%', }}
                    />
                    <TouchableOpacity>
                        <Icon name="sliders" style={{ color: '#888', fontSize: 18 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }}>
                    {people.length > 0 && < FlatList
                        data={people}
                        style={{ height: height }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 40, overflow: 'hidden', marginRight: 12 }}>
                                        <Image source={item?.image} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
                                    </View>
                                    <View style={{ width: '82%' }}>
                                        <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16 }}>{item?.name}</Text>
                                        <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333', marginTop: -2 }}>{item?.username}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />}
                    {people.length == 0 && <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#333', textAlign: 'center', marginTop: 20, marginBottom: 10 }}>No user in my network</Text>}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Friends;