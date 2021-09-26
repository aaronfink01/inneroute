//Nodes currently stored as "lat,long" strings 
//This whole object map thingy does not work well with anything other than 
//strings unfortunately 
export default class Graph {
  constructor() {
    this.edges = {};
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }

  addUndirectedEdge(node1, node2, weight = 0) {
    this.edges[node1].push({ node: node2, weight: weight });
    this.edges[node2].push({ node: node1, weight: weight });
  }

  addDirectedEdge(node1, node2, weight, instruction = "") {
    this.edges[node1].push({ node: node2, weight: weight, instruction: instruction });
  }

  addAdjacencyMatrix(matrix) {
    // Add the nodes
    for (let i = 0; i < matrix.length; i++) {
      this.addNode(i + "")
    }

    // Add the edges
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] != null) {
          this.addDirectedEdge(i, j, 1, matrix[i][j])
        }
      }
    }
  }

  printGraph() {
    let graph = "";
    this.nodes.forEach(node => {
      graph += node + "->" + this.edges[node].map(n => n.node + "(" + n.weight + ")").join("; ") + "\n";
    });
    console.log(graph);
  }

  priority(queue) {
    let best = 0
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].distance < queue[best].distance) {
        best = i
      }
    }
    let result = queue[best]
    queue.splice(best, 1)
    return result
  }

  // Returns a list of nodes in string form where the first is start and last is end
  search(start, end) {
    let queue = [{ "distance": 0, "path": [start] }]
    while (queue.length > 0) {
      const node = this.priority(queue)
      const lastNodeInPath = node.path[node.path.length - 1]
      if (lastNodeInPath == end) {
        return node.path
      }
      for (let i = 0; i < this.edges[lastNodeInPath].length; i++) {
        const edge = this.edges[lastNodeInPath][i]
        queue.push({ "distance": node.distance + edge.weight, "path": node.path.concat([edge.node]) })
      }
    }
  }
  nodesToDescriptions(nodes, acc) {
    if (nodes.length == 1) {
      return acc
    }

    acc += this.edges[nodes[0]].find((v) => v.node == nodes[1]).instruction + " "
    nodes.shift()

    return this.nodesToDescriptions(nodes, acc)
  }
}