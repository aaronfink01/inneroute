const express = require('express')
const https = require('https')
require("dotenv").config()

const app = express()
const port = 3000

const apiKey = process.env.API_KEY
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const doors = {
  "Physical Sciences Building": [
    [42.449682606675125, -76.48214083419506]
    // [42.450450501498565, -76.48215424523666],
    // [42.4493065722734, -76.48195576177329],
    // [42.44965587743157, -76.48085511886691]
  ],
  "Klarman Hall": [
    // [42.44909838547849, -76.48303531991415],
    // [42.449074548998766, -76.48363617647365]
  ]
}


app.get('/route', (req, res) => {
  // const start = (req.start.lat, req.start.long)
  const start = [42.449976139057476, -76.48274672771011]
  // const end = (req.end.lat, req.end.long)

  let edges = []

  for (const buildingName in doors) {
    const building = doors[buildingName]
    for (let i = 0; i < building.length; i++) {
      const coords = building[i]
      client
        .directions({
          params: {
            origin: start[0] + "," + start[1],
            destination: coords[0] + "," + coords[1],
            travelMode: "WALKING",
            key: apiKey
          }
        }).then((response) => {
          let data = response["data"]
          let legs = data["routes"][0]["legs"][0]["steps"]
          let status = data["status"]
          return {
            status: status,
            legs: legs
          }
        }).catch((e) => {
          console.log(e.response.data.error_message)
        })
    }
  }

  res.send("done")
})
