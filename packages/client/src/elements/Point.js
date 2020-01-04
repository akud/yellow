import React from 'react';
import PointDefinition from './geometry/PointDefinition';
import ElementProps from './ElementProps';
import ElementContext from './ElementContext';

export default class Point extends React.Component {
  static contextType = ElementContext;
  static propTypes = {...ElementProps.BasePropTypes};
  static defaultProps = {...ElementProps.DefaultBaseProps};

  componentDidMount() {
    const { registerShape } = this.context;
    const { id } = this.props;
    if (registerShape) {
      registerShape(id, new PointDefinition());
    }
  }

  render() {
    return null;
  }
}

