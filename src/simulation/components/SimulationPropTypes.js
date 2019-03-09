import PropTypes from 'prop-types';
import ShapeDefinition from 'shapes/ShapeDefinition';
import CustomPropTypes from 'components/CustomPropTypes';

export default {
  simulatedElements: PropTypes.objectOf(PropTypes.shape({
    position: CustomPropTypes.position.isRequired,
    shape: PropTypes.instanceOf(ShapeDefinition).isRequired,
  })),
}
