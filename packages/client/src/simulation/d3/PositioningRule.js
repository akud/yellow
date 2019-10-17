import utils from '../../utils';
import logging from '@akud/logging';

const LOGGER = new logging.Logger('PositioningRule');

export const createPositioningRule = ({elementId, x, y}) => {
  utils.requirePresent(elementId);

  var element;

  function force(alpha) {
    if (element) {
      element.x = x;
      element.y = y;
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
  create: createPositioningRule,
};
