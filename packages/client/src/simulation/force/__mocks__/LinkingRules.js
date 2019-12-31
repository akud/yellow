export const createBindingRule = jest.fn();
export const createLinkingRule = jest.fn();

export const resetMockLinkingRules = () => {
  createBindingRule.mockReset();
  createLinkingRule.mockReset();
}
export default {
  createLinkingRule,
  createBindingRule,
  resetMockLinkingRules,
}
