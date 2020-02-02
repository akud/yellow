import React from 'react';
import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';
import linkable from './linkable';

export class Line extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number,
    from: ElementPropTypes.position.isRequired,
    to: ElementPropTypes.position.isRequired,
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

export default linkable(Line);
