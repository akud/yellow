import React from 'react';
import { wrapInLink }  from './Link';

export default class ElementGroup extends React.Component {
  render() {
    const { link, children } = this.props;
    const gProps = {...this.props};
    delete gProps.link;
    delete gProps.children;

    return wrapInLink(link, <g {...gProps}>{children}</g>);
  }
}
