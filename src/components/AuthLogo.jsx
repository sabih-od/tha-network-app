const { View, Image } = require('react-native');

const AuthLogo = props => <View style={{ alignItems: 'center', }}>
    <Image source={require('./../../assets/images/logo.png')} style={{ width: 150, height: 120, resizeMode: 'contain' }} />
</View>

export default AuthLogo;