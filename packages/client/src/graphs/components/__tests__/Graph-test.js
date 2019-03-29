import React from 'react';

import Graph from '../Graph';

import { shallow } from 'enzyme';

describe('Graph', () => {
  it('renders a simulated layout', () => {
    const wrapper = shallow(
      <Graph>
        <p>Hello!</p>
      </Graph>
    );
    const simulatedLayout = wrapper.find('SimulatedLayout');
    expect(simulatedLayout.length).toBe(1);

    expect(simulatedLayout.find('p').length).toBe(1);

    expect(simulatedLayout.find('CenteringForce').length).toBe(1);
  });


  it('renders with the provided width and height', () => {
    const wrapper = shallow(
      <Graph width={350} height={580} />
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(350);
    expect(wrapper.find('svg').prop('height')).toBe(580);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 350 580');

    expect(wrapper.find('CenteringForce').prop('center')).toEqual({
      x: 175,
      y: 290
    });
  });

  it('applies the zoom to width and height', () => {
    const wrapper = shallow(
      <Graph width={300} height={500} zoom={2.0}/>
    );
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('width')).toBe(300);
    expect(wrapper.find('svg').prop('height')).toBe(500);
    expect(wrapper.find('svg').prop('viewBox')).toEqual('0 0 150 250');

    expect(wrapper.find('CenteringForce').prop('center')).toEqual({
      x: 75,
      y: 125
    });
  });

  it('does not render a boder by default', () => {
    const wrapper = shallow(<Graph />);
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toBe(undefined);
  });

  it('renders a border if told to', () => {
    const wrapper = shallow(<Graph border={true} />);
    expect(wrapper.find('svg').length).toBe(1);
    expect(wrapper.find('svg').prop('style').border).toEqual('1px solid black');
  });
});
