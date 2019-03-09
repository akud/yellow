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
    this.state = {
      simulation: null,
      refs: utils.flatten(props.children).map(createRef),
    };
  }

  componentDidMount() {
    const { SimulationClass } = this.props;
    const { refs } = this.state;

    const aggregateConfig = refs.map(getSimulationConfig).reduce(
      (aggregate, current) => aggregate.combinedWith(current),
      SimulationConfig.EMPTY,
    );

    this.setState({
      simulation: new SimulationClass(
        aggregateConfig.withNewLayoutListener((simulation) => this.setState({ simulation }))
      )
    });
  }

  render() {
    const { children } = this.props;
    const { refs } = this.state;

    return withExtraProps(children, (child, index) => {
      const ref = refs[index];
      const simulationConfig = getSimulationConfig(ref);
      if(simulationConfig.hasDefinitions()) {
        return {
          ref,
          simulatedElements: simulationConfig.getElementIds().reduce((obj, id) => {
            obj[id] = this.getElementData(id);
            return obj;
          }, {}),
        };
      } else {
        return { ref };
      }
    });
  }

  getElementData(elementId) {
    const { simulation } = this.state;
    return simulation && simulation.getElementData(elementId);
  }
}

const getSimulationConfig = (ref) => {
  if (ref.current && typeof ref.current.getSimulationConfig === 'function') {
    return ref.current.getSimulationConfig() || SimulationConfig.EMPTY;
  } else {
    return SimulationConfig.EMPTY;
  }
};
