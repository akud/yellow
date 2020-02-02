import { Arrow } from '../Arrow';
import React from 'react';

import { shallow } from 'enzyme';

describe('Arrow', () => {
  it('renders a path at the provided point', () => {
    const wrapper = shallow(
      <Arrow
        to={{ x: 56, y: 89 }}
        color='green'
        thickness={2}
        angle={Math.PI/4}
      />
    );
    expect(wrapper.find('path').length).toBe(1);
    expect(wrapper.find('path').prop('d')).toEqual(
      'M56 89 l -10 -5 z l -10 5 z'
    );
    expect(wrapper.find('path').prop('stroke')).toEqual('green');
    expect(wrapper.find('path').prop('strokeWidth')).toEqual(2);
    expect(wrapper.find('path').prop('transform')).toEqual(
      'rotate(45 56 89)'
    );
  });
});
