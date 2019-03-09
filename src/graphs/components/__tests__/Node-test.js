jest.mock('shapes/ShapeDefinition');

import Node from '../Node';

import SimulationConfig from 'simulation/SimulationConfig';
import { PreventCollisionsConstraintDefinition } from 'simulation/ConstraintDefinition';

import MockShapeDefinition from 'shapes/ShapeDefinition';

import React from 'react';
import { shallow, mount } from 'enzyme';

describe('Node', () => {
  const simulatedElementProp = {
    position: {
      x: 123,
      y: 9234
    },
    shape: new MockShapeDefinition()
  };


  it('renders children with position', () => {
    const wrapper = shallow(
      <Node nodeId='2' simulatedElements={{ '2': simulatedElementProp }}>
        <p>Hello!</p>
      </Node>
    );
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').prop('position')).toEqual({ x: 123, y: 9234 });
  });

  describe('getSimulationConfig', () => {
    it('returns the node id and a PreventCollisionsConstraintDefinition', () => {
      const shape = new MockShapeDefinition();
      const wrapper = mount(
        <Node nodeId='2' simulatedElements={{ '2': simulatedElementProp }}>
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
      const wrapper = mount(
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
