import React from 'react';
import PointDefinition from '../PointDefinition';
import ElementPropTypes from './ElementPropTypes';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('Point');

export default class Point extends React.Component {
  static propTypes = {
    config: ElementPropTypes.config,
  }

  componentDidMount() {
    const { config } = this.props;
    if (config) {
      config.postRender(new PointDefinition());
    } else {
      LOGGER.warn('No element config passed for render');
    }
  }

  render() {
    return null;
  }
}

