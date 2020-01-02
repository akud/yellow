import React from 'react';
import Rules from '../simulation/Rules';

class Default extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Rules.CenteringRule strength={0.5} />,
        <Rules.RepellingRule strength={25} />
      </React.Fragment>
    );
  }
}

export default {
  Default,
}
