import PropTypes from 'prop-types';

export const position = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export default {
  position,
};
