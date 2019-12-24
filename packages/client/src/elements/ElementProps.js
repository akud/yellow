import PropTypes from 'prop-types';
import { position } from './ElementPropTypes';

export const BasePropTypes = {
  id: PropTypes.string,
  position: position,
  velocity: position,
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
