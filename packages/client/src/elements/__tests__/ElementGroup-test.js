import React from 'react';
import { ElementGroup } from '../ElementGroup';

import { shallow } from 'enzyme';

describe('ElementGroup', () => {
  it('renders a <g> with the provided props', () => {
    const wrapper = shallow(
      <ElementGroup className='foo-bar' data-element-id='123'>
        <circle />
      </ElementGroup>
    );
    expect(wrapper.find('g').length).toBe(1);
    expect(wrapper.find('g').prop('className')).toEqual('foo-bar');
    expect(wrapper.find('g').prop('data-element-id')).toEqual('123');
    expect(wrapper.find('circle').length).toBe(1);
  });
});
