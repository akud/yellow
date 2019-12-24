import React from 'react';
import PropTypes from 'prop-types';

import ElementGroup from '../elements/ElementGroup';
import SimulationWindow from '../simulation/SimulationWindow';

import {
  RepellingRule
} from '../simulation/Rules';

export default class Graph extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500,
    border: false,
    zoom: 1.0,
    repellingForceStrength: 50,
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
    zoom: PropTypes.number,
    repellingForceStrength: PropTypes.number,
  }

  render() {
    const {
      width,
      height,
      border,
      zoom,
      children,
      repellingForceStrength,
    } = this.props;

    return (
      <SimulationWindow
        width={width}
        height={height}
        border={border}
        zoom={zoom}
      >
        <ElementGroup className="yellow-graph">
          {children}
        </ElementGroup>
        <RepellingRule strength={repellingForceStrength} />
      </SimulationWindow>
    );
  }
}
