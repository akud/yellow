import React, { Component } from 'react';

import Circle from './elements/components/Circle';
import Rectangle from './elements/components/Rectangle';

import Graph from './graphs/components/Graph';
import Node from './graphs/components/Node';
import Edge from './graphs/components/Edge';
import CircleNode from './graphs/components/CircleNode';
import PointNode from './graphs/components/PointNode';

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
        <Node nodeId="7">
          <Rectangle width={85} height={30} />
        </Node>
        <Edge fromNodeId="1" toNodeId="3" thickness={2} distance={50} directed={true} />
        <Edge fromNodeId="2" toNodeId="3" distance={150} bidirectional={true}/>
        <Edge fromNodeId="4" toNodeId="2" directed={true} />
        <Edge fromNodeId="5" toNodeId="2" directed={true} />
        <Edge fromNodeId="6" toNodeId="7" directed={true} />
        <Edge fromNodeId="5" toNodeId="7" directed={true} />
        <Edge fromNodeId="7" toNodeId="2" directed={true} />
      </Graph>
    );
  }
}
