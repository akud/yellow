import utils from '../../utils';

import ForceApplication from './ForceApplication';

import geometryUtils from '../../elements/geometry/geometry-utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('LinkingRules');

const SPRING_CONSTANT = 0.25;

/**
 * Create a rule that links two elements together and attempts to keep them a specified
 * distance apart by pushing both elements towards each other if they are too far apart
 * and away from each other if they are too close together.
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
          elementIds: [ sourceId ],
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            sourcePosition,
            targetPosition,
          ),
          strength: strength * SPRING_CONSTANT * (currentDistance - distance),
        }),
        new ForceApplication({
          elementIds: [ targetId ],
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
          elementIds: [ sourceId ],
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            targetPosition,
            sourcePosition
          ),
          strength: strength * SPRING_CONSTANT * (distance - currentDistance),
        }),
        new ForceApplication({
          elementIds: [ targetId ],
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
 * Create a rule that binds one element to another, pushing the target point towards
 * and away from the base point.
 */
export const createBindingRule = ({ baseElementId, targetElementId, distance, strength=1.0 }) => {
  utils.requirePresent(baseElementId);
  utils.requirePresent(targetElementId);
  utils.requireGreaterThanZero(distance);
  utils.requireNonNegative(strength);

  return (simulation) => {
    const basePosition = simulation.getElementData(baseElementId).position;
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
      return [];
    } else if (currentDistance > distance) {
      LOGGER.debug(
        '{} is {} away from {}, (> {} desired), pushing towards {}',
        targetElementId,
        currentDistance,
        baseElementId,
        distance,
        baseElementId
      );
      return [
        new ForceApplication({
          elementIds: [ targetElementId ],
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            targetPosition,
            basePosition,
          ),
          strength: strength * SPRING_CONSTANT * (currentDistance - distance),
        }),
      ];
    } else {
      LOGGER.debug(
        '{} is {} away from {}, (< {} desired), pushing away from {}',
        targetElementId,
        currentDistance,
        baseElementId,
        distance,
        baseElementId
      );
      return [
        new ForceApplication({
          elementIds: [ targetElementId ],
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            basePosition,
            targetPosition
          ),
          strength: strength * SPRING_CONSTANT * (distance - currentDistance),
        }),
      ];
    }
  };
}

export default {
  createBindingRule,
  createLinkingRule,
}
