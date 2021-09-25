import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from "expo-constants"
import { StyleSheet } from "react-native"

const GooglePlacesInput = (props) => {
	return (
		<GooglePlacesAutocomplete
			placeholder="Search"
			query={{
				key: Constants.manifest.extra.apikey,
				language: 'en', // language of the results
			}}
			onPress={(data, details) => props.setLocation(data, details)}
			onFail={(error) => console.error(error)}
			styles={styles.input}
			fetchDetails
		/>
	);
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
	input: {
		// zIndex: 2,
		// padding: 10,
		// position: "absolute",
		// width: "100%",
		// paddingTop: 20 + Constants.statusBarHeight
	}
});
