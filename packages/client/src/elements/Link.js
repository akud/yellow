import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'yellow-link',
  }

  render() {
    const { href, className, children } = this.props;
    return (
      <a href={href} className={className} target='_blank'>
        {children}
      </a>
    );
  }

}
