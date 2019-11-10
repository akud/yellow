import React from 'react';
import PropTypes from 'prop-types';

export default class ElementGroup extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: 'element-group',
  }

  render() {
    const { className, children } = this.props;
    return (
      <g className={className}>
        {children}
      </g>
    );
  }
}
