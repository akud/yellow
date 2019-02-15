import PropTypes from 'prop-types';
import React from 'react';

import { asNodeComponent } from './node-utils';
import { withExtraProps } from '../component-utils';

class Node extends React.Component {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  }

  render() {
    const { position, children } = this.props;
    return withExtraProps(children, () => ({ position }));
  }

}

export default asNodeComponent(Node);
