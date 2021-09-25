import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from "expo-constants"

const GooglePlacesInput = () => {
	return (
		<GooglePlacesAutocomplete
			placeholder="Search"
			query={{
				key: Constants.manifest.extra.apikey,
				language: 'en', // language of the results
			}}
			onPress={(data, details = null) => console.log(data)}
			onFail={(error) => console.error(error)}
		/>
	);
};

export default GooglePlacesInput;