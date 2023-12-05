import { colors, fonts } from "../theme";
import globalstyle from "../theme/style";

const { ImageBackground, SafeAreaView, TouchableOpacity, View, Text, Image } = require("react-native")

const Welcome = (props) => {
    return (
        <SafeAreaView style={globalstyle.fullview}>
            <ImageBackground source={require('./../../assets/images/background.png')} style={[globalstyle.authContainer, { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }]}>
                <Image source={require('./../../assets/images/logo.png')} />
                <View style={{ marginTop: 30 }}>
                    <Text style={{ textAlign: 'center', color: colors.black, fontFamily: fonts.primaryMedium, fontSize: 18 }}>Have fun, keep the invites coming, build your network!!!</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>
                        <Text style={{ textAlign: 'center', flexDirection: 'row', textTransform: 'capitalize', alignItems: 'center', color: colors.black, fontFamily: fonts.primary, fontSize: 12 }}>So what are you waiting for <Text style={{ textAlign: 'center', color: colors.black, fontFamily: fonts.primaryMedium, fontSize: 12, textTransform: 'uppercase', }}>Join Today</Text></Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { props.navigation.navigate('Register') }} style={[globalstyle.authSubmitButton, { width: '100%' }]}>
                    <Text style={globalstyle.authSubmitButtonText}>Create New Account</Text>
                </TouchableOpacity>
                <View style={globalstyle.alreadysignin}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { props.navigation.navigate('Login') }}>
                        <Text style={globalstyle.alreadyaccount}>I Already Have An Account </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Welcome;