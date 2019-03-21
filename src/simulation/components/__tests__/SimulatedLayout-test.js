jest.mock('simulation/Simulation');
jest.mock('simulation/ForceDefinition');
jest.mock('simulation/ConstraintDefinition');
jest.mock('elements/ShapeDefinition');

import React from 'react'

import SimulatedLayout from '../SimulatedLayout';

import MockSimulation, { getElementData } from 'simulation/Simulation';
import MockForceDefinition from 'simulation/ForceDefinition';
import MockConstraintDefinition from 'simulation/ConstraintDefinition';
import SimulationConfig from 'simulation/SimulationConfig';

import MockShapeDefinition from 'elements/ShapeDefinition';

import utils from 'utils';
import { withExtraProps } from 'components/component-utils';

import { mount } from 'enzyme';

describe('SimulatedLayout', () => {

  beforeEach(() => {
    MockSimulation.mockClear();
    getElementData.mockClear().mockReturnValue({
      position: { x: 0, y: 0 },
      shape: new MockShapeDefinition(),
    });
  });

  it('initializes a simulation from children', async () => {
    const force1 = new MockForceDefinition();
    const force2 = new MockForceDefinition();
    const constraint1 = new MockConstraintDefinition();
    const constraint2 = new MockConstraintDefinition();
    const shape1 = new MockShapeDefinition();
    const shape2 = new MockShapeDefinition();
    const shape3 = new MockShapeDefinition();
    const shape4 = new MockShapeDefinition();

    const wrapper = await render(
      <SimulatedLayout SimulationClass={MockSimulation}>
        <DummyConfigProvider
          elementIds={['1']}
          elementShapes={{ '1': shape1 }}
          forces={[force1]}
          constraints={[constraint1]}
        />
        <DummyConfigProvider elementIds={['2']} elementShapes={{ '2': shape2 }} />
        <DummyConfigProvider
          elementIds={['3', '4']}
          elementShapes={{
            '3': shape3,
            '4': shape4
          }}
          forces={[force2]}
          constraints={[constraint2]}
        />
      </SimulatedLayout>
    );

    expect(MockSimulation).toHaveBeenCalledWith(new SimulationConfig({
      elementIds: [ '1', '2', '3', '4' ],
      elementShapes: {
        '1': shape1,
        '2': shape2,
        '3': shape3,
        '4': shape4,
      },
      forces: [force1, force2],
      constraints: [constraint1, constraint2],
      listeners: [expect.any(Function)],
    }));
  });

  it('Passes the correct element data to children', async () => {
    const shape1 = new MockShapeDefinition();
    const shape2 = new MockShapeDefinition();
    const shape3 = new MockShapeDefinition();
    const shape4 = new MockShapeDefinition();
    getElementData
      .mockReturnValueOnce({ position: { x: 2341, y: 478 }, shape: shape1 })
      .mockReturnValueOnce({ position: { x: 313.243, y: 5743876 }, shape: shape2 })
      .mockReturnValueOnce({ position: { x: 243, y: 34 }, shape: shape3 })
      .mockReturnValueOnce({ position: { x: 78, y: 99 }, shape: shape4 });

    const force1 = new MockForceDefinition();
    const force2 = new MockForceDefinition();
    const constraint1 = new MockConstraintDefinition();
    const constraint2 = new MockConstraintDefinition();

    const wrapper = await render(
      <SimulatedLayout SimulationClass={MockSimulation}>
        <DummyConfigProvider
          elementIds={['1']}
          forces={[force1]}
          constraints={[constraint1]}
        />
        <DummyConfigProvider elementIds={['2']} />
        <DummyConfigProvider
          elementIds={['3', '4']}
          forces={[force2]}
          constraints={[constraint2]}
        />
      </SimulatedLayout>
    );

    expect(wrapper.find('DummyConfigProvider').length).toBe(3);
    expect(wrapper.find('DummyConfigProvider').at(0).prop('simulatedElements')).toEqual({
      '1': { position: { x: 2341, y: 478 }, shape: shape1 }
    });
    expect(wrapper.find('DummyConfigProvider').at(1).prop('simulatedElements')).toEqual({
      '2': { position: { x: 313.243, y: 5743876 }, shape: shape2 }
    });
    expect(wrapper.find('DummyConfigProvider').at(2).prop('simulatedElements')).toEqual({
      '3': { position: { x: 243, y: 34 }, shape: shape3 },
      '4': { position: { x: 78, y: 99 }, shape: shape4 },
    });

    expect(getElementData).toHaveBeenCalledWith('1');
    expect(getElementData).toHaveBeenCalledWith('2');
    expect(getElementData).toHaveBeenCalledWith('3');
    expect(getElementData).toHaveBeenCalledWith('4');
    expect(getElementData).toHaveBeenCalledTimes(4);
  });

  it('Handles multiple children in a single child from React', async () => {
    const shape1 = new MockShapeDefinition();
    const shape2 = new MockShapeDefinition();
    const shape3 = new MockShapeDefinition();
    const shape4 = new MockShapeDefinition();
    getElementData
      .mockReturnValueOnce({ position: { x: 2341, y: 478 }, shape: shape1 })
      .mockReturnValueOnce({ position: { x: 313.243, y: 5743876 }, shape: shape2 })
      .mockReturnValueOnce({ position: { x: 243, y: 34 }, shape: shape3 })
      .mockReturnValueOnce({ position: { x: 78, y: 99 }, shape: shape4 });

    const force1 = new MockForceDefinition();
    const force2 = new MockForceDefinition();
    const constraint1 = new MockConstraintDefinition();
    const constraint2 = new MockConstraintDefinition();

    const wrapper = await render(
      <SimulatedLayout SimulationClass={MockSimulation}>
        {[
          <DummyConfigProvider
            elementIds={['1']}
            forces={[force1]}
            constraints={[constraint1]}
            key='1'
          />,
          <DummyConfigProvider elementIds={['2']} key='2' />
        ]}
        <DummyConfigProvider
          elementIds={['3', '4']}
          forces={[force2]}
          constraints={[constraint2]}
        />
      </SimulatedLayout>
    );

    expect(wrapper.find('DummyConfigProvider').length).toBe(3);
    expect(wrapper.find('DummyConfigProvider').at(0).prop('simulatedElements')).toEqual({
      '1': { position: { x: 2341, y: 478 }, shape: shape1 }
    });
    expect(wrapper.find('DummyConfigProvider').at(1).prop('simulatedElements')).toEqual({
      '2': { position: { x: 313.243, y: 5743876 }, shape: shape2 }
    });
    expect(wrapper.find('DummyConfigProvider').at(2).prop('simulatedElements')).toEqual({
      '3': { position: { x: 243, y: 34 }, shape: shape3 },
      '4': { position: { x: 78, y: 99 }, shape: shape4 },
    });

    expect(getElementData).toHaveBeenCalledWith('1');
    expect(getElementData).toHaveBeenCalledWith('2');
    expect(getElementData).toHaveBeenCalledWith('3');
    expect(getElementData).toHaveBeenCalledWith('4');
    expect(getElementData).toHaveBeenCalledTimes(4);
  });

});

class DummyConfigProvider extends React.Component {
  render() {
    return null;
  }

  getSimulationConfig() {
    return Promise.resolve(
      new SimulationConfig({
        elementIds: this.props.elementIds,
        elementShapes: this.props.elementShapes,
        forces: this.props.forces,
        constraints: this.props.constraints,
      })
    );
  }
}
