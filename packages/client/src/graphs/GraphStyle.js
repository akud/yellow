import React from 'react';
import Rules from '../simulation/Rules';

class Default extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Rules.CenteringRule />,
        <Rules.RepellingRule strength={10} />
      </React.Fragment>
    );
  }
}

export default {
  Default,
}
