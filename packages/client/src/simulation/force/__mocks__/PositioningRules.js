export const createDirectionalRule = jest.fn();
export const createPositioningRule = jest.fn();
export const createUniversalPositioningRule = jest.fn();
export const createRelativePositioningRule = jest.fn();

export const resetMockPositioningRules = () => {
  createDirectionalRule.mockReset();
  createPositioningRule.mockReset();
  createUniversalPositioningRule.mockReset();
  createRelativePositioningRule.mockReset();
};

export default {
  createDirectionalRule,
  createPositioningRule,
  createUniversalPositioningRule,
  createRelativePositioningRule,
  resetMockPositioningRules,
};
