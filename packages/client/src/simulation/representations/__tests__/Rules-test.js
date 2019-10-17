jest.mock('../../Simulation');

import React from 'react';

import MockSimulation, { registerRule, resetMockSimulation } from '../../Simulation';
import { PositioningRule } from '../Rules';

import SimulationContext from '../SimulationContext';
import { PositioningRuleDefinition } from '../../RuleDefinition';

import { mount } from 'enzyme';

describe('Rules', () => {
  beforeEach(() => {
    resetMockSimulation();
  });

  describe('PositioningRule', () => {
    it('registers a PositioningRule with the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={new MockSimulation()}>
          <PositioningRule nodeId='node-43' position={{ x: 45, y: 91 }} />
        </SimulationContext.Provider>
      );
      expect(registerRule).toHaveBeenCalledOnceWith(
        new PositioningRuleDefinition({
          elementId: 'node-43',
          x: 45,
          y: 91
        })
      );
    });
  });
});
