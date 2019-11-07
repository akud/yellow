import utils from '../utils';

import ForceApplication from './ForceApplication';

import geometryUtils from '../elements/geometry-utils';

import logging from '@akud/logging';

const LOGGER = new logging.Logger('LinkingRules');

const SPRING_CONSTANT = 0.25;

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
            targetPosition
          ),
          strength: strength * SPRING_CONSTANT * (currentDistance - distance),
        }),
        new ForceApplication({
          elementIds: [ targetId ],
          angle: geometryUtils.computeHorizontalIntersectionAngle(
            targetPosition,
            sourcePosition
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

export default {
  createLinkingRule,
}
