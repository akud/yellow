import PropTypes from 'prop-types';
import CustomPropTypes from '../../representations/CustomPropTypes';

export default {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: CustomPropTypes.position.isRequired,
    postRender: PropTypes.func.isRequired
  }),
}
