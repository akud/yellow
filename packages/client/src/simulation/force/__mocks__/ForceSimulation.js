import PointDefinition from '../../../elements/geometry/PointDefinition';

export const getElementIds = jest.fn();
export const getElementData = jest.fn();
export const registerElement = jest.fn();
export const registerGroup = jest.fn();
export const getGroupElementIds = jest.fn();
export const getWindowSize = jest.fn().mockReturnValue({ width: 500, height: 500 });
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
  registerGroup.mockClear();
  getGroupElementIds.mockClear();
  onNewLayout.mockClear();
  getWindowSize.mockClear();
  setRepellingForceStrength.mockClear();
  MockSimulation.mockClear();
};

const MockSimulation = jest.fn().mockImplementation(() => {
  const instance = {
    getElementIds,
    getElementData,
    registerGroup,
    getGroupElementIds,
    getWindowSize,
    registerElement,
    registerRule,
    setRepellingForceStrength,
    onNewLayout,
  };
  onNewLayout.mockReturnValue(instance);
  registerElement.mockReturnValue(instance)
  registerRule.mockReturnValue(instance)
  registerGroup.mockReturnValue(instance);
  setRepellingForceStrength.mockReturnValue(instance)

  return instance;
});

export default MockSimulation;
