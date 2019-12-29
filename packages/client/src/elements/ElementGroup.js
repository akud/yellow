import React from 'react';

export default class ElementGroup extends React.Component {
  render() {
    return (
      <g {...this.props}>
        {this.props.children}
      </g>
    );
  }
}
