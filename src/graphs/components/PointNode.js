import React from 'react';
import PropTypes from 'prop-types';

import Point from 'elements/components/Point';

import Node from './Node';

export default class PointNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
  };

  render() {
    const { nodeId } = this.props;
    return (
      <Node nodeId={nodeId}>
        <Point />
      </Node>
    );
  }
}
