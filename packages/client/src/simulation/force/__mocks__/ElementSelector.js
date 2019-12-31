export const mockSelector = { select: jest.fn() };
export const createElementSelector = jest.fn().mockReturnValue(mockSelector);
export const validateSelectorDefinition = jest.fn().mockImplementation(i => i);

export const selectElements = (definition, simulation) => {
  return createElementSelector(definition).select(simulation);
}

export const resetMockSelector = () => {
  createElementSelector.mockReset().mockReturnValue(mockSelector);
  mockSelector.select.mockReset();
  validateSelectorDefinition.mockReset().mockImplementation(i => i);
}

export default {
  create: createElementSelector,
  select: selectElements,
  validate: validateSelectorDefinition,
}
