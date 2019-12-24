jest.mock('../../elements/geometry/geometry-utils');
jest.mock('../../elements/geometry/ShapeDefinition');

import React from 'react';

import Edge from '../Edge';

import geometryUtils from '../../elements/geometry/geometry-utils';

import { shallow } from 'enzyme';

describe('Edge', () => {

  it('renders a line inside a simulated link', () => {
    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={3}
        distance={125}
        bindingStrength={5.6}
      />
    );
    expect(wrapper.find('SimulatedLink').length).toBe(1);
    expect(wrapper.find('SimulatedLink').prop('fromElementId')).toEqual(
      '1-primary'
    );
    expect(wrapper.find('SimulatedLink').prop('toElementId')).toEqual(
      '2-primary'
    );
    expect(wrapper.find('SimulatedLink').prop('distance')).toBe(125);
    expect(wrapper.find('SimulatedLink').prop('bindingStrength')).toBe(5.6);

    const content = wrapper.find('SimulatedLink').renderProp('render')(
      { x: 45, y: 87 },
      { x: 123, y: 56 }
    );

    expect(content.find('ElementGroup').length).toBe(1);
    expect(content.find('Line').length).toBe(1);
    expect(content.find('Line').prop('from')).toEqual({
      x: 45, y: 87
    });
    expect(content.find('Line').prop('to')).toEqual({
      x: 123, y: 56
    });

    expect(content.find('Line').prop('color')).toEqual('#442200');
    expect(content.find('Line').prop('thickness')).toEqual(3);
  });

  it('renders an arrow at the target if directed=true', () => {
    geometryUtils.computeHorizontalIntersectionAngle.mockReturnValue(
      Math.PI / 3
    );

    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={45}
        directed={true}
      />
    );
    const content = wrapper.find('SimulatedLink').renderProp('render')(
      { x: 45, y: 87 },
      { x: 123, y: 56 }
    );


    expect(content.find('Arrow').length).toBe(1);
    expect(content.find('Arrow').prop('to')).toEqual({ x: 123, y: 56 });
    expect(content.find('Arrow').prop('color')).toEqual('#442200');
    expect(content.find('Arrow').prop('thickness')).toBe(45);
    expect(content.find('Arrow').prop('angle')).toBeCloseTo(Math.PI / 3);

    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 45, y: 87 },
      { x: 123, y: 56 },
    );
  });

  it('renders an arrow at the source and target if bidirectional=true', () => {
    geometryUtils.computeHorizontalIntersectionAngle
      .mockReturnValueOnce(Math.PI / 3)
      .mockReturnValueOnce(Math.PI / 4);

    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='#442200'
        thickness={45}
        bidirectional={true}
      />
    );

    const content = wrapper.find('SimulatedLink').renderProp('render')(
      { x: 45, y: 87 },
      { x: 123, y: 56 }
    );

    expect(content.find('Arrow').length).toBe(2);

    expect(content.find('Arrow').at(0).prop('to')).toEqual({ x: 45, y: 87 });
    expect(content.find('Arrow').at(0).prop('color')).toEqual('#442200');
    expect(content.find('Arrow').at(0).prop('thickness')).toBe(45);
    expect(content.find('Arrow').at(0).prop('angle')).toBeCloseTo(Math.PI / 3);

    expect(content.find('Arrow').at(1).prop('to')).toEqual({ x: 123, y: 56 });
    expect(content.find('Arrow').at(1).prop('color')).toEqual('#442200');
    expect(content.find('Arrow').at(1).prop('thickness')).toBe(45);
    expect(content.find('Arrow').at(1).prop('angle')).toBeCloseTo(Math.PI / 4);

    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 45, y: 87 },
      { x: 123, y: 56 },
    );
    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 123, y: 56 },
      { x: 45, y: 87 },
    );
  });
});
