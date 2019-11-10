import React from 'react';
import ElementGroup from '../ElementGroup';

import { shallow } from 'enzyme';

describe('ElementGroup', () => {
  it('renders a <g> with the provided class name', () => {
    const wrapper = shallow(
      <ElementGroup className='foo-bar'>
        <circle />
      </ElementGroup>
    );
    expect(wrapper.find('g').length).toBe(1);
    expect(wrapper.find('g').prop('className')).toEqual('foo-bar');
    expect(wrapper.find('circle').length).toBe(1);
  });
});
