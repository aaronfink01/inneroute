const express = require('express')
const https = require('https')

const app = express()
const port = 3000

const apiKey = "AIzaSyCOnl00PN60bc6Z5uq8UwuZDtoA6chzMnY"

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

  // start to everything
  for (const buildingName in doors) {
    const building = doors[buildingName]
    for (let i = 0; i < building.length; i++) {
      const coords = building[i]
      url = "https://maps/googleapis.com/maps/api/directions/json?origin=" + start[0] + "," + start[1] + "&destination=" + coords[0] + "," + coords[1] + "&mode=walking&key=" + apiKey
      let xhr = new XMLHttpRequest()
      xhr.open("GET", url)
      xhr.send()
      xhr.onload = function () {
        console.log(xhr.response)
      }
    }
  }

  res.send("done")
})