import React from 'react';
import PropTypes from 'prop-types';

import SimulatedLayout from '../../simulation/representations/SimulatedLayout';
import { CenteringForce, RepellingForce } from '../../simulation/representations/Forces';

export default class Graph extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500,
    border: false,
    zoom: 1.0,
    repellingForceStrengthMultiplier: 1.0,
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
    zoom: PropTypes.number,
    repellingForceStrengthMulitiplier: PropTypes.number
  }

  render() {
    const {
      width,
      height,
      border,
      zoom,
      repellingForceStrengthMultiplier,
      children,
    } = this.props;

    const realWidth = width / zoom;
    const realHeight = height / zoom;

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${realWidth} ${realHeight}`}
        width={width}
        height={height}
        style={ border ? { border: '1px solid black' } : {} }
      >
        <g className="yellow-graph">
          <SimulatedLayout>
            {children}
            <CenteringForce center={{ x: realWidth / 2, y: realHeight / 2 }} />
            <RepellingForce strengthMultiplier={repellingForceStrengthMultiplier} />
          </SimulatedLayout>
        </g>
      </svg>
    );
  }
}
