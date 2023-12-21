import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { colors, fontSize, fonts, isIPad, width } from "../theme";
import moment from "moment";

const NotificationItem = ({ item, navigation, deleteItem }) => {

    const [notification, setNotificiation] = useState(item);

    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
            // notification.isRead = true;
            let obj = { ...notification, isRead: true }
            setNotificiation(obj)
            // console.log('asdasd')
            // navigation.navigate('AnnouncementDetail', { id: 21, refresh: true })
            // if (item?.topic == 'prayer-request') { navigation.navigate('RequestedPrayers') } // RequestedPrayers
            // if (item?.topic == 'book') { navigation.navigate('Books') } // Books // PdfView
            // if (item?.topic == 'event') { navigation.navigate('EventDetail', { id: item?.topic_id, refresh: true }) } // Events // EventDetail
            // if (item?.topic == 'post') { navigation.navigate('PostDetail', { id: item?.topic_id, refresh: true }) } // Posts // PostDetail
            // if (item?.topic == 'sermon') { navigation.navigate('SermonsDetail', { id: item?.topic_id, refresh: true }) } // Sermons // SermonsDetail
            // if (item?.topic == 'announcement') { navigation.navigate('AnnouncementDetail', { id: item?.topic_id, refresh: true }) } // Announcements // AnnouncementDetail
            // if (item?.topic == 'chat-request') { navigation.navigate('ChatChannels') } // Group Chat

        }}
        style={[styles.notificationitem, {
            // borderLeftColor: notification?.isRead ? colors.orange : '#ddd',
            // backgroundColor: 'rgba(103, 146, 141, 0.1)', borderLeftColor: 'rgba(103, 146, 141, 0.1)'
        }, !notification?.viewed && { borderLeftColor: colors.orange, borderLeftWidth: 5 }
        ]}>
        <View style={styles.notiInnerRow}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
            <Image
                source={typeof notification?.sender_pic == 'string' ? { uri: notification?.sender_pic } : notification?.sender_pic} style={styles.image}
                defaultSource={require('./../../assets/images/dummy-profile-image.png')}
            />
            <View style={styles.notirowmsg}>
                {/* <Text style={[styles.notititle]} numberOfLines={1}>{item?.title}</Text> */}
                <Text style={[styles.notimessage]} numberOfLines={2}>{item?.body}</Text>
                <Text style={styles.datetime}>{moment(item?.created_at).format("DD MMM, YYYY hh:mm")}</Text>
            </View>
            {/* </View> */}
            {/* <Text style={styles.datetime}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY hh:mm")}</Text> */}

        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => { deleteItem(notification?.id) }}><Icon name="trash" style={{ color: '#f00', fontSize: 15 }} /></TouchableOpacity>
        {/* <Text style={styles.notiTime}>{moment(parseInt(item?.created_at)).format("DD MMMM, hh:mm A")}</Text> */}
    </TouchableOpacity>)
}

export default NotificationItem;

const styles = StyleSheet.create({
    notificationitem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: isIPad ? 15 : 12, paddingVertical: isIPad ? 15 : 7, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: '#eee' },
    notiInnerRow: { flexDirection: 'row', alignItems: 'center', flex: 0.78 },
    image: { width: 45, height: 45, resizeMode: 'cover', borderRadius: 40, marginRight: 10 },
    notiTime: { fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 14 : 10, color: colors.orange },
    notititle: { fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 19 : 15, color: colors.black, marginBottom: -6, width: width - 120, textTransform: 'capitalize' },
    notimessage: { fontFamily: fonts.primary, fontSize: isIPad ? 16 : 12, color: colors.grey, marginBottom: -1, width: width - 120 }, //width: width - 220
    notirowmsg: {},
    datetime: { fontFamily: fonts.primary, color: colors.orange, fontSize: 10, marginTop: 3 }
})