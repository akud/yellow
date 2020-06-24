import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import Link from './Link';
import ElementPropTypes from './ElementPropTypes';

import utils from '../utils';

export default (ComponentClass) => {
  class LinkableComponentClass extends React.Component {
    static propTypes = {
      link: ElementPropTypes.link,
      ...ComponentClass.propTypes
    };

    static defaultProps = {
      ...ComponentClass.defaultPropTypes
    };

    render() {
      const link = typeof this.props.link === 'string' ?
        { href: this.props.link, inline: false } :
        this.props.link;

      if (link) {
        return (
          <Link {...link}>
            <ComponentClass {...utils.filterKeys(this.props, 'link')} />
          </Link>
        );
      } else {
        return <ComponentClass {...utils.filterKeys(this.props, 'link')} />;
      }
    }
  }
  hoistNonReactStatic(LinkableComponentClass, ComponentClass);
  return LinkableComponentClass;
}
