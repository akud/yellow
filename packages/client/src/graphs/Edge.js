import React from 'react';
import PropTypes from 'prop-types';

import geometryUtils from '../elements/geometry/geometry-utils';

import Node from './Node';

import SimulatedLink from '../simulation/SimulatedLink';

import ElementPropTypes from '../elements/ElementPropTypes';
import ElementGroup from '../elements/ElementGroup';
import Curve from '../elements/Curve';
import Line from '../elements/Line';
import Arrow from '../elements/Arrow';


export default class Edge extends React.Component {

  static propTypes = {
    fromNodeId: PropTypes.string.isRequired,
    toNodeId: PropTypes.string.isRequired,
    color: PropTypes.string,
    thickness: PropTypes.number,
    distance: PropTypes.number,
    directed: PropTypes.bool,
    bidirectional: PropTypes.bool,
    bindingStrength: PropTypes.number,
    curvature: ElementPropTypes.curvature,
  }

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
    distance: 100,
    directed: false,
    bidirectional: false,
    bindingStrength: 1.0,
  }

  render() {
    const {
      color,
      thickness,
      distance,
      bindingStrength,
      directed,
      bidirectional,
      curvature
    } = this.props;

    const fromElementId = this.getFromElementId();
    const toElementId = this.getToElementId();

    return (
      <SimulatedLink
        fromElementId={fromElementId}
        toElementId={toElementId}
        distance={distance}
        bindingStrength={bindingStrength}
        render={(sourcePosition, targetPosition) => (
          <ElementGroup
            className="edge"
            data-from-element-id={fromElementId}
            data-to-element-id={toElementId}
          >
            {
              bidirectional &&
                <Arrow
                  to={sourcePosition}
                  color={color}
                  thickness={thickness}
                  angle={
                    this.computeAngle(targetPosition, sourcePosition)
                  }
                />
            }
            {
              curvature ?
                <Curve
                  from={sourcePosition}
                  to={targetPosition}
                  color={color}
                  thickness={thickness}
                  curvature={curvature}
                /> :
                <Line
                  from={sourcePosition}
                  to={targetPosition}
                  color={color}
                  thickness={thickness}
                />
            }
            {
              (bidirectional || directed) &&
                <Arrow
                  to={targetPosition}
                  color={color}
                  thickness={thickness}
                  angle={
                    this.computeAngle(sourcePosition, targetPosition)
                  }
                />
            }
          </ElementGroup>
        )}
      />
    );
  }

  getFromElementId() {
    return Node.getPrimaryElementId(this.props.fromNodeId);
  }

  getToElementId() {
    return Node.getPrimaryElementId(this.props.toNodeId);
  }

  computeAngle(p1, p2) {
    if (this.props.curvature) {
      return Curve.getAngleOfApproach(p1, p2, this.props.curvature);
    } else {
      return geometryUtils.computeHorizontalIntersectionAngle(
        p1, p2
      );
    }
  }
}
