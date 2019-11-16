import geometryUtils from '../geometry-utils';
import React from 'react';
import PropTypes from 'prop-types';

import ElementProps from './ElementProps';

export default class Arrow extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number,
    angle: PropTypes.number,
    ...ElementProps.BasePropTypes
  };

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
    angle: 0,
    ...ElementProps.DefaultBaseProps
  };

  render() {
    const { position, color, thickness, angle } = this.props;
    const angleInDegrees = geometryUtils.radiansToDegrees(angle);
    return (
      <path
        d={`M${position.x} ${position.y} l -10 -5 z l -10 5 z`}
        stroke={color}
        strokeWidth={thickness}
        transform={`rotate(${angleInDegrees} ${position.x} ${position.y})`}
      />
    );
  }
};
