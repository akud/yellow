import React from 'react';

const WindowContext = React.createContext({
  width: 500,
  height: 500,
  center: { x: 250, y: 250 },
});

WindowContext.displayName = 'WindowContext';

export default WindowContext;
