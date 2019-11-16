import React from 'react';
import PointDefinition from '../PointDefinition';
import ElementProps from './ElementProps';

export default class Point extends React.Component {
  static propTypes = {...ElementProps.BasePropTypes};
  static defaultProps = {...ElementProps.DefaultBaseProps};

  componentDidMount() {
    const { registerShape } = this.props;
    registerShape(new PointDefinition());
  }

  render() {
    return null;
  }
}

