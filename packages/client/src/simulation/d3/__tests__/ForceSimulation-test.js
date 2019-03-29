jest.mock('d3-force');
jest.mock('../../../elements/ShapeDefinition');

import ForceSimulation from '../ForceSimulation';

import * as d3 from 'd3-force';
import {
  ForceType,
  CenteringForceDefinition,
  RepellingForceDefinition
} from '../../ForceDefinition';

import {
  ConstraintType,
  FixedDistanceConstraintDefinition,
} from '../../ConstraintDefinition';

import MockShapeDefinition from '../../../elements/ShapeDefinition';

describe('ForceSimulation', () => {
  let baseSimulation;
  let d3ForceLink;
  let d3ForceCenter;
  let d3ForceManyBody;
  let d3ForceCollide;

  beforeEach(() => {
    baseSimulation = {
      force: jest.fn(),
      on: jest.fn(),
      nodes: jest.fn(),
    };
    baseSimulation.force.mockReturnValue(baseSimulation);
    baseSimulation.nodes.mockReturnValue(baseSimulation);
    baseSimulation.on.mockReturnValue(baseSimulation);
    d3.forceSimulation.mockReturnValue(baseSimulation);

    d3ForceLink = {
      id: jest.fn(),
      distance: jest.fn(),
      links: jest.fn(),
    };
    d3ForceLink.id.mockReturnValue(d3ForceLink);
    d3ForceLink.distance.mockReturnValue(d3ForceLink);
    d3ForceLink.links.mockReturnValue(d3ForceLink);
    d3.forceLink.mockReturnValue(d3ForceLink);

    d3ForceCenter = { id: 'center'};
    d3.forceCenter.mockReturnValue(d3ForceCenter);

    d3ForceManyBody = {
      id: 'manyBody',
      strength: jest.fn()
    };
    d3ForceManyBody.strength.mockReturnValue(d3ForceManyBody);
    d3.forceManyBody.mockReturnValue(d3ForceManyBody);

    d3ForceCollide = {
      radius: jest.fn(),
    };
    d3ForceCollide.radius.mockReturnValue(d3ForceCollide);
    d3.forceCollide.mockReturnValue(d3ForceCollide);
  });

  it('initializes a simulation with base forces in the constructor', () => {
    new ForceSimulation();

    expect(d3.forceSimulation).toHaveBeenCalled();

    expect(baseSimulation.on).toHaveBeenCalled();
    expect(baseSimulation.force).toHaveBeenCalledWith(
      'link', d3ForceLink
    );
    expect(baseSimulation.force).toHaveBeenCalledWith(
      'preventCollisions', d3ForceCollide
    );
    expect(baseSimulation.force).toHaveBeenCalledTimes(2);

    expect(d3ForceLink.id).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { id: '12' }, output: '12' },
      { input: { id: 'asdf' }, output: 'asdf' },
    ]));
    expect(d3ForceLink.distance).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { distance: 58 }, output: 58 },
      { input: { distance: 94 }, output: 94 },
    ]));

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
      new ForceSimulation()
        .registerElement('1', shape1)
        .registerElement('2', shape2)
        .registerElement('3', shape3);

      expect(baseSimulation.nodes).toHaveBeenCalledWith([
        { id: '1', x: 0, y: 0, shape: shape1 },
      ]);
      expect(baseSimulation.nodes).toHaveBeenCalledWith([
        { id: '1', x: 0, y: 0, shape: shape1 },
        { id: '2', x: 0, y: 0, shape: shape2 },
      ]);
      expect(baseSimulation.nodes).toHaveBeenCalledWith([
        { id: '1', x: 0, y: 0, shape: shape1 },
        { id: '2', x: 0, y: 0, shape: shape2 },
        { id: '3', x: 0, y: 0, shape: shape3 },
      ]);
      expect(baseSimulation.nodes).toHaveBeenCalledTimes(3);
    });
  });

  describe('registerForce', () => {
    it('constructs centering forces', () => {
      new ForceSimulation()
        .registerForce(new CenteringForceDefinition({ x: 34, y: 91 }));
      expect(baseSimulation.force).toHaveBeenCalledWith('center', d3ForceCenter);
      expect(d3.forceCenter).toHaveBeenCalledWith(34, 91);
    });

    it('constructs repelling forces', () => {
      new ForceSimulation()
        .registerForce(new RepellingForceDefinition({ strengthMultiplier: 5.0 }));
      expect(baseSimulation.force).toHaveBeenCalledWith('repelling', d3ForceManyBody);
      expect(d3.forceManyBody).toHaveBeenCalled();
      expect(d3ForceManyBody.strength).toHaveBeenCalledWith(expect.functionThatReturns([
        {input: 'foo', output: -150.0}
      ]));
    });
  });

  describe('registerConstraint', () => {
    it('aggregates fixed distance constraints into one link force', () => {
      const links = [];
      d3ForceLink.links.mockImplementation(l => links.push(l.slice()));
      new ForceSimulation()
        .registerConstraint(
          new FixedDistanceConstraintDefinition({
            between: ['1', '2'],
            distance: 10
          })
        )
        .registerConstraint(
          new FixedDistanceConstraintDefinition({
            between: ['2', '4'],
            distance: 50
          })
        )
        .registerConstraint(
          new FixedDistanceConstraintDefinition({
            between: ['3', '4'],
            distance: 15
          })
        );
      expect(links).toEqual([
        [
          { source: '1', target: '2', distance: 10 }
        ],
        [
          { source: '1', target: '2', distance: 10 },
          { source: '2', target: '4', distance: 50 },
        ],
        [
          { source: '1', target: '2', distance: 10 },
          { source: '2', target: '4', distance: 50 },
          { source: '3', target: '4', distance: 15 },
        ],
      ]);
      expect(d3ForceLink.links).toHaveBeenCalledTimes(3);
    });
  });

  describe('onNewLayout', () => {
    it('adds a listener to the simulation\'s \'tick\' event', () => {
      const listener = jest.fn();
      const simulation = new ForceSimulation().onNewLayout(listener);
      expect(baseSimulation.on).toHaveBeenCalledWith('tick', expect.functionWithSideEffect({
        before: () => expect(listener).not.toHaveBeenCalled(),
        after: () => expect(listener).toHaveBeenCalledWith(simulation),
        reset: () => listener.mockClear()
      }));
    });
  });
});
