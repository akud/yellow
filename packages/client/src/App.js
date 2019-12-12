import React, { Component } from 'react';

import logging from '@akud/logging';

let Graph;
try {
  Graph = require('./local/DisplayedGraph').default;
} catch (err) {
  Graph = require('./local/DefaultGraph').default;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    logging.setLevel(logging.DEBUG);
  }

  render() {
    return <Graph />;
  }
}
