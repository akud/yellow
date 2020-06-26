import React from 'react';
import PropTypes from 'prop-types';

import ElementGroup from './ElementGroup';
import ElementPropTypes from './ElementPropTypes';
import Label from './Label';

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
    label: PropTypes.string,
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

  static curvatureLabelAdjustmentMultipliers = {
    '4': 0.1,
    '3': 0.075,
    '2': 0.05,
    '1': 0.01,
    '-1': 0.05,
    '-2': 0.1,
    '-3': 0.125,
    '-4': 0.15,
  }

  render() {
    const { id, from, to, color, thickness } = this.props;
    const { p1, p2 } = this.getControlPoints();
    return (
      <ElementGroup className="curve">
        { this.renderLabel() }
        <path
          d={
            `M ${from.x} ${from.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${to.x} ${to.y}`
          }
          stroke={color}
          strokeWidth={thickness}
          fill='transparent'
          data-element-id={id}
        />
      </ElementGroup>
    );
  }

  renderLabel() {
    const { label, curvature, thickness, from, to } = this.props;
    if (label) {
      const { p1, p2 } = this.getControlPoints();
      const distance = geometryUtils.distance(from, to);
      const isPositiveCurvature = parseInt(curvature) > 0;
      const midpoint = geometryUtils.midpoint(p1, p2);
      const rotation = geometryUtils.computeHorizontalIntersectionAngle(
        from,
        to
      );
      const rotationChange = isPositiveCurvature ? Math.PI / 2 : -1 * (Math.PI / 2);
      const angle = geometryUtils.normalize(rotation + rotationChange);
      const multiplier = Curve.curvatureLabelAdjustmentMultipliers[curvature];
      const adjustmentSize = (
        ( multiplier * distance ) - thickness
      );
      const position = geometryUtils.pointAwayFrom({
        base: midpoint,
        angle,
        distance: Math.max(adjustmentSize, 0),
      });

      console.log({
        curvature,
        rotation,
        angle,
        adjustmentSize,
        position,
      });

      return (
        <Label
          position={position}
          text={label}
          alignment={ isPositiveCurvature ? 'bottom' : 'top' }
          rotation={rotation}
        />
      );
    }
  }

  getControlPoints() {
    const { from, to, curvature } = this.props;

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
}

export default linkable(Curve)
