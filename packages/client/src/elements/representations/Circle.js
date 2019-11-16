import React from 'react';
import PropTypes from 'prop-types';
import CircleDefinition from '../CircleDefinition';
import ElementProps from './ElementProps';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('Circle');

export default class Circle extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    radius: PropTypes.number,
    ...ElementProps.BasePropTypes
  };

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
    ...ElementProps.DefaultBaseProps
  };

  componentDidMount() {
    const { registerShape, radius } = this.props;
    registerShape(new CircleDefinition({ radius }));
  }

  render() {
    const { color, radius, position, id } = this.props;
    return (
      <circle
        r={radius}
        fill={color}
        cx={position.x}
        cy={position.y}
        data-element-id={id}
      />
    );
  }
}
