import React from 'react';
import RectangleDefinition from 'elements/RectangleDefinition';
import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('Label');

export default class Label extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    padding: PropTypes.number,
    border: PropTypes.bool,
    config: ElementPropTypes.config,
  }

  static defaultProps = {
    padding: 0,
    border: false,
  }

  refCallback = element => {
    if (element) {
      const { config, padding } = this.props;
      const rect = element.getBoundingClientRect();
      this.setState({ width: rect.width, height: rect.height });
      if (config) {
        config.postRender(new RectangleDefinition({
          width: rect.width + padding,
          height: rect.height + padding,
        }));
      } else {
        LOGGER.warn('No element config passed for render');
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  render() {
    const { border, config, text, padding } = this.props;
    const { width, height } = this.state;
    if (config) {
      const { position, id } = config;
      const x = position.x - width / 2;
      const y = position.y + height / 4;
      return (
        <g className="label" data-element-id={id}>
          { border && this.renderBorder({ position, width, height, padding }) }
          <text x={x} y={y} ref={this.refCallback}>{text}</text>
        </g>
      );
    } else {
      return <text ref={this.refCallback}>{text}</text>;
    }
  }

  renderBorder({ position, width, height, padding }) {
    width = width + padding;
    height = height + padding;
    const x = position.x - width / 2;
    const y = position.y - height / 2;
    return <rect x={x} y={y} width={width} height={height} stroke="black" fillOpacity={0} />;
  }
}
