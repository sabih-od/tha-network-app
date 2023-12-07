/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import { colors, IOS, isDarkMode, isIPad } from './src/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Navigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/helpers/toastConfig';
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';


function App() {
  const isDarkMode = useColorScheme() === 'dark';


  const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  };
  useEffect(() => {

    // connectToRemoteDebugger();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle={!isDarkMode ? 'dark-content' : 'light-content'}
          // backgroundColor={colors.orange} // transparent
          // StatusBarStyle={'dark-content'}
          backgroundColor={isDarkMode ? colors.black : colors.white}
        // translucent={true}
        />
        <Navigation />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}

export default App;
