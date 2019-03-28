import React from 'react';
import PropTypes from 'prop-types';
import CircleDefinition from 'elements/CircleDefinition';
import ElementPropTypes from './ElementPropTypes';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('Circle');

export default class Circle extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    radius: PropTypes.number,
    config: ElementPropTypes.config,
  }

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
  }

  componentDidMount() {
    const { config, radius } = this.props;
    if (config) {
      config.postRender(new CircleDefinition({ radius }));
    } else {
      LOGGER.warn('No element config passed for render');
    }
  }

  render() {
    const { color, radius, config } = this.props;
    if (config) {
      const { position, id } = config;
      return (
        <circle
          r={radius}
          fill={color}
          cx={position.x}
          cy={position.y}
          data-element-id={id}
        />
      );
    } else {
      return null;
    }
  }
}
