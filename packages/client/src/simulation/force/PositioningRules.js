import utils from '../../utils';

import ElementSelector from './ElementSelector';
import ForceApplication from './ForceApplication';

import Orientation from '../Orientation';
import geometryUtils from '../../elements/geometry/geometry-utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('PositioningRules');

const SPRING_CONSTANT = 0.25;

/**
 * Create a simulation rule that pushes the specified elements in the direction of the
 * specified orientation
 *
 * elements - elementSelector defining the elements to which the rule applies
 * orientation - Orientation determining the direction to push elements in. e.g. Orientation.TOP_LEFT
 * strength - rule strength
 */
export const createDirectionalRule = ({ elements, orientation, strength=1.0}) => {
  ElementSelector.validate(elements);
  utils.requirePresent(orientation);
  utils.requireNonNegative(strength);

  return (simulation) => [
    new ForceApplication({
      elements,
      angle: orientation.getAngle(),
      strength
    })
  ];
}


/**
 * Create a simulation rule that pushes the specified elements towards the specified position
 *
 * elements - elementSelector defining the elements to which the rule applies
 * position - position to push the elements towards
 * strength - rule strength
 */
export const createPositioningRule = ({ elements, position, strength=1.0}) => {
  ElementSelector.validate(elements);
  utils.requirePositionObject(position);
  utils.requireNonNegative(strength);

  return (simulation) => ElementSelector.select(elements, simulation).map(elementId => {
    const elementData = simulation.getElementData(elementId);
    const angle = geometryUtils.computeHorizontalIntersectionAngle(
      elementData.position,
      position
    );
    const distance = geometryUtils.distance(elementData.position, position);

    return new ForceApplication({
      elements: { id: elementId },
      strength: strength * SPRING_CONSTANT * distance,
      angle,
    });
  });
}

/**
 * create a rule that positions a set of elements releative to a base element,
 * by pushing the target elemnt in specified orientation if the target
 * element is out of alignment with the orientation
 *
 * baseElementId - element id to use as the base element, which will not be pushed
 * targetElements - element selector defining the elements to be moved into orientation
 * orientation - Orientation determining the desired positioning. e.g. Orientation.TOP_LEFT
 * strength - rule strength
 */
export const createOrientingRule = ({ baseElementId, targetElements, orientation=Orientation.TOP_LEFT, strength=1.0}) => {
  const selector = ElementSelector.create(targetElements);
  utils.requirePresent(baseElementId);
  utils.requireOneOf(orientation, Object.values(Orientation));
  utils.requireNonNegative(strength);

  return (simulation) => {
    const baseElementData = simulation.getElementData(baseElementId);

    return selector.select(simulation).map((targetElementId) => {
      const targetElementData = simulation.getElementData(targetElementId);
      const isOriented = orientation.isOriented({
        anchorPoint: baseElementData.position,
        targetPoint: targetElementData.position,
      });

      if (!isOriented) {
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
        return new ForceApplication({
          elements: { id: targetElementId },
          angle: orientation.getAngle(),
          strength: applicationStrength,
        });
      }
    })
    .filter(Boolean);
  };
}

export default {
  createDirectionalRule,
  createPositioningRule,
  createOrientingRule,
}
