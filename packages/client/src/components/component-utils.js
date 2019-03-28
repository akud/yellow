import React from 'react';

const withExtraProps = (children, propProvider) => React.Children.map(
  children,
  (child, index) => React.cloneElement(child, propProvider(child, index))
);

export { withExtraProps };
