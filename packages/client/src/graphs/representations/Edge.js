import geometryUtils from '../../elements/geometry-utils';
import PropTypes from 'prop-types';
import React from 'react';

import Node from './Node';

import ElementGroup from '../../elements/representations/ElementGroup';
import Line from '../../elements/representations/Line';
import Arrow from '../../elements/representations/Arrow';

import SimulationContext from '../../simulation/representations/SimulationContext';
import { createLinkingRule } from '../../simulation/LinkingRule';

let edgeIdSequence = 0;

export default class Edge extends React.Component {
  static contextType = SimulationContext;

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

  constructor(props) {
    super(props);
    this.ruleId = 'edge-rule-' + (++edgeIdSequence);
  }

  componentDidMount() {
    const { distance, bindingStrength } = this.props;
    const simulation = this.context;
    simulation.registerRule(
      this.ruleId,
      createLinkingRule({
        between: [
          this.getFromElementId(),
          this.getToElementId(),
        ],
        distance: distance,
        strength: bindingStrength,
      })
    );
  }

  render() {
    const {
      color,
      thickness,
      directed,
      bidirectional,
    } = this.props;

    const sourcePosition = this.getSourcePosition();
    const targetPosition = this.getTargetPosition();

    const fromElementId = this.getFromElementId();
    const toElementId = this.getToElementId();

    return (
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
    );
  }

  getSourcePosition() {
    const simulation = this.context;
    const fromElementId = this.getFromElementId();
    const toElementId = this.getToElementId();

    const sourceNodeCenter = simulation.getElementData(fromElementId).position;
    const targetNodeCenter = simulation.getElementData(toElementId).position;
    const sourceNodeShape = simulation.getElementData(fromElementId).shape;

    return sourceNodeShape.computeIntersectionWithRay(sourceNodeCenter, targetNodeCenter);
  }

  getTargetPosition() {
    const simulation = this.context;
    const fromElementId = this.getFromElementId();
    const toElementId = this.getToElementId();

    const sourceNodeCenter = simulation.getElementData(fromElementId).position;
    const targetNodeCenter = simulation.getElementData(toElementId).position;
    const targetNodeShape = simulation.getElementData(toElementId).shape;

    return targetNodeShape.computeIntersectionWithRay(targetNodeCenter, sourceNodeCenter);
  }

  getFromElementId() {
    return Node.getPrimaryElementId(this.props.fromNodeId);
  }

  getToElementId() {
    return Node.getPrimaryElementId(this.props.toNodeId);
  }
}
