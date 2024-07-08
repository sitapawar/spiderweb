import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Graph } from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import louvain from 'graphology-communities-louvain';

const GraphComponent = ({ nodes, links }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    // using graphology to do this, so we make a graph using it that takes in the nodes from the data
    const graph = new Graph();
    nodes.forEach(node => graph.addNode(node.id, { ...node }));
    links.forEach(link => graph.addEdge(link.source, link.target));

    // this does the community detection from the louvain algorithm
    const communities = louvain.assign(graph);
    graph.forEachNode((node, attr) => {
      attr.community = communities[node];
    });

    // this does the force layout method, we can play with the settings
    forceAtlas2.assign(graph, {
      iterations: 200,
      settings: { gravity: 1, scalingRatio: 2 },
    });
    // these are some standard node visual settings
    const svg = d3.select(svgRef.current)
                  .attr('width', width)
                  .attr('height', height);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const link = svg.append('g')
                    .selectAll('line')
                    .data(links)
                    .enter().append('line')
                    .attr('stroke-width', 1)
                    .attr('stroke', '#999');

    const node = svg.append('g')
                    .selectAll('circle')
                    .data(nodes)
                    .enter().append('circle')
                    .attr('r', 5)
                    .attr('fill', d => color(graph.getNodeAttribute(d.id, 'community')))
                    .call(d3.drag()
                          .on('start', dragstarted)
                          .on('drag', dragged)
                          .on('end', dragended));

    node.append('title').text(d => d.id);

    graph.forEachNode((node, attr) => {
      d3.select(`[data-node-id="${node}"]`).datum(attr);
    });

    function ticked() {
      link.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

      node.attr('cx', d => d.x)
          .attr('cy', d => d.y);
    }

    const simulation = d3.forceSimulation(nodes)
                         .force('link', d3.forceLink(links).id(d => d.id).distance(100))
                         .force('charge', d3.forceManyBody().strength(-50))
                         .force('center', d3.forceCenter(width / 2, height / 2))
                         .on('tick', ticked);

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [nodes, links]);

  return <svg ref={svgRef}></svg>;
};

export default GraphComponent;


