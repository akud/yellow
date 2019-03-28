import React from 'react';
import PropTypes from 'prop-types';

import Node from './Node';
import Circle from '../../elements/components/Circle';

export default class CircleNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    color: PropTypes.string,
    radius: PropTypes.number,
  };

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
  }

  render() {
    const { color, radius, nodeId } = this.props;
    return (
      <Node nodeId={nodeId}>
        <Circle color={color} radius={radius} />
      </Node>
    );
  }
}
