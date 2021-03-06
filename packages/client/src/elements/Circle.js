import React from 'react';
import PropTypes from 'prop-types';
import CircleDefinition from './geometry/CircleDefinition';
import ElementProps from './ElementProps';
import ElementContext from './ElementContext';
import linkable  from './linkable';

export class Circle extends React.Component {
  static contextType = ElementContext;

  static propTypes = {
    color: PropTypes.string,
    radius: PropTypes.number,
    ...ElementProps.BasePropTypes
  };

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
    ...ElementProps.DefaultBaseProps
  };

  componentDidMount() {
    const { registerShape } = this.context;
    const { id, radius } = this.props;

    if (registerShape) {
      registerShape(id, new CircleDefinition({ radius }));
    }
  }

  render() {
    const { color, radius, position, id, link } = this.props;
    return (
      <circle
        r={radius}
        fill={color}
        cx={position.x}
        cy={position.y}
        data-element-id={id}
      />
    );
  }
}

export default linkable(Circle)
