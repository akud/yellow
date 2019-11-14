import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';

let sequence = 0;

export const BasePropTypes = {
  id: PropTypes.string,
  position: CustomPropTypes.position,
  registerShape: PropTypes.func
}

export const DefaultBaseProps = {
  get id() {
    return 'element-' + (++sequence);
  },
  position: { x: 0, y: 0 },
  registerShape: (shape) => {},
}

export default {
  BasePropTypes,
  DefaultBaseProps,
}
