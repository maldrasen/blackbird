global.FeatureGraph = function() {

  const adjacencyList = {};

  function addVertex(v) {
    if (adjacencyList[v] == null) { adjacencyList[v] = []; }
  }

  function getVertices() {
    return Object.keys(adjacencyList).map(k => parseInt(k)).sort();
  }

  function getEdges(v) {
    return [...adjacencyList[v]].sort() || [];
  }

  function addEdge(a,b) {
    addVertex(a);
    addVertex(b);
    if (adjacencyList[a].includes(b) === false) { adjacencyList[a].push(b); }
    if (adjacencyList[b].includes(a) === false) { adjacencyList[b].push(a); }
  }

  function removeEdge(a,b) {
    if (adjacencyList[a] != null) { ArrayHelper.remove(adjacencyList[a],b); }
    if (adjacencyList[b] != null) { ArrayHelper.remove(adjacencyList[b],a); }
  }

  function getSpanningTree(start) {
    const tree = FeatureGraph();
    const visited = new Set();
    const queue = [start];

    tree.addVertex(start);
    visited.add(start)

    while (queue.length > 0) {
      const current = queue.shift();

      adjacencyList[current].forEach(neighbor => {
        if (visited.has(neighbor) === false) {
          visited.add(neighbor);
          tree.addEdge(current, neighbor);
          queue.push(neighbor);
        }
      });
    }

    return tree;
  }

  function getSpanningForest() {
    const notFound = getVertices();
    const trees = [];

    while (notFound.length > 0) {
      const next = notFound.shift();
      const tree = getSpanningTree(next);

      tree.getVertices().forEach(v => {
        ArrayHelper.remove(notFound,v);
      });

      trees.push(tree);
    }

    return trees;
  }

  function getBounds() {
    const floor = DungeonSystem.getDungeonFloor();
    const features = floor.getFeatures();

    let xMin = 1000;
    let yMin = 1000;
    let xMax = 0;
    let yMax = 0;

    getVertices().forEach(index => {
      const location = features[index].getLocation();

      if (location.xMin < xMin) { xMin = location.xMin; }
      if (location.xMax > xMax) { xMax = location.xMax; }
      if (location.yMin < yMin) { yMin = location.yMin; }
      if (location.yMax > yMax) { yMax = location.yMax; }
    });

    return { xMin, xMax, yMin, yMax };
  }

  return Object.freeze({
    addVertex,
    getVertices,
    getEdges,
    addEdge,
    removeEdge,
    getSpanningTree,
    getSpanningForest,
    getBounds,
  });

}
