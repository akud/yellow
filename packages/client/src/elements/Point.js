import React from 'react';
import PointDefinition from './geometry/PointDefinition';
import ElementProps from './ElementProps';

export default class Point extends React.Component {
  static propTypes = {...ElementProps.BasePropTypes};
  static defaultProps = {...ElementProps.DefaultBaseProps};

  componentDidMount() {
    const { id, registerShape } = this.props;
    registerShape(id, new PointDefinition());
  }

  render() {
    return null;
  }
}

