import Direction from '../Direction';
import utils from '../../utils';
import logging from '@akud/logging';

const LOGGER = new logging.Logger('DirectionalForce');

const BASE_STEP_SIZE = 5;

export const createDirectionalForce = ({elementId, direction, strengthMultiplier=1.0}) => {
  utils.requirePresent(elementId);
  utils.requireOneOf(direction, Object.values(Direction));

  var element;

  function force(alpha) {
    const stepSize = BASE_STEP_SIZE * strengthMultiplier * alpha;
    if (element) {
      switch(direction) {
        case Direction.UP:
          LOGGER.trace('subtracting {} from element {}\'s vertical velocity ({})', stepSize, elementId, element.vy);
          element.vy -= stepSize;
          break;
        case Direction.DOWN:
          LOGGER.trace('adding {} to element {}\'s vertical velocity ({})', stepSize, elementId, element.vy);
          element.vy += stepSize;
          break;
        case Direction.LEFT:
          LOGGER.trace('subtracting {} from element {}\'s horizontal velocity ({})', stepSize, elementId, element.vx);
          element.vx -= stepSize;
          break;
        case Direction.RIGHT:
          LOGGER.trace('adding {} to element {}\'s horizontal velocity ({})', stepSize, elementId, element.vx);
          element.vx += stepSize;
          break;
        default:
          LOGGER.warn('Unknown direction {}', direction);
      }
    } else {
      LOGGER.debug('Doing nothing as no element matched id {}', elementId);
    }
  }

  force.initialize = function(elements) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].id === elementId) {
        element = elements[i];
        return;
      }
    }
    LOGGER.warn('Could not find element {}', elementId);
  }

  return force;
};

export default {
  create: createDirectionalForce,
};
