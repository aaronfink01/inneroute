import React from 'react';
import { StyleSheet, View } from "react-native"
import MapView, { PROVIDER_GOOGLE, PROVIDER_APPLE } from 'react-native-maps';

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexGrow: 1
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export const FancyMap = () => (
	<View style={styles.container}>
		<MapView
			provider={PROVIDER_APPLE} // remove if not using Google Maps
			style={styles.map}
			region={{
				latitude: 42.44883635260139,
				longitude: -76.4798400614183,
				latitudeDelta: 0.025,
				longitudeDelta: 0.0121,
			}}
		/>
	</View>
);