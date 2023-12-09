import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fontSize, fonts, height, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const SelectModal = (props) => {

    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    useEffect(() => {
        setfilteredList(props.list)
    }, [props.list])

    useEffect(() => {
        // setVisiblity(visible)
        if (props.selected) {
            const filteritem = props.list.filter((item => item.id == props.selected))
            filteritem.length > 0 && setItem(filteritem[0]);
        }
        return () => {
        };
    }, [props.selected]);

    const [selectedItem, setItem] = useState(null);
    const [isVisible, setVisible] = useState(false);
    const [filteredList, setfilteredList] = useState();

    const _handleSearch = (text) => {
        if (text && text != '') {
            const newData = props.list.filter(function (item) {
                const itemData = item.title.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilteredList(newData);
        } else {
            setfilteredList(props.list);
        }
    }


    return (
        <View style={styles.centeredView}>
            <Modal
                // animationType='fade'
                statusBarTranslucent={true}
                transparent={true}
                visible={isVisible}
                onRequestClose={() => { setVisible(false); }}
            >
                <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { setVisible(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                    <View style={styles.modalbox}>
                        <Text style={[globalstyle.modaltitle, { marginBottom: 10 }]}>{props.placeholder}</Text>
                        <View style={styles.searchbar}>
                            <View style={styles.iconbox}><Icon name="search" style={styles.searchicon} /></View>
                            <TextInput
                                onChangeText={value => _handleSearch(value)}
                                placeholderTextColor={colors.placeholdercolor}
                                placeholder='Search Here...'
                                style={styles.searchinput}
                            />
                        </View>
                        <ScrollView style={{ flexGrow: 0 }}>
                            {filteredList && filteredList.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setVisible(false);
                                            setItem(item)
                                            props.onSelect(item);
                                        }}
                                        activeOpacity={0.8}
                                        style={[styles.itembox, { backgroundColor: index % 2 ? '#f7f7f7' : colors.white }]}>
                                        <Icon name={item.id == props.selected ? "check-circle" : "circle"} style={{ color: item.id == props.selected ? colors.primary : '#999', marginRight: 13, fontSize: 16 }} />
                                        <Text style={{ fontFamily: fonts.latoRegular }}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <View style={[styles.inputwithlabel, { marginBottom: 5 }]}>
                {props.label && <Text style={[globalstyle.inputlabel, { marginBottom: 10 }]}>{props.label}</Text>}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setVisible(true)
                        // handleSnapPress(1, 'country')
                        // setShowBottomSheet(true)
                    }}
                    style={{ backgroundColor: colors.white, paddingVertical: 15, borderRadius: 10, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <Text style={{ color: selectedItem ? colors.black : colors.placeholdercolor, fontFamily: fonts.latoRegular, }}>{selectedItem ? selectedItem?.title : props.placeholder}</Text>
                    <Icon name="chevron-down" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SelectModal;

const styles = StyleSheet.create({
    modalbox: { backgroundColor: colors.white, borderRadius: 7, overflow: 'hidden', maxWidth: isIPad ? '70%' : '90%', maxHeight: height / 1.3 },
    itembox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 13, paddingHorizontal: 15, },

    searchbar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f1f1', marginHorizontal: 15, borderRadius: 10, marginBottom: 13 },
    searchinput: { fontFamily: fonts.latoRegular, paddingVertical: 10, width: '84%' },
    iconbox: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    searchicon: { fontSize: fontSize + 2, color: colors.grey }
})