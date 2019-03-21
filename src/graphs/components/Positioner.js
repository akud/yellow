import React, { createRef } from 'react';

import Direction from 'simulation/Direction';
import CustomPropTypes from 'components/CustomPropTypes';

import { withExtraProps } from 'components/component-utils';

export default class Positioner extends React.Component {
  static propTypes = {
    direction: CustomPropTypes.oneOf(Object.values(Direction)).isRequired,
  }

  constructor(props) {
    super(props);
    this.childRef = createRef();
  }

  render() {
    return withExtraProps(this.props.children, () => ({ref: this.childRef }));
  }

  getShapeDefinition() {
    return this.childRef.current && this.childRef.current.getShapeDefinition();
  }

  getOrientation() {
    return this.props.direction;
  }
}
