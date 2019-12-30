import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from '../elements/ElementPropTypes';
import WindowContext from '../elements/WindowContext';

import SimulationContext from './SimulationContext';

import Orientation from './Orientation';

import {
  createDirectionalRule,
  createPositioningRule,
  createUniversalPositioningRule,
  createOrientingRule,
} from './force/PositioningRules';

import {
  createBindingRule,
  createLinkingRule,
} from './force/LinkingRules';

let ruleIdSequence = 0;

class RuleComponent extends React.Component {
  static contextType = SimulationContext;

  constructor(props) {
    super(props);
    this.ruleId = 'component-rule-' + (++ruleIdSequence);
  }

  componentDidMount() {
    const simulation = this.context;
    simulation.registerRule(
      this.ruleId, this.createRule()
    );
  }

  render() {
    return null;
  }

  createRule() {
    throw new Error('Subclasses must implement createRule()');
  }
}

/**
 * Register a rule that pushes elements in a direction
 *
 * elementIds - array of element ids to apply the rule to
 * orientation - Orientation determining the direction to push elements in. e.g. Orientation.TOP_LEFT
 * strength - rule strength
 */
export class DirectionalRule extends RuleComponent {
  static propTypes = {
    elementIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    orientation: PropTypes.oneOf(Object.values(Orientation)).isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createDirectionalRule(Object.assign({}, this.props));
  }
}

/**
 * Register a rule that pushes elements towards a position
 *
 * elementIds - array of element ids to apply the rule to
 * position - position to push the elements towards
 * strength - rule strength
 */
export class PositioningRule extends RuleComponent {
  static propTypes = {
    elementIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    position: ElementPropTypes.position.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createPositioningRule(Object.assign({}, this.props));
  }
}

/**
 * Register a rule that pushes all elements towards a position
 *
 * position - position to push the elements towards
 * strength - rule strength
 */
export class UniversalPositioningRule extends RuleComponent {
  static propTypes = {
    position: ElementPropTypes.position.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createUniversalPositioningRule(Object.assign({}, this.props));
  }
}

/**
 * Register a rule that pushes all elements towards the current center of the display window
 *
 * strength - rule strength
 */
export class CenteringRule extends React.Component {
  static propTypes = {
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  render() {
    const { strength } = this.props;
    return (
      <WindowContext.Consumer>
        { ({center}) => <UniversalPositioningRule position={center} strength={strength} /> }
      </WindowContext.Consumer>
    );
  }
}

/**
 * Register a rule that positions one element releative to another
 *
 * baseElementId - element id to use as the base element, which will not be pushed
 * targetElementId - element id to use as the target element, which will pushed
 * orientation - Orientation determining the desired positioning. e.g. Orientation.TOP_LEFT
 * strength - rule strength
 */
export class OrientingRule extends RuleComponent {
  static propTypes = {
    baseElementId: PropTypes.string.isRequired,
    targetElementId: PropTypes.string.isRequired,
    orientation: PropTypes.oneOf(Object.values(Orientation)).isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createOrientingRule(Object.assign({}, this.props));
  }
}

/**
 * Register a rule that links two elements together
 *
 * between - element ids to link
 * distance - distance to keep the elements apart
 * strength - rule strength
 */
export class LinkingRule extends RuleComponent {
  static propTypes = {
    between: PropTypes.arrayOf(PropTypes.string).isRequired,
    distance: PropTypes.number.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createLinkingRule(Object.assign({}, this.props));
  }
}

/**
 * Register a rule that binds one element to another
 *
 * baseElementId - element id to use as the base. will not be pushed
 * targetElementId - element to bind to the base, pushing to within the desired distance
 * distance - distance to keep the elements apart
 * strength - rule strength
 */
export class BindingRule extends RuleComponent {
  static propTypes = {
    baseElementId: PropTypes.string.isRequired,
    targetElementId: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createBindingRule(Object.assign({}, this.props));
  }
}

/**
 * Register a rule from a custom function
 *
 * rule - function of the form (simulation) => [ ForceApplication,...] to use as a rule
 */
export class FunctionRule extends RuleComponent {
  static propTypes = {
    rule: PropTypes.func.isRequired,
  };

  createRule() {
    return this.props.rule;
  }
}

/**
 * Register a rule with the simulation that causes all elements to repel each other
 *
 * strength - rule strength
 */
export class RepellingRule extends React.Component {
  static contextType = SimulationContext;
  static propTypes = {
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  componentDidMount() {
    const simulation = this.context;
    simulation.setRepellingForceStrength(
      this.props.strength
    );
  }

  render() {
    return null;
  }
}


export default {
  BindingRule,
  CenteringRule,
  DirectionalRule,
  PositioningRule,
  UniversalPositioningRule,
  OrientingRule,
  LinkingRule,
  RepellingRule,
  FunctionRule,
}
