import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FancyMap } from "./components/FancyMap"
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import GooglePlacesInput from './components/PlaceInput';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';

const makeurl = ([originLat, originLng], [destLat, destLng]) => (
  `https://3cd6-128-84-126-139.ngrok.io/route?start=${originLat},${originLng}&end=${destLat},${destLng}`
)

export default function App() {
  const [destination, setDestination] = React.useState(null);
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Inneroute needs access to your location for routing purposes.');
        return;
      }
    })();
  }, []);

  const fetchLocation = async (details, data) => {
    setDestination({ details, data })
    setLoading(true)

    let location = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Low
    });

    let url = makeurl(
      [location.coords.latitude, location.coords.longitude],
      [data.geometry.location.lat, data.geometry.location.lng]
    )

    const result = await fetch(url)
    const json = await result.json();

    setData(json)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.input}>
        <GooglePlacesInput setLocation={fetchLocation} />
      </View>
      <FancyMap styles={styles.fancyMap} destination={destination} route={data} />
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
