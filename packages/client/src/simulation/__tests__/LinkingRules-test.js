jest.mock('../../elements/geometry-utils');
jest.mock('../ForceSimulation');

import { createLinkingRule } from '../LinkingRules';

import { ForceApplication } from '../StateChanges';

import geometryUtils from '../../elements/geometry-utils';
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
        elementIds: [ elementId1 ],
        angle: PI_OVER_TWO,
        strength: 25,
      }),
      new ForceApplication({
        elementIds: [ elementId2 ],
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
        elementIds: [ elementId1 ],
        angle: TWO_PI,
        strength: 25,
      }),
      new ForceApplication({
        elementIds: [ elementId2 ],
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
