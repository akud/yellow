import DirectionalForce from '../DirectionalForce';
import Direction from '../../Direction';
import PointDefinition from '../../../elements/PointDefinition';

describe('DirectionalForce', () => {
  describe('apply', () => {
    it('subtracts from vy for Direction.UP', () => {
      const element = { vx: 420, vy: 69 };
      DirectionalForce.apply({
        element,
        direction: Direction.UP,
        alpha: 1.0,
      });

      expect(element.vx).toBe(420);
      expect(element.vy).toBe(64);
    });

    it('adds to vy for Direction.DOWN', () => {
      const element = { vx: 420, vy: 69 };
      DirectionalForce.apply({
        element,
        direction: Direction.DOWN,
        alpha: 1.0,
      });

      expect(element.vx).toBe(420);
      expect(element.vy).toBe(74);
    });

    it('subtracts from vx for Direction.LEFT', () => {
      const element = { vx: 420, vy: 69 };
      DirectionalForce.apply({
        element,
        direction: Direction.LEFT,
        alpha: 1.0,
      });

      expect(element.vx).toBe(415);
      expect(element.vy).toBe(69);
    });

    it('adds to vx for Direction.RIGHT', () => {
      const element = { vx: 420, vy: 69 };
      DirectionalForce.apply({
        element,
        direction: Direction.RIGHT,
        alpha: 1.0,
      });

      expect(element.vx).toBe(425);
      expect(element.vy).toBe(69);
    });

    it('uses the specified force multiplier to increase force', () => {
      const element = { vx: 420, vy: 69 };
      DirectionalForce.apply({
        element,
        direction: Direction.RIGHT,
        alpha: 1.0,
        strengthMultiplier: 2.0,
      });

      expect(element.vx).toBe(430);
      expect(element.vy).toBe(69);
    });

    it('uses the specified force multiplier to decrease force', () => {
      const element = { vx: 420, vy: 69 };
      DirectionalForce.apply({
        element,
        direction: Direction.DOWN,
        alpha: 1.0,
        strengthMultiplier: 0.5,
      });

      expect(element.vx).toBe(420);
      expect(element.vy).toBe(71.5);
    });

    it('decays the force strength following the alpha parameter', () => {
      const element = { vx: 420, vy: 69 };
      DirectionalForce.apply({
        element,
        direction: Direction.LEFT,
        alpha: 0.2,
      });

      expect(element.vx).toBe(419);
      expect(element.vy).toBe(69);
    });
  });

  describe('create', () => {
    var elementId;
    var element;
    var originalVx;
    var originalVy;
    var elements;

    beforeEach(() => {
      elementId = 'test-element-1';
      originalVx = 420;
      originalVy = 69;
      elements = [
        {
          id: 'test-element-0',
          vx: originalVx,
          vy: originalVy,
        },
        {
          id: 'test-element-1',
          vx: originalVx,
          vy: originalVy,
        },
        {
          id: 'test-element-2',
          vx: originalVx,
          vy: originalVy,
        },
      ];
      element = elements[1];
    });

    afterEach(() => {
      expect(elements[0].vx).toBe(originalVx);
      expect(elements[0].vy).toBe(originalVy);
      expect(elements[2].vx).toBe(originalVx);
      expect(elements[2].vy).toBe(originalVy);
    });


    const createForce = (direction, strengthMultiplier=1.0) => {
      const force = DirectionalForce.create({
        elementId,
        direction,
        strengthMultiplier
      });
      force.initialize(elements);
      return force;
    };

    it('creates a force that subtracts from vy for Direction.UP', () => {
      const force = createForce(Direction.UP);

      force(1.0);

      expect(element.vx).toBe(originalVx);
      expect(element.vy).toBe(originalVy - 5);
    });

    it('creates a force that adds to vy for Direction.DOWN', () => {
      const force = createForce(Direction.DOWN);

      force(1.0);

      expect(element.vx).toBe(originalVx);
      expect(element.vy).toBe(originalVy + 5);
    });

    it('creates a force that subtracts from vx for Direction.LEFT', () => {
      const force = createForce(Direction.LEFT);

      force(1.0);

      expect(element.vx).toBe(originalVx - 5);
      expect(element.vy).toBe(originalVy);
    });

    it('creates a force that adds to vx for Direction.RIGHT', () => {
      const force = createForce(Direction.RIGHT);

      force(1.0);

      expect(element.vx).toBe(originalVx + 5);
      expect(element.vy).toBe(originalVy);
    });

    it('creates a force that uses the specified force multiplier to increase force', () => {
      const force = createForce(Direction.RIGHT, 2.0);

      force(1.0);

      expect(element.vx).toBe(originalVx + 10);
      expect(element.vy).toBe(originalVy);
    });

    it('creates a force that uses the specified force multiplier to decrease force', () => {
      const force = createForce(Direction.LEFT, 0.5);

      force(1.0);

      expect(element.vx).toBe(originalVx - 2.5);
      expect(element.vy).toBe(originalVy);
    });

    it('creates a force that decays the force strength following the alpha parameter', () => {
      const force = createForce(Direction.UP);

      force(0.5);

      expect(element.vx).toBe(originalVx);
      expect(element.vy).toBe(originalVy - 2.5);
    });
  });
});
