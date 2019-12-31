jest.mock('../../elements/geometry/ShapeDefinition');
jest.mock('../force/ForceSimulation');
jest.mock('../force/LinkingRules');

import React from 'react';

import SimulatedLink from '../SimulatedLink';

import MockShapeDefinition from '../../elements/geometry/ShapeDefinition';

import MockSimulation, {
  getElementData,
  registerRule,
  resetMockSimulation
} from '../force/ForceSimulation';


import { createLinkingRule } from '../force/LinkingRules';
import SimulationContext from '../SimulationContext';

import { mount } from 'enzyme';

describe('SimulatedLink', () => {

  const newElementData = opts => Object.assign({
    position: newPosition(),
    velocity: newPosition(),
    shape: new MockShapeDefinition(),
  }, opts);

  const selectElementFrom = (elements) => id => elements[id];

  let renderProp;

  beforeEach(() => {
    resetMockSimulation();
    createLinkingRule.mockReset();
    renderProp = jest.fn()
    renderProp.mockReturnValue(null);
  });

  it('passes the provided points to the render prop', () => {
    renderProp.mockReturnValue(<p>hello</p>);
    const shape1 = new MockShapeDefinition({ intersectionPoint: { x: 45, y: 87 } });
    const shape2 = new MockShapeDefinition({ intersectionPoint: { x: 123, y: 56 } });

    getElementData.mockImplementation(selectElementFrom({
      '1': newElementData({ position: { x: 1, y: 2 }, shape: shape1 }),
      '2': newElementData({ position: { x: 3, y: 4 }, shape: shape2 }),
    }));

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedLink
          fromElementId='1'
          toElementId='2'
          render={renderProp}
        />
      </SimulationContext.Provider>
    );
    expect(wrapper.find('p').length).toBe(1);

    expect(renderProp).toHaveBeenCalledWith(
      { x: 45, y: 87 },
      { x: 123, y: 56 }
    );

    expect(shape1.computeIntersectionWithRay).toHaveBeenCalledWith({ x: 1, y: 2 }, { x: 3, y: 4 });
    expect(shape2.computeIntersectionWithRay).toHaveBeenCalledWith({ x: 3, y: 4 }, { x: 1, y: 2 });
  });

  it('registers a distance setting rule with the simulation', () => {
    const rule = jest.fn();
    createLinkingRule.mockReturnValue(rule);

    const wrapper = mount(
      <SimulationContext.Provider value={new MockSimulation()}>
        <SimulatedLink
          fromElementId='123'
          toElementId='456'
          distance={324}
          bindingStrength={4.5}
        />
      </SimulationContext.Provider>
    );
    expect(registerRule).toHaveBeenCalledOnceWith(
      expect.any(String), rule
    );
    expect(createLinkingRule).toHaveBeenCalledOnceWith({
      between: ['123', '456'],
      distance: 324,
      strength: 4.5,
    });
  });
});
