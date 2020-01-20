import React from 'react';
import PropTypes from 'prop-types';

import ElementPropTypes from './ElementPropTypes';

import monitored from './monitored';

export class HtmlFragment extends React.Component {
  static propTypes = {
    position: ElementPropTypes.position.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    shapeRef: PropTypes.object,
  };

  static defaultProps = {
  };

  render() {
    const { children, position, width, height, shapeRef } = this.props;
    const x = position.x - width / 2;
    const y = position.y - height / 2;
    return (
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
      >
        <body style={{ padding: 0, margin: 0 }} xmlns='http://www.w3.org/1999/xhtml'>
          <div ref={shapeRef || React.createRef()} style={{ display: 'inline-block' }}>
            {children}
          </div>
        </body>
      </foreignObject>
    );
  }
}

export default monitored(HtmlFragment)
