import React from 'react';
import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';
import geometryUtils from './geometry/geometry-utils';

import linkable from './linkable'

export class Curve extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    color: PropTypes.string,
    thickness: PropTypes.number,
    from: ElementPropTypes.position.isRequired,
    to: ElementPropTypes.position.isRequired,
    curvature: ElementPropTypes.curvature,
  };

  static defaultProps = {
    id: 'curve',
    color: '#c7c7c7',
    thickness: 1,
    curvature: 2,
  };

  static getAngleOfApproach(from, to, curvature) {
    const naturalAngle = geometryUtils.computeHorizontalIntersectionAngle(
      to, from
    );
    const angleModification = from.x < to.x ?
      Curve.curvatureAngles[curvature] :
      Curve.curvatureAngles[-parseInt(curvature)];
    return geometryUtils.normalize(naturalAngle + angleModification);
  }

  static computeControlPoints(from, to, curvature) {
    const distance = geometryUtils.distance(from, to) / 2;
    return {
      p1: geometryUtils.pointAwayFrom({
        base: from,
        angle: Curve.getAngleOfApproach(to, from, curvature),
        distance,
      }),
      p2: geometryUtils.pointAwayFrom({
        base: to,
        angle: Curve.getAngleOfApproach(from, to, curvature),
        distance,
      }),
    };
  }

  static curvatureAngles = {
    '4': Math.PI / 3,
    '3': Math.PI / 4,
    '2': Math.PI / 6,
    '1': Math.PI / 12,
    '-1': -Math.PI / 12,
    '-2': -Math.PI / 6,
    '-3': -Math.PI / 4,
    '-4': -Math.PI / 3,
  }

  render() {
    const { id, from, to, color, thickness } = this.props;
    const { p1, p2 } = this.getControlPoints();
    return (
      <path
        d={
          `M ${from.x} ${from.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${to.x} ${to.y}`
        }
        stroke={color}
        strokeWidth={thickness}
        fill='transparent'
        data-element-id={id}
      />
    );
  }

  getControlPoints() {
    const { from, to, curvature } = this.props;
    return Curve.computeControlPoints(from, to, curvature);
  }
}

export default linkable(Curve)
