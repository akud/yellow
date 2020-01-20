jest.mock('../../../elements/geometry/geometry-utils');
jest.mock('../ForceSimulation');
jest.mock('../../Orientation');
jest.mock('../ElementSelector');

import {
  createDirectionalRule,
  createPositioningRule,
  createOrientingRule,
} from '../PositioningRules';
import ForceApplication from '../ForceApplication';

import Orientation, { resetMockOrientations } from '../../Orientation';
import { createElementSelector, mockSelector, resetMockSelector } from '../ElementSelector';

import geometryUtils from '../../../elements/geometry/geometry-utils';
import MockSimulation, { resetMockSimulation } from '../ForceSimulation';

describe('PositioningRules', () => {
  let simulation;

  beforeEach(() => {
    geometryUtils.mockReset();
    resetMockSimulation();
    resetMockOrientations();
    resetMockSelector();
    simulation = new MockSimulation();
  });

  describe('createDirectionalRule', () => {
    it('creates a rule that pushes the provided elements in the direction of the specified orientation', () => {
      Orientation.TOP.getAngle.mockReturnValue(PI_OVER_TWO);
      const rule = createDirectionalRule({
        elements: { ids: ['a', 'b', 'c'] },
        orientation: Orientation.TOP,
        strength: 5.3
      });

      expect(rule()).toEqual([
        new ForceApplication({
          elements: { ids: ['a', 'b', 'c'] },
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
        elements: { groupId: 'g134' },
        position,
        strength: 2.5,
      });

      const position1 = { x: 0, y: 0 };
      const position2 = { x: -3, y: 18 };
      const position7 = { x: 10, y: -5 };

      mockSelector.select.mockReturnValue([ '1', '2', '7' ]);
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
          elements: { id: '1' },
          strength: 2.5,
          angle: PI,
        }),
        new ForceApplication({
          elements: { id: '2' },
          strength: 6.25,
          angle: PI_OVER_TWO,
        }),
        new ForceApplication({
          elements: { id: '7' },
          strength: 4.6875,
          angle: THREE_PI_OVER_TWO,
        }),
      ]);

      expect(createElementSelector).toHaveBeenCalledOnceWith({ groupId: 'g134' });
      expect(mockSelector.select).toHaveBeenCalledOnceWith(simulation);

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

  describe('createOrientingRule', () => {
    it('pushes the target elements towards an oriented position the same distance away', () => {
      const orientation = Orientation.BOTTOM_LEFT;
      const baseElementData = { position: { x: 234, y: 4754 } };
      const targetElementData1 = { position: { x: 15674, y: -36452 } };
      const targetElementData2 = { position: { x: 1214, y: 89 } };

      const desiredPosition1 = { x: 723.345, y: 3462.776 };
      const desiredPosition2 = { x: 93264, y: 814 };

      mockSelector.select.mockReturnValue([
        'target-element1',
        'target-element2',
      ]);
      simulation.getElementData.mockImplementation((elementId) => ({
        'base-element': baseElementData,
        'target-element1': targetElementData1,
        'target-element2': targetElementData2,
      }[elementId]));

      orientation.isOriented.mockReturnValue(false);
      orientation.getAngle.mockReturnValue(PI_OVER_FOUR);

      geometryUtils.computeHorizontalIntersectionAngle
        .mockReturnValueOnce(THREE_PI_OVER_FOUR)
        .mockReturnValueOnce(PI_OVER_TWO);

      geometryUtils.pointAwayFrom
        .mockReturnValueOnce(desiredPosition1)
        .mockReturnValueOnce(desiredPosition2);

      geometryUtils.distance
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(4);

      const rule = createOrientingRule({
        baseElementId: 'base-element',
        targetElements: { ids: [ 'target-element1', 'target-element2' ] },
        orientation,
        strength: 5.6,
        tolerance: Math.PI / 3,
      });

      expect(rule(simulation)).toEqual([
        new ForceApplication({
          elements: { id: 'target-element1' },
          angle: THREE_PI_OVER_FOUR,
          strength: 2 * 0.25 * 5.6
        }),
        new ForceApplication({
          elements: { id: 'target-element2' },
          angle: PI_OVER_TWO,
          strength: 4 * 0.25 * 5.6
        }),
      ]);

      expect(createElementSelector).toHaveBeenCalledOnceWith({
        ids: ['target-element1', 'target-element2'],
      });
      expect(mockSelector.select).toHaveBeenCalledOnceWith(simulation);

      expect(simulation.getElementData).toHaveBeenCalledWith('base-element');
      expect(simulation.getElementData).toHaveBeenCalledWith('target-element1');
      expect(simulation.getElementData).toHaveBeenCalledWith('target-element2');
      expect(simulation.getElementData).toHaveBeenCalledTimes(3);

      expect(orientation.isOriented).toHaveBeenCalledWith({
        anchorPoint: baseElementData.position,
        targetPoint: targetElementData1.position,
        tolerance: Math.PI / 3,
      });
      expect(orientation.isOriented).toHaveBeenCalledWith({
        anchorPoint: baseElementData.position,
        targetPoint: targetElementData2.position,
        tolerance: Math.PI / 3,
      });
      expect(orientation.isOriented).toHaveBeenCalledTimes(2);

      expect(orientation.getAngle).toHaveBeenCalled();

      expect(geometryUtils.pointAwayFrom).toHaveBeenCalledWith({
        base: baseElementData.position,
        distance: 1,
        angle: orientation.getAngle()
      });
      expect(geometryUtils.pointAwayFrom).toHaveBeenCalledWith({
        base: baseElementData.position,
        distance: 3,
        angle: orientation.getAngle()
      });
      expect(geometryUtils.pointAwayFrom).toHaveBeenCalledTimes(2);

      expect(geometryUtils.distance).toHaveBeenCalledWith(
        baseElementData.position, targetElementData1.position
      );
      expect(geometryUtils.distance).toHaveBeenCalledWith(
        targetElementData1.position, desiredPosition1
      );
      expect(geometryUtils.distance).toHaveBeenCalledWith(
        baseElementData.position, targetElementData2.position
      );
      expect(geometryUtils.distance).toHaveBeenCalledWith(
        targetElementData2.position, desiredPosition2
      );
      expect(geometryUtils.distance).toHaveBeenCalledTimes(4);

      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        targetElementData1.position,
        desiredPosition1
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        targetElementData2.position,
        desiredPosition2
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledTimes(2);
    });

    it('does nothing if the target element is oriented correctly', () => {
      const orientation = Orientation.TOP;
      const baseElementData = { position: { x: 234, y: 4754 } };
      const targetElementData = { position: { x: 15674, y: -36452 } };

      mockSelector.select.mockReturnValue(['target-element'])
      simulation.getElementData.mockImplementation((elementId) => ({
        'base-element': baseElementData,
        'target-element': targetElementData,
      }[elementId]));

      orientation.isOriented.mockReturnValue(true);

      const rule = createOrientingRule({
        baseElementId: 'base-element',
        targetElements: { id: 'target-element' },
        orientation,
      });

      expect(rule(simulation)).toEqual([]);

      expect(createElementSelector).toHaveBeenCalledOnceWith({
        id: 'target-element',
      });
      expect(mockSelector.select).toHaveBeenCalledOnceWith(simulation);

      expect(simulation.getElementData).toHaveBeenCalledWith('base-element');
      expect(simulation.getElementData).toHaveBeenCalledWith('target-element');
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);

      expect(orientation.isOriented).toHaveBeenCalledOnceWith({
        anchorPoint: baseElementData.position,
        targetPoint: targetElementData.position,
        tolerance: Math.PI / 12,
      });
      expect(geometryUtils.computeHorizontalIntersectionAngle).not.toHaveBeenCalled();
    });
  });
});
