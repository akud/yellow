import React from 'react';
import { shallow } from 'enzyme';

import SimulationWindow from '../SimulationWindow';

describe('SimulationWindow', () => {
  it('renders a SimulatedLayout inside a DisplayWindow using the render prop', () => {
    const renderProp = jest.fn().mockReturnValue(<p className='test'>hello</p>);
    const wrapper = shallow(
      <SimulationWindow
        border={true}
        width={500}
        render={renderProp}
      />
    );

    const displayWindow = wrapper.find('DisplayWindow');

    expect(displayWindow.length).toBe(1);
    expect(displayWindow.prop('border')).toBe(true);
    expect(displayWindow.prop('width')).toBe(500);
    expect(displayWindow.prop('render')).toBeInstanceOf(Function);
    expect(displayWindow.prop('render')).not.toBe(renderProp);

    expect(renderProp).not.toHaveBeenCalled();

    const center = {
      x: 456,
      y: 123,
    };
    const renderedContents = displayWindow.renderProp('render')({ center });
    expect(renderProp).toHaveBeenCalledOnceWith({ center });

    const simulatedLayout = renderedContents.find('SimulatedLayout');
    expect(simulatedLayout.length).toBe(1);

    expect(simulatedLayout.find('p').length).toBe(1);
    expect(simulatedLayout.find('p').prop('className')).toBe('test');
  });
});
