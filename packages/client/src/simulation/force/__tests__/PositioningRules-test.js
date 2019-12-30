jest.mock('../../../elements/geometry/geometry-utils');
jest.mock('../ForceSimulation');
jest.mock('../../Orientation');

import {
  createDirectionalRule,
  createPositioningRule,
  createUniversalPositioningRule,
  createOrientingRule,
} from '../PositioningRules';
import ForceApplication from '../ForceApplication';

import Orientation, { resetMockOrientations } from '../../Orientation';

import geometryUtils from '../../../elements/geometry/geometry-utils';
import MockSimulation, { resetMockSimulation } from '../ForceSimulation';

describe('PositioningRules', () => {
  let simulation;

  beforeEach(() => {
    geometryUtils.mockReset();
    resetMockSimulation();
    resetMockOrientations();
    simulation = new MockSimulation();
  });

  describe('createDirectionalRule', () => {
    it('creates a rule that pushes the provided elements in the direction of the specified orientation', () => {
      Orientation.TOP.getAngle.mockReturnValue(PI_OVER_TWO);
      const rule = createDirectionalRule({
        elementIds: ['a', 'b', 'c'],
        orientation: Orientation.TOP,
        strength: 5.3
      });

      expect(rule()).toEqual([
        new ForceApplication({
          elementIds: ['a', 'b', 'c'],
          angle: PI_OVER_TWO,
          strength: 5.3
        })
      ]);
    });
  });

  describe('createPositioningRule', () => {
    it('creates a rule that pushes the provided elements to the specified point', () => {
      const position = { x: 10, y: -5 };
      const rule = createPositioningRule({
        elementIds: [ '1', '2', '7' ],
        position,
        strength: 2.5,
      });

      const position1 = { x: 0, y: 0 };
      const position2 = { x: -3, y: 18 };
      const position7 = { x: 10, y: -5 };

      simulation.getElementData.mockImplementation((elementId) => ({
        '1': { position: position1 },
        '2': { position: position2 },
        '7': { position: position7 },
      }[elementId]));

      geometryUtils.computeHorizontalIntersectionAngle
        .mockReturnValueOnce(PI)
        .mockReturnValueOnce(PI_OVER_TWO)
        .mockReturnValueOnce(THREE_PI_OVER_TWO);
      geometryUtils.distance
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(10)
        .mockReturnValueOnce(7.5);

      const forceApplications = rule(simulation);

      expect(forceApplications).toEqual([
        new ForceApplication({
          elementIds: [ '1' ],
          strength: 2.5,
          angle: PI,
        }),
        new ForceApplication({
          elementIds: [ '2' ],
          strength: 6.25,
          angle: PI_OVER_TWO,
        }),
        new ForceApplication({
          elementIds: [ '7' ],
          strength: 4.6875,
          angle: THREE_PI_OVER_TWO,
        }),
      ]);

      expect(simulation.getElementData).toHaveBeenCalledWith('1');
      expect(simulation.getElementData).toHaveBeenCalledWith('2');
      expect(simulation.getElementData).toHaveBeenCalledWith('7');
      expect(simulation.getElementData).toHaveBeenCalledTimes(3);
      expect(simulation.getElementIds).not.toHaveBeenCalled();

      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position1,
        position
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position2,
        position
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position7,
        position
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledTimes(3);

      expect(geometryUtils.distance).toHaveBeenCalledWith(
        position1,
        position
      );
      expect(geometryUtils.distance).toHaveBeenCalledWith(
        position2,
        position
      );
      expect(geometryUtils.distance).toHaveBeenCalledWith(
        position7,
        position
      );
      expect(geometryUtils.distance).toHaveBeenCalledTimes(3);
    });
  });

  describe('createUniversalPositioningRule', () => {
    it('creates a rule that pushes all elements to the specified position', () => {
      const position = { x: 10, y: -5 };
      const rule = createUniversalPositioningRule({ position });

      const position1 = { x: 0, y: 0 };
      const position2 = { x: -3, y: 18 };
      const position7 = { x: 10, y: -5 };

      simulation.getElementIds.mockReturnValue(['1', '2', '7']);

      simulation.getElementData.mockImplementation((elementId) => ({
        '1': { position: position1 },
        '2': { position: position2 },
        '7': { position: position7 },
      }[elementId]));

      geometryUtils.computeHorizontalIntersectionAngle
        .mockReturnValueOnce(PI)
        .mockReturnValueOnce(PI_OVER_TWO)
        .mockReturnValueOnce(THREE_PI_OVER_TWO);
      geometryUtils.distance
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(10)
        .mockReturnValueOnce(7.5);

      const forceApplications = rule(simulation);

      expect(forceApplications).toEqual([
        new ForceApplication({
          elementIds: [ '1' ],
          strength: 1.0,
          angle: PI,
        }),
        new ForceApplication({
          elementIds: [ '2' ],
          strength: 2.5,
          angle: PI_OVER_TWO,
        }),
        new ForceApplication({
          elementIds: [ '7' ],
          strength: 1.875,
          angle: THREE_PI_OVER_TWO,
        }),
      ]);

      expect(simulation.getElementData).toHaveBeenCalledWith('1');
      expect(simulation.getElementData).toHaveBeenCalledWith('2');
      expect(simulation.getElementData).toHaveBeenCalledWith('7');
      expect(simulation.getElementData).toHaveBeenCalledTimes(3);
      expect(simulation.getElementIds).toHaveBeenCalledOnce();

      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position1,
        position
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position2,
        position
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position7,
        position
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledTimes(3);

      expect(geometryUtils.distance).toHaveBeenCalledWith(
        position1,
        position
      );
      expect(geometryUtils.distance).toHaveBeenCalledWith(
        position2,
        position
      );
      expect(geometryUtils.distance).toHaveBeenCalledWith(
        position7,
        position
      );
      expect(geometryUtils.distance).toHaveBeenCalledTimes(3);
    });
  });

  describe('createOrientingRule', () => {
    it('pushes the target element in the orientation\'s direction', () => {
      const orientation = Orientation.BOTTOM_LEFT;
      const baseElementData = { position: { x: 234, y: 4754 } };
      const targetElementData = { position: { x: 15674, y: -36452 } };

      simulation.getElementData.mockImplementation((elementId) => ({
        'base-element': baseElementData,
        'target-element': targetElementData,
      }[elementId]));

      orientation.isOriented.mockReturnValue(false);
      orientation.getAngle.mockReturnValue(PI_OVER_FOUR);
      geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
        THREE_PI_OVER_FOUR
      );

      const rule = createOrientingRule({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        orientation,
        strength: 5.6,
      });

      expect(rule(simulation)).toEqual([
        new ForceApplication({
          elementIds: ['target-element'],
          angle: PI_OVER_FOUR,
          strength: PI_OVER_TWO * 5.6
        }),
      ]);

      expect(simulation.getElementData).toHaveBeenCalledWith('base-element');
      expect(simulation.getElementData).toHaveBeenCalledWith('target-element');
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);

      expect(orientation.isOriented).toHaveBeenCalledOnceWith({
        anchorPoint: baseElementData.position,
        targetPoint: targetElementData.position,
      });
      expect(orientation.getAngle).toHaveBeenCalled();
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledOnceWith(
        baseElementData.position,
        targetElementData.position
      );
    });

    it('does nothing if the target element is oriented correctly', () => {
      const orientation = Orientation.TOP;
      const baseElementData = { position: { x: 234, y: 4754 } };
      const targetElementData = { position: { x: 15674, y: -36452 } };

      simulation.getElementData.mockImplementation((elementId) => ({
        'base-element': baseElementData,
        'target-element': targetElementData,
      }[elementId]));

      orientation.isOriented.mockReturnValue(true);

      const rule = createOrientingRule({
        baseElementId: 'base-element',
        targetElementId: 'target-element',
        orientation,
      });

      expect(rule(simulation)).toEqual([]);

      expect(simulation.getElementData).toHaveBeenCalledWith('base-element');
      expect(simulation.getElementData).toHaveBeenCalledWith('target-element');
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);

      expect(orientation.isOriented).toHaveBeenCalledOnceWith({
        anchorPoint: baseElementData.position,
        targetPoint: targetElementData.position,
      });
      expect(geometryUtils.computeHorizontalIntersectionAngle).not.toHaveBeenCalled();
    });
  });
});
