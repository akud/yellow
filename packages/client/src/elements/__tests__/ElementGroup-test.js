import React from 'react';
import ElementGroup from '../ElementGroup';

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

  it('renders the <g> inside a link if one is provided', () => {
    const wrapper = shallow(
      <ElementGroup link='https://foo.bar.com'>
      </ElementGroup>
    );

    const link = wrapper.find('Link');
    expect(link.length).toBe(1);
    expect(link.prop('href')).toEqual('https://foo.bar.com');
    expect(link.find('g').length).toBe(1);
  });
});
