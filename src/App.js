import React, { Component } from 'react';

import Circle from './elements/components/Circle';
import Image from './elements/components/Image';
import Rectangle from './elements/components/Rectangle';
import Label from './elements/components/Label';
import Orientation from './elements/Orientation';

import Graph from './graphs/components/Graph';
import Node from './graphs/components/Node';
import Edge from './graphs/components/Edge';
import CircleNode from './graphs/components/CircleNode';
import ImageNode from './graphs/components/ImageNode';
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
          <Label text='Node 1' orientation={Orientation.TOP_LEFT} />
          <Circle />
        </Node>
        <CircleNode nodeId="2" radius={20}/>
        <CircleNode nodeId="3" />
        <PointNode nodeId="4" />
        <PointNode nodeId="5" />
        <Node nodeId="label-node">
          <Label text="Label Node" padding={5} border={true} />
        </Node>
        <Node nodeId="7">
          <Rectangle width={85} height={30} />
        </Node>
        <ImageNode
          nodeId='image'
          src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=457319&type=card"
          width={200}
          height={250}
        />
        <Edge fromNodeId="1" toNodeId="3" thickness={2} distance={50} directed={true} />
        <Edge fromNodeId="2" toNodeId="3" distance={150} bidirectional={true}/>
        <Edge fromNodeId="4" toNodeId="2" directed={true} />
        <Edge fromNodeId="5" toNodeId="2" directed={true} />
        <Edge fromNodeId="5" toNodeId="7" directed={true} />
        <Edge fromNodeId="7" toNodeId="2" directed={true} />
        <Edge fromNodeId="label-node" toNodeId="7" distance={120} directed={true} />
        <Edge fromNodeId="1" toNodeId="label-node" distance={120} directed={true} />
        <Edge fromNodeId="3" toNodeId="label-node" distance={120} directed={true} />
        <Edge fromNodeId="label-node" toNodeId="image" distance={350} />
        <Edge fromNodeId="image" toNodeId="1" distance={500} />
      </Graph>
    );
  }
}
