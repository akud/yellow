import React from 'react';
import PropTypes from 'prop-types';

import SimulatedElementGroup from '../simulation/SimulatedElementGroup';

export default class Node extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    link: PropTypes.string,
  };

  static defaultProps = {
    link: ''
  };

  static getPrimaryElementId(nodeId) {
    return SimulatedElementGroup.getPrimaryElementId(nodeId);
  }

  render() {
    return (
      <SimulatedElementGroup className="node" id={this.props.nodeId} link={this.props.link}>
        { this.props.children }
      </SimulatedElementGroup>
    );
  }
}
