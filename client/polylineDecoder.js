export default function DecodePolyline(polyline) {
	// adapted from https://github.com/dyaaj/polyline-encoder/blob/master/PolylineEncoder.php
	let index = 0;
	let points = [];
	let lat = 0;
	let lng = 0;

	while (index < polyline.length) {
		let b;
		let shift = 0;
		let result = 0;

		do {
			b = polyline.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b > 31);

		let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
		lat += dlat;

		shift = 0;
		result = 0;

		do {
			b = polyline.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5
		} while (b > 31)
		let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
		lng += dlng;

		points.push({ latitude: lat / 100000, longitude: lng / 100000 })
	}

	return points
}