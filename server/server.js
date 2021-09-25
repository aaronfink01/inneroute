import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express')
const https = require('https')
require("dotenv").config()

import { getConstantGraph, getPairs } from "./util.js"

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

app.get('/route', (req, res) => {
  const start = [42.449976139057476, -76.48274672771011]
  const end = [42.448035165071644, -76.48276744033144]

  // asyncGetAllDirections(getPairs(start, end)).then((value) =>
  //   console.log(value)
  // )
  console.log(JSON.stringify(getConstantGraph()))

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

