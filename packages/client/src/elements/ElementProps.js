import PropTypes from 'prop-types';
import { position } from './ElementPropTypes';

export const BasePropTypes = {
  id: PropTypes.string,
  position: position,
  velocity: position,
  link: PropTypes.string,
}

export const DefaultBaseProps = {
  id: 'default-element-id',
  link: '',
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
}

export default {
  BasePropTypes,
  DefaultBaseProps,
}
