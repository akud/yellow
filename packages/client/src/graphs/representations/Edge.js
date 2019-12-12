import React from 'react';
import PropTypes from 'prop-types';

import geometryUtils from '../../elements/geometry-utils';

import Node from './Node';

import SimulatedLink from '../../simulation/representations/SimulatedLink';

import ElementGroup from '../../elements/representations/ElementGroup';
import Line from '../../elements/representations/Line';
import Arrow from '../../elements/representations/Arrow';


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
                    geometryUtils.computeHorizontalIntersectionAngle(
                      targetPosition, sourcePosition
                    )
                  }
                />
            }
            <Line
              from={sourcePosition}
              to={targetPosition}
              color={color}
              thickness={thickness}
            />
            {
              (bidirectional || directed) &&
                <Arrow
                  to={targetPosition}
                  color={color}
                  thickness={thickness}
                  angle={
                    geometryUtils.computeHorizontalIntersectionAngle(
                      sourcePosition, targetPosition
                    )
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
}
