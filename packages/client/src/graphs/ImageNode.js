import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from '../elements/ElementPropTypes';
import Image from '../elements/Image';

import Node from './Node';

export default class ImageNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    link: ElementPropTypes.link,
  };

  static defaultProps = {
  }

  render() {
    const { nodeId, src, width, height, link } = this.props;
    return (
      <Node nodeId={nodeId} link={link}>
        <Image src={src} width={width} height={height} />
      </Node>
    );
  }
}
