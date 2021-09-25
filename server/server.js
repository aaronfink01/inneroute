import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express')
const https = require('https')
require("dotenv").config()

import { getConstantGraph, getEdges, toString, sameBuilding } from "./util.js"

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
        let duration_float = parseFloat(duration.substring(0, duration.indexOf(' ')))
        if (status == "OK") {
          resolve({
            start: start,
            end: end,
            status: status,
            legs: legs,
            duration: duration_float
          });
        }
        resolve(false);
      }).catch((e) => {
        resolve(false);
        console.log(e.response.data.error_message)
      })
  })
}

//Can only deal with lat long pairs
//Need to eventually provide functionality to
//detect if something is a placeid instead
//and convert placeid to lat long len 2 array 
function asyncGetAllDirections(pairs) {
  const promises = [];
  for (let i = 0; i < pairs.length; i++) {
    promises.push(asyncGetDirections(pairs[i][0], pairs[i][1]))
  }
  return Promise.all(promises)
}

app.get('/route', async (req, res) => {
  const start = [42.449976139057476, -76.48274672771011]
  const end = [42.448035165071644, -76.48276744033144]

  let g = getConstantGraph()
  g.addNode(start[0] + "," + start[1])
  g.addNode(end[0] + "," + end[1])
  const edges = getEdges(start, end)
  edges.push([start, end])
  let result = await asyncGetAllDirections(edges)

  for (let i = 0; i < result.length; i++) {
    let edgeInfo = result[i]
    g.addDirectedEdge(toString(edgeInfo.start), toString(edgeInfo.end), edgeInfo.duration)
  }

  const path = g.search(toString(start), toString(end))

  let legs = []
  let currentLeg = []
  let buildings = []
  for (let i = 0; i < path.length - 1; i++) {
    const s = path[i]
    const e = path[i + 1]
    if (sameBuilding(s, e)) {
      buildings.push({
        "from": { "lat": parseFloat(s.split(",")[0]), "lng": parseFloat(s.split(",")[1]) },
        "to": { "lat": parseFloat(e.split(",")[0]), "lng": parseFloat(e.split(",")[1]) }
      })
      if (currentLeg.length > 0) {
        legs.push(currentLeg)
        currentLeg = []
      }
    } else {
      currentLeg.push({

      })
    }
  }



  // const start = (req["start"][0], req["start"][1])
  // const end = (req["end"][0], req["end"][1])

  //stuff in between our predefined points that never changes
  // let g = getConstantGraph();
  // g.printGraph();

  //To implement: 
  //Get constant portion of graph 
  //Retrieve and store non constant times using Promise + add edges to graph 
  //  Probably want some way of storing the actual legs so we don't have to
  //  duplicate fetches 
  //Graph search / Dijkstra (?) shortest path 
  // Retrieve node paths 
  // For each node, extract lat long from string 
  // If weight on graph is 0, add node to a list of our nodes 
  // If weight on graph is not 0, it is a gmaps returned object 

  res.send("done")
})

