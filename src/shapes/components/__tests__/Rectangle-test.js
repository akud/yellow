import Rectangle from '../Rectangle';
import RectangleDefinition from 'shapes/RectangleDefinition';
import React from 'react';

import { shallow } from 'enzyme';

describe('Rectangle', () => {
  it('renders with the given position, width, height, and fill color', () => {
    const wrapper = shallow(
      <Rectangle
        width={20}
        height={18}
        color='#442200'
        position={ { x: 420, y: 69 } }
      />
    );
    expect(wrapper.find('rect').length).toBe(1);
    expect(wrapper.find('rect').prop('width')).toBe(20);
    expect(wrapper.find('rect').prop('height')).toBe(18);
    expect(wrapper.find('rect').prop('fill')).toBe('#442200');
    expect(wrapper.find('rect').prop('x')).toBe(410);
    expect(wrapper.find('rect').prop('y')).toBe(60);
  });

  describe('getShapeDefinition', () => {
    it('returns a RectangleDefinition', () => {
      const wrapper = shallow(
        <Rectangle
          width={20}
          height={15}
          color='#442200'
          position={ { x: 420, y: 69 } }
        />
      );
      expect(wrapper.instance().getShapeDefinition()).toEqual(new RectangleDefinition({
        width: 20,
        height: 15,
      }));
    });
  });
});
