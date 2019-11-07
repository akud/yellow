import PointDefinition from '../../elements/PointDefinition';

export const getElementIds = jest.fn();
export const getElementData = jest.fn();
export const registerElement = jest.fn();
export const registerRule = jest.fn();
export const setRepellingForceStrength = jest.fn();
export const onNewLayout = jest.fn();

export const resetMockSimulation = () => {
  getElementIds.mockClear();
  getElementData.mockClear().mockReturnValue({
    position: { x: 0, y: 0 },
    shape: new PointDefinition()
  });
  registerElement.mockClear();
  registerRule.mockClear();
  onNewLayout.mockClear();
  setRepellingForceStrength.mockClear();
  MockSimulation.mockClear();
};

const MockSimulation = jest.fn().mockImplementation(() => {
  const instance = {
    getElementIds,
    getElementData,
    registerElement,
    registerRule,
    setRepellingForceStrength,
    onNewLayout,
  };
  onNewLayout.mockReturnValue(instance);
  registerElement.mockReturnValue(instance)
  registerRule.mockReturnValue(instance)
  setRepellingForceStrength.mockReturnValue(instance)

  return instance;
});

export default MockSimulation;
