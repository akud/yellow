import PropTypes from 'prop-types';

const position = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

const oneOf = (acceptableValues) => (props, propName, componentName) => {
  if (acceptableValues.indexOf(props[propName]) === -1) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to `' + componentName + '`. ' +
      'Expected one of ' + JSON.stringify(acceptableValues)
    );
  }
}

export default {
  position,
  positionIndex: PropTypes.objectOf(position),
  oneOf,
}
