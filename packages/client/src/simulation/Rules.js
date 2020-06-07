import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from '../elements/ElementPropTypes';
import WindowContext from '../elements/WindowContext';

import SimulationContext from './SimulationContext';
import SimulationPropTypes from './SimulationPropTypes';

import Orientation from './Orientation';

import {
  createDirectionalRule,
  createPositioningRule,
  createOrientingRule,
} from './force/PositioningRules';

import {
  createBindingRule,
  createLinkingRule,
} from './force/LinkingRules';

import utils from '../utils';

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
 * elements - elementSelector defining the elements to which the rule applies
 * orientation - Orientation determining the direction to push elements in. e.g. Orientation.TOP_LEFT
 * strength - rule strength
 */
export class DirectionalRule extends RuleComponent {
  static propTypes = {
    elements: SimulationPropTypes.elementSelector.isRequired,
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
 * elements - elementSelector defining the elements to which the rule applies
 * position - position to push the elements towards
 * strength - rule strength
 */
export class PositioningRule extends RuleComponent {
  static propTypes = {
    elements: SimulationPropTypes.elementSelector.isRequired,
    position: ElementPropTypes.position.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createPositioningRule(Object.assign(
      { windowSize: this.context.getWindowSize() },
      this.props
    ));
  }
}

/**
 * Register a rule that pushes all elements towards the current center of the display window
 *
 * strength - rule strength
 */
export class CenteringRule extends React.Component {
  static propTypes = {
    elements: SimulationPropTypes.elementSelector,
    strength: PropTypes.number,
  };

  static defaultProps = {
    elements: 'all',
    strength: 1.0,
  };

  render() {
    const { elements, strength } = this.props;
    return (
      <WindowContext.Consumer>
        { ({center}) => <PositioningRule elements={elements} position={center} strength={strength} /> }
      </WindowContext.Consumer>
    );
  }
}

/**
 * Register a rule that positions a set of elements relative to a base element
 *
 * baseElementId - element id to use as the base element, which will not be pushed
 * targetElements - element selector defining the elements to be moved into orientation
 * orientation - Orientation determining the desired positioning. e.g. Orientation.TOP_LEFT
 * strength - rule strength
 * style - narrow, medium, or wide. Defaults to narrow. Determines how strictly the rule orients
 */
export class OrientingRule extends RuleComponent {
  static propTypes = {
    baseElementId: PropTypes.string.isRequired,
    targetElements: SimulationPropTypes.elementSelector.isRequired,
    orientation: PropTypes.oneOf(Object.values(Orientation)).isRequired,
    strength: PropTypes.number,
    style: PropTypes.oneOf([
      'exact',
      'narrow',
      'medium',
      'wide',
    ]),
  };

  static defaultProps = {
    strength: 1.0,
    style: 'narrow',
  };

  static toleranceValues = {
    exact: Math.PI / 12,
    narrow: Math.PI / 6,
    medium: Math.PI / 4,
    wide: Math.PI / 3,
  }

  createRule() {
    return createOrientingRule(Object.assign(
      {
        tolerance: OrientingRule.toleranceValues[this.props.style],
      },
      utils.filterKeys(this.props, 'style')
    ));
  }
}

/**
 * Register a rule that links two elements together
 *
 * between - two-element array of element ids to link together
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
 * Register a rule that binds a set of elements to a base element
 *
 * baseElementId - element id to use as the base. will not be pushed
 * targetElements - element selector defining the elements to be moved into orientation
 * distance - distance to keep the elements apart
 * strength - rule strength
 */
export class BindingRule extends RuleComponent {
  static propTypes = {
    baseElementId: PropTypes.string.isRequired,
    targetElements: SimulationPropTypes.elementSelector.isRequired,
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
  OrientingRule,
  LinkingRule,
  RepellingRule,
  FunctionRule,
}
