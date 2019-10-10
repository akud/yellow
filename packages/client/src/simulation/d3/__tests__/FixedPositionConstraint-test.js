import FixedPositionConstraint from '../FixedPositionConstraint';

describe('FixedPositionConstraint', () => {

  var elementId;
  var element;
  var originalX;
  var originalY;
  var elements;

  beforeEach(() => {
    elementId = 'test-element-1';
    originalX = 420;
    originalY = 69;
    elements = [
      {
        id: 'test-element-0',
        x: originalX,
        y: originalY,
      },
      {
        id: 'test-element-1',
        x: originalX,
        y: originalY,
      },
      {
        id: 'test-element-2',
        x: originalX,
        y: originalY,
      },
    ];
    element = elements[1];
  });

  afterEach(() => {
    expect(elements[0].x).toBe(originalX);
    expect(elements[0].y).toBe(originalY);
    expect(elements[2].x).toBe(originalX);
    expect(elements[2].y).toBe(originalY);
  });


  const createConstraint = ({ x, y }) => {
    const constraint = FixedPositionConstraint.create({
      elementId,
      x,
      y,
    });
    constraint.initialize(elements);
    return constraint;
  };

  it('sets the element\'s position to the specified position', () => {
    const constraint = createConstraint({ x: 34, y: 81 });

    constraint();

    expect(element.x).toBe(34);
    expect(element.y).toBe(81);
  });
});
