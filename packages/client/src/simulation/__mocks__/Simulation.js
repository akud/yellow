import PointDefinition from '../../elements/PointDefinition';

export const getElementData = jest.fn();
export const registerElement = jest.fn();
export const registerForce = jest.fn();
export const registerConstraint = jest.fn();
export const onNewLayout = jest.fn();

export const resetMockSimulation = () => {
  getElementData.mockClear().mockReturnValue({
    position: { x: 0, y: 0 },
    shape: new PointDefinition()
  });
  registerElement.mockClear();
  registerForce.mockClear();
  registerConstraint.mockClear();
  onNewLayout.mockClear();
  MockSimulation.mockClear();
};

const MockSimulation = jest.fn().mockImplementation(() => {
  const instance = {
    getElementData,
    registerElement,
    registerForce,
    registerConstraint,
    onNewLayout,
  };
  onNewLayout.mockReturnValue(instance);

  return instance;
});

export default MockSimulation;
