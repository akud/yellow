jest.mock('../force/ForceSimulation');
jest.mock('../force/PositioningRules');
jest.mock('../force/LinkingRules');

import React from 'react';
import {
  BindingRule,
  CenteringRule,
  DirectionalRule,
  PositioningRule,
  OrientingRule,
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
  createOrientingRule,
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
      createOrientingRule,
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
            elements={{ ids: ['node-43', 'node-55'] }}
            orientation={Orientation.TOP_RIGHT}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).toHaveBeenCalledOnceWith({
        elements: { ids: ['node-43', 'node-55'] },
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
            elements={{ ids: ['node-43', 'node-55'] }}
            orientation={Orientation.BOTTOM_LEFT}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createDirectionalRule).toHaveBeenCalledOnceWith({
        elements: { ids: ['node-43', 'node-55'] },
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
            elements={{ ids: ['node-43', 'node-55'] }}
            position={{ x: 45, y: 91 }}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elements: { ids: ['node-43', 'node-55'] },
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
            elements={{ ids: ['node-43', 'node-55'] }}
            position={{ x: 45, y: 91 }}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elements: { ids: ['node-43', 'node-55'] },
        position: { x: 45, y: 91 },
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createPositioningRule);
    });
  });

  describe('CenteringRule', () => {
    it('registers a universal positioning rule pointed towards the window center', () => {
      const center = { x: 500, y: 500 };
      const rule = jest.fn();
      createPositioningRule.mockReturnValue(rule);

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
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elements: 'all',
        position: { x: 500, y: 500 },
        strength: 4.2,
      });
      expectOtherRulesNotToHaveBeenCalled(createPositioningRule);
    });

    it('defaults the strength to 1.0', () => {
      const center = { x: 500, y: 500 };
      const rule = jest.fn();
      createPositioningRule.mockReturnValue(rule);

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
      expect(createPositioningRule).toHaveBeenCalledOnceWith({
        elements: 'all',
        position: { x: 500, y: 500 },
        strength: 1.0,
      });
      expectOtherRulesNotToHaveBeenCalled(createPositioningRule);
    });
  });


  describe('OrientingRule', () => {
    it('registers a relative positioning rule with the simulation context', () => {
      const rule = jest.fn();
      createOrientingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <OrientingRule
            baseElementId='base-element'
            targetElements={{ ids: ['target-element1', 'target-element2'] }}
            orientation={Orientation.BOTTOM_RIGHT}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createOrientingRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElements: { ids: ['target-element1', 'target-element2'] },
        orientation: Orientation.BOTTOM_RIGHT,
        strength: 4.2,
        tolerance: Math.PI / 6,
      });
      expectOtherRulesNotToHaveBeenCalled(createOrientingRule);
    });

    it('defaults the strength to 1.0', () => {
      const rule = jest.fn();
      createOrientingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <OrientingRule
            baseElementId='base-element'
            targetElements={{ ids: ['target-element1', 'target-element2'] }}
            orientation={Orientation.TOP_LEFT}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createOrientingRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElements: { ids: ['target-element1', 'target-element2'] },
        orientation: Orientation.TOP_LEFT,
        strength: 1.0,
        tolerance: Math.PI / 6,
      });
      expectOtherRulesNotToHaveBeenCalled(createOrientingRule);
    });

    it('translates the style prop to tolerance values', () => {
      const testCases = [
        { style: 'exact', tolerance: Math.PI / 12 },
        { style: 'narrow', tolerance: Math.PI / 6 },
        { style: 'medium', tolerance: Math.PI / 4 },
        { style: 'wide', tolerance: Math.PI / 3 },
      ];
      testCases.forEach(({ style, tolerance }) => {
        const wrapper = mount(
          <SimulationContext.Provider value={simulation}>
            <OrientingRule
              baseElementId='base-element'
              targetElements={{ id: 'target-element' }}
              orientation={Orientation.TOP_LEFT}
              style={style}
            />
          </SimulationContext.Provider>
        );

        expect(createOrientingRule).toHaveBeenCalledOnceWith({
          baseElementId: 'base-element',
          targetElements: { id: 'target-element' },
          orientation: Orientation.TOP_LEFT,
          strength: 1.0,
          tolerance,
        });
        createOrientingRule.mockReset();
      });
    });
  });

  describe('LinkingRule', () => {
    it('registers a linking rule with the simulation context', () => {
      const rule = jest.fn();
      createLinkingRule.mockReturnValue(rule);

      const wrapper = mount(
        <SimulationContext.Provider value={simulation}>
          <LinkingRule
            between={['base-element','target-element']}
            distance={45}
            strength={4.2}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createLinkingRule).toHaveBeenCalledOnceWith({
        between: ['base-element','target-element'],
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
            between={['base-element','target-element']}
            distance={45}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createLinkingRule).toHaveBeenCalledOnceWith({
        between: ['base-element','target-element'],
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
            targetElements={{ id: 'target-element' }}
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
        targetElements: { id: 'target-element' },
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
            targetElements={{ groupId: 'target-elements' }}
            distance={45}
          />
        </SimulationContext.Provider>
      );

      expect(simulation.registerRule).toHaveBeenCalledOnceWith(
        expect.any(String), rule
      );
      expect(createBindingRule).toHaveBeenCalledOnceWith({
        baseElementId: 'base-element',
        targetElements: { groupId: 'target-elements' },
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
