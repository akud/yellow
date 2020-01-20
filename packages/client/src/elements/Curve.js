import React from 'react';
import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';
import geometryUtils from './geometry/geometry-utils';

import { wrapInLink }  from './Link';

export default class Curve extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    color: PropTypes.string,
    thickness: PropTypes.number,
    from: ElementPropTypes.position.isRequired,
    to: ElementPropTypes.position.isRequired,
    link: PropTypes.string,
    curvature: ElementPropTypes.curvature,
  };

  static defaultProps = {
    id: 'curve',
    color: '#c7c7c7',
    thickness: 1,
    link: '',
    curvature: 2,
  };

  static getAngleOfApproach(from, to, curvature) {
    const naturalAngle = geometryUtils.computeHorizontalIntersectionAngle(
      to, from
    );
    const angleModification = from.x < to.x ?
      Curve.curvatureAngles[curvature] :
      Curve.curvatureAngles[-parseInt(curvature)];
    return naturalAngle + angleModification;
  }

  static curvatureAngles = {
    '4': -Math.PI / 3,
    '3': -Math.PI / 4,
    '2': -Math.PI / 6,
    '1': -Math.PI / 12,
    '-1': Math.PI / 12,
    '-2': Math.PI / 6,
    '-3': Math.PI / 4,
    '-4': Math.PI / 3,
  }

  render() {
    const { id, from, to, color, thickness, link } = this.props;
    const { p1, p2 } = this.getControlPoints();
    return wrapInLink(
      link,
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
