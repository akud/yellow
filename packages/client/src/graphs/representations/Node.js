import React from 'react';
import PropTypes from 'prop-types';

import SimulatedElementGroup from '../../simulation/representations/SimulatedElementGroup';

export default class Node extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
  }

  static getPrimaryElementId(nodeId) {
    return SimulatedElementGroup.getPrimaryElementId(nodeId);
  }

  render() {
    return (
      <SimulatedElementGroup className="node" elementIdPrefix={this.props.nodeId}>
        { this.props.children }
      </SimulatedElementGroup>
    );
  }
}
