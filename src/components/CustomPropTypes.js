import PropTypes from 'prop-types';

const position = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export default {
  position,
  positionIndex: PropTypes.objectOf(position),
}
