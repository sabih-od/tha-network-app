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
            <View style={{ backgroundColor: colors.white, marginBottom: 15 }}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 13, marginBottom: 10, }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, textTransform: 'capitalize' }}>People in my network</Text>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 14, color: colors.orange }}>See All</Text>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', paddingHorizontal: 13, borderRadius: 10, margin: 15 }}>
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

                <View style={{}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={people}
                        style={{ height: height - 162 }}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => <View style={{ alignItems: 'center', justifyContent: 'center', height: height - 200 }}><IonIcon name="alert-circle-outline" style={{ color: colors.grey, fontSize: 50 }} /><Text style={{ fontFamily: fonts.primary, fontSize: 14, color: '#333', textAlign: 'center', marginTop: 5, marginBottom: 10 }}>People not found</Text></View>}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <View>
                                            <View style={{ width: 10, height: 10, backgroundColor: item?.status == 'online' ? '#50C878' : colors.red, borderRadius: 8, position: 'absolute', left: 0, zIndex: 1 }} />
                                            {/* <View style={{ borderRadius: 10, width: 10, height: 10, backgroundColor: '#50C878', position: 'absolute', left: 0, zIndex: 1 }} /> */}
                                            <View style={{ width: 40, height: 40, borderRadius: 40, overflow: 'hidden', marginRight: 12 }}>
                                                <Image source={item?.image} style={{ resizeMode: 'cover', width: 40, height: 40 }} />
                                            </View>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, color: colors.black }}>{item?.name}</Text>
                                            <Text style={{ fontFamily: fonts.primary, fontSize: 12, color: '#333', marginTop: -2 }}>{item?.username}</Text>
                                        </View>
                                    </View>
                                    {item?.isFriend ? <TouchableOpacity>
                                        <IonIcon name="person-add-outline" style={{ fontSize: 22 }} />
                                    </TouchableOpacity> :
                                        <TouchableOpacity>
                                            <IonIcon name="chatbubbles-outline" style={{ fontSize: 24 }} />
                                        </TouchableOpacity>}
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Friends;