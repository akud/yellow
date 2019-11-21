import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';

export default class Line extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number,
    from: CustomPropTypes.position.isRequired,
    to: CustomPropTypes.position.isRequired,
  };

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
  };

  render() {
    const { from, to, color, thickness } = this.props;
    return (
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={thickness}
      />
    );
  }
}
