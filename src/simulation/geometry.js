import logging from '@akud/logging';

const LOGGER = new logging.Logger('geometry');


const slope = (p1, p2) => {
  return (p2.y - p1.y) / (p2.x - p1.x);
};

const isVertical = (nearPoint, farPoint) => farPoint.x === nearPoint.x;
const isToTheRight = (nearPoint, farPoint) => farPoint.x > nearPoint.x;

const rightSideCalculation = (nearPoint, farPoint, radius) => {
  const angle = Math.atan(slope(nearPoint, farPoint));
  const xDistance = Math.cos(angle) * radius;
  const yDistance = Math.sin(angle) * radius;
  return { x: nearPoint.x + xDistance, y: nearPoint.y + yDistance };
};

const leftSideCalculation = (nearPoint, farPoint, radius) => {
  const angle = Math.atan(slope(nearPoint, farPoint));
  const xDistance = Math.cos(angle - Math.PI) * radius;
  const yDistance = Math.sin(angle - Math.PI) * radius;
  return { x: nearPoint.x + xDistance, y: nearPoint.y + yDistance };
};

const verticalCalculation = (nearPoint, farPoint, radius) => {
  if (nearPoint.y < farPoint.y) {
    return { x: nearPoint.x, y: nearPoint.y + radius };
  } else {
    return { x: nearPoint.x, y: nearPoint.y - radius };
  }
};

export default {
  computeCircleIntersection: ({nearPoint, farPoint, radius}) => {
    if (isVertical(nearPoint, farPoint)) {
      LOGGER.trace('Computing vertical line intersection from {} to {}', nearPoint, farPoint);
      return verticalCalculation(nearPoint, farPoint, radius);
    } else if (isToTheRight(nearPoint, farPoint)) {
      LOGGER.trace('Computing intersection on the right side from {} to {}', nearPoint, farPoint);
      return rightSideCalculation(nearPoint, farPoint, radius);
    } else {
      LOGGER.trace('Computing intersection on the left side from {} to {}', nearPoint, farPoint);
      return leftSideCalculation(nearPoint, farPoint, radius);
    }
  },
};
