import React from 'react';

jest.mock('../geometry/geometry-utils');
import geometryUtils from '../geometry/geometry-utils';

import { Label } from '../Label';
import RectangleDefinition from '../geometry/RectangleDefinition';

import { shallow } from 'enzyme';

describe('Label', () => {
  const makeProps = (args) => Object.assign({
    text: 'hello',
    position: newPosition(),
    width: 100,
    height: 20,
  }, args);

  beforeEach(() => {
    geometryUtils.mockReset();
  });

  it('renders the provided text', () => {
    const wrapper = shallow(
        <Label {...makeProps({ text: "Hello World!" })} />
    );

    expect(wrapper.find('text').length).toBe(1);
    expect(wrapper.find('text').text()).toEqual('Hello World!');
    expect(wrapper.find('text').prop('transform')).toBeFalsy();
    expect(geometryUtils.radiansToDegrees).not.toHaveBeenCalled();
  });

  it('adjusts the text position based on width and height', () => {
    const wrapper = shallow(
      <Label
        {
          ...makeProps({
            position: point(10, 56),
            width: 42,
            height: 24
          })
        }
      />
    ).update();

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(62);
    expect(wrapper.find('text').prop('transform')).toBeFalsy();
    expect(geometryUtils.radiansToDegrees).not.toHaveBeenCalled();
  });

  it('can render with a top alignment', () => {
    const wrapper = shallow(
      <Label
        {
          ...makeProps({
            position: point(10, 56),
            width: 42,
            height: 24,
            alignment: 'top',
          })
        }
      />
    ).update();

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(80);
    expect(wrapper.find('text').prop('transform')).toBeFalsy();
    expect(geometryUtils.radiansToDegrees).not.toHaveBeenCalled();
  });

  it('can render with a bottom alignment', () => {
    const wrapper = shallow(
      <Label
        {
          ...makeProps({
            position: point(10, 56),
            width: 42,
            height: 24,
            alignment: 'bottom',
          })
        }
      />
    ).update();

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(56);
    expect(wrapper.find('text').prop('transform')).toBeFalsy();
    expect(geometryUtils.radiansToDegrees).not.toHaveBeenCalled();
  });

  it('can render with a rotation', () => {
    geometryUtils.radiansToDegrees.mockReturnValue(45);
    const wrapper = shallow(
      <Label
        {
          ...makeProps({
            position: point(10, 56),
            width: 42,
            height: 24,
            alignment: 'bottom',
            rotation: PI_OVER_THREE,
          })
        }
      />
    ).update();

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(56);
    expect(wrapper.find('text').prop('transform')).toEqual(
      'rotate(45 10 56)'
    );
    expect(geometryUtils.radiansToDegrees).toHaveBeenCalledOnceWith(PI_OVER_THREE);
  });
});
