import React from 'react';
import PropTypes from 'prop-types';

import CustomPropTypes from '../../representations/CustomPropTypes';

import ForceSimulation from '../ForceSimulation';
import SimulationContext from './SimulationContext';

let contextIdSequence = 0;

export default class SimulatedLayout extends React.Component {
  static propTypes = {
    SimulationClass: PropTypes.func,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    center: CustomPropTypes.position.isRequired,
  }

  static defaultProps = {
    SimulationClass: ForceSimulation,
  }

  constructor(props) {
    super(props);
    this.contextId = 'simulation-context-' + (++contextIdSequence);

    const simulation = new props.SimulationClass({
      width: props.width,
      height: props.height,
      center: props.center,
    }).onNewLayout(
      s => this.setState({ contextValue: this.wrapSimulation(s) })
    );

    this.state = {
      contextValue: this.wrapSimulation(simulation)
    };
  }

  render() {
    const { children } = this.props;
    const { contextValue } = this.state;
    return (
      <SimulationContext.Provider value={contextValue}>
        { children }
      </SimulationContext.Provider>
    );
  }

  wrapSimulation(simulation) {
    return {
      contextId: this.contextId,
      registerElement: (elementId, shape) => simulation.registerElement(elementId, shape),
      getElementIds: () => simulation.getElementIds(),
      getElementData: elementId => simulation.getElementData(elementId),
      registerRule: (ruleId, rule) => simulation.registerRule(ruleId, rule),
      registerGroup: (groupId, elementIds) => simulation.registerGroup(groupId, elementIds),
      getGroupElementIds: (groupId) => simulation.getGroupElementIds(groupId),
      setRepellingForceStrength: (strength) => simulation.setRepellingForceStrength(strength),
    };
  }
}
