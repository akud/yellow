jest.mock('../../elements/geometry/geometry-utils');
jest.mock('../../elements/geometry/ShapeDefinition');

import React from 'react';

import ElementGroup from '../../elements/ElementGroup';
import Arrow from '../../elements/Arrow';
import Curve from '../../elements/Curve';
import Line from '../../elements/Line';

import Edge from '../Edge';

import geometryUtils from '../../elements/geometry/geometry-utils';

import { shallow } from 'enzyme';

const originalCurveGetAngleOfApproach = Curve.getAngleOfApproach;

describe('Edge', () => {

  let mockGetAngleOfApproach;

  beforeEach(() => {
    mockGetAngleOfApproach = jest.fn();
    Curve.getAngleOfApproach = mockGetAngleOfApproach;
    geometryUtils.mockReset();
  });

  afterEach(() => {
    Curve.getAngleOfApproach = originalCurveGetAngleOfApproach;
  });

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
      '1_primary'
    );
    expect(wrapper.find('SimulatedLink').prop('toElementId')).toEqual(
      '2_primary'
    );
    expect(wrapper.find('SimulatedLink').prop('distance')).toBe(125);
    expect(wrapper.find('SimulatedLink').prop('bindingStrength')).toBe(5.6);

    const content = wrapper.find('SimulatedLink').renderProp('render')(
      { x: 45, y: 87 },
      { x: 123, y: 56 }
    );

    expect(content.find(ElementGroup).length).toBe(1);
    expect(content.find(Line).length).toBe(1);
    expect(content.find(Line).prop('from')).toEqual({
      x: 45, y: 87
    });
    expect(content.find(Line).prop('to')).toEqual({
      x: 123, y: 56
    });

    expect(content.find(Line).prop('color')).toEqual('#442200');
    expect(content.find(Line).prop('thickness')).toEqual(3);
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


    expect(content.find(Arrow).length).toBe(1);
    expect(content.find(Arrow).prop('to')).toEqual({ x: 123, y: 56 });
    expect(content.find(Arrow).prop('color')).toEqual('#442200');
    expect(content.find(Arrow).prop('thickness')).toBe(45);
    expect(content.find(Arrow).prop('angle')).toBeCloseTo(Math.PI / 3);

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

    expect(content.find(Arrow).length).toBe(2);

    expect(content.find(Arrow).at(0).prop('to')).toEqual({ x: 45, y: 87 });
    expect(content.find(Arrow).at(0).prop('color')).toEqual('#442200');
    expect(content.find(Arrow).at(0).prop('thickness')).toBe(45);
    expect(content.find(Arrow).at(0).prop('angle')).toBeCloseTo(Math.PI / 3);

    expect(content.find(Arrow).at(1).prop('to')).toEqual({ x: 123, y: 56 });
    expect(content.find(Arrow).at(1).prop('color')).toEqual('#442200');
    expect(content.find(Arrow).at(1).prop('thickness')).toBe(45);
    expect(content.find(Arrow).at(1).prop('angle')).toBeCloseTo(Math.PI / 4);

    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 45, y: 87 },
      { x: 123, y: 56 },
    );
    expect(geometryUtils.computeHorizontalIntersectionAngle).toHaveBeenCalledWith(
      { x: 123, y: 56 },
      { x: 45, y: 87 },
    );
  });

  it('renders a curve if curvature is provided', () => {
    mockGetAngleOfApproach
      .mockReturnValueOnce(PI_OVER_FOUR)
      .mockReturnValueOnce(THREE_PI_OVER_TWO);

    geometryUtils.complement
      .mockReturnValueOnce(FIVE_PI_OVER_FOUR)
      .mockReturnValueOnce(PI_OVER_TWO);

    const wrapper = shallow(
      <Edge
        fromNodeId='1'
        toNodeId='2'
        color='green'
        thickness={3}
        curvature='3'
        bidirectional={true}
      />
    );
    const from = { x: 45, y: 87 };
    const to = { x: 123, y: 56 };
    const content = wrapper.find('SimulatedLink').renderProp('render')(
      from, to
    );

    expect(content.find(Curve).length).toBe(1);
    expect(content.find(Curve).prop('from')).toEqual(from);
    expect(content.find(Curve).prop('to')).toEqual(to);
    expect(content.find(Curve).prop('curvature')).toEqual('3');
    expect(content.find(Curve).prop('color')).toEqual('green');
    expect(content.find(Curve).prop('thickness')).toEqual(3);

    expect(content.find(Arrow).length).toBe(2);

    expect(content.find(Arrow).at(0).prop('to')).toEqual(from);
    expect(content.find(Arrow).at(0).prop('angle')).toBeCloseTo(
      FIVE_PI_OVER_FOUR
    );

    expect(content.find(Arrow).at(1).prop('to')).toEqual(to);
    expect(content.find(Arrow).at(1).prop('angle')).toBeCloseTo(
      PI_OVER_TWO
    );
    expect(mockGetAngleOfApproach).toHaveBeenCalledWith(from, to, '3');
    expect(mockGetAngleOfApproach).toHaveBeenCalledWith(to, from, '3');
    expect(mockGetAngleOfApproach).toHaveBeenCalledTimes(2);

    expect(geometryUtils.complement).toHaveBeenCalledWith(PI_OVER_FOUR);
    expect(geometryUtils.complement).toHaveBeenCalledWith(THREE_PI_OVER_TWO);
    expect(geometryUtils.complement).toHaveBeenCalledTimes(2);
  });
});
