import geometryUtils from './geometry/geometry-utils';
import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

import ElementPropTypes from './ElementPropTypes';

export default class Arrow extends React.Component {
  static propTypes = {
    to: ElementPropTypes.position.isRequired,
    color: PropTypes.string,
    thickness: PropTypes.number,
    angle: PropTypes.number,
    link: PropTypes.string,
  };

  static defaultProps = {
    color: '#c7c7c7',
    thickness: 1,
    angle: 0,
    link: '',
  };

  render() {
    const { to, color, thickness, angle, link } = this.props;
    const angleInDegrees = geometryUtils.radiansToDegrees(angle);
    const path = (
      <path
        d={`M${to.x} ${to.y} l -10 -5 z l -10 5 z`}
        stroke={color}
        strokeWidth={thickness}
        transform={`rotate(${angleInDegrees} ${to.x} ${to.y})`}
      />
    );
    if (link && link.length) {
      return <Link href={link}>{path}</Link>;
    } else {
      return path;
    }
  }
};
