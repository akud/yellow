import React from 'react';
import linkable  from './linkable';

export class ElementGroup extends React.Component {
  render() {
    return <g {...this.props} />;
  }
}

export default linkable(ElementGroup);
