import Point from '../Point';
import ElementContext from '../ElementContext';
import PointDefinition from '../geometry/PointDefinition';
import React from 'react';

import { mount } from 'enzyme';

describe('Point', () => {
  it('registers a PointDefinition on the context', () => {
    const registerShape = jest.fn();
    const wrapper = mount(
      <ElementContext.Provider value={{ registerShape }}>
        <Point id='hij'/>
      </ElementContext.Provider>
    );

    expect(registerShape).toHaveBeenCalledOnceWith('hij', new PointDefinition());
  });
});
