jest.mock('../../Simulation');

import React from 'react';

import MockSimulation, { registerConstraint, resetMockSimulation } from '../../Simulation';
import { FixedPositionConstraint } from '../Constraints';

import SimulationContext from '../SimulationContext';
import { FixedPositionConstraintDefinition } from '../../ConstraintDefinition';

import { mount } from 'enzyme';

describe('Constraints', () => {
  beforeEach(() => {
    resetMockSimulation();
  });

  describe('FixedPositionConstraint', () => {
    it('registers a FixedPositionConstraint with the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={new MockSimulation()}>
          <FixedPositionConstraint nodeId='node-43' position={{ x: 45, y: 91 }} />
        </SimulationContext.Provider>
      );
      expect(registerConstraint).toHaveBeenCalledOnceWith(
        new FixedPositionConstraintDefinition({
          elementId: 'node-43',
          x: 45,
          y: 91
        })
      );
    });
  });
});
