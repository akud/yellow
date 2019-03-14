import React, { createRef } from 'react';
import RectangleDefinition from 'elements/RectangleDefinition';
import Point from 'elements/Point';
import PropTypes from 'prop-types';
import CustomPropTypes from 'components/CustomPropTypes';

import { addVectors } from 'elements/geometry-utils';

export default class Label extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    position: CustomPropTypes.position,
  }

  refCallback = element => {
    if (element) {
      const rect = element.getBoundingClientRect();
      this.setState({ width: rect.width, height: rect.height });
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
    const { position, text } = this.props;
    const { width, height } = this.state;
    if (position) {
      const x = position.x - width / 2;
      const y = position.y - height / 2;
      return <text x={x} y={y} ref={this.refCallback}>{text}</text>;
    } else {
      return null;
    }
  }

  getShapeDefinition() {
    const { width, height } = this.state;
    if (width && height) {
      return new RectangleDefinition({ width, height });
    } else {
      return new Point();
    }
  }
}
