import React from 'react';
import utils from '../utils';
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
    const extraProps = utils.filterKeys(
      this.props, 'href', 'inline', 'className', 'children'
    );
    return (
      <a href={href} className={className} target={inline ? '_self' : '_blank'}>
        {React.Children.map(children, c => React.cloneElement(c, extraProps))}
      </a>
    );
  }
}
