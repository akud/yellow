import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import Node from './Node';
import Circle from 'elements/components/Circle';

import SimulationPropTypes from 'simulation/components/SimulationPropTypes';

export default class CircleNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    simulatedElements: SimulationPropTypes.simulatedElements,
    color: PropTypes.string,
    radius: PropTypes.number,
  };

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
  }

  constructor(props) {
    super(props);
    this.nodeRef = createRef();
  }

  render() {
    const { color, radius, nodeId, simulatedElements } = this.props;
    return (
      <Node nodeId={nodeId} ref={this.nodeRef} simulatedElements={simulatedElements}>
        <Circle color={color} radius={radius} />
      </Node>
    );
  }

  getSimulationConfig() {
    return this.nodeRef.current && this.nodeRef.current.getSimulationConfig();
  }
}
