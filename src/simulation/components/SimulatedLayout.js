import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import D3ForceSimulation from 'simulation/d3/ForceSimulation';

import SimulationConfig from 'simulation/SimulationConfig';

import { withExtraProps } from 'components/component-utils';

import utils from 'utils';

export default class SimulatedLayout extends React.Component {
  static propTypes = {
    SimulationClass: PropTypes.func,
  }

  static defaultProps = {
    SimulationClass: D3ForceSimulation,
  }

  constructor(props) {
    super(props);
    this.childRefs = utils.flatten(props.children).map(createRef);

    this.state = {
      simulation: null,
      simulationConfigs: [],
    };
  }

  componentDidMount() {
    const { SimulationClass } = this.props;
    const { childRefs } = this;

    Promise.all(childRefs.map(getSimulationConfig)).then(configs => {
      const aggregateConfig = configs.reduce(
        (aggregate, current) => aggregate.combinedWith(current),
        SimulationConfig.EMPTY,
      );

      this.setState({
        simulation: new SimulationClass(
          aggregateConfig.withNewLayoutListener(simulation => this.setState({ simulation }))
        ),
        simulationConfigs: configs,
      });
    });
  }

  render() {
    const { children } = this.props;
    const { childRefs } = this;
    const { simulation, simulationConfigs } = this.state;

    return withExtraProps(children, (child, index) => {
      const ref = childRefs[index];
      const simulationConfig = simulationConfigs[index];
      if(simulation && simulationConfig && simulationConfig.hasDefinitions()) {
        return {
          ref,
          simulatedElements: simulationConfig.getElementIds().reduce((obj, id) => {
            obj[id] = simulation.getElementData(id);
            return obj;
          }, {}),
        };
      } else {
        return { ref };
      }
    });
  }
}

const getSimulationConfig = ref => {
  if (ref.current && typeof ref.current.getSimulationConfig === 'function') {
    return ref.current.getSimulationConfig() || Promise.resolve(SimulationConfig.EMPTY);
  } else {
    return Promise.resolve(SimulationConfig.EMPTY);
  }
};
