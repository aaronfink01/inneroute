# Inneroute Client

This is a react native client for the app Inneroute, which routes you indoors to locations within Cornell's campus.

## Building

First, make sure you've installed yarn. Next create `.env` file with your Google Maps API Key inside it, or set the enviorment variable `API_KEY` to your Google Maps API key:

```env
API_KEY=yourGoogleAPIKey
```

Then:

```sh
yarn		# install dependencies
yarn start 	# start development server
```