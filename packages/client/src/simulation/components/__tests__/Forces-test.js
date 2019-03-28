jest.mock('simulation/Simulation');

import React from 'react';

import MockSimulation, { registerForce, resetMockSimulation } from 'simulation/Simulation';
import { CenteringForce, RepellingForce } from '../Forces';

import SimulationContext from '../SimulationContext';
import { CenteringForceDefinition, RepellingForceDefinition } from 'simulation/ForceDefinition';

import { mount } from 'enzyme';

describe('Forces', () => {
  beforeEach(() => {
    resetMockSimulation();
  });

  describe('CenteringForce', () => {
    it('registers a CenteringForce with the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={new MockSimulation()}>
          <CenteringForce center={{ x: 45, y: 91 }} />
        </SimulationContext.Provider>
      );
      expect(registerForce).toHaveBeenCalledOnceWith(
        new CenteringForceDefinition({ x: 45, y: 91 })
      );
    });
  });

  describe('RepellingForce', () => {
    it('registers a RepellingForceDefinition with the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={new MockSimulation()}>
          <RepellingForce />
        </SimulationContext.Provider>
      );
      expect(registerForce).toHaveBeenCalledOnceWith(new RepellingForceDefinition());
    });
  });
});
