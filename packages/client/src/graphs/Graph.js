import React from 'react';
import PropTypes from 'prop-types';

import ElementGroup from '../elements/ElementGroup';
import SimulationWindow from '../simulation/SimulationWindow';

import GraphStyle from './GraphStyle';
import utils from '../utils';

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
    const { children, style } = this.props;
    const windowProps = utils.filterKeys(this.props, 'style', 'children');

    return (
      <SimulationWindow {...windowProps} >
        <ElementGroup className="yellow-graph">
          {children}
        </ElementGroup>
        { React.createElement(style) }
      </SimulationWindow>
    );
  }
}
