import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';

export const BasePropTypes = {
  id: PropTypes.string,
  position: CustomPropTypes.position,
  velocity: CustomPropTypes.position,
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
