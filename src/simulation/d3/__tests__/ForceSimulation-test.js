jest.mock('d3-force');
jest.mock('elements/ShapeDefinition');

import ForceSimulation from '../ForceSimulation';

import * as d3 from 'd3-force';
import SimulationConfig from 'simulation/SimulationConfig';
import {
  ForceType,
  CenteringForceDefinition,
  RepellingForceDefinition
} from 'simulation/ForceDefinition';

import {
  ConstraintType,
  FixedDistanceConstraintDefinition,
  PreventCollisionsConstraintDefinition
} from 'simulation/ConstraintDefinition';

import MockShapeDefinition from 'elements/ShapeDefinition';

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
    };
    baseSimulation.force.mockReturnValue(baseSimulation);
    d3.forceSimulation.mockReturnValue(baseSimulation);

    d3ForceLink = {
      id: jest.fn(),
      distance: jest.fn(),
    };
    d3ForceLink.id.mockReturnValue(d3ForceLink);
    d3ForceLink.distance.mockReturnValue(d3ForceLink);
    d3.forceLink.mockReturnValue(d3ForceLink);

    d3ForceCenter = { id: 'center'};
    d3.forceCenter.mockReturnValue(d3ForceCenter);

    d3ForceManyBody = { id: 'manyBody' };
    d3.forceManyBody.mockReturnValue(d3ForceManyBody);

    d3ForceCollide = {
      radius: jest.fn(),
    };
    d3ForceCollide.radius.mockReturnValue(d3ForceCollide);
    d3.forceCollide.mockReturnValue(d3ForceCollide);
  });

  it('initializes a simulation in the constructor', () => {
    const shape1 = new MockShapeDefinition();
    const shape2 = new MockShapeDefinition();
    const shape3 = new MockShapeDefinition();
    const shape4 = new MockShapeDefinition();

    new ForceSimulation(new SimulationConfig({
      elementIds: ['1', '2', '3', '4'],
      elementShapes: {
        '1': shape1,
        '2': shape2,
        '3': shape3,
        '4': shape4,
      }
    }));

    expect(d3.forceSimulation).toHaveBeenCalledWith([
      { id: '1', shape: shape1, x: 0, y: 0 },
      { id: '2', shape: shape2, x: 0, y: 0 },
      { id: '3', shape: shape3, x: 0, y: 0 },
      { id: '4', shape: shape4, x: 0, y: 0 },
    ]);

    expect(baseSimulation.force).not.toHaveBeenCalled();
  });

  it('constructs centering forces', () => {
    new ForceSimulation(new SimulationConfig({
      forces: [ new CenteringForceDefinition({ x: 34, y: 91 }) ],
    }));
    expect(baseSimulation.force).toHaveBeenCalledWith('centering', d3ForceCenter);
    expect(baseSimulation.force).toHaveBeenCalledTimes(1);
    expect(d3.forceCenter).toHaveBeenCalledWith(34, 91);
  });

  it('constructs repelling forces', () => {
    new ForceSimulation(new SimulationConfig({
      forces: [ new RepellingForceDefinition() ],
    }));
    expect(baseSimulation.force).toHaveBeenCalledWith('repelling', d3ForceManyBody);
    expect(baseSimulation.force).toHaveBeenCalledTimes(1);
    expect(d3.forceManyBody).toHaveBeenCalled();
  });

  it('aggregates fixed distance constraints into one link force', () => {
    new ForceSimulation(new SimulationConfig({
      constraints: [
        new FixedDistanceConstraintDefinition({
          between: ['1', '2'],
          distance: 50,
        }),
        new FixedDistanceConstraintDefinition({
          between: ['2', '3'],
          distance: 10,
        }),
        new FixedDistanceConstraintDefinition({
          between: ['4', '2'],
          distance: 8,
        }),
        new FixedDistanceConstraintDefinition({
          between: ['1', '4'],
          distance: 25,
        }),
      ],
    }));
    expect(baseSimulation.force).toHaveBeenCalledWith('linking', d3ForceLink);
    expect(baseSimulation.force).toHaveBeenCalledTimes(1);
    expect(d3.forceLink).toHaveBeenCalledWith([
      { source: '1', target: '2', distance: 50 },
      { source: '2', target: '3', distance: 10 },
      { source: '4', target: '2', distance: 8 },
      { source: '1', target: '4', distance: 25 },
    ]);

    expect(d3ForceLink.id).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { id: '12' }, output: '12' },
      { input: { id: 'asdf' }, output: 'asdf' },
    ]));
    expect(d3ForceLink.distance).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { distance: 58 }, output: 58 },
      { input: { distance: 94 }, output: 94 },
    ]));
  });

  it('aggregates collision constraints into one collision force', () => {
    new ForceSimulation(new SimulationConfig({
      elementShapes: {
        '42': new MockShapeDefinition({ radius: 123 }),
        '8173': new MockShapeDefinition({ radius: 8 }),
        '9': new MockShapeDefinition({ radius: 912 }),
        '0192': new MockShapeDefinition({ radius: 78 }),

      },
      constraints: [
        new PreventCollisionsConstraintDefinition({
          elementId: '42',
        }),
        new PreventCollisionsConstraintDefinition({
          elementId: '8173',
        }),
        new PreventCollisionsConstraintDefinition({
          elementId: '9',
        }),
        new PreventCollisionsConstraintDefinition({
          elementId: '0192',
        }),
      ],
    }));
    expect(baseSimulation.force).toHaveBeenCalledWith('collision', d3ForceCollide);
    expect(baseSimulation.force).toHaveBeenCalledTimes(1);
    expect(d3.forceCollide).toHaveBeenCalled();

    expect(d3ForceCollide.radius).toHaveBeenCalledWith(expect.functionThatReturns([
      { input: { id: '42' }, output: 123 },
      { input: { id: '8173' }, output: 8 },
      { input: { id: '9' }, output: 912 },
      { input: { id: '0192' }, output: 78 },
    ]));
  });
});
