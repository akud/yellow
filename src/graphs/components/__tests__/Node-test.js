jest.mock('elements/ShapeDefinition');

import Node from '../Node';

import Orientation from 'elements/Orientation';

import SimulationConfig from 'simulation/SimulationConfig';
import {
  FixedDistanceConstraintDefinition,
  PreventCollisionsConstraintDefinition
} from 'simulation/ConstraintDefinition';
import { DirectionalForceDefinition } from 'simulation/ForceDefinition';
import Direction from 'simulation/Direction';

import MockShapeDefinition from 'elements/ShapeDefinition';

import React from 'react';
import { shallow, mount } from 'enzyme';

import utils from 'utils';

describe('Node', () => {
  const newSimulatedElement = (elementId, shape) => ({
    id: elementId || '1',
    position: newPosition(),
    shape: shape || new MockShapeDefinition()
  });

  const elementIndexOf = simulatedElements => utils.makeArray(simulatedElements).reduce((obj, el) => {
    obj[el.id] = el;
    return obj;
  }, {});

  it('can render without breaking with no simulated elements', () => {
    render(<Node nodeId='2'><p>Hello!</p></Node>);
  });

  it('renders children with position', () => {
    const element = newSimulatedElement('2');
    const wrapper = shallow(
      <Node nodeId='2' simulatedElements={elementIndexOf(element)}>
        <p>Hello!</p>
      </Node>
    );
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').prop('position')).toEqual(element.position);
  });

  describe('with multiple children', () => {
    it('assigns positions to elements by their orientation', () => {
      const primaryElement = newSimulatedElement('2');
      const subElement1 = newSimulatedElement('2-1');
      const subElement2 = newSimulatedElement('2-2');

      const wrapper = render(
        <Node
          nodeId='2'
          simulatedElements={
            elementIndexOf([
              primaryElement,
              subElement1,
              subElement2,
            ])
          }
        >
          <p orientation={Orientation.PRIMARY}>Primary!</p>
          <p orientation={Orientation.TOP_LEFT}>Hello!</p>
          <p orientation={Orientation.TOP_RIGHT}>World!</p>
        </Node>
      );

      expect(wrapper.find('p').length).toBe(3);
      expect( wrapper.find('p').at(0).prop('position')).toEqual(primaryElement.position);
      expect( wrapper.find('p').at(1).prop('position')).toEqual(subElement1.position);
      expect( wrapper.find('p').at(2).prop('position')).toEqual(subElement2.position);
    });

    it('can infer the primary element', () => {
      const primaryElement = newSimulatedElement('2-0');
      const subElement1 = newSimulatedElement('2');
      const subElement2 = newSimulatedElement('2-2');

      const wrapper = render(
        <Node
          nodeId='2'
          simulatedElements={
            elementIndexOf([
              primaryElement,
              subElement1,
              subElement2,
            ])
          }
        >
          <p orientation={Orientation.TOP_LEFT}>Hello!</p>
          <p>Primary!</p>
          <p orientation={Orientation.TOP_RIGHT}>World!</p>
        </Node>
      );

      expect(wrapper.find('p').length).toBe(3);
      expect( wrapper.find('p').at(0).prop('position')).toEqual(primaryElement.position);
      expect( wrapper.find('p').at(1).prop('position')).toEqual(subElement1.position);
      expect( wrapper.find('p').at(2).prop('position')).toEqual(subElement2.position);
    });
  });

  describe('getSimulationConfig', () => {
    it('returns the node id and a PreventCollisionsConstraintDefinition', () => {
      const shape = new MockShapeDefinition();
      const wrapper = render(
        <Node nodeId='2' simulatedElements={
          elementIndexOf(newSimulatedElement('2', shape))}>
          <DummyShapeProvider shape={ shape } />
        </Node>
      );
      expect(wrapper.instance().getSimulationConfig()).toEqual(new SimulationConfig({
        elementIds: ['2'],
        elementShapes: {
          '2': shape,
        },
        constraints: [
          new PreventCollisionsConstraintDefinition({
            elementId: '2',
          }),
        ]
      }));
    });

    it('can work before simulated elements have been passed down', () => {
      const shape = new MockShapeDefinition();
      const wrapper = render(
        <Node nodeId='2'>
          <DummyShapeProvider shape={ shape } />
        </Node>
      );
      expect(wrapper.instance().getSimulationConfig()).toEqual(new SimulationConfig({
        elementIds: ['2'],
        elementShapes: {
          '2': shape,
        },
        constraints: [
          new PreventCollisionsConstraintDefinition({
            elementId: '2',
          }),
        ]
      }));
    });

    it('applies forces and constraints for multiple elements', () => {
      const shape1 = new MockShapeDefinition();
      const shape2 = new MockShapeDefinition();
      const shape3 = new MockShapeDefinition();
      const wrapper = render(
        <Node nodeId='2'>
          <DummyShapeProvider shape={ shape1 } />
          <DummyShapeProvider shape={ shape2 } orientation={Orientation.TOP_LEFT} />
          <DummyShapeProvider shape={ shape3 } orientation={Orientation.TOP_RIGHT} />
        </Node>
      );

      expect(wrapper.instance().getSimulationConfig()).toEqual(new SimulationConfig({
        elementIds: ['2', '2-1', '2-2'],
        elementShapes: {
          '2': shape1,
          '2-1': shape2,
          '2-2': shape3,
        },
        constraints: [
          new PreventCollisionsConstraintDefinition({ elementId: '2' }),

          new PreventCollisionsConstraintDefinition({ elementId: '2-1' }),
          new FixedDistanceConstraintDefinition({
            between: ['2', '2-1'],
            distance: shape1.getBoundingRadius() + shape2.getBoundingRadius(),
          }),

          new PreventCollisionsConstraintDefinition({ elementId: '2-2' }),
          new FixedDistanceConstraintDefinition({
            between: ['2', '2-2'],
            distance: shape1.getBoundingRadius() + shape3.getBoundingRadius(),
          }),
        ],
        forces: [
          new DirectionalForceDefinition('2-1', [Direction.UP, Direction.LEFT]),
          new DirectionalForceDefinition('2-2', [Direction.UP, Direction.RIGHT]),
        ],
      }));
    });
  });
});

class DummyShapeProvider extends React.Component {
  render() {
    return null;
  }

  getShapeDefinition() {
    return this.props.shape;
  }
}
