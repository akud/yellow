import PropTypes from 'prop-types';
import ElementPropTypes from './ElementPropTypes';

export const BasePropTypes = {
  id: PropTypes.string,
  position: ElementPropTypes.position,
  velocity: ElementPropTypes.position,
  link: ElementPropTypes.link,
}

export const DefaultBaseProps = {
  id: 'default-element-id',
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
}

export default {
  BasePropTypes,
  DefaultBaseProps,
}
