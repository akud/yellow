import DisplayWindow from '../DisplayWindow';
import WindowContext from '../WindowContext';
import Circle from '../Circle';

import React from 'react';

import { shallow, mount } from 'enzyme';

describe('DisplayWindow', () => {
  it('renders children inside an svg with the provided width and height', () => {
    const wrapper = shallow(
      <DisplayWindow width={350} height={580}>
        <Circle />
      </DisplayWindow>
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(350);
    expect(wrapper.find('svg').prop('height')).toBe(580);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 350 580');
    expect(wrapper.find('svg').find(Circle).length).toBe(1);
  });

  it('applies the zoom to width and height', () => {
    const wrapper = shallow(
      <DisplayWindow width={300} height={500} zoom={2.0} />
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(300);
    expect(wrapper.find('svg').prop('height')).toBe(500);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 150 250');
  });

  it('Provides a context value with the viewbox coordinates', () => {
    let context;
    const wrapper = mount(
      <DisplayWindow width={300} height={500} zoom={2.0}>
        <WindowContext.Consumer>
          { c => { context = c; } }
        </WindowContext.Consumer>
      </DisplayWindow>
    );
    expect(context).toEqual({
      width: 150,
      height: 250,
      center: { x: 75, y: 125 },
    });
  });

  it('does not render a border by default', () => {
    const wrapper = shallow(<DisplayWindow />);
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toBe(undefined);
  });

  it('renders a border if told to', () => {
    const wrapper = shallow(<DisplayWindow border={true} />);
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toEqual('1px solid black');
  });
});
