describe("FeatureGraphSpec", function() {

  function getConnectedGraph() {
    const graph = FeatureGraph();
    graph.addEdge(1,2);
    graph.addEdge(1,4);
    graph.addEdge(2,3);
    graph.addEdge(4,3);
    return graph;
  }

  function getDisconnectedGraph() {
    const graph = FeatureGraph();
    graph.addEdge(1,2);
    graph.addEdge(1,4);
    graph.addEdge(2,3);
    graph.addEdge(3,4);
    graph.addEdge(3,5);
    graph.addEdge(5,6);
    graph.addEdge(5,7);
    graph.addEdge(7,1);
    graph.addEdge(6,1);
    graph.addEdge(10,11);
    graph.addEdge(10,13);
    graph.addEdge(11,12);
    graph.addEdge(13,14);
    graph.addVertex(20);
    graph.addVertex(30);
    return graph;
  }

  it('addEdge()', function() {
    const graph = getConnectedGraph();
    expect(graph.getVertices()).to.deep.equal([1,2,3,4]);
    expect(graph.getEdges(1)).to.deep.equal([2,4]);
    expect(graph.getEdges(2)).to.deep.equal([1,3]);
    expect(graph.getEdges(3)).to.deep.equal([2,4]);
    expect(graph.getEdges(4)).to.deep.equal([1,3]);
  });

  it('removeEdge()', function() {
    const graph = getConnectedGraph();
    graph.removeEdge(3,2);
    expect(graph.getEdges(1)).to.deep.equal([2,4]);
    expect(graph.getEdges(2)).to.deep.equal([1]);
    expect(graph.getEdges(3)).to.deep.equal([4]);
    expect(graph.getEdges(4)).to.deep.equal([1,3]);
  });

  it('getSpanningTree()', function() {
    const graph = getDisconnectedGraph();
    const treeA = graph.getSpanningTree(1);
    const treeB = graph.getSpanningTree(10);

    expect(treeA.getVertices()).to.deep.equal([1,2,3,4,5,6,7]);
    expect(treeB.getVertices()).to.deep.equal([10,11,12,13,14]);
    expect(treeA.getEdges(1)).to.deep.equal([2,4,6,7]);
    expect(treeB.getEdges(10)).to.deep.equal([11,13]);
  });

  it.only('getSpanningForest()', function() {
    const forest = getDisconnectedGraph().getSpanningForest();
    expect(forest.length).to.equal(4);
    expect(forest[3].getVertices()).to.deep.equal([30]);
  });

});
