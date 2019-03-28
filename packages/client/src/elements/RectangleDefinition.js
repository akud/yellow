import ShapeDefinition from './ShapeDefinition';

import utils from '../utils';
import { computeHorizontalIntersectionAngle, addVectors } from './geometry-utils';

const TOP_RIGHT = Symbol('TOP_RIGHT');
const TOP_LEFT = Symbol('TOP_LEFT');
const BOTTOM_RIGHT = Symbol('BOTTOM_RIGHT');
const BOTTOM_LEFT = Symbol('BOTTOM_LEFT');

const RIGHT_TOP = Symbol('RIGHT_TOP');
const RIGHT_BOTTOM = Symbol('RIGHT_BOTTOM');
const LEFT_TOP = Symbol('LEFT_TOP');
const LEFT_BOTTOM = Symbol('LEFT_BOTTOM');

export default class RectangleDefinition extends ShapeDefinition {
  constructor({ width, height }) {
    super();
    this.width = utils.requireGreaterThanZero(width);
    this.height = utils.requireGreaterThanZero(height);
  }


  getBoundingRadius() {
    return Math.sqrt(Math.pow(this._halfWidth(), 2) + Math.pow(this._halfHeight(), 2))
  }

  computeIntersectionWithRay(center, rayOrigin) {
    const rayAngle = computeHorizontalIntersectionAngle(center, rayOrigin);
    const quadrant = this._getIntersectionQuadrant(rayAngle);

    const x = this._halfWidth();
    const y = this._halfHeight();

    let theta;

    switch(quadrant) {
      case TOP_RIGHT:
        theta = (Math.PI / 2) - rayAngle;
        return addVectors(
          center,
          { x: y * Math.tan(theta), y }
        );
      case TOP_LEFT:
        theta = Math.PI - rayAngle;
        return addVectors(
          center,
          { x: -y / Math.tan(theta), y }
        );
      case LEFT_TOP:
        theta = Math.PI - rayAngle;
        return addVectors(
          center,
          { x: -x, y: x * Math.tan(theta) }
        );
      case LEFT_BOTTOM:
        theta = rayAngle - Math.PI;
        return addVectors(
          center,
          { x: -x, y: -x * Math.tan(theta) }
        );
      case BOTTOM_LEFT:
        theta = rayAngle - Math.PI;
        return addVectors(
          center,
          { x: -y / Math.tan(theta), y: -y }
        );
      case BOTTOM_RIGHT:
        theta = rayAngle - (3 * Math.PI / 2);
        return addVectors(
          center,
          { x: y * Math.tan(theta), y: -y }
        );
      case RIGHT_BOTTOM:
        theta = rayAngle - (3 * Math.PI / 2);
        return addVectors(
          center,
          { x, y: -x / Math.tan(theta) }
        );
      case RIGHT_TOP:
        theta = rayAngle;
        return addVectors(
          center,
          { x, y: x * Math.tan(theta) }
        );
      default:
        throw new Error('unrecognized quadrant ' + quadrant);
    }
  }

  _getIntersectionQuadrant(rayAngle) {
    const rightTopCornerAngle = this._cornerAngle();
    const leftTopCornerAngle = Math.PI - rightTopCornerAngle;
    const leftBottomCornerAngle = Math.PI + rightTopCornerAngle;
    const rightBottomCornerAngle = 2 * Math.PI - rightTopCornerAngle;

    if (rayAngle >= 0 && rayAngle <= rightTopCornerAngle) {
      return RIGHT_TOP;
    } else if (rayAngle > rightTopCornerAngle && rayAngle <= Math.PI / 2) {
      return TOP_RIGHT;
    } else if (rayAngle > Math.PI / 2 && rayAngle <= leftTopCornerAngle) {
      return TOP_LEFT;
    } else if (rayAngle > leftTopCornerAngle && rayAngle <= Math.PI) {
      return LEFT_TOP;
    } else if (rayAngle > Math.PI && rayAngle <= leftBottomCornerAngle) {
      return LEFT_BOTTOM;
    } else if (rayAngle > leftBottomCornerAngle && rayAngle <= 3*Math.PI/2) {
      return BOTTOM_LEFT;
    } else if (rayAngle > 3*Math.PI/2 && rayAngle <= rightBottomCornerAngle) {
      return BOTTOM_RIGHT;
    } else if (rayAngle > rightBottomCornerAngle && rayAngle <= 2*Math.PI) {
      return RIGHT_BOTTOM;
    } else {
      throw new Error('Illegal angle: ' + rayAngle);
    }
  }

  _cornerAngle() {
    return Math.atan(this._halfHeight() / this._halfWidth());
  }

  _halfWidth() {
    return this.width / 2;
  }

  _halfHeight() {
    return this.height / 2;
  }
}
