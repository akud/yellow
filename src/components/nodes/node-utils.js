import utils from 'utils';
import GraphElementType from 'graph/GraphElementType';
import SimulatedNode from 'simulation/SimulatedNode';

const asNodeComponent = (componentClass) => Object.assign(componentClass, {
  elementType: GraphElementType.NODE,
  toSimulatedElement: (props) => new SimulatedNode({
    id: props.nodeId,
    shape: _determineShape(componentClass, props),
  }),
});

const _determineShape = (componentClass, props) => {
  if (_isShapeProvider(componentClass)) {
    return componentClass.getShape(props);
  } else {
    const shapeProvidingComponent = _findShapeProvidingChild(props.children);
    return shapeProvidingComponent.type.getShape(shapeProvidingComponent.props);
  }
}

const _findShapeProvidingChild = (children) => {
  utils.requirePresent('child components', children);
  if (!Array.isArray(children)) {
    children = [children];
  }
  return utils.requirePresent(
    'shape providing child',
    children.find(c => _isShapeProvider(c.type))
  );
}

const _isShapeProvider = (componentClass) => typeof componentClass.getShape === 'function';

export {
  asNodeComponent,
};
