import PropTypes from 'prop-types';
import React from 'react';

import Point from 'geometry/Point';

import { asNodeComponent } from './node-utils';

class PointNode extends React.Component {
  static getShape = props => new Point({
    center: props.position || { x: 0, y: 0 }
  });

  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  };

  render() {
    return '';
  }
}

export default asNodeComponent(PointNode);
