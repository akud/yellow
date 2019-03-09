jest.mock('shapes/ShapeDefinition');

import SimulationConfig from '../SimulationConfig';

import MockShapeDefinition from 'shapes/ShapeDefinition';
import Point from 'shapes/Point';

describe('SimulationConfig', () => {
  describe('getElementIds', () => {
    it('removes duplicates and returns an array', () => {
      const config = new SimulationConfig({
        elementIds: ['1', '2', '2', '3']
      });

      expect(config.getElementIds()).toEqual(['1', '2', '3']);
    });
  });

  describe('getElementShape', () => {
    it('returns the shape if specified', () => {
      const shape1 = new MockShapeDefinition();
      const shape2 = new MockShapeDefinition();
      const config = new SimulationConfig({
        elementIds: ['1', '2'],
        elementShapes: {
          '1': shape1,
          '2': shape2,
        }
      });

      expect(config.getElementShape('1')).toBe(shape1);
      expect(config.getElementShape('2')).toBe(shape2);
    });

    it('returns a point if shape is not specified', () => {
      const config = new SimulationConfig({
        elementIds: ['1']
      });

      expect(config.getElementShape('1')).toBeInstanceOf(Point);
    });
  });

  describe('combinedWith', () => {
    it('combines the properties from both configs', () => {
      const shape1 = new MockShapeDefinition();
      const shape2 = new MockShapeDefinition();
      const shape3 = new MockShapeDefinition();
      const shape4 = new MockShapeDefinition();
      const a = new SimulationConfig({
        elementIds: ['1', '2'],
        elementShapes: {
          '1': shape1,
          '2': shape2,
        },
        forces: [ 'A' ],
        constraints: [ 'B' ],
      });
      const b = new SimulationConfig({
        elementIds: ['3', '4'],
        elementShapes: {
          '3': shape3,
          '4': shape4,
        },
        forces: [ 'C' ],
        constraints: [ 'D' ],
      });

      expect(a.combinedWith(b)).toEqual(new SimulationConfig({
        elementIds: ['1', '2', '3', '4'],
        elementShapes: {
          '1': shape1,
          '2': shape2,
          '3': shape3,
          '4': shape4,
        },
        forces: [ 'A', 'C' ],
        constraints: [ 'B', 'D' ],
      }));
    });

    it('does not modify the original', () => {
      const shape1 = new MockShapeDefinition();
      const shape2 = new MockShapeDefinition();
      const a = new SimulationConfig({
        elementIds: ['1', '2'],
        elementShapes: {
          '1': shape1,
          '2': shape2,
        },
        forces: [ 'A' ],
        constraints: [ 'B' ],
      });
      const b = new SimulationConfig({
        elementIds: ['3', '4'],
        forces: [ 'C' ],
        constraints: [ 'D' ],
      });

      a.combinedWith(b);

      expect(a).toEqual(new SimulationConfig({
        elementIds: ['1', '2'],
        elementShapes: {
          '1': shape1,
          '2': shape2,
        },
        forces: [ 'A' ],
        constraints: [ 'B' ],
      }));
    });
  });

  describe('withNewLayoutListener', () => {
    it('adds a listener', () => {
      const listener = jest.fn();
      const config = new SimulationConfig({}).withNewLayoutListener(listener);
      expect(config.listeners.indexOf(listener)).not.toBe(-1);
    });

    it('does not modify the original', () => {
      const listener = jest.fn();
      const original = new SimulationConfig({});
      original.withNewLayoutListener(listener);
      expect(original.listeners.indexOf(listener)).toBe(-1);
    });
  });
});
