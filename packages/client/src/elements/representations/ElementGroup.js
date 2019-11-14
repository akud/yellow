import React from 'react';
import PropTypes from 'prop-types';

export default class ElementGroup extends React.Component {
  render() {
    return (
      <g {...this.props}>
        {this.props.children}
      </g>
    );
  }
}
