import React from 'react';
import PropTypes from 'prop-types';

import DisplayWindow from '../elements/DisplayWindow';
import WindowContext from '../elements/WindowContext';

import SimulatedLayout from './SimulatedLayout';

export default class SimulationWindow extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
    zoom: PropTypes.number,
  };

  static defaultProps = {
    width: 500,
    height: 500,
    border: false,
    zoom: 1.0,
  };

  render() {
    const windowProps = Object.assign({}, this.props);
    delete windowProps.children;
    return (
      <DisplayWindow {...windowProps}>
        <WindowContext.Consumer>
          {
            (windowContext) => (
              <SimulatedLayout {...windowContext}>
                {this.props.children}
              </SimulatedLayout>
            )
          }
        </WindowContext.Consumer>
      </DisplayWindow>
      );
  }
}
