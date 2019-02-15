import Circle from '../Circle';
import CircleShape from 'geometry/Circle';
import React from 'react';

import { shallow } from 'enzyme';

describe('Circle', () => {
  it('renders with the given radius and fill color', () => {
    const wrapper = shallow(<Circle radius={5} color='#442200' />);
    expect(wrapper.find('circle').length).toBe(1);
    expect(wrapper.find('circle').prop('r')).toBe(5);
    expect(wrapper.find('circle').prop('fill')).toBe('#442200');
  });

  it('renders with the given position if provided', () => {
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

  describe('getShape', () => {
    it('returns a Circle shape', () => {
      expect(Circle.getShape({ radius: 4 })).toEqual(new CircleShape({
        center: { x: 0, y: 0 },
        radius: 4
      }));

      expect(Circle.getShape({ position: { x: 12, y: 35 } })).toEqual(new CircleShape({
        center: { x: 12, y: 35 },
        radius: 10
      }));
    });
  });
});
