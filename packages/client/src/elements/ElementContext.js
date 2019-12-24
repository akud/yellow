import React from 'react';

const ElementContext = React.createContext({
  registerShape: (id, shape) => {}
});

ElementContext.displayName = 'ElementContext';

export default ElementContext;
