import React from 'react';
import PropTypes from 'prop-types';
import ElementGroup from './ElementGroup';
import ElementPropTypes from './ElementPropTypes';
import linkable from './linkable';
import Label from './Label';
import geometryUtils from './geometry/geometry-utils';

export class Line extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number,
    from: ElementPropTypes.position.isRequired,
    to: ElementPropTypes.position.isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
  };

  render() {
    const { from, to, color, thickness } = this.props;
    return (
      <ElementGroup className="line">
        { this.renderLabel() }
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={color}
          strokeWidth={thickness}
        />
      </ElementGroup>
    );
  }

  renderLabel() {
    const { label, from, to, thickness } = this.props;
    if (label) {
      const midpoint = geometryUtils.midpoint(from, to);
      return (
        <Label
          position={{
            x: midpoint.x,
            y: midpoint.y - thickness - 1,
          }}
          alignment='bottom'
          text={label}
          rotation={geometryUtils.computeHorizontalIntersectionAngle(from, to)}
        />
      );
    }
  }
}


export default linkable(Line);
