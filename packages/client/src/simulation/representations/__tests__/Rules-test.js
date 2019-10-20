jest.mock('../../Simulation');

import React from 'react';

import MockSimulation, { registerRule, resetMockSimulation } from '../../Simulation';
import Direction from '../../Direction';
import {
  PositioningRule,
  RelativePositioningRule,
} from '../Rules';

import SimulationContext from '../SimulationContext';
import {
  PositioningRuleDefinition,
  RelativePositioningRuleDefinition,
} from '../../RuleDefinition';

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

  describe('RelativePositioningRule', () => {
    it('registers a RelativePositioningRule with the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={new MockSimulation()}>
          <RelativePositioningRule
            baseNodeId='node-43'
            targetNodeId='node-56'
            directions={[Direction.UP, Direction.LEFT]}
            strengthMultiplier={1.5}
          />
        </SimulationContext.Provider>
      );
      expect(registerRule).toHaveBeenCalledOnceWith(
        new RelativePositioningRuleDefinition({
          baseElementId: 'node-43',
          targetElementId: 'node-56',
          directions: [Direction.UP, Direction.LEFT],
          strengthMultiplier: 1.5,
        })
      );
    });
  });

});
