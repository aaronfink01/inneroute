import { data } from "./internalmaps.js"
import Graph from "./Graph.js"


export const getIndoorGraph = (buildingName) => {
  const buildingData = data[buildingName];
  const g = new Graph();
  g.addAdjacencyMatrix(buildingData)
  return g;
}