jest.mock('../force/ForceSimulation');
jest.mock('../force/PositioningRules');
jest.mock('../force/LinkingRule');

import React from 'react';
import {
  CenteringRule,
  DirectionalRule,
  PositioningRule,
  UniversalPositioningRule,
  RelativePositioningRule,
  LinkingRule,
  FunctionRule,
  RepellingRule,
} from '../Rules';

import WindowContext from '../../elements/WindowContext';

import SimulationContext from '../SimulationContext';
import Orientation from '../Orientation';

import { mount } from 'enzyme';

import MockSimulation, { resetMockSimulation } from '../force/ForceSimulation';
import {
  createDirectionalRule,
  createPositioningRule,
  createUniversalPositioningRule,
  createRelativePositioningRule,
  resetMockPositioningRules,
} from '../force/PositioningRules';

import { createLinkingRule } from '../force/LinkingRule';

describe('Rules', () => {
  let simulation;
  beforeEach(() => {
    resetMockPositioningRules();
    resetMockSimulation();
    createLinkingRule.mockReset();
    simulation = new MockSimulation();
  });

  describe('DirectionalRule', () => {
    it('registers a directional rule with the simulation context', () => {
      const rule = jest.fn();
      createDirectionalRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <DirectionalRule
            elementIds={['node-43', 'node-55']}
            orientation={Orientation.TOP_RIGHT}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).toHaveBeenCalledOnceWith({
        elementIds: ['node-43', 'node-55'],
        orientation: Orientation.TOP_RIGHT,
        strength: 4.2,
      });
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });

    it('defaults the strength to 1.0', () => {
      const rule = jest.fn();
      createDirectionalRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <DirectionalRule
            elementIds={['node-43', 'node-55']}
            orientation={Orientation.BOTTOM_LEFT}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).toHaveBeenCalledOnceWith({
        elementIds: ['node-43', 'node-55'],
        orientation: Orientation.BOTTOM_LEFT,
        strength: 1.0,
      });
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });
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

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
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

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
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

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
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

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 45, y: 91 },
        strength: 1.0,
      });
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });
  });

  describe('CenteringRule', () => {
    it('registers a universal positioning rule pointed towards the window center', () => {
      const center = { x: 500, y: 500 };
      const rule = jest.fn();
      createUniversalPositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <WindowContext.Provider value={{center}}>
          <SimulationContext.Provider value={simulation}>
            <CenteringRule strength={4.2} />
          </SimulationContext.Provider>
        </WindowContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 500, y: 500 },
        strength: 4.2,
      });
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
      expect(createLinkingRule).not.toHaveBeenCalled();
    });

    it('defaults the strength to 1.0', () => {
      const center = { x: 500, y: 500 };
      const rule = jest.fn();
      createUniversalPositioningRule.mockReturnValue(rule);

      const wrapper = mount(
        <WindowContext.Provider value={{center}}>
          <SimulationContext.Provider value={simulation}>
            <CenteringRule />
          </SimulationContext.Provider>
        </WindowContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 500, y: 500 },
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

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
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

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
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

  describe('LinkingRule', () => {
    it('registers a distance setting rule with the simulation context', () => {
      const rule = jest.fn();
      createLinkingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <LinkingRule
            between={['base-element', 'target-element']}
            distance={45}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
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
          <LinkingRule
            between={['base-element', 'target-element']}
            distance={45}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).not.toHaveBeenCalled();
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

  describe('FunctionRule', () => {
    it('registers the provided function with the simulation', () => {
      const rule = jest.fn();
      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <FunctionRule rule={rule} />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );

      expect(createDirectionalRule).not.toHaveBeenCalled();
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
    });
  });

  describe('RepellingRule', () => {
    it('sets the repelling force strength on the simulation', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <RepellingRule strength={4.2} />
        </SimulationContext.Provider>
      );

      expect(simulation.setRepellingForceStrength).toHaveBeenCalledOnceWith(4.2);
      expect(simulation.registerRule).not.toHaveBeenCalled();
      expect(createDirectionalRule).not.toHaveBeenCalled();
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
    });

    it('defaults the strength to 1.0', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <RepellingRule />
        </SimulationContext.Provider>
      );

      expect(simulation.setRepellingForceStrength).toHaveBeenCalledOnceWith(1.0);
      expect(simulation.registerRule).not.toHaveBeenCalled();
      expect(createDirectionalRule).not.toHaveBeenCalled();
      expect(createPositioningRule).not.toHaveBeenCalled();
      expect(createUniversalPositioningRule).not.toHaveBeenCalled();
      expect(createRelativePositioningRule).not.toHaveBeenCalled();
    });
  });
});
