import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FancyMap } from "./components/FancyMap"
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import GooglePlacesInput from './components/PlaceInput';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = React.useState();
  const [hasLocation, setHasLocation] = React.useState(false);
  const [destination, setDestination] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Inneroute needs access to your location for routing purposes.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setHasLocation(true)
    })();
  }, []);

  function fetchLocation(details, data) {
    console.log(details, data)
    setDestination({ details, data })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.input}>
        <GooglePlacesInput setLocation={fetchLocation} />
      </View>
      <FancyMap styles={styles.fancyMap} currentLocation={location} destination={destination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  input: {
    zIndex: 2,
    padding: 10,
    position: "absolute",
    width: "100%",
    paddingTop: 20 + Constants.statusBarHeight
  },
  fancyMap: {
    zIndex: 1
  }
});
