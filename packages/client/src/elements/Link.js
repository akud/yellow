import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    inline: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    inline: false,
    className: 'yellow-link',
  }

  render() {
    const { href, inline, className, children } = this.props;
    return (
      <a href={href} className={className} target={inline ? '_self' : '_blank'}>
        {children}
      </a>
    );
  }
}

export const wrapInLink = (linkProp, component) => {
  debugger;
  if (typeof linkProp === 'string') {
    linkProp = { href: linkProp, inline: false };
  }

  if (linkProp && linkProp.href && linkProp.href.length) {
    return (
      <Link {...linkProp}>
        {component}
      </Link>
    );
  } else {
    return component;
  }
}
