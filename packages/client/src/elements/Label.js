import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from './ElementPropTypes';
import monitored from './monitored';
import linkable from './linkable';
import geometryUtils from  './geometry/geometry-utils';

export class Label extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    position: ElementPropTypes.position.isRequired,
    alignment: PropTypes.oneOf(['center', 'bottom', 'top']),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    shapeRef: PropTypes.object,
    rotation: PropTypes.number,
  };

  static defaultProps = {
    alignment: 'center',
  };

  render() {
    const { shapeRef, position, text, rotation } = this.props;
    const { x, y } = this.computeSvgPosition();
    const props = { x, y, ref: shapeRef || React.createRef() };
    if (rotation) {
      props['transform'] = `rotate(` +
        `${geometryUtils.radiansToDegrees(rotation)} ${position.x} ${position.y}` +
        `)`;
    }
    return <text {...props}>{text}</text>;
  }

  computeSvgPosition() {
    const { position, alignment, width, height } = this.props;
    if (alignment === 'center') {
      return {
        x: position.x - width / 2,
        y: position.y + height / 4,
      };
    } else if (alignment === 'bottom') {
      return {
        x: position.x - width / 2,
        y: position.y,
      };
    } else if (alignment === 'top') {
      return {
        x: position.x - width / 2,
        y: position.y + height,
      };
    } else {
      throw new Error('Unrecognized alignment option ' + alignment);
    }

  }
}

export default monitored(linkable(Label));
