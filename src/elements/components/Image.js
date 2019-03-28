import React from 'react';
import RectangleDefinition from 'elements/RectangleDefinition';
import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('Image');

export default class Image extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    config: ElementPropTypes.config,
  }

  componentDidMount() {
    const { config, width, height } = this.props;
    if (config) {
      config.postRender(new RectangleDefinition({ width, height }));
    } else {
      LOGGER.warn('No element config specified for render');
    }
  }

  render() {
    const { src, config, width, height } = this.props;

    if (config) {
      const { position, id } = config;
      const x = position.x - width / 2;
      const y = position.y - height / 2;
      return (
        <image
          x={x}
          y={y}
          width={width}
          height={height}
          href={src}
          data-element-id={id}
        />
      );
    } else {
      return null;
    }
  }
}


