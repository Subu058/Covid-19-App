/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppNavigator from './app/routing/AppNavigator';

const App: () => React$Node = () => {
  return (
    // <>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
        <AppNavigator></AppNavigator>
    //   </SafeAreaView>
    // </> 
  );
};

const styles = StyleSheet.create({
  
});

export default App;
