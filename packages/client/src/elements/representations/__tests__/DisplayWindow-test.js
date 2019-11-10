import DisplayWindow from '../DisplayWindow';

import React from 'react';

import { shallow } from 'enzyme';

describe('DisplayWindow', () => {
  it('renders an svg with the provided width and height', () => {
    const renderProp = jest.fn();
    const wrapper = shallow(
      <DisplayWindow
        width={350}
        height={580}
        render={renderProp}
      />
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(350);
    expect(wrapper.find('svg').prop('height')).toBe(580);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 350 580');
    expect(renderProp).toHaveBeenCalledWith({
      center: { x: 175, y: 290 }
    });
  });

  it('applies the zoom to width and height', () => {
    const renderProp = jest.fn();
    const wrapper = shallow(
      <DisplayWindow
        width={300}
        height={500}
        zoom={2.0}
        render={renderProp}
      />
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(300);
    expect(wrapper.find('svg').prop('height')).toBe(500);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 150 250');
    expect(renderProp).toHaveBeenCalledWith({
      center: { x: 75, y: 125 }
    });
  });

  it('does not render a border by default', () => {
    const wrapper = shallow(<DisplayWindow render={jest.fn()} />);
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toBe(undefined);
  });

  it('renders a border if told to', () => {
    const wrapper = shallow(<DisplayWindow render={jest.fn()} border={true} />);
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toEqual('1px solid black');
  });
});
