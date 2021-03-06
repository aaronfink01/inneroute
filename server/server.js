import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express')
require("dotenv").config()

import { getConstantGraph, getEdges, toString, sameBuilding } from "./util.js"
import { getIndoorGraph } from './indoorsNavigator.js';
import { latlongToIndex } from "./internalmaps.js"
import { between } from './betweens.js';
import Graph from "./Graph.js"

const app = express()
const port = 3000

const apiKey = process.env.API_KEY
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


function asyncGetDirections(start, end) {
  return new Promise((resolve) => {
    client
      .directions({
        params: {
          origin: start[0] + "," + start[1],
          destination: end[0] + "," + end[1],
          mode: "walking",
          key: apiKey
        }
      }).then((response) => {
        let data = response["data"]
        let legs = data["routes"][0]["legs"][0]["steps"]
        let status = data["status"]
        let duration = data["routes"][0]["legs"][0]["duration"]["text"]
        let durationFloat = parseFloat(duration.substring(0, duration.indexOf(' ')))
        let leftOver = parseFloat(data["routes"][0]["legs"][0]["duration"]["value"])
        let total = (durationFloat * 60) + leftOver
        if (status == "OK") {
          resolve({
            start: start,
            end: end,
            status: status,
            legs: legs,
            duration: total
          });
        }
        resolve(false);
      }).catch((e) => {
        resolve(false);
        console.log(e.response.data.error_message)
      })
  })
}

function asyncGetAllDirections(pairs) {
  const promises = [];
  for (let i = 0; i < pairs.length; i++) {
    promises.push(asyncGetDirections(pairs[i][0], pairs[i][1]))
  }
  return Promise.all(promises)
}

app.get("/test", (req, res) => {
  const graph = new Graph()
  graph.addNode("a")
  graph.addNode("b")
  graph.addNode("c")
  graph.addNode("d")
  graph.addNode("e")
  graph.addNode("f")
  graph.addDirectedEdge("a", "e", 1)
  graph.addDirectedEdge("e", "c", 1)
  graph.addDirectedEdge("a", "c", 3)
  graph.addDirectedEdge("c", "d", 5)
  graph.addDirectedEdge("c", "f", 2)
  graph.addDirectedEdge("f", "b", 3)
  graph.addDirectedEdge("d", "b", 4)
  console.log(graph.search("a", "b"))
  res.send("finished test")
})

app.get('/route', async (req, res) => {
  const startQuery = req.query.start
  const endQuery = req.query.end
  const start = startQuery.split(",")
  const end = endQuery.split(",")

  let legData = {}

  let g = getConstantGraph()
  g.addNode(start[0] + "," + start[1])
  g.addNode(end[0] + "," + end[1])
  const edges = getEdges(start, end)
  edges.push([start, end])
  let result = await asyncGetAllDirections(edges)

  for (let i = 0; i < between.length; i++) {
    let edgeInfo = between[i]
    legData[(toString(edgeInfo.start) + ";" + toString(edgeInfo.end))] = edgeInfo.legs
  }

  for (let i = 0; i < result.length; i++) {
    let edgeInfo = result[i]
    legData[(toString(edgeInfo.start) + ";" + toString(edgeInfo.end))] = edgeInfo.legs
    g.addDirectedEdge(toString(edgeInfo.start), toString(edgeInfo.end), edgeInfo.duration)
  }

  const path = g.search(toString(start), toString(end))

  let legs = []
  let currentLeg = []
  let buildings = []
  for (let i = 0; i < path.length - 1; i++) {
    const s = path[i]
    const e = path[i + 1]
    let buildingName = sameBuilding(s, e)

    if (buildingName != "") {
      let g = getIndoorGraph(buildingName)
      let latLongMap = latlongToIndex[buildingName]
      let nodes = g.search(latLongMap[s], latLongMap[e])

      let description = g.nodesToDescriptions(nodes, "")
      buildings.push({
        "from": { "lat": parseFloat(s.split(",")[0]), "lng": parseFloat(s.split(",")[1]) },
        "to": { "lat": parseFloat(e.split(",")[0]), "lng": parseFloat(e.split(",")[1]) },
        description
      })
      if (currentLeg.length > 0) {
        legs.push(currentLeg)
        currentLeg = []
      }
    } else {
      currentLeg = currentLeg.concat(
        legData[s + ";" + e]
      )
    }
    if (currentLeg.length > 0) {
      legs.push(currentLeg)
    }
  }

  let route = {
    legs: legs,
    buildings: buildings,
    status: "OK"
  }

  res.send(route)
})