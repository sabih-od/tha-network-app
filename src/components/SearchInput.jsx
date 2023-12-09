import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, isRTL, width } from "../theme";
// import strings from "../localization/translation";

const SearchInput = (props) => {
    const { value, onSearch } = props;

    const [searchInput, setSearchInput] = useState(value);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 13, borderRadius: 10 }}>
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
        // <View style={{ width: width - 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginVertical: 15 }}>
        //     <TextInput
        //         placeholder={'Search Here...'}
        //         placeholderTextColor={'#777'}
        //         onChangeText={value => setSearchInput(value)}
        //         value={searchInput}
        //         style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primary, height: 42, backgroundColor: '#f7f7f7', width: width - 70, color: colors.black, fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, textAlign: isRTL ? 'right' : 'left' }}
        //     />
        //     <TouchableOpacity
        //         onPress={() => onSearch(searchInput)}
        //         style={{ width: 42, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange }}
        //     >
        //         <Icon name="search" style={{ fontSize: 18, color: colors.white }} />
        //     </TouchableOpacity>
        // </View>
    )
}

export default SearchInput;