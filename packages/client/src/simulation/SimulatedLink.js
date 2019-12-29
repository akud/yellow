import PropTypes from 'prop-types';
import React from 'react';

import SimulationContext from './SimulationContext';
import { createLinkingRule } from './force/LinkingRule';

let ruleIdSequence = 0;

export default class SimulatedLink extends React.Component {
  static contextType = SimulationContext;

  static propTypes = {
    render: PropTypes.func.isRequired,
    fromElementId: PropTypes.string.isRequired,
    toElementId: PropTypes.string.isRequired,
    distance: PropTypes.number,
    bindingStrength: PropTypes.number,
  }

  static defaultProps = {
    render: (fromElementId, toElementId) => null,
    distance: 100,
    bindingStrength: 1.0,
  }

  constructor(props) {
    super(props);
    this.ruleId = 'link-rule-' + (++ruleIdSequence);
  }

  componentDidMount() {
    const {
      fromElementId,
      toElementId,
      distance,
      bindingStrength
    } = this.props;
    const simulation = this.context;
    simulation.registerRule(
      this.ruleId,
      createLinkingRule({
        between: [
          fromElementId,
          toElementId,
        ],
        distance: distance,
        strength: bindingStrength,
      })
    );
  }

  render() {
    const sourcePosition = this.getSourcePosition();
    const targetPosition = this.getTargetPosition();

    return this.props.render(sourcePosition, targetPosition);
  }

  getSourcePosition() {
    const simulation = this.context;
    const { fromElementId, toElementId } = this.props;

    const sourceElementCenter = simulation.getElementData(fromElementId).position;
    const targetElementCenter = simulation.getElementData(toElementId).position;
    const sourceElementShape = simulation.getElementData(fromElementId).shape;

    return sourceElementShape.computeIntersectionWithRay(sourceElementCenter, targetElementCenter);
  }

  getTargetPosition() {
    const simulation = this.context;
    const { fromElementId, toElementId } = this.props;

    const sourceElementCenter = simulation.getElementData(fromElementId).position;
    const targetElementCenter = simulation.getElementData(toElementId).position;
    const targetElementShape = simulation.getElementData(toElementId).shape;

    return targetElementShape.computeIntersectionWithRay(targetElementCenter, sourceElementCenter);
  }
}
