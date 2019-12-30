jest.mock('../force/ForceSimulation');
jest.mock('../force/PositioningRules');
jest.mock('../force/LinkingRules');

import React from 'react';
import {
  BindingRule,
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

import {
  createBindingRule,
  createLinkingRule,
  resetMockLinkingRules,
} from '../force/LinkingRules';

describe('Rules', () => {
  let simulation;

  beforeEach(() => {
    resetMockPositioningRules();
    resetMockLinkingRules();
    resetMockSimulation();
    simulation = new MockSimulation();
  });

  const expectOtherRulesNotToHaveBeenCalled = (rule) => {
    [
      createDirectionalRule,
      createPositioningRule,
      createUniversalPositioningRule,
      createRelativePositioningRule,
      createBindingRule,
      createLinkingRule,
      simulation.setRepellingForceStrength,
    ].filter(other => other !== rule)
      .forEach((other) => {
        expect(other).not.toHaveBeenCalled();
    });
  };

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
      expectOtherRulesNotToHaveBeenCalled(createDirectionalRule);
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
      expectOtherRulesNotToHaveBeenCalled(createDirectionalRule);
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
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elementIds: ['node-43', 'node-55'],
        position: { x: 45, y: 91 },
        strength: 4.2,
      });
      expectOtherRulesNotToHaveBeenCalled(createPositioningRule);
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
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elementIds: ['node-43', 'node-55'],
        position: { x: 45, y: 91 },
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createPositioningRule);
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
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 45, y: 91 },
        strength: 4.2,
      });
      expectOtherRulesNotToHaveBeenCalled(createUniversalPositioningRule);
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
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 45, y: 91 },
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createUniversalPositioningRule);
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
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 500, y: 500 },
        strength: 4.2,
      });
      expectOtherRulesNotToHaveBeenCalled(createUniversalPositioningRule);
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
      expect(createUniversalPositioningRule).toHaveBeenCalledOnceWith({
        position: { x: 500, y: 500 },
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createUniversalPositioningRule);
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
      expect(createRelativePositioningRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        orientation: Orientation.BOTTOM_RIGHT,
        strength: 4.2,
      });
      expectOtherRulesNotToHaveBeenCalled(createRelativePositioningRule);
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
      expect(createRelativePositioningRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        orientation: Orientation.TOP_LEFT,
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createRelativePositioningRule);
    });
  });

  describe('LinkingRule', () => {
    it('registers a linking rule with the simulation context', () => {
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
      expect(createLinkingRule).toHaveBeenCalledOnceWith({
        between: [ 'base-element', 'target-element' ],
        distance: 45,
        strength: 4.2,
      });
      expectOtherRulesNotToHaveBeenCalled(createLinkingRule);
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
      expect(createLinkingRule).toHaveBeenCalledOnceWith({
        between: [ 'base-element', 'target-element' ],
        distance: 45,
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createLinkingRule);
    });
  });

  describe('BindingRule', () => {
    it('registers a binding rule with the simulation context', () => {
      const rule = jest.fn();
      createBindingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <BindingRule
            baseElementId='base-element'
            targetElementId='target-element'
            distance={45}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createBindingRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        distance: 45,
        strength: 4.2,
      });
      expectOtherRulesNotToHaveBeenCalled(createBindingRule);
    });

    it('defaults the strength to 1.0', () => {
      const rule = jest.fn();
      createBindingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <BindingRule
            baseElementId='base-element'
            targetElementId='target-element'
            distance={45}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createBindingRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        distance: 45,
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createBindingRule);
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

      expectOtherRulesNotToHaveBeenCalled();
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
      expectOtherRulesNotToHaveBeenCalled(simulation.setRepellingForceStrength);
    });

    it('defaults the strength to 1.0', () => {
      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <RepellingRule />
        </SimulationContext.Provider>
      );

      expect(simulation.setRepellingForceStrength).toHaveBeenCalledOnceWith(1.0);
      expectOtherRulesNotToHaveBeenCalled(simulation.setRepellingForceStrength);
    });
  });
});
