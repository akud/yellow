import utils from '../../utils';

import ForceApplication from './ForceApplication';
import ElementSelector from './ElementSelector';

import geometryUtils from '../../elements/geometry/geometry-utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('LinkingRules');

const SPRING_CONSTANT = 0.25;

/**
 * Create a rule that links two elements together
 *
 * between - two-element array of element ids to link together
 * distance - distance to keep the elements apart
 * strength - rule strength
 */
export const createLinkingRule = ({ between, distance, strength=1.0 }) => {
  utils.requireArrayOfLength(between, 2);
  utils.requireGreaterThanZero(distance);
  utils.requireNonNegative(strength);

  const sourceId = between[0];
  const targetId = between[1];

  return (simulation) => {
    const sourcePosition = simulation.getElementData(sourceId).position;
    const targetPosition = simulation.getElementData(targetId).position;

    const currentDistance = geometryUtils.distance(sourcePosition, targetPosition);

    if (geometryUtils.approximatelyEqual(distance, currentDistance)) {
      LOGGER.debug(
        '{} and {} are {} away ({} desired), doing nothing',
        sourceId,
        targetId,
        currentDistance,
        distance
      );
      return [];
    } else if (currentDistance > distance) {
      LOGGER.debug(
        '{} and {} are {} away (> {} desired), pushing together',
        sourceId,
        targetId,
        currentDistance,
        distance
      );
      return [
        new ForceApplication({
          elements: { id: sourceId },
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            sourcePosition,
            targetPosition,
          ),
          strength: strength * SPRING_CONSTANT * (currentDistance - distance),
        }),
        new ForceApplication({
          elements: { id: targetId },
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            targetPosition,
            sourcePosition,
          ),
          strength: strength * SPRING_CONSTANT * (currentDistance - distance),
        }),
      ];
    } else {
      LOGGER.debug(
        '{} and {} are {} away (< {} desired), pushing away',
        sourceId,
        targetId,
        currentDistance,
        distance
      );
      return [
        new ForceApplication({
          elements: { id: sourceId },
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            targetPosition,
            sourcePosition
          ),
          strength: strength * SPRING_CONSTANT * (distance - currentDistance),
        }),
        new ForceApplication({
          elements: { id: targetId },
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            sourcePosition,
            targetPosition
          ),
          strength: strength * SPRING_CONSTANT * (distance - currentDistance),
        }),
      ];
    }
  };
}

/**
 * Create a rule that binds a set of elements to a base element, keeping them a certain distance
 * away from the base element.
 *
 * baseElementId - element id to use as the base. will not be pushed
 * targetElements - element selector defining the elements to be moved into orientation
 * distance - distance to keep the elements apart
 * strength - rule strength
 */

export const createBindingRule = ({ baseElementId, targetElements, distance, strength=1.0 }) => {
  const selector = ElementSelector.create(targetElements);
  utils.requirePresent(baseElementId);
  utils.requireGreaterThanZero(distance);
  utils.requireNonNegative(strength);

  return (simulation) => {
    const basePosition = simulation.getElementData(baseElementId).position;
    return selector.select(simulation).map((targetElementId) => {
      const targetPosition = simulation.getElementData(targetElementId).position;

      const currentDistance = geometryUtils.distance(basePosition, targetPosition);

      if (geometryUtils.approximatelyEqual(distance, currentDistance)) {
        LOGGER.debug(
          '{} is {} away from {}, ({} desired), doing nothing',
          targetElementId,
          currentDistance,
          baseElementId,
          distance
        );
        return;
      } else if (currentDistance > distance) {
        LOGGER.debug(
          '{} is {} away from {}, (> {} desired), pushing towards {}',
          targetElementId,
          currentDistance,
          baseElementId,
          distance,
          baseElementId
        );
        return new ForceApplication({
          elements: { id: targetElementId },
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            targetPosition,
            basePosition,
          ),
          strength: strength * SPRING_CONSTANT * (currentDistance - distance),
        });
      } else {
        LOGGER.debug(
          '{} is {} away from {}, (< {} desired), pushing away from {}',
          targetElementId,
          currentDistance,
          baseElementId,
          distance,
          baseElementId
        );
        return new ForceApplication({
          elements: { id: targetElementId },
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            basePosition,
            targetPosition
          ),
          strength: strength * SPRING_CONSTANT * (distance - currentDistance),
        });
      }
    })
    .filter(Boolean);
  };
}

export default {
  createBindingRule,
  createLinkingRule,
}
