import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from '../elements/ElementPropTypes';
import HtmlFragment from '../elements/HtmlFragment';

import Node from './Node';

export default class HtmlNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    link: ElementPropTypes.link,
  };

  static defaultProps = {
  }

  render() {
    const { children, nodeId, link } = this.props;
    return (
      <Node nodeId={nodeId} link={link}>
        <HtmlFragment>
          {children}
        </HtmlFragment>
      </Node>
    );
  }
}
