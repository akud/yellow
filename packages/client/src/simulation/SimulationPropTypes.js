import PropTypes from 'prop-types';


/**
 * Defines a prop that identifies a group of elements in a simulation.
 * There are several options:
 *
 * id: select a single element by id
 * ids: select a set of elements by their ids
 * groupId: select all elements in a group
 * groupIds: select all elements in set of groups
 * all: select all elements
 */
export const elementSelector = PropTypes.oneOfType([
  PropTypes.exact({ id: PropTypes.string.isRequired }),
  PropTypes.exact({ ids: PropTypes.arrayOf(PropTypes.string).isRequired }),
  PropTypes.exact({ groupId: PropTypes.string.isRequired }),
  PropTypes.exact({ groupIds: PropTypes.arrayOf(PropTypes.string).isRequired }),
  PropTypes.oneOf(['all']),
]);

export default {
  elementSelector,
}
