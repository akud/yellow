import React from 'react';

import Graph from '../Graph';

import { shallow } from 'enzyme';

describe('Graph', () => {
  it('renders a simulated layout inside a display window', () => {
    const wrapper = shallow(
      <Graph>
        <p>Hello!</p>
      </Graph>
    );
    const displayWindow = wrapper.find('DisplayWindow');

    expect(displayWindow.prop('width')).toBe(500);
    expect(displayWindow.prop('height')).toBe(500);
    expect(displayWindow.prop('zoom')).toBe(1.0);
    expect(displayWindow.prop('border')).toBe(false)

    const center = { x: 200, y: 200 };
    const displayedContents = displayWindow.renderProp('render')({
      center,
    });

    const simulatedLayout = displayedContents.find('SimulatedLayout');
    expect(simulatedLayout.length).toBe(1);

    expect(simulatedLayout.find('p').length).toBe(1);

    expect(simulatedLayout.find('UniversalPositioningRule').length).toBe(1);
    expect(simulatedLayout.find('UniversalPositioningRule').prop('position')).toEqual(
      center
    );

    expect(simulatedLayout.find('RepellingRule').length).toBe(1);
    expect(simulatedLayout.find('RepellingRule').prop('strength')).toBe(50);
  });

  it('forwards props to the DisplayWindow', () => {
    const wrapper = shallow(
      <Graph
        width={1000}
        height={1500}
        zoom={2.0}
        border={true}
      >
        <p>Hello!</p>
      </Graph>
    );
    const displayWindow = wrapper.find('DisplayWindow');
    expect(displayWindow.prop('width')).toBe(1000);
    expect(displayWindow.prop('height')).toBe(1500);
    expect(displayWindow.prop('zoom')).toBe(2.0);
    expect(displayWindow.prop('border')).toBe(true)
  });

  it('forwards repellingForceStrength to the RepellingRule', () => {
    const wrapper = shallow(
      <Graph repellingForceStrength={100}>
        <p>Hello!</p>
      </Graph>
    );

    const displayContents = wrapper.find('DisplayWindow').renderProp('render')({
      center: { x: 0, y: 0 }
    });
    expect(displayContents.find('RepellingRule').prop('strength')).toBe(100);
  });
});
