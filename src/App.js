import React, { Component } from 'react';
import Edge from './components/Edge';
import Graph from './components/Graph';
import Node from './components/Node';
import logging from '@akud/logging';

export default class App extends Component {
  constructor(props) {
    super(props);
    logging.setLevel(logging.DEBUG);
  }

  render() {
    return (
      <Graph width={1000} height={500} border={true}>
        <Node nodeId="1" />
        <Node nodeId="2" radius={20}/>
        <Node nodeId="3" />
        <Edge fromNodeId="1" toNodeId="3" distance={50} />
        <Edge fromNodeId="2" toNodeId="3" distance={150} />
      </Graph>
    );
  }
}
