import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';

export const BasePropTypes = {
  id: PropTypes.string,
  position: CustomPropTypes.position,
  registerShape: PropTypes.func
}

export const DefaultBaseProps = {
  id: 'default-element-id',
  position: { x: 0, y: 0 },
  registerShape: (shape) => {},
}

export default {
  BasePropTypes,
  DefaultBaseProps,
}
