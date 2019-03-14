import PropTypes from 'prop-types';
import React from 'react';

import Point from 'elements/Point';

import SimulationConfig from 'simulation/SimulationConfig';

export default class PointNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
  };

  render() {
    return null;
  }

  getSimulationConfig() {
    const elementId = this.props.nodeId;
    const elementShapes = {};
    elementShapes[elementId] = new Point();

    return new SimulationConfig({
      elementIds: [ elementId ],
      elementShapes,
    });
  }
}
