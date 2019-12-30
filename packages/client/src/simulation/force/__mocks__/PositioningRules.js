export const createDirectionalRule = jest.fn();
export const createPositioningRule = jest.fn();
export const createUniversalPositioningRule = jest.fn();
export const createOrientingRule = jest.fn();

export const resetMockPositioningRules = () => {
  createDirectionalRule.mockReset();
  createPositioningRule.mockReset();
  createUniversalPositioningRule.mockReset();
  createOrientingRule.mockReset();
};

export default {
  createDirectionalRule,
  createPositioningRule,
  createUniversalPositioningRule,
  createOrientingRule,
  resetMockPositioningRules,
};
