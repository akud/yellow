import React, { Component } from 'react';
import Edge from './components/Edge';
import Circle from './components/shapes/Circle';
import CircleNode from './components/nodes/CircleNode';
import PointNode from './components/nodes/PointNode';

import Graph from './components/Graph';
import Node from './components/nodes/Node';
import logging from '@akud/logging';

export default class App extends Component {
  constructor(props) {
    super(props);
    logging.setLevel(logging.DEBUG);
  }

  render() {
    return (
      <Graph width={1000} height={500} border={true} zoom={1.0}>
        <Node nodeId="1">
          <Circle />
        </Node>
        <CircleNode nodeId="2" radius={20}/>
        <CircleNode nodeId="3" />
        <PointNode nodeId="4" />
        <PointNode nodeId="5" />
        <PointNode nodeId="6" />
        <Edge fromNodeId="1" toNodeId="3" thickness={2} distance={50} directed={true} />
        <Edge fromNodeId="2" toNodeId="3" distance={150} bidirectional={true}/>
        <Edge fromNodeId="4" toNodeId="2" directed={true} />
        <Edge fromNodeId="5" toNodeId="2" directed={true} />
        <Edge fromNodeId="6" toNodeId="2" directed={true} />
      </Graph>
    );
  }
}
