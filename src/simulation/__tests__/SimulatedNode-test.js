jest.mock('geometry/Shape');
import Ray from 'geometry/Ray';
import Shape from 'geometry/Shape';
import SimulatedNode from '../SimulatedNode';

describe('SimulatedNode', () => {
  let shape;
  let node;

  beforeEach(() => {
   shape = new Shape();
   node = new SimulatedNode({ id: 'asdf', shape });
  });

  describe('getCenter', () => {
    it('returns the shape center', () => {
      shape.getCenter.mockReturnValue({ x: 234, y: 678 });
      expect(node.getCenter()).toEqual({ x: 234, y: 678 });

      expect(shape.getCenter).toHaveBeenCalled();
    });
  });

  describe('getCollisionRadius', () => {
    it('returns the shape bounding radius', () => {
      shape.getBoundingRadius.mockReturnValue(67);
      expect(node.getCollisionRadius()).toEqual(67);

      expect(shape.getBoundingRadius).toHaveBeenCalled();
    });
  });

  describe('set x', () => {
    it('calls the shape\'s setCenterX method', () => {
      node.x = 367;
      expect(shape.setCenterX).toHaveBeenCalledWith(367);
    });
  });

  describe('set y', () => {
    it('calls the shape\'s setCenterX method', () => {
      node.y = 439;
      expect(shape.setCenterY).toHaveBeenCalledWith(439);
    });
  });

  describe('computeEdgeIntersection', () => {
    it('computes the intersection between the shape and a ray', () => {
      const nodeCenter = { x: 4752, y: 981238 };
      const otherCenter = { x: 9243, y: 54365 };
      const expectedIntersection = { x: 123, y: 789 };

      const otherNode = new SimulatedNode({
        id: '3463132',
        shape: new Shape({
          getCenter: jest.fn().mockReturnValue(otherCenter),
        })
      });

      shape.getCenter.mockReturnValue(nodeCenter);
      shape.computeRayIntersection.mockReturnValue(expectedIntersection);

      expect(node.computeEdgeIntersection(otherNode)).toEqual(expectedIntersection);

      expect(shape.computeRayIntersection).toHaveBeenCalledWith(new Ray(
        otherCenter, nodeCenter
      ));
    });
  });
});
