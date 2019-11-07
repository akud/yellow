jest.mock('../../ForceSimulation');
jest.mock('../../PositioningRules');
jest.mock('../../LinkingRules');

import React from 'react';
import {
  PositioningRule,
  UniversalPositioningRule,
  RelativePositioningRule,
  LinkingRules,
} from '../Rules';

import SimulationContext from '../SimulationContext';

import Orientation from '../../../elements/Orientation';

import { mount } from 'enzyme';

import MockSimulation, { resetMockSimulation } from '../../ForceSimulation';
import {
  createPositioningRule,
  createUniversalPositioningRule,
  createRelativePositioningRule,
  resetMockPositioningRules,
} from '../../PositioningRules';

import { createLinkingRule } from '../../LinkingRules';

describe('Rules', () => {
  let simulation;
  beforeEach(() => {
    resetMockPositioningRules();
    resetMockSimulation();
    createLinkingRule.mockReset();
    simulation = new MockSimulation();
  });

  describe('PositioningRule', () => {
    it('registers a positioning rule with the simulation context', () => {
      const rule = jest.fn();
      createPositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <PositioningRule
            elementIds={['node-43', 'node-55']}
            position={{ x: 45, y: 91 }}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elementIds: ['node-43', 'node-55'],
        position: { x: 45, y: 91 },
        strength: 4.2,
      });
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });

    it('defaults the strength to 1.0', () => {
      const rule = jest.fn();
      createPositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <PositioningRule
            elementIds={['node-43', 'node-55']}
            position={{ x: 45, y: 91 }}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elementIds: ['node-43', 'node-55'],
        position: { x: 45, y: 91 },
        strength: 1.0,
      });
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });
  });

  describe('UniversalPositioningRule', () => {
    it('registers a universal positioning rule with the simulation context', () => {
      const rule = jest.fn();
      createUniversalPositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <UniversalPositioningRule
            position={{ x: 45, y: 91 }}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 45, y: 91 },
        strength: 4.2,
      });
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });

    it('defaults the strength to 1.0', () => {
      const rule = jest.fn();
      createUniversalPositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <UniversalPositioningRule position={{ x: 45, y: 91 }} />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 45, y: 91 },
        strength: 1.0,
      });
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });
  });

  describe('RelativePositioningRule', () => {
    it('registers a relative positioning rule with the simulation context', () => {
      const rule = jest.fn();
      createRelativePositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <RelativePositioningRule
            baseElementId='base-element'
            targetElementId='target-element'
            orientation={Orientation.BOTTOM_RIGHT}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        orientation: Orientation.BOTTOM_RIGHT,
        strength: 4.2,
      });
      expect(createLinkingRule).not.toHaveBeenCalled();
    });

    it('defaults the strength to 1.0', () => {
      const rule = jest.fn();
      createRelativePositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <RelativePositioningRule
            baseElementId='base-element'
            targetElementId='target-element'
            orientation={Orientation.TOP_LEFT}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        orientation: Orientation.TOP_LEFT,
        strength: 1.0,
      });
      expect(createLinkingRule).not.toHaveBeenCalled();
    });
  });

  describe('LinkingRules', () => {
    it('registers a distance setting rule with the simulation context', () => {
      const rule = jest.fn();
      createLinkingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <LinkingRules
            between={['base-element', 'target-element']}
            distance={45}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).toHaveBeenCalledOnceWith({
        between: [ 'base-element', 'target-element' ],
        distance: 45,
        strength: 4.2,
      });
    });

    it('defaults the strength to 1.0', () => {
      const rule = jest.fn();
      createLinkingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <LinkingRules
            between={['base-element', 'target-element']}
            distance={45}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(rule);
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).toHaveBeenCalledOnceWith({
        between: [ 'base-element', 'target-element' ],
        distance: 45,
        strength: 1.0,
      });
    });
  });
});
