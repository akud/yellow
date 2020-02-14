import React from 'react';
import PropTypes from 'prop-types';

import WindowContext from './WindowContext';
import utils from '../utils';

export default class DisplayWindow extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    zoom: PropTypes.number,
  };

  static defaultProps = {
    width: 500,
    height: 500,
    zoom: 1.0,
  };

  render() {
    const {
      width,
      height,
      zoom,
      children,
    } = this.props;

    const realWidth = width / zoom;
    const realHeight = height / zoom;
    const center = { x: realWidth / 2, y: realHeight / 2 }

    const context = {
      width: realWidth,
      height: realHeight,
      center,
    };

    const style = utils.filterKeys(
      this.props, 'width', 'height', 'zoom', 'children'
    );

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${realWidth} ${realHeight}`}
        width={width}
        height={height}
        style={style}
      >
        <WindowContext.Provider value={context}>
          {children}
        </WindowContext.Provider>
      </svg>
    );
  }
}
