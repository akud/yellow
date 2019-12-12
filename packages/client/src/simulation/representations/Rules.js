import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';

import SimulationContext from './SimulationContext';

import Orientation from '../../elements/Orientation';

import {
  createPositioningRule,
  createUniversalPositioningRule,
  createRelativePositioningRule,
} from '../PositioningRules';

import { createLinkingRule } from '../LinkingRule';

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

export class PositioningRule extends RuleComponent {
  static propTypes = {
    elementIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    position: CustomPropTypes.position.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createPositioningRule(Object.assign({}, this.props));
  }
}

export class UniversalPositioningRule extends RuleComponent {
  static propTypes = {
    position: CustomPropTypes.position.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  createRule() {
    return createUniversalPositioningRule(Object.assign({}, this.props));
  }
}

export class RelativePositioningRule extends RuleComponent {
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
    return createRelativePositioningRule(Object.assign({}, this.props));
  }
}

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

export class FunctionRule extends RuleComponent {
  static propTypes = {
    rule: PropTypes.func.isRequired,
  };

  createRule() {
    return this.props.rule;
  }
}

/**
 * <RepellingRule>
 *
 * Registers a rule with the simulation that causes elements to repel each other
 *
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
  PositioningRule,
  UniversalPositioningRule,
  RelativePositioningRule,
  LinkingRule,
  RepellingRule,
}
