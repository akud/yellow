import React from 'react';
import PropTypes from 'prop-types';
import SimulationContext from './SimulationContext';

export default class SimulatedElement extends React.Component {
  static contextType = SimulationContext;
  static propTypes = {
    id: PropTypes.string.isRequired,
    //Signature: ({ position, velocity, registerShape }) => <>
    render: PropTypes.func.isRequired,
    //Signature: (elementId, shape) => {},
    onShapeRegistration: PropTypes.func,
  };

  static defaultProps = {
    onShapeRegistration: (elementId, shape) => {},
  };

  render() {
    const simulation = this.context;
    const elementData = simulation.getElementData(this.props.id);
    return this.props.render({
      position: elementData.position,
      velocity: elementData.velocity,
      registerShape: (shape) => {
        simulation.registerElement(this.props.id, shape);
        this.props.onShapeRegistration(this.props.id, shape);
      },
    });
  }
}
