import Circle from '../Circle';
import CircleDefinition from 'elements/CircleDefinition';
import React from 'react';

import { shallow } from 'enzyme';

describe('Circle', () => {
  it('renders with the given position, radius, and fill color', () => {
    const wrapper = shallow(
      <Circle
        radius={5}
        color='#442200'
        position={ { x: 420, y: 69 } }
      />
    );
    expect(wrapper.find('circle').length).toBe(1);
    expect(wrapper.find('circle').prop('r')).toBe(5);
    expect(wrapper.find('circle').prop('fill')).toBe('#442200');
    expect(wrapper.find('circle').prop('cx')).toBe(420);
    expect(wrapper.find('circle').prop('cy')).toBe(69);
  });

  describe('getShapeDefinition', () => {
    it('returns a CircleDefinition', () => {
      const wrapper = shallow(
        <Circle
          radius={5}
          color='#442200'
          position={ { x: 420, y: 69 } }
        />
      );
      expect(wrapper.instance().getShapeDefinition()).toEqual(new CircleDefinition({
        radius: 5
      }));
    });
  });
});
