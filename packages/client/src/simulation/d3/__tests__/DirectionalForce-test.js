import DirectionalForce from '../DirectionalForce';
import Direction from '../../Direction';
import PointDefinition from '../../../elements/PointDefinition';

describe('DirectionalForce', () => {

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

  it('subtracts from vy for Direction.UP', () => {
    const force = createForce(Direction.UP);

    force(1.0);

    expect(element.vx).toBe(originalVx);
    expect(element.vy).toBe(originalVy - 5);
  });

  it('adds to vy for Direction.DOWN', () => {
    const force = createForce(Direction.DOWN);

    force(1.0);

    expect(element.vx).toBe(originalVx);
    expect(element.vy).toBe(originalVy + 5);
  });

  it('subtracts from vx for Direction.LEFT', () => {
    const force = createForce(Direction.LEFT);

    force(1.0);

    expect(element.vx).toBe(originalVx - 5);
    expect(element.vy).toBe(originalVy);
  });

  it('adds to vx for Direction.RIGHT', () => {
    const force = createForce(Direction.RIGHT);

    force(1.0);

    expect(element.vx).toBe(originalVx + 5);
    expect(element.vy).toBe(originalVy);
  });

  it('uses the specified force multiplier to increase force', () => {
    const force = createForce(Direction.RIGHT, 2.0);

    force(1.0);

    expect(element.vx).toBe(originalVx + 10);
    expect(element.vy).toBe(originalVy);
  });

  it('uses the specified force multiplier to decrease force', () => {
    const force = createForce(Direction.LEFT, 0.5);

    force(1.0);

    expect(element.vx).toBe(originalVx - 2.5);
    expect(element.vy).toBe(originalVy);
  });

  it('decays the force strength following the alpha parameter', () => {
    const force = createForce(Direction.UP);

    force(0.5);

    expect(element.vx).toBe(originalVx);
    expect(element.vy).toBe(originalVy - 2.5);
  });
});
