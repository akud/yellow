import React from 'react';
import RectangleDefinition from 'elements/RectangleDefinition';
import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('Rectangle');

export default class Rectangle extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    config: ElementPropTypes.config,
  }

  static defaultProps = {
    color: '#4286f4',
    width: 10,
    height: 10
  }

  componentDidMount() {
    const { config, width, height } = this.props;
    if (config) {
      config.postRender(new RectangleDefinition({ width, height }));
    } else {
      LOGGER.warn('No element config passed for render');
    }
  }

  render() {
    const { color, config, width, height } = this.props;
    if (config) {
      const { position, id } = config;
      const cornerX = position.x - width / 2;
      const cornerY = position.y - height / 2;
      return <rect
        x={cornerX}
        y={cornerY}
        fill={color}
        width={width}
        height={height}
        data-element-id={id}
      />;
    } else {
      return null;
    }
  }
}
