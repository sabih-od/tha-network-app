import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';
// import strings from '../../localization/translation';

const EmailBox = props => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginBottom: 10 }}>
            <View style={[globalstyle.inputbox, { backgroundColor: '#f7f7f7', width: '85%' }]}>
                <Icon color={colors.blue} name={'mail'} size={18} />
                <TextInput
                    style={globalstyle.inputfield}
                    placeholder="Email Address"
                    placeholderTextColor={colors.placeholdercolor}
                    autoCapitalize="none"
                />
            </View>
            <View style={{ width: 7 }} />
            <TouchableOpacity onPress={() => { }} style={{ width: 40, height: 40, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange }}>
                <Icon name="plus" style={{ color: colors.white }} />
            </TouchableOpacity>
        </View>
    )
}

const ReferalAndCopyLinkModal = ({ visible, handleReferalValue, setVisible }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);

    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={() => { setVisible(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setVisible(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: isIPad ? '70%' : '90%', }}>
                    <Text style={globalstyle.modaltitle}>Send Invitation</Text>
                    <Text style={globalstyle.modaldesc}>Send invitations to people to join your network or copy your profile link</Text>
                    {/* <Text style={globalstyle.modaldesc}>In order to receive Referral Payments you must include your Stripe Account information. If you do not have a Stripe Account create one and provide the information below. If this information is not provided, you will not be able to receive your referral payments.</Text> */}

                    <EmailBox />

                    <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => {
                            handleReferalValue('copy')
                        }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}>
                            <Icon name="copy" size={17} color={colors.orange} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Copy Link</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleReferalValue('send')
                        }} activeOpacity={0.6} style={globalstyle.modalbtn}>
                            <Icon name="check" size={17} color={colors.orange} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => { handleReferalValue(true) }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}><Icon name="camera" size={17} color={colors.orange} style={{ marginRight: 10 }} /><Text style={globalstyle.modalbtntext}>Camera</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleReferalValue(false) }} activeOpacity={0.6} style={globalstyle.modalbtn}><Icon name="image" size={17} color={colors.orange} style={{ marginRight: 10 }} /><Text style={globalstyle.modalbtntext}>Gallery</Text></TouchableOpacity>
                    </View> */}
                </View>
            </View>
        </Modal>
    )
}
export default ReferalAndCopyLinkModal;