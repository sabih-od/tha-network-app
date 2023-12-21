import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors, isIPad } from '../theme';
import { UpdateMessageBadge } from '../redux/reducers/AppStateReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getSocket } from '../helpers/socket-manager';

const ChatIcon = (props) => {

  useEffect(() => {
    console.log('props.messageBadge => ', props.messageBadge);
  }, [])

  const handleIconPress = () => {
    props.UpdateMessageBadge(0)
    props.navigation.navigate('ChatChannels')
  };

  // const socket = getSocket();
  // useEffect(() => {
  //   console.log('group-message => ');
  //   socket?.on('group-message', (res) => {
  //     props.UpdateMessageBadge(props.messageBadge + 1)
  //   });
  //   return () => {
  //     // Clean up socket event listeners if needed
  //     socket?.off('group-message', (res) => {
  //       console.log('off arrival group message => ', res);
  //     });
  //   };
  // }, [socket])

  return (
    <View style={styles.container}>
      {props.messageBadge > 0 && <View style={styles.notifbadge} />}
      <TouchableOpacity activeOpacity={0.9} style={styles.iconContainer} onPress={handleIconPress}>
        <IonIcon name="chatbubbles-outline" size={isIPad ? 40 : 26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: Platform.OS === 'ios' ? 50 : 20, right: 20, zIndex: 999, },
  iconContainer: { backgroundColor: colors.orange, borderRadius: 20, width: isIPad ? 65 : 50, height: isIPad ? 65 : 50, justifyContent: 'center', alignItems: 'center', },
  notifbadge: { width: 15, height: 15, backgroundColor: colors.black, borderRadius: 10, left: 0, position: 'absolute', zIndex: 1, top: -3 }
});

const setStateToProps = (state) => ({
  messageBadge: state.appstate.messageBadge,
})
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateMessageBadge: bindActionCreators(UpdateMessageBadge, dispatch),
  }
}

export default connect(setStateToProps, mapDispatchToProps)(ChatIcon);