import React from 'react';
import { StyleSheet, View } from "react-native"
import MapView, { PROVIDER_GOOGLE, PROVIDER_APPLE, Marker, Polyline } from 'react-native-maps';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 0,
		flexGrow: 1
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export const FancyMap = (props) => {
	console.log(JSON.stringify(props.destination))

	return <View style={styles.container}>
		<MapView
			provider={PROVIDER_APPLE} // remove if not using Google Maps
			style={styles.map}
			region={{
				latitude: 42.44883635260139,
				longitude: -76.4798400614183,
				latitudeDelta: 0.025,
				longitudeDelta: 0.0121,
			}}
			showsUserLocation={true}
		>
			{props.destination && <Marker
				coordinate={{ latitude: props.destination.data.geometry.location.lat, longitude: props.destination.data.geometry.location.lng }}
				name={props.destination.details.structured_formatting.main_text} />}
			<Polyline
				coordinates={[{ "latitude": 42.44673, "longitude": -76.48271 }, { "latitude": 42.44691, "longitude": -76.48272 }, { "latitude": 42.44706, "longitude": -76.48272 }, { "latitude": 42.4474, "longitude": -76.48274 }, { "latitude": 42.44755, "longitude": -76.48275 }, { "latitude": 42.44791, "longitude": -76.48277 }, { "latitude": 42.44815, "longitude": -76.48278 }, { "latitude": 42.44821, "longitude": -76.48278 }, { "latitude": 42.44851, "longitude": -76.48281 }, { "latitude": 42.44851, "longitude": -76.48281 }, { "latitude": 42.44857, "longitude": -76.4827 }, { "latitude": 42.44857, "longitude": -76.4827 }, { "latitude": 42.44867, "longitude": -76.4827 }, { "latitude": 42.4487, "longitude": -76.4827 }, { "latitude": 42.44872, "longitude": -76.48268 }, { "latitude": 42.44883, "longitude": -76.48262 }, { "latitude": 42.44908, "longitude": -76.48248 }, { "latitude": 42.44924, "longitude": -76.48239 }, { "latitude": 42.44934, "longitude": -76.48234 }, { "latitude": 42.4494, "longitude": -76.48228 }, { "latitude": 42.44941, "longitude": -76.48227 }, { "latitude": 42.44955, "longitude": -76.48215 }, { "latitude": 42.44932, "longitude": -76.48214 }, { "latitude": 42.44892, "longitude": -76.48212 }, { "latitude": 42.44892, "longitude": -76.48212 }, { "latitude": 42.44879, "longitude": -76.48225 }, { "latitude": 42.44873, "longitude": -76.4823 }, { "latitude": 42.44855, "longitude": -76.4823 }, { "latitude": 42.44855, "longitude": -76.4823 }, { "latitude": 42.44853, "longitude": -76.48225 }, { "latitude": 42.4485, "longitude": -76.4822 }, { "latitude": 42.44846, "longitude": -76.48218 }, { "latitude": 42.44843, "longitude": -76.48217 }, { "latitude": 42.4484, "longitude": -76.48216 }, { "latitude": 42.44836, "longitude": -76.48215 }, { "latitude": 42.4483, "longitude": -76.48214 }, { "latitude": 42.44828, "longitude": -76.48214 }, { "latitude": 42.44824, "longitude": -76.48214 }, { "latitude": 42.44812, "longitude": -76.48214 }, { "latitude": 42.4481, "longitude": -76.48214 }, { "latitude": 42.44803, "longitude": -76.48214 }, { "latitude": 42.44797, "longitude": -76.48215 }, { "latitude": 42.44795, "longitude": -76.48215 }, { "latitude": 42.44792, "longitude": -76.48217 }, { "latitude": 42.44788, "longitude": -76.48219 }, { "latitude": 42.44784, "longitude": -76.48223 }, { "latitude": 42.44783, "longitude": -76.48227 }, { "latitude": 42.44782, "longitude": -76.48231 }, { "latitude": 42.44782, "longitude": -76.48233 }, { "latitude": 42.44783, "longitude": -76.48238 }]}
				strokeColor="#037fc1"
				strokeWidth={3}
				lineJoin="bevel"
			// lineDashPattern={[5, 5]}
			/>
		</MapView>
	</View>
};