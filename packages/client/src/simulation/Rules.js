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
  createRelativePositioningRule,
} from './force/PositioningRules';

import { createLinkingRule } from './force/LinkingRule';

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
  CenteringRule,
  DirectionalRule,
  PositioningRule,
  UniversalPositioningRule,
  RelativePositioningRule,
  LinkingRule,
  RepellingRule,
  FunctionRule,
}
