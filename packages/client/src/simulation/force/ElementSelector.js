import utils from '../../utils';

/**
 * Create an element selector from a definition
 *
 * There are several options for defining a selector
 *
 * { id: <string> } - select a single element by id
 * { ids: [<string>..] } - select a set of elements by their ids
 * { groupId: <string> } - select all elements in a group
 * { groupIds: [<string>...]} - select all elements in set of groups
 * 'all': select all elements

 */
export const createElementSelector = (definition) => {
  if (definition === 'all') {
    return doCreateAllSelector();
  } else if (definition && definition.id) {
    return doCreateElementSelector([definition.id]);
  } else if (definition && definition.ids) {
    return doCreateElementSelector(definition.ids);
  } else if (definition && definition.groupId) {
    return doCreateGroupSelector([definition.groupId]);
  } else if (definition && definition.groupIds) {
    return doCreateGroupSelector(definition.groupIds);
  } else {
    throw new Error('unrecognized element selector definition: ' + JSON.stringify(definition));
  }
}

/**
 * Select elements from a simulation according to a selector definition

 */
export const selectElements = (definition, simulation) => {
  return createElementSelector(definition).select(simulation);
}

/**
 * Validate a definition object
 */
export const validateSelectorDefinition = (definition) => {
  return utils.requireCondition(
    definition === 'all' || (
      definition && (
        definition.id || definition.ids || definition.groupId || definition.groupIds
      )
    ),
    definition,
    "Expected " + JSON.stringify(definition) + " to be a valid selector definition"
  );
}


const doCreateAllSelector = () => ({ select: (simulation) => simulation.getElementIds() });

const doCreateElementSelector = (elementIds) => ({ select: (simulation) => elementIds });

const doCreateGroupSelector = (groupIds) => ({
  select: (simulation) => utils.flatten(
    groupIds.map(groupId => simulation.getGroupElementIds(groupId))
  )
});

export default {
  create: createElementSelector,
  select: selectElements,
  validate: validateSelectorDefinition,
}
