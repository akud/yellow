import React from 'react';
import PropTypes from 'prop-types';
import SimulationContext from './SimulationContext';
import ElementContext from '../elements/ElementContext';

export default class SimulatedElement extends React.Component {
  static contextType = SimulationContext;
  static propTypes = {
    id: PropTypes.string.isRequired,
  };


  render() {
    const simulation = this.context;
    const elementData = simulation.getElementData(this.props.id);

    return (
      <ElementContext.Provider value={{
        registerShape: (id, shape) => simulation.registerElement(id, shape)
      }}>
        {
          React.cloneElement(
            this.props.children,
            { id: this.props.id, ...elementData }
          )
        }
      </ElementContext.Provider>
    );
  }
}
