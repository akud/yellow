import PropTypes from 'prop-types';

export const position = PropTypes.exact({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const link = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.exact({
    href: PropTypes.string.isRequired,
    inline: PropTypes.bool,
    className: PropTypes.string,
  }),
]);

export const curvature = PropTypes.oneOf([
  4, 3, 2, 1, -1, -2, -3, -4,
  '4', '3', '2', '1', '-1', '-2', '-3', '-4',
]);

export default {
  position,
  link,
  curvature,
};
