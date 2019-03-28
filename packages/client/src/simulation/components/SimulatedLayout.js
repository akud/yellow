import React from 'react';
import PropTypes from 'prop-types';

import D3ForceSimulation from '../d3/ForceSimulation';

import SimulationContext from './SimulationContext';

export default class SimulatedLayout extends React.Component {
  static propTypes = {
    SimulationClass: PropTypes.func,
  }

  static defaultProps = {
    SimulationClass: D3ForceSimulation,
  }

  constructor(props) {
    super(props);

    const simulation = new props.SimulationClass().onNewLayout(
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
        {children}
      </SimulationContext.Provider>
    );
  }

  wrapSimulation(simulation) {
    return {
      registerElement: (elementId, shape) => simulation.registerElement(elementId, shape),
      getElementData: elementId => simulation.getElementData(elementId),
      registerForce: force => simulation.registerForce(force),
      registerConstraint: constraint => simulation.registerConstraint(constraint),
    };
  }
}
