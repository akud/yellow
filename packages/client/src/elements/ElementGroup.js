import React from 'react';
import Link from './Link';

export default class ElementGroup extends React.Component {
  render() {
    const { link, children } = this.props;
    const gProps = {...this.props};
    delete gProps.link;
    delete gProps.children;

    const g = <g {...gProps}>{children}</g>;

    if (link && link.length) {
      return <Link href={link}>{g}</Link>;
    } else {
      return g;
    }
  }
}
