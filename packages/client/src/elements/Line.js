import React from 'react';
import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';
import Link from './Link';

export default class Line extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number,
    from: ElementPropTypes.position.isRequired,
    to: ElementPropTypes.position.isRequired,
    link: PropTypes.string,
  };

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
    link: '',
  };

  render() {
    const { from, to, color, thickness, link } = this.props;
    const line = (
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={thickness}
      />
    );

    if (link && link.length) {
      return <Link href={link}>{line}</Link>;
    } else {
      return line;
    }
  }
}
