import React from 'react';
import PropTypes from 'prop-types';

import ElementGroup from '../elements/ElementGroup';
import SimulationWindow from '../simulation/SimulationWindow';

import GraphStyle from './GraphStyle';

export default class Graph extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
    zoom: PropTypes.number,
    style: PropTypes.oneOf(Object.values(GraphStyle)),
  };

  static defaultProps = {
    width: 500,
    height: 500,
    border: false,
    zoom: 1.0,
    style: GraphStyle.Default,
  };

  render() {
    const {
      width,
      height,
      border,
      zoom,
      children,
      style,
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
        { React.createElement(style) }
      </SimulationWindow>
    );
  }
}
