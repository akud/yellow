import React from 'react';

import { mount } from 'enzyme';

import WindowContext from '../WindowContext';
import Grid from '../Grid';


describe('Grid', () => {

  it('renders a coordinate field across the window', () => {
    const wrapper = mount(
      <WindowContext.Provider
        value={{
          width: 200,
          height: 400,
          center: { x: 100, y: 200 } }}
      >
        <Grid stepsPerSide={5} />
      </WindowContext.Provider>
    );

    const expectedXLabelPositions = [
      { x: 40, y: 15 },
      { x: 80, y: 15 },
      { x: 120, y: 15 },
      { x: 160, y: 15 },
      { x: 200, y: 15 },
    ];
    const expectedYLabelPositions = [
      { x: 15, y: 80 },
      { x: 15, y: 160 },
      { x: 15, y: 240 },
      { x: 15, y: 320 },
      { x: 15, y: 400 },
    ];
    const expectedDotPositions = [
      { x: 0, y: 0 },
      { x: 40, y: 80 },
      { x: 40, y: 160 },
      { x: 40, y: 240 },
      { x: 40, y: 320 },
      { x: 40, y: 400 },
      { x: 80, y: 80 },
      { x: 80, y: 160 },
      { x: 80, y: 240 },
      { x: 80, y: 320 },
      { x: 80, y: 400 },
      { x: 120, y: 80 },
      { x: 120, y: 160 },
      { x: 120, y: 240 },
      { x: 120, y: 320 },
      { x: 120, y: 400 },
      { x: 160, y: 80 },
      { x: 160, y: 160 },
      { x: 160, y: 240 },
      { x: 160, y: 320 },
      { x: 160, y: 400 },
      { x: 200, y: 80 },
      { x: 200, y: 160 },
      { x: 200, y: 240 },
      { x: 200, y: 320 },
      { x: 200, y: 400 },
    ];
    const circlePositions = wrapper.find('Circle').map(e => e.prop('position'));
    const labelProps = wrapper.find('Label')
      .map(l => ({
        position: l.prop('position'),
        text: l.prop('text')
      }));
    expect(circlePositions).toEqualWithoutOrder(expectedDotPositions);
    expect(labelProps).toEqualWithoutOrder(
      expectedXLabelPositions.map(({x, y}) => ({ position: {x, y}, text: x.toString() }))
      .concat(
        expectedYLabelPositions.map(({x, y}) => ({ position: {x, y}, text: y.toString() }))
      )
    );
  });
});
