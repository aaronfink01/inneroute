import React from 'react';
import { StyleSheet, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		// height: 400,
		// width: 400,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export const FancyMap = () => (
	<View style={styles.container}>
		<MapView
			provider={PROVIDER_GOOGLE} // remove if not using Google Maps
			style={styles.map}
			region={{
				latitude: 42.44883635260139,
				longitude: -76.4798400614183,
				latitudeDelta: 0.025,
				longitudeDelta: 0.0121,
			}}
		>
		</MapView>
	</View>
);