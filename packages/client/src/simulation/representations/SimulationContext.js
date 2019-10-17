import React from 'react';

export default React.createContext({
  registerElement: (elementId, shape) => {},
  getElement: elementId => {},
  registerForce: force => {},
  registerRule: rule => {},
});
