import { colors, fonts, width } from "../theme";
import globalstyle from "../theme/style";
// import Logo from './../../assets/images/logo.png';
// import { Svg, Circle } from 'react-native-svg';
import { SvgUri } from 'react-native-svg';

const { ImageBackground, SafeAreaView, TouchableOpacity, View, Text, Image } = require("react-native")

const Welcome = (props) => {
    return (
        <SafeAreaView style={globalstyle.fullview}>
            <ImageBackground source={require('./../../assets/images/background.png')} style={[globalstyle.authContainer, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }]}>

                {/* <View style={[globalstyle.authContainer, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }]}> */}
        
                <Image source={require('./../../assets/images/network-image.png')} style={{ width: width, height: 400, resizeMode: 'contain', marginTop: -200 }} />
                <Image source={require('./../../assets/images/logo.png')} style={{ width: 160, height: 120, resizeMode: 'contain', marginTop: -10, marginBottom: 0 }} />
                {/* <SvgUri
                    width="180"
                    height="150"
                    uri="https://service.demowebsitelinks.com/tha-network/public/images/logo.svg"
                // svgXmlData={Logo}
                /> */}
                {/* <Logo width={120} height={40} /> */}
                <View style={{ marginTop: 30 }}>
                    <Text style={{ textAlign: 'center', color: colors.black, fontFamily: fonts.primarySemiBold, fontSize: 18 }}>Have fun, keep the invites coming, build your network!!!</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>
                        <Text style={{ textAlign: 'center', flexDirection: 'row', textTransform: 'capitalize', alignItems: 'center', color: colors.grey, fontFamily: fonts.primary, fontSize: 13 }}>So what are you waiting for <Text style={{ textAlign: 'center', color: colors.black, fontFamily: fonts.primarySemiBold, fontSize: 13, textTransform: 'uppercase', }}>Join Today</Text></Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { props.navigation.navigate('RequestInvitationCode') }} style={[globalstyle.authSubmitButton, { width: '100%' }]}>
                    <Text style={globalstyle.authSubmitButtonText}>Create New Account</Text>
                </TouchableOpacity>
                <View style={globalstyle.alreadysignin}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { props.navigation.navigate('Login') }}>
                        <Text style={globalstyle.alreadyaccount}>I Already Have An Account </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

export default Welcome;