import React from 'react';

const withExtraProps = (children, propProvider) => React.Children.map(
  children,
  child => React.cloneElement(child, propProvider(child.props))
);

export { withExtraProps };
