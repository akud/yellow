import React from 'react';

import PropTypes from 'prop-types';

import DisplayWindow from '../../elements/representations/DisplayWindow';
import SimulatedLayout from './SimulatedLayout';

export default class SimulationWindow extends React.Component {
  static propTypes = DisplayWindow.propTypes;
  static defaultProps = DisplayWindow.defaultProps;

  render() {
    const windowProps = Object.assign({}, this.props);
    delete windowProps.render

    return (
      <DisplayWindow
        {...windowProps}
        render={({center}) => (
          <SimulatedLayout>
            {this.props.render({ center })}
          </SimulatedLayout>
        )}
      />
    );
  }
}
