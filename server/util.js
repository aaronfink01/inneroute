import Graph from "./Graph.js"

import { between } from "./betweens.js"

const doors = {
  // "Physical Sciences Building": [
  //   [42.449682606675125, -76.48214083419506],
  //   [42.450450501498565, -76.48215424523666],
  //   [42.4493065722734, -76.48195576177329],
  //   [42.44965587743157, -76.48085511886691]
  // ],
  // "KlarmanHall": [
  //   [42.44909838547849, -76.48303531991415],
  //   [42.449074548998766, -76.48363617647365]
  // ],
  "UrisHall": [
    [42.44739113622921, -76.48193314453428],
    [42.44700992562832, -76.48221781037817],
    [42.44742622033418, -76.48220070314869]
  ],
  "Duffield": [
    [42.445003621053395, -76.48238232724367],
    [42.444902868782734, -76.48292944695994],
    [42.44441567672523, -76.48279201104828],
    [42.444390048568074, -76.4827731991422],
    [42.44449196425085, -76.48190850370958],
    [42.44452709657613, -76.48188503438222],
    [42.444608968177036, -76.48162390067553],
    [42.445050127769775, -76.48225666354386],
    [42.44401293742597, -76.4829223613867],
    [42.44406388601698, -76.48252490164128],
    [42.444166518123694, -76.48220322942626],
    [42.444037722212414, -76.48187469404823],
    [42.443544079159324, -76.48188813502219],
    [42.44356665572746, -76.48134816944994]
  ],
  "Statler": [
    [42.44670545033039, -76.48207251253336],
    [42.445623262398286, -76.48168337091782],
    [42.44576361346584, -76.48162980916125],
    [42.445281620850025, -76.48218639444269],
    [42.44562353717044, -76.48242370006373]

  ]
}

export const sameBuilding = (start, end) => {
  for (const buildingName in doors) {
    const building = doors[buildingName]
    for (let i = 0; i < building; i++) {
      if (toString(building[i]) == start || toString(building[i]) == end) {
        for (let j = i + 1; j < building; j++) {
          if (toString(building[i]) == start || toString(building[i]) == end) {
            return buildingName
          }
        }
        return ""
      }
    }
  }
}

//get non constant edges given start and end
export const getEdges = (start, end) => {
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

export const toString = (coord) => {
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
    g.addDirectedEdge(toString(info.start), toString(info.end), info.duration);
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