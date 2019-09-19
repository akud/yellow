import React, { Component } from 'react';

import logging from '@akud/logging';
import DisplayedGraph from './local/DisplayedGraph';

export default class App extends Component {
  constructor(props) {
    super(props);
    logging.setLevel(logging.DEBUG);
  }

  render() {
    return <DisplayedGraph />;
  }
}
