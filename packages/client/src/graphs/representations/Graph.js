import React from 'react';
import PropTypes from 'prop-types';

import DisplayWindow from '../../elements/representations/DisplayWindow';
import ElementGroup from '../../elements/representations/ElementGroup';
import SimulatedLayout from '../../simulation/representations/SimulatedLayout';
import {
  UniversalPositioningRule,
  RepellingRule,
} from '../../simulation/representations/Rules';

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
      <DisplayWindow
        width={width}
        height={height}
        border={border}
        zoom={zoom}
        render={
          ({center}) => (
            <ElementGroup className="yellow-graph">
              <SimulatedLayout>
                {children}
                <UniversalPositioningRule position={center} />
                <RepellingRule strength={repellingForceStrength} />
              </SimulatedLayout>
            </ElementGroup>
          )
        }
      />
    );
  }
}
