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

export default {
  position,
  link,
};
