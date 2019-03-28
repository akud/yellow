import React from 'react';
import PropTypes from 'prop-types';

import Node from './Node';
import Image from 'elements/components/Image';

export default class ImageNode extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    color: '#4286f4',
    radius: 10,
  }

  render() {
    const { nodeId, src, width, height } = this.props;
    return (
      <Node nodeId={nodeId}>
        <Image src={src} width={width} height={height} />
      </Node>
    );
  }
}
