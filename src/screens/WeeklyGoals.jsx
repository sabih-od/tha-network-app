import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, TouchableOpacity, TextInput } from "react-native";
import { IOS, colorScheme, colors, fonts, height, isIPad, width } from "../theme";
import globalstyle from "../theme/style";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import peoplelist from "../data/people";
import { connect } from "react-redux";
import { GetWeeklyGoals } from "../redux/reducers/ListingApiStateReducer";
import { bindActionCreators } from "redux";


const WeeklyGoals = props => {

    const [goals, setGoals] = useState(peoplelist);

    useEffect(() => {
        props.GetWeeklyGoals()
    }, [])

    useEffect(() => {
        if (props.getWeeklyGoalsResponse && props.getWeeklyGoalsResponse.success && props.getWeeklyGoalsResponse.data) {
            setGoals(props.getWeeklyGoalsResponse.data)
        }
    }, [props.getWeeklyGoalsResponse])

    return (
        <SafeAreaView style={[globalstyle.fullview, { backgroundColor: colors.white }]}>
            <View style={{ backgroundColor: colors.white, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, color: colors.black }}>Weekly Goals</Text>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, color: colors.black }}>{goals?.weekly_goals}</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={styles.listkey}>Referrals Made</Text>
                    <Text style={styles.listkey}>{goals?.referrals_made}</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 16, paddingHorizontal: 13, color: colors.black }}>Weekly List</Text>
                </View>
                {goals?.weekly_list.map((item, index) => {
                    return <View key={index} style={styles.listrow}>
                        <Text style={styles.listkey}>{item?.day}</Text>
                        <Text style={styles.listkey}>{item?.count}</Text>
                    </View>
                })}
                {/* <View style={styles.listrow}>
                    <Text style={styles.listkey}>Monday</Text>
                    <Text style={styles.listkey}>-</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={styles.listkey}>Tuesday</Text>
                    <Text style={styles.listkey}>-</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={styles.listkey}>Wednesday</Text>
                    <Text style={styles.listkey}>-</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={styles.listkey}>Thursday</Text>
                    <Text style={styles.listkey}>-</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={styles.listkey}>Friday</Text>
                    <Text style={styles.listkey}>-</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={styles.listkey}>Saturday</Text>
                    <Text style={styles.listkey}>-</Text>
                </View>
                <View style={styles.listrow}>
                    <Text style={styles.listkey}>Sunday</Text>
                    <Text style={styles.listkey}>-</Text>
                </View> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 15, color: '#333' }}>Remaining Goals</Text>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 20, color: '#333' }}>{goals?.remaining_goals}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}



const setStateToProps = state => ({
    getWeeklyGoalsResponse: state.listingstate.getWeeklyGoalsResponse,
    userInfo: state.appstate.userInfo
})
const mapDispatchToProps = dispatch => {
    return {
        GetWeeklyGoals: bindActionCreators(GetWeeklyGoals, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(WeeklyGoals);

const styles = StyleSheet.create({
    listkey: { fontFamily: fonts.primary, fontSize: 14, color: '#666', paddingHorizontal: 15 },
    listrow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#eee' },
})