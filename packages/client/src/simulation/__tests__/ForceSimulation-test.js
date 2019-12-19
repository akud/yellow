jest.mock('d3-force');
jest.mock('../../elements/ShapeDefinition');
jest.mock('../ForceApplication');

import ForceSimulation from '../ForceSimulation';

import * as d3 from 'd3-force';

import MockShapeDefinition from '../../elements/ShapeDefinition';
import ForceApplication from '../ForceApplication';

describe('ForceSimulation', () => {
  let d3Simulation;
  let d3ForceCollide;
  let d3ForceManyBody;

  const newSimulation = (opts) => new ForceSimulation(Object.assign({
    width: 500,
    height: 500,
    center: { x: 250, y: 250 },
  }, opts));

  beforeEach(() => {
    d3Simulation = {
      force: jest.fn(),
      on: jest.fn(),
      nodes: jest.fn(),
    };
    d3Simulation.force.mockReturnValue(d3Simulation);
    d3Simulation.nodes.mockReturnValue(d3Simulation);
    d3Simulation.on.mockReturnValue(d3Simulation);
    d3.forceSimulation.mockReturnValue(d3Simulation);

    d3ForceCollide = {
      radius: jest.fn(),
    };
    d3ForceCollide.radius.mockReturnValue(d3ForceCollide);
    d3.forceCollide.mockReturnValue(d3ForceCollide);

    d3ForceManyBody = {
      strength: jest.fn()
    };
    d3ForceManyBody.strength.mockReturnValue(d3ForceManyBody);
    d3.forceManyBody.mockReturnValue(d3ForceManyBody);
  });

  it('initializes a simulation with base forces', () => {
    const simulation = newSimulation();

    expect(d3.forceSimulation).toHaveBeenCalled();

    expect(d3Simulation.on).toHaveBeenCalled();
    expect(d3Simulation.force).toHaveBeenCalledWith(
      'preventCollisions', d3ForceCollide
    );
    expect(d3Simulation.force).toHaveBeenCalledWith(
      'ruleForce', expect.any(Function)
    );

    expect(d3Simulation.force).toHaveBeenCalledTimes(2);
    expect(d3ForceCollide.radius).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { shape: new MockShapeDefinition({ radius: 4 }) }, output: 4 },
      { input: { shape: new MockShapeDefinition({ radius: 5 }) }, output: 5 },
      { input: { shape: new MockShapeDefinition({ radius: 6 }) }, output: 6 },
    ]));
  });

  describe('registerElement', () => {
    it('adds the element to the simulation', () => {
      const shape1 = new MockShapeDefinition();
      const shape2 = new MockShapeDefinition();
      const shape3 = new MockShapeDefinition();
      newSimulation({ center: { x: 100, y: 200 } })
        .registerElement('1', shape1)
        .registerElement('2', shape2)
        .registerElement('3', shape3);

      expect(d3Simulation.nodes).toHaveBeenCalledWith([
        { id: '1', x: 100, y: 200, vx: 0, vy: 0, shape: shape1 },
      ]);
      expect(d3Simulation.nodes).toHaveBeenCalledWith([
        { id: '1', x: 100, y: 200, vx: 0, vy: 0, shape: shape1 },
        { id: '2', x: 100, y: 200, vx: 0, vy: 0, shape: shape2 },
      ]);
      expect(d3Simulation.nodes).toHaveBeenCalledWith([
        { id: '1', x: 100, y: 200, vx: 0, vy: 0, shape: shape1 },
        { id: '2', x: 100, y: 200, vx: 0, vy: 0, shape: shape2 },
        { id: '3', x: 100, y: 200, vx: 0, vy: 0, shape: shape3 },
      ]);
      expect(d3Simulation.nodes).toHaveBeenCalledTimes(3);
    });
  });

  describe('registerGroup', () => {
    it('registers the group element ids so they can be retrieved by getGroupElementIds', () => {
      const simulation = newSimulation()
        .registerGroup('group1', ['e1', 'e2', 'e3'])
        .registerGroup('group2', ['e4', 'e5']);

      expect(simulation.getGroupElementIds('group1')).toEqual(['e1', 'e2', 'e3']);
      expect(simulation.getGroupElementIds('group2')).toEqual(['e4', 'e5']);
      expect(simulation.getGroupElementIds('foo')).toEqual([]);
    });
  });

  describe('setRepellingForceStrength', () => {
    it('registers a d3.forceManyBody() force on the simulation', () => {
      newSimulation().setRepellingForceStrength(3.5);

      expect(d3ForceManyBody.strength).toHaveBeenCalledWith(-30 * 3.5);
      expect(d3Simulation.force).toHaveBeenCalledWith('repelling', d3ForceManyBody);
      expect(d3Simulation.force).toHaveBeenCalledTimes(3);
    });
  });

  describe('registerRule', () => {

    const callRuleForce = (alpha) => {
      const ruleForce = d3Simulation.force.mock.calls.find(e => e[0] === 'ruleForce')[1]
      ruleForce(alpha || 1.0);
    };

    const getElementVelocity = (simulation, elementId) => ({
      x: simulation.elements[elementId].vx,
      y: simulation.elements[elementId].vy,
    });

    const setElementVelocity = (simulation, elementId, { x, y }) => {
      const element = simulation.elements[elementId];
      element.vx = x;
      element.vy = y;
    };

    it('adds rules to the runtime rule set', () => {
      const rule1 = jest.fn().mockReturnValue([]);
      const rule2 = jest.fn().mockReturnValue([]);
      const simulation = newSimulation().registerRule('rule1', rule1);

      callRuleForce();

      expect(rule1).toHaveBeenCalled();
      expect(rule2).not.toHaveBeenCalled();

      simulation.registerRule('rule2', rule2)

      callRuleForce();

      expect(rule1).toHaveBeenCalledTimes(2);
      expect(rule2).toHaveBeenCalledTimes(1);

    });

    describe('ruleForce', () => {
      it('does nothing if there are no elements', () => {
        newSimulation();
        callRuleForce();
      });

      it('modifies element velocities based on rule-driven x and y components', () => {
        const forceApplication1 = new ForceApplication({
          elementIds: ['element-1'],
          xComponent: 3,
          yComponent: -7,
        });
        const forceApplication2 = new ForceApplication({
          elementIds: ['element-2'],
          xComponent: -2.5,
          yComponent: 11,
        });
        const forceApplication3 = new ForceApplication({
          elementIds: ['element-2', 'element-3'],
          xComponent: 3.5,
          yComponent: 0,
        });

        const rule1 = jest.fn().mockReturnValue([
          forceApplication1,
          forceApplication2,
        ]);
        const rule2 = jest.fn().mockReturnValue([
          forceApplication3,
        ]);
        const simulation = newSimulation()
          .registerElement('element-1')
          .registerElement('element-2')
          .registerElement('element-3')
          .registerRule('rule1', rule1)
          .registerRule('rule2', rule2);

        expect(rule1).not.toHaveBeenCalled();
        expect(rule2).not.toHaveBeenCalled();

        expect(getElementVelocity(simulation, 'element-1')).toEqual({
          x: 0, y: 0
        });
        expect(getElementVelocity(simulation, 'element-2')).toEqual({
          x: 0, y: 0
        });
        expect(getElementVelocity(simulation, 'element-3')).toEqual({
          x: 0, y: 0
        });

        setElementVelocity(
          simulation,
          'element-1',
          { x: 92, y: 6 },
        );
        setElementVelocity(
          simulation,
          'element-2',
          { x: -6, y: 0 },
        );
        setElementVelocity(
          simulation,
          'element-3',
          { x: 18, y: -43 },
        );

        callRuleForce();

        expect(rule1).toHaveBeenCalled();
        expect(rule2).toHaveBeenCalled();

        expect(getElementVelocity(simulation, 'element-1')).toEqual({
          x: 95, y: -1
        });
        expect(getElementVelocity(simulation, 'element-2')).toEqual({
          x: -5, y: 11
        });
        expect(getElementVelocity(simulation, 'element-3')).toEqual({
          x: 21.5, y: -43
        });
      });

      it('scales the rule-driven forces by the current simulation alpha', () => {
        const forceApplication = new ForceApplication({
          elementIds: ['element-1'],
          xComponent: 2,
          yComponent: 0.5,
        });
        const rule = jest.fn().mockReturnValue([forceApplication]);

        const simulation = newSimulation()
          .registerElement('element-1')
          .registerRule('rule', rule);

        callRuleForce(0.75);

        expect(getElementVelocity(simulation, 'element-1')).toEqual({
          x: 1.5, y: 0.375
        });
      });
    });
  });

  describe('onNewLayout', () => {
    it('adds a listener to the simulation\'s \'tick\' event', () => {
      const listener = jest.fn();
      const simulation = newSimulation().onNewLayout(listener);
      expect(d3Simulation.on).toHaveBeenCalledWith('tick', expect.functionWithSideEffect({
        before: () => expect(listener).not.toHaveBeenCalled(),
        after: () => expect(listener).toHaveBeenCalledWith(simulation),
        reset: () => listener.mockClear()
      }));
    });
  });
});
