import utils from '../utils';

import ForceApplication from './ForceApplication';

import Orientation from '../elements/Orientation';
import geometryUtils from '../elements/geometry-utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('PositioningRules');

const SPRING_CONSTANT = 0.25;

/**
 * Create a simulation rule that pushes the specified elements towards the specified position
 */
export const createPositioningRule = ({ elementIds, position, strength=1.0}) => {
  utils.requireArray(elementIds);
  utils.requirePositionObject(position);
  utils.requireNonNegative(strength);

  return (simulation) => elementIds.map(elementId => {
    const elementData = simulation.getElementData(elementId);
    const angle = geometryUtils.computeHorizontalIntersectionAngle(
      elementData.position,
      position
    );
    const distance = geometryUtils.distance(elementData.position, position);

    return new ForceApplication({
      elementIds: [ elementId ],
      strength: strength * SPRING_CONSTANT * distance,
      angle,
    });
  });
}

/**
 * Create a simulation rule that pushes all elements towards the specified position
 */
export const createUniversalPositioningRule = ({ position, strength=1.0}) => {
  utils.requirePositionObject(position);
  utils.requireNonNegative(strength);

  return (simulation) => simulation.getElementIds().map(elementId => {
    const elementData = simulation.getElementData(elementId);
    const angle = geometryUtils.computeHorizontalIntersectionAngle(
      elementData.position,
      position
    );
    const distance = geometryUtils.distance(elementData.position, position);

    return new ForceApplication({
      elementIds: [ elementId ],
      strength: strength * SPRING_CONSTANT * distance,
      angle,
    });
  });
}

/**
 * create a rule that positions one element releative to another,
 * by pushing the target elemnt in specified orientation if the target
 * element is out of alignment with the orientation
 */
export const createRelativePositioningRule = ({ baseElementId, targetElementId, orientation=Orientation.TOP_LEFT, strength=1.0}) => {
  utils.requirePresent(baseElementId);
  utils.requirePresent(targetElementId);
  utils.requireOneOf(orientation, Object.values(Orientation));
  utils.requireNonNegative(strength);

  return (simulation) => {
    const baseElementData = simulation.getElementData(baseElementId);
    const targetElementData = simulation.getElementData(targetElementId);
    const isOriented = geometryUtils.isOriented({
      orientation,
      anchorPoint: baseElementData.position,
      targetPoint: targetElementData.position,
    });

    if (isOriented) {
      return [];
    } else {
      const currentAngle = geometryUtils.computeHorizontalIntersectionAngle(
        baseElementData.position,
        targetElementData.position
      );
      const angleMisalignment = Math.abs(orientation.getAngle() - currentAngle);
      const applicationStrength = strength * angleMisalignment;

      LOGGER.debug(
        'target element {} is not {}-oriented with respect to element {}; pushing with strength {}',
        targetElementId,
        orientation.getName(),
        baseElementId,
        applicationStrength
      );
      return [
        new ForceApplication({
          elementIds: [ targetElementId ],
          angle: orientation.getAngle(),
          strength: applicationStrength,
        })
      ];
    }
  };
}

export default {
  createPositioningRule,
  createUniversalPositioningRule,
  createRelativePositioningRule,
}
