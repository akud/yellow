export const createPositioningRule = jest.fn();
export const createUniversalPositioningRule = jest.fn();
export const createRelativePositioningRule = jest.fn();

export const resetMockPositioningRules = () => {
  createPositioningRule.mockReset();
  createUniversalPositioningRule.mockReset();
  createRelativePositioningRule.mockReset();
};

export default {
  createPositioningRule,
  createUniversalPositioningRule,
  createRelativePositioningRule,
  resetMockPositioningRules,
};
