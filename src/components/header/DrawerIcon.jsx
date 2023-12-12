import React from "react";
import { Keyboard, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { colors, fontcolor, isDarkMode } from "../../theme"

const DrawerIcon = ({ navigation }) => {
    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
            Keyboard.dismiss();
            navigation.openDrawer();
        }}
        style={[{ padding: 0, paddingLeft: 15, borderRadius: 40, overflow: 'hidden',  }]} >
        <Icon name={'align-right'} size={22} color={colors.white} />
    </TouchableOpacity >)
}

export default DrawerIcon;