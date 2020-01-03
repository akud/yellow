import React from 'react';
import PropTypes from 'prop-types';

import Node from './Node';
import Image from '../elements/Image';

export default class ImageNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    link: PropTypes.string,
  };

  static defaultProps = {
    link: '',
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
