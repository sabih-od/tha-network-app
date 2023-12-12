import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';
// import strings from '../../localization/translation';

const AlertForReferralPaymentOption = ({ visible, handleRefPaymentOpt, setVisible }) => {
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
                    <Text style={globalstyle.modaltitle}>Referral Payment Options</Text>
                    <Text style={globalstyle.modaldesc}>You Must First Add your Stripe or Paypal account information before making referrals or sharing your link.</Text>
                    {/* <Text style={globalstyle.modaldesc}>In order to receive Referral Payments you must include your Stripe Account information. If you do not have a Stripe Account create one and provide the information below. If this information is not provided, you will not be able to receive your referral payments.</Text> */}

                    <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => {
                            handleRefPaymentOpt(false)
                        }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}>
                            <Icon name="x" size={17} color={colors.orange} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleRefPaymentOpt(false)
                        }} activeOpacity={0.6} style={globalstyle.modalbtn}>
                            <Icon name="check" size={17} color={colors.orange} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => { handleRefPaymentOpt(true) }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}><Icon name="camera" size={17} color={colors.orange} style={{ marginRight: 10 }} /><Text style={globalstyle.modalbtntext}>Camera</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleRefPaymentOpt(false) }} activeOpacity={0.6} style={globalstyle.modalbtn}><Icon name="image" size={17} color={colors.orange} style={{ marginRight: 10 }} /><Text style={globalstyle.modalbtntext}>Gallery</Text></TouchableOpacity>
                    </View> */}
                </View>
            </View>
        </Modal>
    )
}
export default AlertForReferralPaymentOption;