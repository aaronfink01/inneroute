import Graph from "./Graph.js"

const doors = {
  "Physical Sciences Building": [
    [42.449682606675125, -76.48214083419506],
    [42.450450501498565, -76.48215424523666],
    [42.4493065722734, -76.48195576177329],
    [42.44965587743157, -76.48085511886691]
  ],
  "Klarman Hall": [
    [42.44909838547849, -76.48303531991415],
    [42.449074548998766, -76.48363617647365]
  ]
}

//stuff we should probably just calculate once and not every single time
//idk though might be annoying to have to define all of these literally
//also don't know how to key these things 
//Currently subbing in dummy times
const between = [
  [[42.449682606675125, -76.48214083419506], [42.44909838547849, -76.48303531991415], 3],
  [[42.449682606675125, -76.48214083419506], [42.449074548998766, -76.48363617647365], 5],
  [[42.450450501498565, -76.48215424523666], [42.44909838547849, -76.48303531991415], 2],
  [[42.450450501498565, -76.48215424523666], [42.449074548998766, -76.48363617647365], 4],
  //etc. 
]

//get non constant edges given start and end
function getEdges(start, end) {
  let edges = []

  for (const buildingName in doors) {
    const building = doors[buildingName]
    for (let i = 0; i < building.length; i++) {
      const coords = building[i]
      edges.push([start, coords])
      edges.push([coords, end])
    }
  }
  return edges;
}

function toString(coord) {
  return coord[0] + "," + coord[1]
}

// Returns the list of nodes (building irrespective) from the doors array
function getNodes() {
  let nodes = []
  for (const buildingName in doors) {
    const building = doors[buildingName]
    for (let i = 0; i < building.length; i++) {
      nodes.push(toString(building[i]))
    }
  }
  return nodes;
}

// A graph between door nodes which should never change
export const getConstantGraph = () => {
  let g = new Graph();
  let nodes = getNodes();

  // Add all door nodes to the graph 
  for (let x = 0; x < nodes.length; x++) {
    g.addNode(nodes[x]);
  }

  // Add the edges between doors in different buildings
  for (let i = 0; i < between.length; i++) {
    let info = between[i];
    g.addDirectedEdge(toString(info[0]), toString(info[1]), info[2]);
  }

  // Add the edges between doors in the same building
  for (const buildingName in doors) {
    const building = doors[buildingName]
    for (let i = 0; i < building.length - 1; i++) {
      for (let j = i + 1; j < building.length; j++) {
        g.addUndirectedEdge(toString(building[i]), toString(building[j]), 0)
      }
    }
  }

  return g;
}

//Return all pairs for which we must call the api for 
//(dependent on the user start / end locations)
export const getPairs = (start, end) => {
  let pairs = [];
  for (const buildingName in doors) {
    const building = doors[buildingName]
    for (let i = 0; i < building.length; i++) {
      pairs.push([start, building[i]])
      pairs.push([building[i], end])
    }
  }
  return pairs
}