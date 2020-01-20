import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from '../elements/ElementPropTypes';

import SimulatedElementGroup from '../simulation/SimulatedElementGroup';

export default class Node extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    link: ElementPropTypes.link,
  };

  static defaultProps = {
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
