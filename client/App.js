import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FancyMap } from "./components/FancyMap"
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Inneroute!</Text>
      <StatusBar style="auto" />
      <FancyMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
