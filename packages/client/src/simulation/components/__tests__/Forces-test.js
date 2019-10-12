jest.mock('../../Simulation');

import React from 'react';

import MockSimulation, { registerForce, resetMockSimulation } from '../../Simulation';
import {
  CenteringForce,
  DirectionalForce,
  RepellingForce
} from '../Forces';

import SimulationContext from '../SimulationContext';
import {
  CenteringForceDefinition,
  DirectionalForceDefinition,
  RepellingForceDefinition
} from '../../ForceDefinition';
import Direction from '../../Direction';

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

  describe('DirectionalForce', () => {
    it('registers a DirectionalForce with the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={new MockSimulation()}>
          <DirectionalForce
            nodeId='node-134'
            directions={[
              Direction.UP,
              Direction.RIGHT,
            ]}
            strengthMultiplier={2.5}
          />
        </SimulationContext.Provider>
      );
      expect(registerForce).toHaveBeenCalledOnceWith(
        new DirectionalForceDefinition({
          elementId: 'node-134',
          directions: [ Direction.UP, Direction.RIGHT ],
          strengthMultiplier: 2.5,
        })
      );
    });
  });

  describe('RepellingForce', () => {
    it('registers a RepellingForceDefinition with the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={new MockSimulation()}>
          <RepellingForce strengthMultiplier={2.5}/>
        </SimulationContext.Provider>
      );
      expect(registerForce).toHaveBeenCalledOnceWith(new RepellingForceDefinition({ strengthMultiplier: 2.5 }));
    });
  });
});
