import utils from '../../utils';

import ElementSelector from './ElementSelector';
import ForceApplication from './ForceApplication';

import Orientation from '../Orientation';
import geometryUtils from '../../elements/geometry/geometry-utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('PositioningRules');


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
export const createPositioningRule = ({ elements, position, windowSize, strength=1.0}) => {
  ElementSelector.validate(elements);
  utils.requirePositionObject(position);
  utils.requireNonNegative(strength);
  utils.requireSizeObject(windowSize);

  return (simulation) => ElementSelector.select(elements, simulation).map(elementId => {
    const elementData = simulation.getElementData(elementId);
    const angle = geometryUtils.computeHorizontalIntersectionAngle(
      elementData.position,
      position
    );
    const distance = geometryUtils.distance(elementData.position, position);

    const distancePercentage = distance / Math.max(
      windowSize.width,
      windowSize.height
    );
    return new ForceApplication({
      elements: { id: elementId },
      angle,
      strength: 100 * strength * distancePercentage * distancePercentage
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
 * tolerance - radians to allow target elements to fall on either side
 */
export const createOrientingRule = ({
  baseElementId,
  targetElements,
  orientation=Orientation.TOP_LEFT,
  strength=1.0,
  tolerance=Math.PI/12,
}) => {
  const selector = ElementSelector.create(targetElements);
  utils.requirePresent(baseElementId);
  utils.requireOneOf(orientation, Object.values(Orientation));
  utils.requireNonNegative(strength);

  return (simulation) => {
    const baseElementData = simulation.getElementData(baseElementId);

    return selector.select(simulation).map((targetElementId) => {
      const targetElementData = simulation.getElementData(targetElementId);
      const orientationRating = orientation.getOrientationRating({
        anchorPoint: baseElementData.position,
        targetPoint: targetElementData.position,
        range: tolerance,
      });

      if (Math.round(orientationRating * 100) / 100 < 1) {
        const distanceToBaseElement = geometryUtils.distance(
          baseElementData.position, targetElementData.position
        );
        const desiredPosition = geometryUtils.pointAwayFrom({
          base: baseElementData.position,
          distance: distanceToBaseElement,
          angle: orientation.getAngle(),
        });
        LOGGER.debug(
          'target element {} is not {}-oriented (rating {}) with respect to element {}; pushing towards {}',
          targetElementId,
          orientation.getName(),
          orientationRating,
          baseElementId,
          desiredPosition
        );
       const angleToDesiredPosition = geometryUtils.computeHorizontalIntersectionAngle(
          targetElementData.position,
          desiredPosition
        );
        return new ForceApplication({
          elements: { id: targetElementId },
          angle: angleToDesiredPosition,
          strength: 5 * strength * (1 - orientationRating) * (1 - orientationRating)
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
