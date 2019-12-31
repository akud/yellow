jest.mock('../../../elements/geometry/geometry-utils');
jest.mock('../ForceSimulation');
jest.mock('../ElementSelector');

import {
  createLinkingRule,
  createBindingRule,
} from '../LinkingRules';

import ForceApplication from '../ForceApplication';
import {
  mockSelector,
  createElementSelector,
  resetMockSelector,
} from '../ElementSelector';

import geometryUtils from '../../../elements/geometry/geometry-utils';
import MockSimulation, { resetMockSimulation } from '../ForceSimulation';

describe('LinkingRules', () => {
  let simulation;
  let elementId1;
  let elementId2;
  let position1;
  let position2;

  beforeEach(() => {
    geometryUtils.mockReset();
    resetMockSimulation();
    resetMockSelector();
    simulation = new MockSimulation();
    position1 = { x: 34, y: -14 };
    position2 = { x: -91, y: 0.5 };
    elementId1 = 'element-1';
    elementId2 = 'element-2';

    simulation.getElementData.mockImplementation((elementId) => ({
      'element-1': { position: position1 },
      'element-2': { position: position2 },
    })[elementId]);
  });

  describe('createLinkingRule', () => {
    it('does nothing if the two points are already the desired distance away', () => {
      geometryUtils.distance.mockReturnValue(45);
      geometryUtils.approximatelyEqual.mockReturnValue(true);

      const rule = createLinkingRule({
        between: [ elementId1, elementId2 ],
        distance: 45.2,
      });

      expect(rule(simulation)).toEqual([]);

      expect(geometryUtils.distance).toHaveBeenCalledOnceWith(position1, position2);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledOnceWith(45.2, 45);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId1);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId2);
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);
    });

    it('pushes the elements together if they are further apart than desired', () => {
      geometryUtils.distance.mockReturnValue(150);
      geometryUtils.approximatelyEqual.mockReturnValue(false);
      geometryUtils.computeHorizontalIntersectionAngle.mockImplementation((p1, p2) => {
        if (p1.x === position1.x) {
          return PI_OVER_TWO;
        } else {
          return TWO_PI;
        }
      });

      const rule = createLinkingRule({
        between: [ elementId1, elementId2 ],
        distance: 50,
      });

      expect(rule(simulation)).toEqual([
        new ForceApplication({
          elements: { id: elementId1 },
          angle: PI_OVER_TWO,
          strength: 25,
        }),
        new ForceApplication({
          elements: { id: elementId2 },
          angle: TWO_PI,
          strength: 25,
        }),
      ]);

      expect(geometryUtils.distance).toHaveBeenCalledOnceWith(position1, position2);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledOnceWith(50, 150);
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position1,
        position2
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position2,
        position1
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledTimes(2);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId1);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId2);
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);
    });

    it('pushes the elements apart if they are closer together than desired', () => {
      geometryUtils.distance.mockReturnValue(50);
      geometryUtils.approximatelyEqual.mockReturnValue(false);
      geometryUtils.computeHorizontalIntersectionAngle.mockImplementation((p1, p2) => {
        if (p1.x === position1.x) {
          return PI_OVER_TWO;
        } else {
          return TWO_PI;
        }
      });

      const rule = createLinkingRule({
        between: [ elementId1, elementId2 ],
        distance: 150,
      });

      expect(rule(simulation)).toEqual([
        new ForceApplication({
          elements: { id: elementId1 },
          angle: TWO_PI,
          strength: 25,
        }),
        new ForceApplication({
          elements: { id: elementId2 },
          angle: PI_OVER_TWO,
          strength: 25,
        }),
      ]);

      expect(geometryUtils.distance).toHaveBeenCalledOnceWith(position1, position2);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledOnceWith(150, 50);
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position1,
        position2
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position2,
        position1
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledTimes(2);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId1);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId2);
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);
    });
  });

  describe('createBindingRule', () => {
    it('does nothing if the two points are already the desired distance away', () => {
      geometryUtils.distance.mockReturnValue(45);
      geometryUtils.approximatelyEqual.mockReturnValue(true);
      mockSelector.select.mockReturnValue([elementId2]);

      const rule = createBindingRule({
        baseElementId: elementId1,
        targetElements: { id: elementId2 },
        distance: 45.2,
      });

      expect(rule(simulation)).toEqual([]);

      expect(createElementSelector).toHaveBeenCalledOnceWith({ id: elementId2 });
      expect(mockSelector.select).toHaveBeenCalledOnceWith(simulation);

      expect(geometryUtils.distance).toHaveBeenCalledOnceWith(position1, position2);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledOnceWith(45.2, 45);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId1);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId2);
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);
    });

    it('pushes the target element towards the base element they are further apart than desired', () => {
      geometryUtils.distance.mockReturnValue(150);
      geometryUtils.approximatelyEqual.mockReturnValue(false);
      geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(TWO_PI);
      mockSelector.select.mockReturnValue([elementId2]);

      const rule = createBindingRule({
        baseElementId: elementId1,
        targetElements: { id: elementId2 },
        distance: 50,
      });

      expect(rule(simulation)).toEqual([
        new ForceApplication({
          elements: { id: elementId2 },
          angle: TWO_PI,
          strength: 25,
        }),
      ]);

      expect(createElementSelector).toHaveBeenCalledOnceWith({ id: elementId2 });
      expect(mockSelector.select).toHaveBeenCalledOnceWith(simulation);

      expect(geometryUtils.distance).toHaveBeenCalledOnceWith(position1, position2);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledOnceWith(50, 150);
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledOnceWith(
        position2,
        position1
      );
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId1);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId2);
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);
    });

    it('pushes the target element away from the base element they are further apart than desired', () => {
      geometryUtils.distance.mockReturnValue(50);
      geometryUtils.approximatelyEqual.mockReturnValue(false);
      geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(PI_OVER_TWO);
      mockSelector.select.mockReturnValue([elementId2]);

      const rule = createBindingRule({
        baseElementId: elementId1,
        targetElements: { id: elementId2 },
        distance: 150,
      });

      expect(rule(simulation)).toEqual([
        new ForceApplication({
          elements: { id: elementId2 },
          angle: PI_OVER_TWO,
          strength: 25,
        }),
      ]);

      expect(createElementSelector).toHaveBeenCalledOnceWith({ id: elementId2 });
      expect(mockSelector.select).toHaveBeenCalledOnceWith(simulation);

      expect(geometryUtils.distance).toHaveBeenCalledOnceWith(position1, position2);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledOnceWith(150, 50);
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledOnceWith(
        position1,
        position2
      );
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId1);
      expect(simulation.getElementData).toHaveBeenCalledWith(elementId2);
      expect(simulation.getElementData).toHaveBeenCalledTimes(2);
    });

    it('can handle multiple targetElements', () => {
      const position3 = { x: 4724, y: 9123 };
      const position4 = { x: -5240, y: 34.45 };

      simulation.getElementData.mockImplementation((elementId) => ({
        'element-1': { position: position1 },
        'element-2': { position: position2 },
        'element-3': { position: position3 },
        'element-4': { position: position4 },
      })[elementId]);

      mockSelector.select.mockReturnValue([
        'element-2',
        'element-3',
        'element-4',
      ]);

      geometryUtils.distance
        .mockReturnValueOnce(50)
        .mockReturnValueOnce(200)
        .mockReturnValueOnce(150);
      geometryUtils.approximatelyEqual
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      geometryUtils.computeHorizontalIntersectionAngle
        .mockReturnValueOnce(PI_OVER_TWO)
        .mockReturnValueOnce(FIVE_PI_OVER_FOUR);

      const rule = createBindingRule({
        baseElementId: elementId1,
        targetElements: {
          ids: [
            'element-2',
            'element-3',
            'element-4',
          ]
        },
        distance: 150,
      });

      expect(rule(simulation)).toEqual([
        new ForceApplication({
          elements: { id: 'element-2' },
          angle: PI_OVER_TWO,
          strength: 25,
        }),
        new ForceApplication({
          elements: { id: 'element-3' },
          angle: FIVE_PI_OVER_FOUR,
          strength: 12.5,
        }),
      ]);

      expect(createElementSelector).toHaveBeenCalledOnceWith({
          ids: [
            'element-2',
            'element-3',
            'element-4',
          ]
      });
      expect(mockSelector.select).toHaveBeenCalledOnceWith(simulation);

      expect(geometryUtils.distance).toHaveBeenCalledWith(position1, position2);
      expect(geometryUtils.distance).toHaveBeenCalledWith(position1, position3);
      expect(geometryUtils.distance).toHaveBeenCalledWith(position1, position4);
      expect(geometryUtils.distance).toHaveBeenCalledTimes(3);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledWith(150, 50);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledWith(150, 200);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledWith(150, 150);
      expect(geometryUtils.approximatelyEqual).toHaveBeenCalledTimes(3);
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position1,
        position2
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
        position3,
        position1
      );
      expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledTimes(2);
      expect(simulation.getElementData).toHaveBeenCalledWith('element-1');
      expect(simulation.getElementData).toHaveBeenCalledWith('element-2');
      expect(simulation.getElementData).toHaveBeenCalledWith('element-3');
      expect(simulation.getElementData).toHaveBeenCalledWith('element-4');
      expect(simulation.getElementData).toHaveBeenCalledTimes(4);
    });
  });
});
