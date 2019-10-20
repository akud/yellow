jest.mock('d3-force');
jest.mock('../../../elements/ShapeDefinition');
jest.mock('../DirectionalForce');
jest.mock('../PositioningRule');
jest.mock('../RelativePositioningRule');

import ForceSimulation from '../ForceSimulation';

import * as d3 from 'd3-force';
import {
  ForceType,
  CenteringForceDefinition,
  RepellingForceDefinition,
  DirectionalForceDefinition,
} from '../../ForceDefinition';

import {
  RuleType,
  DistanceSettingRuleDefinition,
  PositioningRuleDefinition,
  RelativePositioningRuleDefinition,
} from '../../RuleDefinition';

import Direction from '../../Direction';

import MockDirectionalForce from '../DirectionalForce';
import MockPositioningRule from '../PositioningRule';
import MockRelativePositioningRule from '../RelativePositioningRule';

import MockShapeDefinition from '../../../elements/ShapeDefinition';

describe('ForceSimulation', () => {
  let baseSimulation;
  let d3ForceLink;
  let d3ForceCenter;
  let d3ForceManyBody;
  let d3ForceCollide;
  let d3DefaultLinkStrength;

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

    d3DefaultLinkStrength = jest.fn();
    d3ForceLink = {
      id: jest.fn(),
      distance: jest.fn(),
      links: jest.fn(),
      strength: jest.fn(),
    };
    d3ForceLink.id.mockReturnValue(d3ForceLink);
    d3ForceLink.distance.mockReturnValue(d3ForceLink);
    d3ForceLink.links.mockReturnValue(d3ForceLink);
    d3ForceLink.strength.mockImplementation(function() {
      if (arguments.length) {
        return d3ForceLink;
      } else {
        return d3DefaultLinkStrength;
      }
    });

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
      expect(baseSimulation.force).toHaveBeenCalledTimes(3);
    });

    it('constructs repelling forces', () => {
      new ForceSimulation()
        .registerForce(new RepellingForceDefinition({ strengthMultiplier: 5.0 }));
      expect(baseSimulation.force).toHaveBeenCalledWith('repelling', d3ForceManyBody);
      expect(d3.forceManyBody).toHaveBeenCalled();
      expect(d3ForceManyBody.strength).toHaveBeenCalledWith(expect.functionThatReturns([
        {input: 'foo', output: -150.0}
      ]));
      expect(baseSimulation.force).toHaveBeenCalledTimes(3);
    });

    it('constructs directional forces', () => {
      const upwardsForce = { id: '134241' };
      const rightwardsForce = { id: '346437' };

      MockDirectionalForce.create
        .mockReturnValueOnce(upwardsForce)
        .mockReturnValueOnce(rightwardsForce);

      new ForceSimulation().registerForce(
        new DirectionalForceDefinition({
          elementId: 'asdf',
          directions: [
            Direction.UP,
            Direction.RIGHT,
          ]
        })
      );
      expect(baseSimulation.force).toHaveBeenCalledWith('asdf-UP', upwardsForce);
      expect(baseSimulation.force).toHaveBeenCalledWith('asdf-RIGHT', rightwardsForce);
      expect(MockDirectionalForce.create).toHaveBeenCalledWith({
        elementId: 'asdf',
        direction: Direction.UP,
        strengthMultiplier: 1,
      });
      expect(MockDirectionalForce.create).toHaveBeenCalledWith({
        elementId: 'asdf',
        direction: Direction.RIGHT,
        strengthMultiplier: 1,
      });
      expect(baseSimulation.force).toHaveBeenCalledTimes(4);
    });
  });

  describe('registerRule', () => {
    it('aggregates distance setting rules into one link force', () => {
      const links = [];
      d3ForceLink.links.mockImplementation(l => links.push(l.slice()));
      new ForceSimulation()
        .registerRule(
          new DistanceSettingRuleDefinition({
            between: ['1', '2'],
            distance: 10
          })
        )
        .registerRule(
          new DistanceSettingRuleDefinition({
            between: ['2', '4'],
            distance: 50,
            strengthMultiplier: 2.5,
          })
        )
        .registerRule(
          new DistanceSettingRuleDefinition({
            between: ['3', '4'],
            distance: 15,
            strengthMultiplier: 1.5,
          })
        );

      const expectedLink1 = {
        source: '1',
        target: '2',
        distance: 10,
        strengthMultiplier: 1.0,
      };
      const expectedLink2 = {
        source: '2',
        target: '4',
        distance: 50,
        strengthMultiplier: 2.5,
      };
      const expectedLink3 = {
        source: '3',
        target: '4',
        distance: 15,
        strengthMultiplier: 1.5,
      };

      expect(links).toEqual([
        [
          expectedLink1,
        ],
        [
          expectedLink1,
          expectedLink2,
        ],
        [
          expectedLink1,
          expectedLink2,
          expectedLink3,
        ],
      ]);
      expect(d3ForceLink.links).toHaveBeenCalledTimes(3);

      d3DefaultLinkStrength.mockReturnValue(3.14);
      expect(d3DefaultLinkStrength).not.toHaveBeenCalled();

      expect(d3ForceLink.strength).toHaveBeenCalledTimes(2);
      expect(d3ForceLink.strength).toHaveBeenCalledWith();
      expect(d3ForceLink.strength).toHaveBeenCalledWith(expect.functionThatReturns([
        { input: expectedLink1, output: 3.14 },
        { input: expectedLink2, output: 2.5 * 3.14 },
        { input: expectedLink3, output: 1.5 * 3.14 },
      ]));
      expect(baseSimulation.force).toHaveBeenCalledTimes(2);
    });

    it('registers positioning rules', () => {
      const force = { id: 3462435 };
      MockPositioningRule.create.mockReturnValue(force);

      new ForceSimulation().registerRule(
        new PositioningRuleDefinition({
          elementId: 't35234',
          x: 68,
          y: 1923,
        })
      );

      expect(baseSimulation.force).toHaveBeenCalledWith(
        't35234-fixed-position',
        force
      );
      expect(MockPositioningRule.create).toHaveBeenCalledWith({
          elementId: 't35234',
          x: 68,
          y: 1923,
      });
      expect(baseSimulation.force).toHaveBeenCalledTimes(3);
    });

    it('registers relative positioning rules', () => {
      const force = { id: 3462435 };
      MockRelativePositioningRule.create.mockReturnValue(force);

      new ForceSimulation().registerRule(
        new RelativePositioningRuleDefinition({
          baseElementId: 't72gwr',
          targetElementId: 'el632',
          directions: [ Direction.RIGHT, Direction.DOWN ],
          strengthMultiplier: 1.5,
        })
      );

      expect(baseSimulation.force).toHaveBeenCalledWith(
        't72gwr-el632-relative-position',
        force
      );
      expect(MockRelativePositioningRule.create).toHaveBeenCalledWith({
          baseElementId: 't72gwr',
          targetElementId: 'el632',
          directions: [ Direction.RIGHT, Direction.DOWN ],
          strengthMultiplier: 1.5,
      });
      expect(baseSimulation.force).toHaveBeenCalledTimes(3);
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
