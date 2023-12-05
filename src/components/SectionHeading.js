import { StyleSheet, Text, View } from 'react-native';
import { colors, fontcolor, fonts, isRTL } from '../theme';
import Icon from 'react-native-vector-icons/Feather';

const SectionHeading = (props) => {
    return (
        <View style={styles.sectionheadrow}>
            <Text style={styles.sectionheading}>{props.title}</Text>
            {props.joined && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.joinicon}>
                    <Icon name="check" size={11} color={colors.white} />
                </View>
                <Text style={styles.joinedtext}>Joined</Text>
            </View>}
        </View>
    );
}

export default SectionHeading;

const styles = StyleSheet.create({
    sectionheading: { color: fontcolor, fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: 20, textTransform: 'capitalize', textAlign: 'left' },
    sectionheadrow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    joinicon: { marginRight: 5, backgroundColor: colors.darkblue, alignItems: 'center', justifyContent: 'center', borderRadius: 20, width: 23, height: 23, marginRight: 7 },
    joinedtext: { color: fontcolor, fontFamily: fonts.primaryBold },
})