import { data } from "./internalmaps.js"
import Graph from "./Graph.js"

export const makeUrisGraph = () => {
  const uris = data["UrisHall"]
  const g = new Graph()

  g.addAdjacencyMatrix(uris)
  return g
}

export const getIndoorGraph = (buildingName) => {
  if (buildingName == "UrisHall") {
    return makeUrisGraph()
  }
  else return new Graph()
}