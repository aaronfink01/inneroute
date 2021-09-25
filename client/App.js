import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FancyMap } from "./components/FancyMap"
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import GooglePlacesInput from './components/PlaceInput';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GooglePlacesInput />
      <FancyMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
    flexGrow: 1
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
