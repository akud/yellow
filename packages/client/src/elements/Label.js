import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from './ElementPropTypes';
import monitored from './monitored';


export class Label extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    position: ElementPropTypes.position.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    shapeRef: PropTypes.object
  };

  static defaultProps = {
  };

  render() {
    const { shapeRef, position, border, text, width, height, padding } = this.props;
    const x = position.x - width / 2;
    const y = position.y + height / 4;
    return <text x={x} y={y} ref={shapeRef || React.createRef()}>{text}</text>;
  }
}

export default monitored(Label);
