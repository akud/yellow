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

import { createLinkingRule } from '../LinkingRules';

export class PositioningRule extends React.Component {
  static contextType = SimulationContext;
  static propTypes = {
    elementIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    position: CustomPropTypes.position.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  componentDidMount() {
    const simulation = this.context;
    simulation.registerRule(
      createPositioningRule(Object.assign({}, this.props))
    );
  }

  render() {
    return null;
  }
}

export class UniversalPositioningRule extends React.Component {
  static contextType = SimulationContext;
  static propTypes = {
    position: CustomPropTypes.position.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  componentDidMount() {
    const simulation = this.context;
    simulation.registerRule(
      createUniversalPositioningRule(Object.assign({}, this.props))
    );
  }

  render() {
    return null;
  }
}

export class RelativePositioningRule extends React.Component {
  static contextType = SimulationContext;
  static propTypes = {
    baseElementId: PropTypes.string.isRequired,
    targetElementId: PropTypes.string.isRequired,
    orientation: PropTypes.oneOf(Object.values(Orientation)).isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  componentDidMount() {
    const simulation = this.context;
    simulation.registerRule(
      createRelativePositioningRule(Object.assign({}, this.props))
    );
  }

  render() {
    return null;
  }
}

export class LinkingRules extends React.Component {
  static contextType = SimulationContext;
  static propTypes = {
    between: PropTypes.arrayOf(PropTypes.string).isRequired,
    distance: PropTypes.number.isRequired,
    strength: PropTypes.number,
  };

  static defaultProps = {
    strength: 1.0,
  };

  componentDidMount() {
    const simulation = this.context;
    simulation.registerRule(
      createLinkingRule(Object.assign({}, this.props))
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
  LinkingRules,
}
