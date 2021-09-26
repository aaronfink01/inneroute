import React from 'react';
import { StyleSheet, View, Alert } from "react-native"
import MapView, { PROVIDER_GOOGLE, PROVIDER_APPLE, Marker, Polyline } from 'react-native-maps';
import decodePolyline from '../polylineDecoder';

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
			{props.route && props.route.legs.map((leg, i) => leg.map((route, i) => <Polyline
				coordinates={decodePolyline(route.polyline.points)}
				strokeColor="#037fc1"
				strokeWidth={3}
				lineJoin="bevel"
				key={i}
				onPress={() => Alert.alert(leg.reduce((acc, legItem) => acc + legItem.html_instructions.replace(/(<([^>]+)>)/ig, "") + ". ", ""))}
			/>))}
			{props.route && props.route.buildings.map((bldg, key) => {
				// const flatRoutes = props.route.legs.flat()

				// const startCloseIndex = flatRoutes.map(
				// 	(val, i) => Math.sqrt(Math.pow(bldg.from.lat - val.end_location.lat, 2) + Math.pow(bldg.from.lng - val.end_location.lng, 2))
				// )


				// const endCloseIndex = flatRoutes.map(
				// 	(val, i) => Math.sqrt(Math.pow(bldg.to.lat - val.start_location.lat, 2) + Math.pow(bldg.to.lng - val.start_location.lng, 2))
				// )

				// const minIndex = (arr) => {
				// 	let smallIndex = 0
				// 	for (let i = 1; i < arr.length; i++) {
				// 		if (arr[i] < arr[smallIndex]) {
				// 			smallIndex = i
				// 		}
				// 	}

				// 	return smallIndex
				// }


				return <Polyline
					coordinates={[
						// { latitude: flatRoutes[minIndex(startCloseIndex)].end_location.latitude, longitude: flatRoutes[minIndex(startCloseIndex)].end_location.longitude },
						{ latitude: bldg.from.lat, longitude: bldg.from.lng },
						{ latitude: bldg.to.lat, longitude: bldg.to.lng },
						// { latitude: flatRoutes[minIndex(endCloseIndex)].start_location.latitude, longitude: flatRoutes[minIndex(endCloseIndex)].start_location.longitude },

					]}

					strokeColor="#00FF00"
					strokeWidth={3}
					lineJoin="bevel"
					key={key}
					lineDashPattern={[5, 5]}
					onPress={() => Alert.alert("Navigation Instructions", bldg.description)}
					tappable
				/>
			}
			)}
		</MapView>
	</View>
};