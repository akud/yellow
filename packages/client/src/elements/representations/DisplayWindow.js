import React from 'react';
import PropTypes from 'prop-types';

export default class DisplayWindow extends React.Component {
  static defaultProps = {
    width: 500,
    height: 500,
    border: false,
    zoom: 1.0,
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
    zoom: PropTypes.number,
    render: PropTypes.func.isRequired,
  }

  render() {
    const {
      width,
      height,
      border,
      zoom,
      render,
    } = this.props;

    const realWidth = width / zoom;
    const realHeight = height / zoom;
    const center = { x: realWidth / 2, y: realHeight / 2 }

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${realWidth} ${realHeight}`}
        width={width}
        height={height}
        style={ border ? { border: '1px solid black' } : {} }
      >
        {render({ center })}
      </svg>
    );

  }
}
